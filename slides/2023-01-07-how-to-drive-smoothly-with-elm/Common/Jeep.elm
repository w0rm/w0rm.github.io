module Common.Jeep exposing (Jeep, load, settings, wheels)

import Acceleration
import Angle exposing (Angle)
import Array
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import BoundingBox3d
import Browser
import Browser.Dom
import Browser.Events
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Common.RaycastCar exposing (CarSettings, Wheel, defaultWheel)
import Direction3d exposing (Direction3d)
import Duration exposing (Duration)
import Force exposing (Force)
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes
import Http
import Json.Decode
import Length exposing (Length, Meters)
import Mass
import Obj.Decode exposing (Decoder)
import Physics.Body as Body exposing (Body)
import Physics.Coordinates exposing (BodyCoordinates, WorldCoordinates)
import Physics.Shape as Shape exposing (Shape)
import Physics.World as World exposing (World)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Polyline3d
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material exposing (Texture)
import Scene3d.Mesh exposing (Shadow, Textured)
import Task exposing (Task)
import TriangularMesh
import Vector3d
import Viewpoint3d
import WebGL.Texture


type alias Jeep =
    { collider : List Shape
    , chassis : Textured BodyCoordinates
    , chassisShadow : Shadow BodyCoordinates
    , wheel : Textured BodyCoordinates
    , wheelRadius : Length
    , wheelWidth : Length
    , wheelShadow : Shadow BodyCoordinates
    , wheelAxes : List (Axis3d Meters BodyCoordinates)
    , material : Scene3d.Material.Textured BodyCoordinates
    }


load : { texture : String, mesh : String } -> Task String Jeep
load urls =
    Http.task
        { method = "get"
        , headers = []
        , body = Http.emptyBody
        , url = urls.mesh
        , resolver =
            Http.stringResolver
                (\resp ->
                    case resp of
                        Http.GoodStatus_ _ str ->
                            Obj.Decode.decodeString (\a -> Length.meters (a / 2)) jeepDecoder str

                        _ ->
                            Err "Failed to load mesh"
                )
        , timeout = Nothing
        }
        |> Task.andThen
            (\fn ->
                Scene3d.Material.load urls.texture
                    |> Task.mapError (\_ -> "Failed to load texture")
                    |> Task.map (\texture -> fn (Scene3d.Material.texturedMatte texture))
            )


settings : Jeep -> CarSettings
settings jeep =
    { downDirection = Direction3d.negativeZ
    , rightDirection = Direction3d.negativeX
    , forwardDirection = Direction3d.negativeY
    , suspensionRestLength = Quantity.multiplyBy 0.4 jeep.wheelRadius
    , minSuspensionLength = Length.meters 0
    , maxSuspensionLength = Quantity.multiplyBy 1.2 jeep.wheelRadius
    , radius = jeep.wheelRadius
    , suspensionStiffness = 30
    , dampingCompression = 4.4
    , dampingRelaxation = 2.3
    , frictionSlip = 5
    , rollInfluence = 0.01
    , maxSuspensionForce = Force.newtons 100000
    }


wheels : Jeep -> List (Wheel id)
wheels jeep =
    List.map
        (\axis ->
            { defaultWheel
                | chassisConnectionPoint =
                    Axis3d.originPoint axis
                        |> Point3d.translateIn Direction3d.z (Quantity.multiplyBy 0.2 jeep.wheelRadius)
                , axis = axis
            }
        )
        jeep.wheelAxes


jeepDecoder : Decoder (Scene3d.Material.Textured BodyCoordinates -> Jeep)
jeepDecoder =
    Obj.Decode.map5
        (\convexBase convexWindow chassis wheel wheelAxes ->
            let
                wheelBounds =
                    BoundingBox3d.hull Point3d.origin (TriangularMesh.vertices wheel |> Array.toList |> List.map .position)

                ( wheelWidth, wheelDiameter, _ ) =
                    BoundingBox3d.dimensions wheelBounds

                wheelMesh =
                    Scene3d.Mesh.texturedFaces wheel

                chassisMesh =
                    Scene3d.Mesh.texturedFaces chassis
            in
            \material ->
                { collider = [ Shape.unsafeConvex convexBase, Shape.unsafeConvex convexWindow ]
                , chassis = chassisMesh
                , chassisShadow = Scene3d.Mesh.shadow chassisMesh
                , wheel = wheelMesh
                , wheelShadow = Scene3d.Mesh.shadow wheelMesh
                , wheelAxes = wheelAxes
                , wheelRadius = Quantity.half wheelDiameter
                , wheelWidth = wheelWidth
                , material = material
                }
        )
        (Obj.Decode.object "convex-base_Base" (Obj.Decode.trianglesIn Frame3d.atOrigin))
        (Obj.Decode.object "convex-window_Window" (Obj.Decode.trianglesIn Frame3d.atOrigin))
        (startsWith "chassis" (Obj.Decode.texturedFacesIn Frame3d.atOrigin))
        (Obj.Decode.object "Wheel" (Obj.Decode.texturedFacesIn Frame3d.atOrigin))
        (Obj.Decode.combine
            [ Obj.Decode.object "front-left_Axis3d" axis3d
            , Obj.Decode.object "front-right_Axis3d" axis3d
            , Obj.Decode.object "rear-left_Axis3d" axis3d
            , Obj.Decode.object "rear-right_Axis3d" axis3d
            ]
        )


startsWith : String -> Decoder a -> Decoder a
startsWith prefix =
    Obj.Decode.filter
        (\properties ->
            case properties.object of
                Nothing ->
                    False

                Just object ->
                    String.startsWith prefix object
        )


axis3d : Decoder (Axis3d Meters BodyCoordinates)
axis3d =
    Obj.Decode.polylinesIn Frame3d.atOrigin
        |> Obj.Decode.andThen
            (\lines ->
                case lines of
                    line :: _ ->
                        case Polyline3d.vertices line of
                            p1 :: p2 :: _ ->
                                case Axis3d.throughPoints p1 p2 of
                                    Just axis ->
                                        Obj.Decode.succeed axis

                                    Nothing ->
                                        Obj.Decode.fail "Failed to constuct axis"

                            _ ->
                                Obj.Decode.fail "Expected at least two points"

                    _ ->
                        Obj.Decode.fail "Expected at least one line"
            )
