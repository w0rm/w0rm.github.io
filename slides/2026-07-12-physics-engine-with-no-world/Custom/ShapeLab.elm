module Custom.ShapeLab exposing (Id(..), Model, Msg, Options, dropScene, initial, subscriptions, update, view)

{-| Shape composition, assembled in front of you, on loop:

1.  Two spheres and two blocks hover as separate parts.
2.  They glide together: `plus` fuses the snowman, `minus` sinks the
    inner block into the outer one.
3.  Blink: the fused solids alternate with X-ray wireframes a few times,
    revealing the inner shapes — the cavity block is still there,
    subtracted.

Pure animation, no physics. `dropScene` remains only as the constant
scene that Verify.elm simulates headlessly.

-}

import Angle
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Custom.Xray as Xray
import Density
import Direction3d
import Duration exposing (Duration)
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Material
import Physics.Shape
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Sphere3d exposing (Sphere3d)
import Timestep exposing (Timestep)
import Vector3d


type Id
    = Ground
    | Snowman
    | Crate


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
    , prevBodies = dropScene
    , bodies = dropScene
    , contacts = Physics.emptyContacts
    , dimensions = ( Pixels.int width, Pixels.int height )
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    }



-- TIMELINE (seconds on the loop clock)


glideStart : Float
glideStart =
    1.2


glideEnd : Float
glideEnd =
    2.0


blinkStart : Float
blinkStart =
    2.6


blinkPeriod : Float
blinkPeriod =
    0.5


blinkEnd : Float
blinkEnd =
    5.6


loopEnd : Float
loopEnd =
    6.6


type Phase
    = Parts Float -- glide progress: 0 = apart, 1 = fused
    | Xray


phase : Float -> Phase
phase t =
    if t < blinkStart then
        Parts (easeInOut (clamp 0 1 ((t - glideStart) / (glideEnd - glideStart))))

    else if t < blinkEnd && (floor ((t - blinkStart) / blinkPeriod) |> modBy 2) == 0 then
        Xray

    else
        -- solid between the blinks and for a beat before the loop restarts
        Parts 1


easeInOut : Float -> Float
easeInOut f =
    if f < 0.5 then
        4 * f * f * f

    else
        1 - ((-2 * f + 2) ^ 3) / 2



-- GEOMETRY (in body coordinates; the snowman's origin is the bottom
-- sphere's center, the crate's origin is the outer block's center)


bottomSphere : Sphere3d Meters BodyCoordinates
bottomSphere =
    Sphere3d.atOrigin (Length.meters 0.38)


topSphere : Sphere3d Meters BodyCoordinates
topSphere =
    Sphere3d.atPoint (Point3d.meters 0 0 0.56) (Length.meters 0.26)


outerBlock : Block3d Meters BodyCoordinates
outerBlock =
    Block3d.from
        (Point3d.meters -0.4 -0.35 -0.35)
        (Point3d.meters 0.4 0.35 0.35)


innerBlock : Block3d Meters BodyCoordinates
innerBlock =
    Block3d.from
        (Point3d.meters -0.3 -0.25 -0.25)
        (Point3d.meters 0.3 0.25 0.25)


{-| Where the snowman's origin sits while hovering (and when the drop starts).
-}
snowmanAnchor : Point3d Meters WorldCoordinates
snowmanAnchor =
    Point3d.meters -0.95 0 0.9


crateAnchor : Point3d Meters WorldCoordinates
crateAnchor =
    Point3d.meters 0.95 0 1.0


{-| How far above their fused positions the loose parts hover: both around
z ≈ 1.9 m, low enough to clear the caption at the top of the canvas, high
enough for the inner block to clear the outer one.
-}
topSphereLift : Float
topSphereLift =
    0.22


innerBlockLift : Float
innerBlockLift =
    0.75


snow : Physics.Material.Material Physics.Material.Dense
snow =
    Physics.Material.dense
        { density = Density.kilogramsPerCubicMeter 250
        , friction = 0.6
        , bounciness = 0.1
        }


{-| The payoff scene: both composed shapes as real dynamic bodies.
`Shape.plus` and `Shape.minus` — the exact code from the slide.
-}
dropScene : List ( Id, Body )
dropScene =
    [ ( Ground, Physics.plane Plane3d.xy Physics.Material.wood )
    , ( Snowman
      , Physics.dynamic
            [ ( Physics.Shape.sphere bottomSphere
                    |> Physics.Shape.plus (Physics.Shape.sphere topSphere)
              , snow
              )
            ]
            |> Physics.moveTo snowmanAnchor
      )
    , ( Crate
      , Physics.dynamic
            [ ( Physics.Shape.block outerBlock
                    |> Physics.Shape.minus (Physics.Shape.block innerBlock)
              , Physics.Material.wood
              )
            ]
            |> Physics.moveTo crateAnchor
      )
    ]



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update (Tick dt) model =
    ( Timestep.advance simulateStep dt model, Cmd.none )


simulateStep : Model -> Model
simulateStep model =
    let
        t =
            model.elapsed + Duration.inSeconds (Timestep.duration model.timestep)
    in
    if t >= loopEnd then
        { model | elapsed = 0 }

    else
        { model | elapsed = t }



-- VIEW


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 0 -5.8 1.5
        , focalPoint = Point3d.meters 0 0 1
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 31)
        }


view : Model -> Html Msg
view { elapsed, dimensions, timestep } =
    let
        renderTime =
            elapsed + Timestep.progress timestep * Duration.inSeconds (Timestep.duration timestep)

        entities =
            case phase renderTime of
                Parts progress ->
                    partsEntities renderTime progress

                Xray ->
                    xrayEntities
    in
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -60)
            , shadows = False
            , camera = camera
            , dimensions = dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities = entities
            }
        ]



-- SOLID PARTS (animation phases)


{-| The loose parts, hovering and gliding into place. `progress` runs the
tops down into their fused positions.
-}
partsEntities : Float -> Float -> List (Entity WorldCoordinates)
partsEntities t progress =
    let
        -- gentle bob while apart, fading out as parts fuse
        bob offset =
            0.04 * sin (2.5 * t + offset) * (1 - progress)

        lift full =
            full * (1 - progress)

        snowmanFrame =
            Frame3d.atPoint (snowmanAnchor |> Point3d.translateBy (upward (bob 0)))

        topFrame =
            Frame3d.atPoint
                (snowmanAnchor
                    |> Point3d.translateBy (upward (0.56 + lift topSphereLift + bob 1.3))
                )

        crateFrame =
            Frame3d.atPoint (crateAnchor |> Point3d.translateBy (upward (bob 2.1)))

        innerFrame =
            Frame3d.atPoint
                (crateAnchor
                    |> Point3d.translateBy (upward (lift innerBlockLift + bob 3.4))
                )
    in
    [ Scene3d.placeIn snowmanFrame (Scene3d.sphere snowMaterial bottomSphere)
    , Scene3d.placeIn topFrame
        (Scene3d.sphere snowMaterial (Sphere3d.atOrigin (Sphere3d.radius topSphere)))
    , Scene3d.placeIn crateFrame (Scene3d.block crateMaterial outerBlock)
    , Scene3d.placeIn innerFrame (Scene3d.block voidMaterial innerBlock)
    ]


upward : Float -> Vector3d.Vector3d Meters WorldCoordinates
upward dz =
    Vector3d.meters 0 0 dz



-- X-RAY (wireframes at the fused positions)


xrayEntities : List (Entity WorldCoordinates)
xrayEntities =
    [ Scene3d.placeIn (Frame3d.atPoint snowmanAnchor) snowmanWireframe
    , Scene3d.placeIn (Frame3d.atPoint crateAnchor) crateWireframe
    ]


snowmanWireframe : Entity BodyCoordinates
snowmanWireframe =
    Scene3d.group
        [ Xray.sphereWireframe Xray.outlineColor bottomSphere
        , Xray.sphereWireframe Xray.outlineColor topSphere
        ]


crateWireframe : Entity BodyCoordinates
crateWireframe =
    Scene3d.group
        [ Xray.blockWireframe Xray.outlineColor outerBlock
        , Xray.blockWireframe Xray.voidColor innerBlock
        ]




-- MATERIALS AND WIREFRAME MESHES


snowMaterial : Material.Textured BodyCoordinates
snowMaterial =
    Material.nonmetal { baseColor = Color.rgb255 240 244 250, roughness = 0.9 }


crateMaterial : Material.Uniform BodyCoordinates
crateMaterial =
    Material.nonmetal { baseColor = Color.rgb255 205 170 125, roughness = 0.6 }


voidMaterial : Material.Uniform BodyCoordinates
voidMaterial =
    Material.nonmetal { baseColor = Xray.ellipsoidColor, roughness = 0.4 }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
