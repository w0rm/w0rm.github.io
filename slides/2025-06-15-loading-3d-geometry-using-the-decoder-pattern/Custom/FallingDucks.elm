module Custom.FallingDucks exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

{-| This demo loads a convex shape and a mesh from the same OBJ file.

  - elm-physics is used for simulation
  - elm-3d-scene is used for rendering
  - elm-obj-file is used for loading OBJ file

It is important to keep the convex shape as small as possible, because
this affects the simulation performance.

-}

import Acceleration
import Angle
import Axis3d
import Block3d exposing (Block3d)
import Browser
import Browser.Dom
import Browser.Events
import Camera3d
import Color exposing (Color)
import Direction3d
import Duration
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Http
import Length exposing (Meters)
import Mass
import Obj.Decode exposing (Decoder, ObjCoordinates)
import Physics.Body exposing (Body)
import Physics.Coordinates exposing (BodyCoordinates)
import Physics.Shape
import Physics.World exposing (World)
import Pixels exposing (Pixels)
import Point3d exposing (Point3d)
import Quantity exposing (Quantity, Unitless)
import Scene3d
import Scene3d.Material exposing (Texture)
import Scene3d.Mesh exposing (Shadow, Textured)
import Task
import TriangularMesh exposing (TriangularMesh)
import Vector3d exposing (Vector3d)
import Viewpoint3d
import WebGL.Texture


type Data
    = MeshWithShadow (Textured BodyCoordinates) (Shadow BodyCoordinates)
    | Floor


bodyFrame : Frame3d Meters BodyCoordinates { defines : ObjCoordinates }
bodyFrame =
    Frame3d.atOrigin


bodyFromMeshAndCollider :
    TriangularMesh
        { position : Point3d Meters BodyCoordinates
        , normal : Vector3d Unitless BodyCoordinates
        , uv : ( Float, Float )
        }
    -> TriangularMesh (Point3d Meters BodyCoordinates)
    -> Body Data
bodyFromMeshAndCollider texturedFaces triangles =
    let
        mesh =
            Scene3d.Mesh.texturedFaces texturedFaces
    in
    MeshWithShadow mesh (Scene3d.Mesh.shadow mesh)
        |> Physics.Body.compound [ Physics.Shape.unsafeConvex triangles ]
        |> Physics.Body.withBehavior (Physics.Body.dynamic (Mass.kilograms 1))


{-| Maps two decoders to get a decoder of the required meshes.
-}
duckDecoder : Decoder (Body Data)
duckDecoder =
    Obj.Decode.map2 bodyFromMeshAndCollider
        (Obj.Decode.object "Duck"
            (Obj.Decode.texturedFacesIn bodyFrame)
        )
        (Obj.Decode.object "Convex"
            (Obj.Decode.trianglesIn bodyFrame)
        )


floorBlock : Block3d Meters BodyCoordinates
floorBlock =
    Block3d.centeredOn Frame3d.atOrigin
        ( Length.meters 25, Length.meters 25, Length.millimeters 10 )


type alias Options =
    { width : Int
    , height : Int
    }


type alias Model =
    { material : Maybe (Scene3d.Material.Textured BodyCoordinates)
    , world : World Data
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , firstTick : Bool
    }


type Msg
    = LoadedTexture (Result WebGL.Texture.Error (Texture Color))
    | LoadedDuck (Result Http.Error (Body Data))
    | Tick


initial : Options -> Model
initial { width, height } =
    { material = Nothing
    , dimensions = ( Pixels.int width, Pixels.int height )
    , world =
        Physics.World.empty
            |> Physics.World.withGravity
                (Acceleration.metersPerSecondSquared 9.80665)
                Direction3d.negativeZ
            |> Physics.World.add
                (Physics.Body.plane Floor
                    |> Physics.Body.moveTo (Point3d.meters 0 0 -3)
                )
    , firstTick = True
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadedTexture result ->
            ( { model
                | material =
                    result
                        |> Result.map Scene3d.Material.texturedMatte
                        |> Result.toMaybe
              }
            , Cmd.none
            )

        LoadedDuck result ->
            case result of
                Ok body ->
                    ( { model
                        | world =
                            model.world
                                |> Physics.World.add
                                    (body
                                        |> Physics.Body.rotateAround Axis3d.y (Angle.degrees -35)
                                        |> Physics.Body.moveTo (Point3d.meters 0.1 -0.5 3)
                                    )
                                |> Physics.World.add
                                    (body
                                        |> Physics.Body.rotateAround Axis3d.x (Angle.degrees 45)
                                        |> Physics.Body.moveTo (Point3d.meters 0 0 6)
                                    )
                                |> Physics.World.add
                                    (body
                                        |> Physics.Body.rotateAround Axis3d.y (Angle.degrees 35)
                                        |> Physics.Body.moveTo (Point3d.meters 0 0.5 10)
                                    )
                                |> Physics.World.add
                                    (body
                                        |> Physics.Body.rotateAround Axis3d.x (Angle.degrees -45)
                                        |> Physics.Body.moveTo (Point3d.meters 0 0 14)
                                    )
                      }
                    , Cmd.none
                    )

                Err _ ->
                    ( model, Cmd.none )

        Tick ->
            ( { model
                | world =
                    Physics.World.simulate (Duration.milliseconds 16) model.world
                , firstTick = False
              }
            , if model.firstTick then
                Cmd.batch
                    [ Scene3d.Material.load "duck.jpg"
                        |> Task.attempt LoadedTexture
                    , Http.get
                        { url = "duck.obj.txt" -- .txt is required to work with `elm reactor`
                        , expect = Obj.Decode.expectObj LoadedDuck Length.meters duckDecoder
                        }
                    ]

              else
                Cmd.none
            )


view : Model -> Html Msg
view model =
    let
        camera =
            Camera3d.perspective
                { viewpoint =
                    Viewpoint3d.orbitZ
                        { focalPoint = Point3d.meters 0 0 0
                        , azimuth = Angle.degrees 45
                        , elevation = Angle.degrees 25
                        , distance = Length.meters 25
                        }
                , verticalFieldOfView = Angle.degrees 30
                }
    in
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.negativeZ
        , shadows = True
        , camera = camera
        , dimensions = model.dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities =
            model.world
                |> Physics.World.bodies
                |> List.map
                    (\body ->
                        let
                            frame3d =
                                Physics.Body.frame body
                        in
                        case Physics.Body.data body of
                            MeshWithShadow mesh shadow ->
                                case model.material of
                                    Just material ->
                                        Scene3d.meshWithShadow material mesh shadow
                                            |> Scene3d.placeIn frame3d

                                    Nothing ->
                                        Scene3d.nothing

                            Floor ->
                                Scene3d.block (Scene3d.Material.matte Color.charcoal) floorBlock
                                    |> Scene3d.placeIn frame3d
                    )
        }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (always Tick)
