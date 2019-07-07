module Custom.Typewriter exposing (Model, Msg, Options, initial, subscriptions, update, view)

import AnimationFrame
import Font.Feature as Feature
import Font.Mesh as Mesh exposing (Attributes3d, glyph3d)
import Font.Text as Text exposing (GlyphInfo)
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Iverni exposing (font)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Time exposing (Time)
import WebGL exposing (Mesh, Shader)


type Msg
    = Animate Time


type alias Model =
    { elapsed : Time
    , fontSize : Float
    , text : List (GlyphInfo (Mesh Attributes3d))
    , width : Float
    , height : Float
    , start : Int
    }


type alias Options =
    { text : String
    , fontSize : Float
    , width : Float
    , height : Float
    , start : Int
    }


initial : Options -> Model
initial options =
    let
        style =
            Text.style
                { font = Iverni.font
                , fontSize = options.fontSize
                , lineHeight = 1.1
                , width = options.width
                , features = [ Feature.Liga, Feature.Kern ]
                }

        text =
            Tuple.first (Text.text glyph3d style options.text)
    in
    { elapsed = 0
    , text = text
    , fontSize = options.fontSize
    , width = options.width
    , height = options.height
    , start = options.start
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    AnimationFrame.diffs Animate


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case action of
        Animate elapsed ->
            ( { model | elapsed = model.elapsed + elapsed }
            , Cmd.none
            )


view : Model -> Html msg
view { elapsed, width, height, text, start, fontSize } =
    let
        eyeX =
            width / 2

        eyeY =
            -height / 2

        camera =
            Mat4.makeLookAt
                -- Zoom out by moving camera away from the scene
                (Vec3.vec3 (eyeX - 1000) (eyeY + 20) (font.unitsPerEm * 1.87))
                (Vec3.vec3 (eyeX - 50) (eyeY + 20) 0)
                Vec3.j

        devicePixelRatio =
            2

        projection =
            Mat4.makePerspective 24 (width / height) 5 3500

        glyphToEntity index { x, y, size, glyph } =
            WebGL.entity
                vertex3d
                fragment3d
                glyph
                { camera = camera
                , index = index
                , start = start
                , elapsed = elapsed
                , color = vec3 1 0 0
                , projection = projection
                , transform =
                    Mat4.makeTranslate3 x y 0
                        |> Mat4.mul (Mat4.makeScale3 size size (size * 100))
                }
    in
    WebGL.toHtml
        [ HtmlAttributes.width (round (width * devicePixelRatio))
        , HtmlAttributes.height (round (height * devicePixelRatio))
        , HtmlAttributes.style
            [ ( "display", "block" )
            , ( "width", toString width ++ "px" )
            , ( "height", toString height ++ "px" )
            ]
        ]
        (List.indexedMap glyphToEntity text)


type alias Uniforms3d =
    { camera : Mat4
    , projection : Mat4
    , transform : Mat4
    , color : Vec3
    , elapsed : Float
    , index : Int
    , start : Int
    }


vertex3d : Shader Attributes3d Uniforms3d { vcolor : Vec3 }
vertex3d =
    [glsl|
        precision highp float;
        attribute vec3 position;
        attribute vec3 normal;
        uniform float elapsed;
        uniform int index;
        uniform int start;
        uniform vec3 color;
        uniform mat4 camera;
        uniform mat4 projection;
        uniform mat4 transform;
        varying vec3 vcolor;

        float ambientLight = 0.6;
        float directionalLight = 0.4;
        vec3 directionalVector = normalize(vec3(0.3, 0.1, 1.0));
        void main () {
            vec4 newPosition = transform * vec4(position, 1.0);
            float n = 5.0;
            float k = (elapsed / 1000.0 * n - float(index - start)) / n;
            float clampedK = max(min(k, 1.0), -1.0);
            float distance = 2000.0 * (0.5 - 0.5 * sin(3.145926 / 2.0 * clampedK));
            if (index > start) {
                newPosition.z += distance;
            }
            gl_Position = projection * camera * newPosition;
            vec4 transformedNormal = normalize(transform * vec4(normal, 0.0));
            float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
            float vlighting = ambientLight + directional * directionalLight;
            if (index > start) {
                vcolor = vlighting * vec3(0.5, 0.5, 0.5);
            } else {
                vcolor = vlighting * color;
            }
        }
    |]


fragment3d : Shader {} Uniforms3d { vcolor : Vec3 }
fragment3d =
    [glsl|
        precision mediump float;
        varying vec3 vcolor;
        void main () {
            gl_FragColor = vec4(vcolor, 1.0);
        }
    |]
