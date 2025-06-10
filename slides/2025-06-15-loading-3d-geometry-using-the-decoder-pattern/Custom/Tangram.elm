module Custom.Tangram exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

import Angle
import Animator exposing (Timeline)
import Axis3d
import Browser
import Browser.Events exposing (onAnimationFrame)
import Camera3d
import Color exposing (Color)
import Direction3d
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes exposing (width)
import Html.Events
import Http
import Illuminance
import Length exposing (Meters)
import Luminance
import Obj.Decode exposing (Decoder)
import Pixels exposing (Pixels)
import Point3d
import Quantity exposing (Quantity)
import Scene3d
import Scene3d.Light as Light
import Scene3d.Material as Material
import Scene3d.Mesh exposing (Shadow, Uniform)
import SketchPlane3d
import Time exposing (Posix)
import Vector3d
import Viewpoint3d


type AnimationState
    = Tangram
    | ElmTown
    | Heart


type Msg
    = LoadedMeshes (Result Http.Error Meshes)
    | Selected AnimationState
    | Tick Posix


type alias Model =
    { meshes : Maybe Meshes
    , timeline : Timeline AnimationState
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , firstTick : Bool
    }


type alias Options =
    { width : Int
    , height : Int
    }


initial : Options -> Model
initial { width, height } =
    { meshes = Nothing
    , timeline = Animator.init Tangram
    , dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , firstTick = True
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    onAnimationFrame Tick


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LoadedMeshes result ->
            ( { model | meshes = Result.toMaybe result }, Cmd.none )

        Tick time ->
            ( { model
                | timeline = Animator.updateTimeline time model.timeline
                , firstTick = False
              }
            , if model.firstTick then
                Http.get
                    { url = "elmtown.obj.txt" -- .txt is required to work with `elm reactor`
                    , expect = Obj.Decode.expectObj LoadedMeshes Length.meters tangramMeshes
                    }

              else
                Cmd.none
            )

        Selected state ->
            ( { model | timeline = Animator.go (Animator.seconds 1) state model.timeline }, Cmd.none )


view : Model -> Html Msg
view { meshes, timeline, dimensions } =
    let
        radioButton text state =
            Html.label
                [ Html.Attributes.style "margin" "15px"
                , Html.Attributes.style "cursor" "pointer"
                , Html.Attributes.style "font" "24px system-ui"
                ]
                [ Html.input
                    [ Html.Attributes.checked (Animator.current timeline == state)
                    , Html.Attributes.type_ "radio"
                    , Html.Events.onClick (Selected state)
                    , Html.Attributes.style "vertical-align" "middle"
                    , Html.Attributes.style "margin" "-4px 4px 0 0"
                    , Html.Attributes.style "width" "24px"
                    , Html.Attributes.style "height" "24px"
                    ]
                    []
                , Html.text text
                ]
    in
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "width" "100%"
        , Html.Attributes.style "height" "100%"
        , Html.Attributes.style "display" "flex"
        , Html.Attributes.style "flex-direction" "column"
        , Html.Attributes.style "justify-content" "center"
        , Html.Attributes.style "align-items" "center"
        , Html.Attributes.style "white-space" "nowrap"
        ]
        [ scene3d dimensions timeline meshes
        , Html.section
            [ Html.Attributes.style "display" "flex" ]
            [ radioButton "Tangram" Tangram
            , radioButton "ElmTown" ElmTown
            , radioButton "Heart" Heart
            ]
        ]


scene3d : ( Quantity Int Pixels, Quantity Int Pixels ) -> Timeline AnimationState -> Maybe Meshes -> Html msg
scene3d dimensions timeline maybeMeshes =
    let
        camera =
            Camera3d.orthographic
                { viewpoint =
                    Viewpoint3d.orbit
                        { focalPoint = Point3d.origin
                        , groundPlane = SketchPlane3d.xy
                        , azimuth = Angle.degrees -45
                        , elevation = Angle.degrees 35
                        , distance = Length.meters 5
                        }
                , viewportHeight = Length.meters 5
                }

        sunlight =
            Light.directional (Light.castsShadows True)
                { direction = Direction3d.negativeX
                , intensity = Illuminance.lux 30000
                , chromaticity = Light.daylight
                }

        ambient =
            Light.soft
                { upDirection = Direction3d.z
                , chromaticity = Light.daylight
                , intensityAbove = Illuminance.lux 30000
                , intensityBelow = Illuminance.lux 40000
                }
    in
    Scene3d.custom
        { lights = Scene3d.twoLights sunlight ambient
        , camera = camera
        , clipDepth = Length.meters 0.1

        -- Setting the max luminance in nits to maximum illuminance in lux
        -- divided by pi to preserve the original colors.
        , exposure = Scene3d.maxLuminance (Luminance.nits (70000 / pi))
        , toneMapping = Scene3d.noToneMapping
        , whiteBalance = Light.daylight
        , antialiasing = Scene3d.multisampling
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , entities =
            maybeMeshes
                |> Maybe.map (entities timeline)
                |> Maybe.withDefault []
        }


{-| Renders animated Tangram pieces.
-}
entities : Timeline AnimationState -> Meshes -> List (Scene3d.Entity SceneCoordinates)
entities timeline meshes =
    let
        tangramPiece getMesh getColor getFrame =
            let
                ( mesh, shadow ) =
                    getMesh meshes

                material =
                    Material.nonmetal
                        { baseColor = color getColor timeline
                        , roughness = 0.4
                        }

                frame3d =
                    frame getFrame timeline
            in
            Scene3d.meshWithShadow material mesh shadow
                |> Scene3d.placeIn frame3d
    in
    [ tangramPiece .bigTriangleLeft .bigTriangleLeft .bigTriangleLeft
    , tangramPiece .parallelogram .parallelogram .parallelogram
    , tangramPiece .mediumTriangle .mediumTriangle .mediumTriangle
    , tangramPiece .smallTriangleCenter .smallTriangleCenter .smallTriangleCenter
    , tangramPiece .square .square .square
    , tangramPiece .smallTriangleRight .smallTriangleRight .smallTriangleRight
    , tangramPiece .bigTriangleBottom .bigTriangleBottom .bigTriangleBottom

    -- Floor
    , Scene3d.meshWithShadow
        (Material.nonmetal
            { baseColor = Color.rgb255 85 82 116
            , roughness = 0.4
            }
        )
        (Tuple.first meshes.platform)
        (Tuple.second meshes.platform)
        |> Scene3d.placeIn Frame3d.atOrigin
    ]



-- FRAMES


{-| Defines the position and orientation using Euler angles.
-}
type alias EulerXYZ =
    { x : Float, y : Float, z : Float, xA : Float, yA : Float, zA : Float }


{-| Defines the position and orientation of each Tangram piece.
-}
type alias Frames =
    { bigTriangleLeft : EulerXYZ
    , parallelogram : EulerXYZ
    , mediumTriangle : EulerXYZ
    , smallTriangleCenter : EulerXYZ
    , square : EulerXYZ
    , smallTriangleRight : EulerXYZ
    , bigTriangleBottom : EulerXYZ
    }


{-| Positions and orientations of the Tangram pieces in the Elm Town logo.
The values have been copied from Blender.
-}
elmTownFrames : Frames
elmTownFrames =
    { bigTriangleLeft = EulerXYZ 0.75 1.05 -1.5 -45 0 0
    , parallelogram = EulerXYZ -0.25 -1.55 0.25 -45 0 0
    , mediumTriangle = EulerXYZ 0.35 -3.2 0.57 -45 0 0
    , smallTriangleCenter = EulerXYZ 0.45 -0.15 0.95 -90 0 0
    , square = EulerXYZ 0.35 1.35 0.6 45 0 90
    , smallTriangleRight = EulerXYZ 1.3 -0.4 -0.8 45 0 0
    , bigTriangleBottom = EulerXYZ -0.05 0.5 -1 -45 180 0
    }


{-| Positions and orientations of the Tangram pieces in the heart shape.
The values have been copied from Blender.
-}
heartFrames : Frames
heartFrames =
    { bigTriangleLeft = EulerXYZ 0 0.75 -0.75 -90 0 0
    , parallelogram = EulerXYZ 0 1.5 0 0 0 0
    , mediumTriangle = EulerXYZ 0 -2.25 -0.75 0 0 0
    , smallTriangleCenter = EulerXYZ 0 0.75 2.25 -180 0 0
    , square = EulerXYZ 0 0 0 -90 0 0
    , smallTriangleRight = EulerXYZ 0 0.75 -0.75 180 0 0
    , bigTriangleBottom = EulerXYZ 0 -0.75 2.25 0 0 0
    }


{-| The coordinate system used by the 3D scene.
-}
type SceneCoordinates
    = SceneCoordinates Never


{-| The coordinate stystem used by the OBJ file.
-}
type ObjFileCoordinates
    = ObjFileCoordinates Never


{-| Returns the frame for the current animation state on the timeline.
-}
frame : (Frames -> EulerXYZ) -> Timeline AnimationState -> Frame3d Meters SceneCoordinates { defines : ObjFileCoordinates }
frame getFrame timeline =
    let
        component getComponent =
            Animator.move timeline
                (\state ->
                    case state of
                        Tangram ->
                            -- The pieces in the Tangram state are positioned at the origin
                            -- and don't need to be moved or rotated.
                            Animator.at 0

                        ElmTown ->
                            Animator.at (getComponent (getFrame elmTownFrames))

                        Heart ->
                            Animator.at (getComponent (getFrame heartFrames))
                )

        rotation =
            Animator.move timeline
                (\state ->
                    case state of
                        Tangram ->
                            Animator.at 0

                        ElmTown ->
                            Animator.at 0

                        Heart ->
                            Animator.loop
                                (Animator.seconds 5)
                                (Animator.wrap 0 360)
                )
    in
    Frame3d.atOrigin
        |> Frame3d.rotateAround Axis3d.x (Angle.degrees (component .xA))
        |> Frame3d.rotateAround Axis3d.y (Angle.degrees (component .yA))
        |> Frame3d.rotateAround Axis3d.z (Angle.degrees (component .zA))
        |> Frame3d.translateBy (Vector3d.meters (component .x) (component .y) (component .z))
        |> Frame3d.rotateAround Axis3d.z (Angle.degrees rotation)



-- COLORS


type alias Colors =
    { bigTriangleLeft : Color
    , parallelogram : Color
    , mediumTriangle : Color
    , smallTriangleCenter : Color
    , square : Color
    , smallTriangleRight : Color
    , bigTriangleBottom : Color
    }


tangramColors : Colors
tangramColors =
    { bigTriangleLeft = Color.rgb255 88 122 170
    , parallelogram = Color.rgb255 140 225 122
    , mediumTriangle = Color.rgb255 99 181 220
    , smallTriangleCenter = Color.rgb255 240 206 90
    , square = Color.rgb255 140 225 122
    , smallTriangleRight = Color.rgb255 240 206 90
    , bigTriangleBottom = Color.rgb255 99 181 220
    }


heartColors : Colors
heartColors =
    { bigTriangleLeft = Color.rgb255 253 67 64
    , parallelogram = Color.rgb255 242 44 40
    , mediumTriangle = Color.rgb255 253 67 64
    , smallTriangleCenter = Color.rgb255 253 67 64
    , square = Color.rgb255 253 67 64
    , smallTriangleRight = Color.rgb255 242 44 40
    , bigTriangleBottom = Color.rgb255 253 67 64
    }


color : (Colors -> Color) -> Timeline AnimationState -> Color
color getColor timeline =
    Animator.color timeline
        (\state ->
            case state of
                Tangram ->
                    getColor tangramColors

                ElmTown ->
                    getColor tangramColors

                Heart ->
                    getColor heartColors
        )



-- MESHES


type alias Meshes =
    { bigTriangleLeft : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , parallelogram : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , mediumTriangle : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , smallTriangleCenter : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , square : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , smallTriangleRight : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , bigTriangleBottom : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    , platform : ( Uniform ObjFileCoordinates, Shadow ObjFileCoordinates )
    }


{-| Decodes tangram meshes with shadows from an OBJ file.
-}
tangramMeshes : Decoder Meshes
tangramMeshes =
    let
        object name =
            Obj.Decode.facesIn Frame3d.atOrigin
                |> Obj.Decode.map
                    (\texturedFaces ->
                        let
                            mesh =
                                Scene3d.Mesh.indexedFaces texturedFaces
                        in
                        ( mesh, Scene3d.Mesh.shadow mesh )
                    )
                |> Obj.Decode.object name
                |> Obj.Decode.map2 (|>)
    in
    Obj.Decode.succeed Meshes
        |> object "big-triangle-left"
        |> object "parallelogram"
        |> object "medium-triangle"
        |> object "small-triangle-center"
        |> object "square"
        |> object "small-triangle-right"
        |> object "big-triangle-bottom"
        |> object "platform"
