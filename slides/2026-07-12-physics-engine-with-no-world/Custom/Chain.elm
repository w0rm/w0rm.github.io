module Custom.Chain exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| A chain of beads hanging from a slowly swaying anchor, with a heavier
bob at the end (the last link, rendered bigger). There is no list of
constraints anywhere: the chain exists only as a rule — `Link i` connects
to `Link (i + 1)`.

The anchor is a kinematic body driven the same way as the CraneClaw: position
set to the current anchor point, velocity set so the engine integrates it to
the next anchor point over one simulation step.

-}

import Angle
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Direction3d
import Duration exposing (Duration)
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Constraint exposing (Constraint)
import Physics.Material
import Physics.Shape
import Pixels exposing (Pixels)
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Sphere3d
import Timestep exposing (Timestep)
import Vector3d


type Id
    = Anchor
    | Link Int


type alias Model =
    { prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , timestep : Timestep
    , time : Float
    }


type Msg
    = Tick Duration


type alias Options =
    { width : Int
    , height : Int
    }


initial : Options -> Model
initial { width, height } =
    { prevBodies = chain
    , bodies = chain
    , contacts = Physics.emptyContacts
    , dimensions = ( Pixels.int width, Pixels.int height )
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    , time = 0
    }



-- BODIES


linkCount : Int
linkCount =
    8


lastLink : Int
lastLink =
    linkCount - 1


spacing : Length.Length
spacing =
    Length.meters 0.16


anchorHeight : Float
anchorHeight =
    2.1


{-| Where the anchor is at a given time: a slow sway along X.
-}
anchorAt : Float -> Point3d Meters WorldCoordinates
anchorAt time =
    Point3d.meters (0.55 * sin (0.85 * time)) 0 anchorHeight


linkSphere : Physics.Shape.Shape
linkSphere =
    Physics.Shape.sphere (Sphere3d.atOrigin (Length.meters 0.055))


bobRadius : Length.Length
bobRadius =
    Length.meters 0.13


chain : List ( Id, Body )
chain =
    ( Anchor
    , Physics.kinematic [ ( linkSphere, Physics.Material.steel ) ]
        |> Physics.moveTo (anchorAt 0)
    )
        :: ( Link linkCount -- the bob: just the last link, heavier
           , Physics.sphere (Sphere3d.atOrigin bobRadius) Physics.Material.steel
                |> Physics.moveTo
                    (Point3d.meters 0
                        0
                        (anchorHeight - 0.16 * toFloat (linkCount + 1))
                    )
           )
        :: List.map
            (\i ->
                ( Link i
                , Physics.dynamic [ ( linkSphere, Physics.Material.steel ) ]
                    |> Physics.moveTo
                        (Point3d.meters 0 0 (anchorHeight - 0.16 * toFloat (i + 1)))
                )
            )
            (List.range 0 lastLink)


constrain : Id -> Maybe (Id -> List Constraint)
constrain id =
    case id of
        Anchor ->
            Just (distanceTo (Link 0))

        Link i ->
            Just (distanceTo (Link (i + 1)))


{-| The whole rule of the chain: one constraint for the next link,
none for anything else.
-}
distanceTo : Id -> Id -> List Constraint
distanceTo next id =
    if id == next then
        [ Physics.Constraint.distance spacing ]

    else
        []



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update (Tick dt) model =
    ( Timestep.advance simulateStep dt model, Cmd.none )


simulateStep : Model -> Model
simulateStep model =
    let
        dt =
            Duration.inSeconds (Timestep.duration model.timestep)

        time =
            model.time + dt

        -- drive the kinematic anchor: place it at the current point and
        -- give it the velocity that reaches the next point in one step
        driveAnchor ( id, body ) =
            if id == Anchor then
                ( id
                , body
                    |> Physics.moveTo (anchorAt model.time)
                    |> Physics.setVelocityTo
                        (Vector3d.from (anchorAt model.time) (anchorAt time)
                            |> Vector3d.per (Timestep.duration model.timestep)
                        )
                )

            else
                ( id, body )

        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | duration = Timestep.duration model.timestep
                    , constrain = constrain
                    , contacts = model.contacts
                }
                (List.map driveAnchor model.bodies)
    in
    { model
        | prevBodies = model.bodies
        , bodies = newBodies
        , contacts = newContacts
        , time = time
    }



-- VIEW


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 0 -4.6 1.1
        , focalPoint = Point3d.meters 0 0 1.1
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 30)
        }


view : Model -> Html Msg
view { prevBodies, bodies, dimensions, timestep } =
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
            , entities =
                List.map2 (bodyEntity timestep) prevBodies bodies
            }
        ]


steelMaterial : Material.Textured BodyCoordinates
steelMaterial =
    Material.metal { baseColor = Color.rgb255 233 235 216, roughness = 0.4 }


bodyEntity : Timestep -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity timestep ( _, prev ) ( id, curr ) =
    Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr) <|
        case id of
            Anchor ->
                Scene3d.sphere
                    (Material.metal { baseColor = Color.rgb255 120 120 125, roughness = 0.4 })
                    (Sphere3d.atOrigin (Length.meters 0.07))

            Link i ->
                if i == linkCount then
                    Scene3d.sphere steelMaterial (Sphere3d.atOrigin bobRadius)

                else
                    Scene3d.sphere steelMaterial (Sphere3d.atOrigin (Length.meters 0.055))


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
