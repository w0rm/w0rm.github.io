module Custom.Elm3D exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

import Angle
import Axis3d
import Browser
import Browser.Dom
import Browser.Events
import Camera3d
import Color
import Direction3d
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Http
import Length exposing (millimeters)
import Obj.Decode exposing (Decoder)
import Path
import Pixels exposing (Pixels, pixels)
import Point3d
import Quantity exposing (Quantity)
import Scene3d
import Scene3d.Material as Material
import Scene3d.Mesh exposing (Uniform)
import SketchPlane3d
import SubPath
import Task
import TriangularMesh
import Vector3d
import Viewpoint3d


type alias Options =
    { width : Int
    , height : Int
    }


type WorldCoordinates
    = WorldCoordinates Never


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , maybeMesh : Maybe (Uniform WorldCoordinates)
    , firstTick : Bool
    }


type Msg
    = Tick Float
    | LoadedMesh (Result Http.Error (Uniform WorldCoordinates))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadedMesh result ->
            ( { model | maybeMesh = Result.toMaybe result }, Cmd.none )

        Tick dt ->
            ( { model | firstTick = False }
            , if model.firstTick then
                Http.get
                    { url = "elm3d.obj.txt"
                    , expect = Obj.Decode.expectObj LoadedMesh (\a -> Length.centimeters (a * 20)) mesh
                    }

              else
                Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta Tick


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , maybeMesh = Nothing
    , firstTick = True
    }


view : Model -> Html Msg
view { dimensions, maybeMesh } =
    let
        camera =
            Camera3d.perspective
                { viewpoint =
                    Viewpoint3d.lookAt
                        { eyePoint = Point3d.meters 0 -0.55 0
                        , focalPoint = Point3d.meters 0 0 0
                        , upDirection = Direction3d.positiveZ
                        }
                , verticalFieldOfView = Angle.degrees 24
                }
    in
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.xyZ (Angle.degrees 75) (Angle.degrees -15)
        , shadows = True
        , camera = camera
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities =
            [ case maybeMesh of
                Just threeD ->
                    Scene3d.mesh
                        (Material.nonmetal
                            { baseColor = Color.white
                            , roughness = 0.4
                            }
                        )
                        threeD

                Nothing ->
                    Scene3d.nothing
            ]
        }


{-| Decode 3D mesh from OBJ file
-}
mesh : Decoder (Uniform WorldCoordinates)
mesh =
    Obj.Decode.map
        (\texturedFaces ->
            texturedFaces
                |> Scene3d.Mesh.indexedFaces
                |> Scene3d.Mesh.cullBackFaces
        )
        (Obj.Decode.facesIn Frame3d.atOrigin)
