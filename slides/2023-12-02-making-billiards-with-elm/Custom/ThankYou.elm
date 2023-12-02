module Custom.ThankYou exposing
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
import Animator exposing (Timeline)
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Browser.Events exposing (onAnimationFrame)
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Direction3d exposing (Direction3d)
import Duration
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes exposing (height, width)
import Html.Events exposing (onClick)
import Json.Decode
import Length exposing (Length, Meters)
import Mass
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as Material exposing (Texture)
import Sphere3d exposing (Sphere3d)
import Task exposing (Task)
import Time exposing (Posix)
import Vector3d
import Viewpoint3d
import WebGL.Texture exposing (Error, defaultOptions)


type WorldCoordinates
    = WorldCoordinates Never


type alias Options =
    { width : Int
    , height : Int
    }


type alias Textures =
    { threeTexture : Texture Color
    , nineTexture : Texture Color
    , roughnessTexture : Texture Float
    }


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , textures : Maybe Textures
    , timeline : Timeline Bool
    , firstTick : Bool
    }


type Msg
    = Tick Posix
    | TexturesLoaded (Result Error Textures)


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.pixels width, Pixels.pixels height )
    , textures = Nothing
    , firstTick = True
    , timeline =
        Animator.init False |> Animator.go (Duration.milliseconds 1500) True
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TexturesLoaded result ->
            ( { model | textures = Result.toMaybe result }
            , Cmd.none
            )

        Tick time ->
            ( { model
                | firstTick = False
                , timeline = Animator.updateTimeline time model.timeline
              }
            , -- A hack for the missing initial command support in elm-slice-show
              if model.firstTick then
                loadTextures |> Task.attempt TexturesLoaded

              else
                Cmd.none
            )


loadTextures : Task Error Textures
loadTextures =
    Task.map3 Textures
        (Material.loadWith { defaultOptions | minify = WebGL.Texture.linear } "3.png")
        (Material.loadWith { defaultOptions | minify = WebGL.Texture.linear } "9.png")
        (Material.load "roughness.jpg")


subscriptions : Model -> Sub Msg
subscriptions m =
    if not (Animator.arrived m.timeline) then
        onAnimationFrame Tick

    else
        Sub.none



-- Entities:


ballRadius : Length
ballRadius =
    Length.millimeters (57.15 / 2)


ballSphere : Sphere3d Meters WorldCoordinates
ballSphere =
    Sphere3d.atOrigin ballRadius


ballEntity : Texture Color -> Texture Float -> Entity WorldCoordinates
ballEntity colorTexture roughnessTexture =
    let
        material =
            Material.texturedPbr
                { baseColor = colorTexture
                , roughness = roughnessTexture
                , metallic = Material.constant 0
                }
    in
    Scene3d.sphereWithShadow
        material
        ballSphere



-- View:


rotationFromTimeline : Timeline Bool -> Angle
rotationFromTimeline timeline =
    Angle.degrees
        (Animator.move timeline
            (\val ->
                if val then
                    Animator.at 180
                        |> Animator.arriveSmoothly 0

                else
                    Animator.at -90
            )
        )


view : Model -> Html Msg
view { textures, dimensions, timeline } =
    let
        camera =
            Camera3d.orthographic
                { viewpoint =
                    Viewpoint3d.orbitZ
                        { focalPoint = Point3d.meters 0 0 0
                        , azimuth = Angle.degrees -90
                        , elevation = Angle.degrees 0
                        , distance = Length.meters 0.2
                        }
                , viewportHeight = Quantity.multiplyBy 4 ballRadius
                }
    in
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection = Direction3d.xyZ (Angle.degrees 115) (Angle.degrees -15)
        , shadows = True
        , camera = camera
        , dimensions = dimensions
        , background = Scene3d.transparentBackground
        , clipDepth = Length.meters 0.1
        , entities =
            [ case textures of
                Just { threeTexture, nineTexture, roughnessTexture } ->
                    Scene3d.group
                        [ ballEntity threeTexture roughnessTexture
                            |> Scene3d.rotateAround Axis3d.z (rotationFromTimeline timeline)
                            |> Scene3d.placeIn
                                (Frame3d.atPoint
                                    (Point3d.xyz
                                        (Quantity.negate (Quantity.multiplyBy 1.1 ballRadius))
                                        Quantity.zero
                                        Quantity.zero
                                    )
                                )
                        , ballEntity nineTexture roughnessTexture
                            |> Scene3d.rotateAround Axis3d.z (rotationFromTimeline timeline)
                            |> Scene3d.placeIn
                                (Frame3d.atPoint
                                    (Point3d.xyz
                                        (Quantity.multiplyBy 1.1 ballRadius)
                                        Quantity.zero
                                        Quantity.zero
                                    )
                                )
                        ]

                Nothing ->
                    Scene3d.nothing
            ]
        }
