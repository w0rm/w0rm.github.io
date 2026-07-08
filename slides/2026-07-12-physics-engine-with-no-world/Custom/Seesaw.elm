module Custom.Seesaw exposing (Id(..), Model, Msg, Options, constrain, hollowCrate, initial, scene, solidCrate, subscriptions, update, view)

{-| Two visually identical wooden crates on a seesaw. The left one is solid
wood; the right one is `Shape.block outer |> Shape.minus (Shape.block inner)` —
a real hollow. No mass is ever typed in: the engine derives both masses from
shape × material, so the seesaw tips toward the solid crate.

A few seconds after the tip, an X-ray cycles on and off: the crates become
wireframes showing the cavity, the derived center of mass (red dot), the
derived mass (labels), and the Poinsot inertia ellipsoid — both ellipsoids
share one scale, so the hollow crate's visibly bigger ellipsoid reads as
"easier to spin". All of it comes from the engine's own derived data;
nothing is typed in.

The crates are deliberately non-cubic: for a perfect cube the normalized
ellipsoid is a sphere for both crates and the X-ray would show no
difference in shape.

The plank is hinged to a static stand with `Constraint.hinge`; the crates
are just resting on it.

-}

import Angle
import Axis3d
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Custom.Xray as Xray
import Direction3d
import Duration exposing (Duration)
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Mass
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Constraint exposing (Constraint)
import Physics.Material
import Physics.Shape
import Pixels exposing (Pixels)
import Plane3d
import Point3d
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Timestep exposing (Timestep)


type Id
    = Floor
    | Stand
    | Plank
    | SolidCrate
    | HollowCrate


type alias Model =
    { elapsed : Float
    , prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , timestep : Timestep
    }


type Msg
    = Tick Duration


type alias Options =
    { width : Int
    , height : Int
    }


initial : Options -> Model
initial { width, height } =
    { elapsed = 0
    , prevBodies = scene
    , bodies = scene
    , contacts = Physics.emptyContacts
    , dimensions = ( Pixels.int width, Pixels.int height )
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    }



-- BODIES


plankHeight : Float
plankHeight =
    0.46


{-| The stand pillar is centered under the hinge, standing on the floor.
-}
standBlock : Block3d Meters BodyCoordinates
standBlock =
    Block3d.from
        (Point3d.meters -0.05 -0.15 0)
        (Point3d.meters 0.05 0.15 0.4)


{-| Taller than wide on purpose — see the module doc.
-}
crateBlock : Block3d Meters BodyCoordinates
crateBlock =
    Block3d.from
        (Point3d.meters -0.25 -0.25 -0.38)
        (Point3d.meters 0.25 0.25 0.38)


cavityBlock : Block3d Meters BodyCoordinates
cavityBlock =
    Block3d.from
        (Point3d.meters -0.23 -0.23 -0.34)
        (Point3d.meters 0.23 0.23 0.34)


plankBlock : Block3d Meters BodyCoordinates
plankBlock =
    Block3d.from
        (Point3d.meters -1.6 -0.25 -0.03)
        (Point3d.meters 1.6 0.25 0.03)


{-| The plank plus four low stops that pocket each crate in place, so the
crates don't slide along the plank while it tips.
-}
plankParts : List (Block3d Meters BodyCoordinates)
plankParts =
    [ plankBlock
    , stop -1.6 -1.5
    , stop -0.97 -0.87
    , stop 0.87 0.97
    , stop 1.5 1.6
    ]


stop : Float -> Float -> Block3d Meters BodyCoordinates
stop x1 x2 =
    Block3d.from (Point3d.meters x1 -0.25 0.03) (Point3d.meters x2 0.25 0.18)


crateZ : Float
crateZ =
    plankHeight + 0.03 + 0.38 + 0.01


solidCrate : Body
solidCrate =
    Physics.block crateBlock Physics.Material.wood
        |> Physics.moveTo (Point3d.meters -1.235 0 crateZ)


hollowCrate : Body
hollowCrate =
    Physics.dynamic
        [ ( Physics.Shape.block crateBlock
                |> Physics.Shape.minus (Physics.Shape.block cavityBlock)
          , Physics.Material.wood
          )
        ]
        |> Physics.moveTo (Point3d.meters 1.235 0 crateZ)


scene : List ( Id, Body )
scene =
    [ ( Floor, Physics.plane Plane3d.xy Physics.Material.wood )
    , ( Stand
      , Physics.static
            [ ( Physics.Shape.block standBlock, Physics.Material.wood ) ]
      )
    , ( Plank
      , Physics.dynamic
            (List.map
                (\block -> ( Physics.Shape.block block, Physics.Material.steel ))
                plankParts
            )
            -- heavy angular damping: tip slowly instead of slamming
            |> Physics.damp { linear = 0.01, angular = 0.8 }
            |> Physics.moveTo (Point3d.meters 0 0 plankHeight)
      )
    , ( SolidCrate, solidCrate )
    , ( HollowCrate, hollowCrate )
    ]


constrain : Id -> Maybe (Id -> List Constraint)
constrain id1 =
    case id1 of
        Stand ->
            Just
                (\id2 ->
                    case id2 of
                        Plank ->
                            [ Physics.Constraint.hinge
                                (Axis3d.through (Point3d.meters 0 0 plankHeight) Direction3d.y)
                                (Axis3d.through Point3d.origin Direction3d.y)
                            ]

                        _ ->
                            []
                )

        _ ->
            Nothing



-- X-RAY
-- The overlays are constant per body (built in body coordinates from the
-- engine's derived data), so they're computed once at the top level.


{-| Both ellipsoids are normalized by the solid crate's inverse inertia:
one shared scale, so relative size is meaningful.
-}
sharedNormInv : Float
sharedNormInv =
    Xray.maxInvInertia solidCrate


{-| When the X-ray is on: 3.5 s of plain view first (watch the seesaw tip),
then 4 s on / 2 s off, forever.
-}
xrayOn : Float -> Bool
xrayOn elapsed =
    elapsed > 3.5 && (elapsed - 3.5) - 6 * toFloat (floor ((elapsed - 3.5) / 6)) < 4


solidCrateXray : Entity BodyCoordinates
solidCrateXray =
    Scene3d.group
        [ Xray.blockWireframe Xray.outlineColor crateBlock
        , Xray.comDot 0.035 solidCrate
        , Xray.inertiaEllipsoid { radius = 0.34, normInv = sharedNormInv } solidCrate
        ]


hollowCrateXray : Entity BodyCoordinates
hollowCrateXray =
    Scene3d.group
        [ Xray.blockWireframe Xray.outlineColor crateBlock
        , Xray.blockWireframe Xray.voidColor cavityBlock
        , Xray.comDot 0.035 hollowCrate
        , Xray.inertiaEllipsoid { radius = 0.34, normInv = sharedNormInv } hollowCrate
        ]


{-| The derived mass, printed. Nothing is typed in: this comes out of
`Physics.mass` at runtime.
-}
derivedMassLabel : Body -> String
derivedMassLabel body =
    case Physics.mass body of
        Just mass ->
            String.fromInt (round (Mass.inKilograms mass)) ++ " kg"

        Nothing ->
            ""



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update (Tick dt) model =
    ( Timestep.advance simulateStep dt model, Cmd.none )


simulateStep : Model -> Model
simulateStep model =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | duration = Timestep.duration model.timestep
                    , constrain = constrain
                    , contacts = model.contacts
                }
                model.bodies
    in
    { model
        | elapsed = model.elapsed + Duration.inSeconds (Timestep.duration model.timestep)
        , prevBodies = model.bodies
        , bodies = newBodies
        , contacts = newContacts
    }



-- VIEW


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 0 -6.5 1.7
        , focalPoint = Point3d.meters 0 0 0.6
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 27)
        }


view : Model -> Html Msg
view { elapsed, prevBodies, bodies, dimensions, timestep } =
    let
        xray =
            xrayOn elapsed
    in
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        (Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -60)
            , shadows = False
            , camera = camera
            , dimensions = dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                List.map2 (bodyEntity xray timestep) prevBodies bodies
            }
            :: (if xray then
                    massLabels

                else
                    []
               )
        )


{-| The derived masses, above each crate. Left/right offsets match the
crates' resting positions (x = ±1.235 m) under this camera.
-}
massLabels : List (Html msg)
massLabels =
    [ massLabel 86 (derivedMassLabel solidCrate)
    , massLabel 434 (derivedMassLabel hollowCrate)
    ]


massLabel : Int -> String -> Html msg
massLabel centerX text =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" (String.fromInt centerX ++ "px")
        , Html.Attributes.style "top" "42px"
        , Html.Attributes.style "transform" "translateX(-50%)"
        , Html.Attributes.style "font" "bold 28px \"Helvetica Neue\", Arial, sans-serif"
        , Html.Attributes.style "color" "#d81b1b"
        ]
        [ Html.text text ]


crateMaterial : Material.Uniform BodyCoordinates
crateMaterial =
    Material.nonmetal { baseColor = Color.rgb255 205 170 125, roughness = 0.6 }


bodyEntity : Bool -> Timestep -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity xray timestep ( _, prev ) ( id, curr ) =
    Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr) <|
        case id of
            Floor ->
                Scene3d.nothing

            Stand ->
                Scene3d.block
                    (Material.nonmetal { baseColor = Color.rgb255 120 120 125, roughness = 0.5 })
                    standBlock

            Plank ->
                Scene3d.group
                    (List.map
                        (Scene3d.block
                            (Material.metal { baseColor = Color.rgb255 90 95 105, roughness = 0.4 })
                        )
                        plankParts
                    )

            SolidCrate ->
                if xray then
                    solidCrateXray

                else
                    Scene3d.block crateMaterial crateBlock

            HollowCrate ->
                if xray then
                    hollowCrateXray

                else
                    -- rendered with the same outer block: visually identical
                    Scene3d.block crateMaterial crateBlock


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
