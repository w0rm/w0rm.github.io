module Custom.Duck exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

import Acceleration
import Angle exposing (Angle)
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Browser.Events exposing (onAnimationFrameDelta)
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Direction3d exposing (Direction3d)
import Duration
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes exposing (height, width)
import Html.Events exposing (onClick)
import Http
import Json.Decode
import Length exposing (Meters)
import LineSegment3d exposing (LineSegment3d)
import Mass
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Obj.Decode exposing (Decoder, ObjCoordinates)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material exposing (Plain, Texture)
import Scene3d.Mesh
import Task
import TriangularMesh exposing (TriangularMesh)
import Vector3d
import Viewpoint3d
import WebGL.Texture


type ZUpCoords
    = ZUpCoords


yUpToZUpFrame : Frame3d Meters ZUpCoords { defines : ObjCoordinates }
yUpToZUpFrame =
    Frame3d.atOrigin |> Frame3d.rotateAround Axis3d.x (Angle.degrees 90)


duckDecoder : Decoder (Scene3d.Mesh.Textured ZUpCoords)
duckDecoder =
    Obj.Decode.texturedFacesIn yUpToZUpFrame
        |> Obj.Decode.map Scene3d.Mesh.texturedFaces


type alias Options =
    { width : Int
    , height : Int
    }


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , duck : Maybe (Scene3d.Mesh.Textured ZUpCoords)
    , firstTick : Bool
    , material : Maybe (Scene3d.Material.Textured ZUpCoords)
    }


type Msg
    = Tick Float
    | LoadedDuck (Result Http.Error (Scene3d.Mesh.Textured ZUpCoords))
    | LoadedTexture (Result WebGL.Texture.Error (Texture Color))


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , duck = Nothing
    , firstTick = True
    , material = Nothing
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadedDuck result ->
            ( { model | duck = Result.toMaybe result }, Cmd.none )

        LoadedTexture result ->
            ( { model
                | material =
                    result
                        |> Result.map Scene3d.Material.texturedMatte
                        |> Result.toMaybe
              }
            , Cmd.none
            )

        Tick dt ->
            ( { model | firstTick = False }
            , -- A hack for the missing initial command support in elm-slice-show
              if model.firstTick then
                Cmd.batch
                    [ Scene3d.Material.load "duck.jpg" |> Task.attempt LoadedTexture
                    , Http.get
                        { url = "duck-y-up.obj.txt" -- .txt is required to work with `elm reactor`
                        , expect =
                            Obj.Decode.expectObj LoadedDuck
                                Length.meters
                                duckDecoder
                        }
                    ]

              else
                Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    onAnimationFrameDelta Tick



-- View:


view : Model -> Html Msg
view { duck, dimensions, material } =
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.xyZ (Angle.degrees -125) (Angle.degrees -45)
        , shadows = False
        , camera = camera
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities =
            [ case duck of
                Just body ->
                    case material of
                        Just material_ ->
                            Scene3d.mesh material_ body

                        Nothing ->
                            Scene3d.nothing

                Nothing ->
                    Scene3d.nothing
            ]
        }


camera : Camera3d Meters ZUpCoords
camera =
    Camera3d.perspective
        { viewpoint =
            Viewpoint3d.orbitZ
                { focalPoint = Point3d.meters 0 0 0
                , azimuth = Angle.degrees 45
                , elevation = Angle.degrees 20
                , distance = Length.meters 7
                }
        , verticalFieldOfView = Angle.degrees 45
        }
