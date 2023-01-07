module Custom.Cover exposing
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
import Common.RaycastCar as RaycastCar exposing (Wheel)
import Direction3d exposing (Direction3d)
import Duration
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
import Physics.Coordinates exposing (BodyCoordinates, WorldCoordinates)
import Physics.Material as Material exposing (Material)
import Physics.World as World exposing (World)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material
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
    , jeep : Maybe Jeep
    , firstTick : Bool
    }


type Msg
    = Tick Float
    | JeepLoaded (Result String Jeep)


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , jeep = Nothing
    , firstTick = True
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        JeepLoaded result ->
            case result of
                Ok jeep ->
                    ( { model | jeep = Just jeep }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        Tick dt ->
            ( { model
                | firstTick = False
              }
            , -- A hack for the missing initial command support in elm-slice-show
              if model.firstTick then
                Jeep.load { texture = "jeep.png", mesh = "jeep.obj.txt" } |> Task.attempt JeepLoaded

              else
                Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions m =
    if m.firstTick then
        onAnimationFrameDelta Tick

    else
        Sub.none



-- View:


view : Model -> Html Msg
view { jeep, dimensions } =
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.xyZ (Angle.degrees -125) (Angle.degrees -70)
        , shadows = True
        , camera = camera
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities =
            [ Scene3d.quad (Scene3d.Material.matte Color.white)
                (Point3d.meters -100 -100 0)
                (Point3d.meters -100 100 0)
                (Point3d.meters 100 100 0)
                (Point3d.meters 100 -100 0)
            , case jeep of
                Just j ->
                    Scene3d.placeIn Frame3d.atOrigin (jeepEntity j)

                Nothing ->
                    Scene3d.nothing
            ]
        }


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.orthographic
        { viewpoint =
            Viewpoint3d.orbitZ
                { focalPoint = Point3d.meters 2.5 0.5 0
                , azimuth = Angle.degrees 135
                , elevation = Angle.degrees 45
                , distance = Length.meters 15
                }
        , viewportHeight = Length.meters 6.5
        }


jeepEntity : Jeep -> Entity BodyCoordinates
jeepEntity jeep =
    Scene3d.group
        (List.foldl
            (\wheel entities ->
                let
                    position =
                        wheel.chassisConnectionPoint

                    { downDirection, rightDirection } =
                        Jeep.settings jeep

                    axisDirection =
                        Axis3d.direction wheel.axis

                    angle =
                        if Quantity.greaterThan Quantity.zero (Direction3d.angleFrom rightDirection axisDirection) then
                            identity

                        else
                            Frame3d.mirrorAcross Plane3d.yz

                    newPosition =
                        position |> Point3d.translateBy (Vector3d.withLength wheel.suspensionLength downDirection)

                    newFrame =
                        Frame3d.atOrigin
                            |> angle
                            |> Frame3d.rotateAround (Axis3d.through Point3d.origin (Direction3d.reverse rightDirection)) wheel.rotation
                            |> Frame3d.rotateAround (Axis3d.through Point3d.origin downDirection) wheel.steering
                            |> Frame3d.moveTo newPosition
                in
                (Scene3d.meshWithShadow jeep.material
                    jeep.wheel
                    jeep.wheelShadow
                    |> Scene3d.placeIn newFrame
                )
                    :: entities
            )
            [ Scene3d.meshWithShadow jeep.material
                jeep.chassis
                jeep.chassisShadow
            ]
            (Jeep.wheels jeep)
        )
