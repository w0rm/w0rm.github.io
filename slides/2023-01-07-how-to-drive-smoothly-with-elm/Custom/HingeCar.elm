module Custom.HingeCar exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

import Acceleration
import Angle
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Browser.Events exposing (onAnimationFrameDelta)
import Camera3d exposing (Camera3d)
import Color
import Common.Jeep as Jeep exposing (Jeep)
import Cylinder3d exposing (Cylinder3d)
import Direction3d exposing (Direction3d)
import Duration
import Force
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes exposing (height, width)
import Html.Events exposing (onClick)
import Json.Decode
import Length exposing (Meters)
import Mass
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Physics.Body as Body exposing (Body)
import Physics.Constraint as Constraint exposing (Constraint)
import Physics.Coordinates exposing (BodyCoordinates, WorldCoordinates)
import Physics.Material as Material exposing (Material)
import Physics.World as World exposing (World)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material
import SketchPlane3d exposing (SketchPlane3d)
import Sphere3d
import Task
import Vector3d
import Viewpoint3d
import WebGL.Texture as Texture exposing (Error, Texture)


type alias Options =
    { width : Int
    , height : Int
    }


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , world : World Id
    , jeep : Maybe Jeep
    , firstTick : Bool
    , speeding : Float
    , steering : Float
    }


type Id
    = Obstacle (Block3d Meters BodyCoordinates)
    | Floor
    | Car
    | Wheel Int


type Command
    = Speed Float
    | Steer Float


type Msg
    = Tick Float
    | KeyDown Command
    | KeyUp Command
    | JeepLoaded (Result String Jeep)


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , world = initialWorld
    , jeep = Nothing
    , firstTick = True
    , speeding = 0
    , steering = 0
    }


initialWorld : World Id
initialWorld =
    World.empty
        |> World.withGravity (Acceleration.metersPerSecondSquared 9.80665) Direction3d.negativeZ
        |> World.add (Body.plane Floor)
        |> World.add slope
        |> World.add (box (Point3d.meters 15 -15 0.5))
        |> World.add (box (Point3d.meters 15 -16.5 0.5))
        |> World.add (box (Point3d.meters 15 -18 0.5))
        |> World.add (box (Point3d.meters 15 -16 1.5))
        |> World.add (box (Point3d.meters 15 -17.5 1.5))
        |> World.add (box (Point3d.meters 15 -16.5 2.5))


addCar : Point3d Meters WorldCoordinates -> Jeep -> List (Body Id)
addCar offset jeep =
    (Body.compound jeep.collider Car
        |> Body.withBehavior (Body.dynamic (Mass.kilograms 4000))
        |> Body.moveTo offset
    )
        :: List.indexedMap
            (\id axis ->
                Body.cylinder
                    (Cylinder3d.centeredOn Point3d.origin
                        (Axis3d.direction axis)
                        { radius = jeep.wheelRadius
                        , length = jeep.wheelWidth
                        }
                    )
                    (Wheel (id + 1))
                    -- The simulation gets too unstable when the cylinder is used for wheels
                    -- using the sphere makes it a bit better, but the collisions with wheels become weird
                    -- Body.sphere (Sphere3d.atOrigin jeep.wheelRadius) (Wheel (id + 1))
                    |> Body.withMaterial (Material.custom { friction = 0.9, bounciness = 0.1 })
                    |> Body.withBehavior (Body.dynamic (Mass.kilograms 200))
                    |> Body.moveTo offset
                    |> Body.translateBy
                        (Vector3d.from Point3d.origin (Axis3d.originPoint axis)
                            |> Vector3d.placeIn Frame3d.atOrigin
                        )
            )
            jeep.wheelAxes


applySpeed : Jeep -> Float -> Body Id -> Body Id
applySpeed jeep speed body =
    if
        (speed /= 0)
            && (case Body.data body of
                    Wheel _ ->
                        True

                    _ ->
                        False
               )
    then
        let
            frame =
                Body.frame body

            forward =
                Frame3d.yDirection frame

            up =
                Frame3d.zDirection frame

            wheelPoint =
                Frame3d.originPoint frame

            pointOnTheWheel =
                wheelPoint |> Point3d.translateBy (Vector3d.withLength jeep.wheelRadius up)

            pointUnderTheWheel =
                wheelPoint |> Point3d.translateBy (Vector3d.withLength jeep.wheelRadius (Direction3d.reverse up))
        in
        body
            |> Body.applyForce (Force.newtons (speed * 2500)) forward pointOnTheWheel
            |> Body.applyForce (Force.newtons (speed * 2500)) (Direction3d.reverse forward) pointUnderTheWheel

    else
        body


constrainCar : Jeep -> Float -> Body Id -> Body Id -> List Constraint
constrainCar jeep steering b1 b2 =
    let
        direction =
            Direction3d.fromAzimuthInAndElevationFrom SketchPlane3d.xy
                (Angle.degrees (-steering * 30))
                Quantity.zero

        ( ( axis1, axis2 ), ( axis3, axis4 ) ) =
            case jeep.wheelAxes of
                [ a1, a2, a3, a4 ] ->
                    ( ( a1, a2 ), ( a3, a4 ) )

                _ ->
                    ( ( Axis3d.z, Axis3d.z ), ( Axis3d.z, Axis3d.z ) )

        hinge1 =
            Constraint.hinge (Axis3d.through (Axis3d.originPoint axis1) direction) Axis3d.x

        hinge2 =
            Constraint.hinge (Axis3d.through (Axis3d.originPoint axis2) direction) Axis3d.x

        hinge3 =
            Constraint.hinge axis3 Axis3d.x

        hinge4 =
            Constraint.hinge axis4 Axis3d.x
    in
    case ( Body.data b1, Body.data b2 ) of
        ( Car, Wheel 1 ) ->
            [ hinge1 ]

        ( Car, Wheel 2 ) ->
            [ hinge2 ]

        ( Car, Wheel 3 ) ->
            [ hinge3 ]

        ( Car, Wheel 4 ) ->
            [ hinge4 ]

        _ ->
            []


{-| A slope to give a car the initial push.
-}
slope : Body Id
slope =
    let
        slopeBlock =
            Block3d.centeredOn Frame3d.atOrigin
                ( Length.meters 10
                , Length.meters 16
                , Length.meters 0.5
                )
    in
    Body.block slopeBlock (Obstacle slopeBlock)
        |> Body.rotateAround Axis3d.x (Angle.radians (pi / 16))
        |> Body.moveTo (Point3d.meters 0 -2 1.5)


box : Point3d Meters WorldCoordinates -> Body Id
box position =
    let
        boxBlock =
            Block3d.centeredOn Frame3d.atOrigin
                ( Length.meters 1
                , Length.meters 1
                , Length.meters 1
                )
    in
    Body.block boxBlock (Obstacle boxBlock)
        |> Body.withBehavior (Body.dynamic (Mass.kilograms 20))
        |> Body.moveTo position


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        JeepLoaded result ->
            case result of
                Ok jeep ->
                    ( { model
                        | jeep = Just jeep
                        , world = List.foldl World.add model.world (addCar (Point3d.meters 0 0 6) jeep)
                      }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        Tick dt ->
            ( { model
                | world =
                    case model.jeep of
                        Just jeep ->
                            model.world
                                |> World.constrain (constrainCar jeep model.steering)
                                |> World.update (applySpeed jeep model.speeding)
                                |> World.simulate (Duration.seconds (1 / 60))

                        _ ->
                            model.world
                , firstTick = False
              }
            , -- A hack for the missing initial command support in elm-slice-show
              if model.firstTick then
                Jeep.load { texture = "jeep.png", mesh = "jeep.obj.txt" } |> Task.attempt JeepLoaded

              else
                Cmd.none
            )

        KeyDown (Steer k) ->
            ( { model | steering = k }, Cmd.none )

        KeyDown (Speed k) ->
            ( { model | speeding = k }, Cmd.none )

        KeyUp (Steer k) ->
            ( { model
                | steering =
                    if k == model.steering then
                        0

                    else
                        model.steering
              }
            , Cmd.none
            )

        KeyUp (Speed k) ->
            ( { model
                | speeding =
                    if k == model.speeding then
                        0

                    else
                        model.speeding
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ onAnimationFrameDelta Tick
        , Browser.Events.onKeyDown (keyDecoder KeyDown)
        , Browser.Events.onKeyUp (keyDecoder KeyUp)
        ]



-- View:


view : Model -> Html Msg
view { world, jeep, dimensions } =
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.xyZ (Angle.degrees -15) (Angle.degrees -45)
        , shadows = True
        , camera = camera
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities = List.map (bodyToEntity jeep) (World.bodies world)
        }


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.perspective
        { viewpoint =
            Viewpoint3d.lookAt
                { eyePoint = Point3d.meters -40 40 30
                , focalPoint = Point3d.meters 0 -7 0
                , upDirection = Direction3d.positiveZ
                }
        , verticalFieldOfView = Angle.degrees 24
        }


bodyToEntity : Maybe Jeep -> Body Id -> Entity WorldCoordinates
bodyToEntity maybeJeep body =
    let
        id =
            Body.data body

        frame =
            Body.frame body
    in
    Scene3d.placeIn frame <|
        case id of
            Floor ->
                Scene3d.quad (Scene3d.Material.matte Color.white)
                    (Point3d.meters -100 -100 0)
                    (Point3d.meters -100 100 0)
                    (Point3d.meters 100 100 0)
                    (Point3d.meters 100 -100 0)

            Obstacle block ->
                Scene3d.blockWithShadow
                    (Scene3d.Material.nonmetal
                        { baseColor = Color.lightGray
                        , roughness = 1
                        }
                    )
                    block

            Wheel n ->
                case maybeJeep of
                    Just jeep ->
                        let
                            flip =
                                if modBy 2 n == 1 then
                                    Scene3d.placeIn (Frame3d.mirrorAcross Plane3d.yz Frame3d.atOrigin)

                                else
                                    identity
                        in
                        Scene3d.meshWithShadow jeep.material
                            jeep.wheel
                            jeep.wheelShadow
                            |> flip

                    Nothing ->
                        Scene3d.nothing

            Car ->
                case maybeJeep of
                    Just jeep ->
                        Scene3d.meshWithShadow jeep.material
                            jeep.chassis
                            jeep.chassisShadow

                    Nothing ->
                        Scene3d.nothing


keyDecoder : (Command -> Msg) -> Json.Decode.Decoder Msg
keyDecoder toMsg =
    Json.Decode.field "key" Json.Decode.string
        |> Json.Decode.andThen
            (\string ->
                case string of
                    "a" ->
                        Json.Decode.succeed (toMsg (Steer -1))

                    "d" ->
                        Json.Decode.succeed (toMsg (Steer 1))

                    "w" ->
                        Json.Decode.succeed (toMsg (Speed 1))

                    "s" ->
                        Json.Decode.succeed (toMsg (Speed -1))

                    _ ->
                        Json.Decode.fail ("Unrecognized key: " ++ string)
            )
