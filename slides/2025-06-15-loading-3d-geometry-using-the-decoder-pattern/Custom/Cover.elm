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
import Angle exposing (Angle)
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Browser.Events exposing (onAnimationFrameDelta)
import Camera3d exposing (Camera3d)
import Color
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
import Physics.Body as Body exposing (Body)
import Physics.Coordinates exposing (BodyCoordinates, WorldCoordinates)
import Physics.Material as Material exposing (Material)
import Physics.World as World exposing (World)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material exposing (Plain)
import Scene3d.Mesh
import Task
import TriangularMesh exposing (TriangularMesh)
import Vector3d
import Viewpoint3d


type alias Options =
    { width : Int
    , height : Int
    }


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , duck : Maybe (Scene3d.Mesh.Plain ObjCoordinates)
    , firstTick : Bool
    , rotation : Angle
    }


type Msg
    = Tick Float
    | DuckLoaded (Result Http.Error (Scene3d.Mesh.Plain ObjCoordinates))


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , duck = Nothing
    , firstTick = True
    , rotation = Angle.degrees 0
    }


lowpoly : Decoder (Scene3d.Mesh.Uniform ObjCoordinates)
lowpoly =
    Obj.Decode.map
        (\triangles ->
            triangles |> Scene3d.Mesh.indexedFaces
        )
        Obj.Decode.faces


wireframe : Decoder (Scene3d.Mesh.Plain ObjCoordinates)
wireframe =
    Obj.Decode.map
        (\triangles ->
            triangles
                |> TriangularMesh.edgeVertices
                |> List.map LineSegment3d.fromEndpoints
                |> Scene3d.Mesh.lineSegments
        )
        Obj.Decode.triangles


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        DuckLoaded result ->
            ( { model | duck = Result.toMaybe result }, Cmd.none )

        Tick dt ->
            ( { model
                | firstTick = False
                , rotation = Quantity.plus model.rotation (Angle.degrees (dt / 1000 * 45)) -- Rotate 45 degrees per second
              }
            , -- A hack for the missing initial command support in elm-slice-show
              if model.firstTick then
                Http.get
                    { url = "duck.obj.txt" -- .txt is required to work with `elm reactor`
                    , expect = Obj.Decode.expectObj DuckLoaded Length.meters (Obj.Decode.object "Duck" wireframe)
                    }

              else
                Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions model =
    onAnimationFrameDelta Tick



-- View:


view : Model -> Html Msg
view { duck, dimensions, rotation } =
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.xyZ (Angle.degrees -125) (Angle.degrees -70)
        , shadows = True
        , camera = camera
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities =
            [ case duck of
                Just body ->
                    Scene3d.mesh (Scene3d.Material.color Color.black) body
                        |> Scene3d.placeIn Frame3d.atOrigin
                        |> Scene3d.rotateAround Axis3d.z rotation

                Nothing ->
                    Scene3d.nothing
            ]
        }


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.orthographic
        { viewpoint =
            Viewpoint3d.orbitZ
                { focalPoint = Point3d.meters 4.0 -2.0 0
                , azimuth = Angle.degrees 135
                , elevation = Angle.degrees 20
                , distance = Length.meters 15
                }
        , viewportHeight = Length.meters 4.5
        }
