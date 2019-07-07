module Custom.Pixelfont exposing (Model, Msg, Options, initial, subscriptions, update, view)

import AnimationFrame
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import MogeeFont
import Task
import Time exposing (Time)
import WebGL exposing (Entity, Mesh, Shader)
import WebGL.Texture as Texture exposing (Error, Texture, defaultOptions)


type Msg
    = Animate Time
    | LoadTexture (Result Error Texture)


type alias Model =
    { elapsed : Time
    , pixelSize : Int
    , color : Vec3
    , maybeTexture : Maybe Texture
    , mesh : Mesh Vertex
    , width : Float
    , height : Float
    }


type alias Options =
    { text : String
    , pixelSize : Int
    , color : Vec3
    , width : Float
    , height : Float
    }


initial : Options -> Model
initial options =
    { elapsed = 0
    , pixelSize = options.pixelSize
    , mesh =
        options.text
            |> MogeeFont.text addLetter
            |> WebGL.triangles
    , maybeTexture = Nothing
    , width = options.width
    , height = options.height
    , color = options.color
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    AnimationFrame.diffs Animate


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case action of
        Animate elapsed ->
            ( { model | elapsed = model.elapsed + elapsed }
            , if model.elapsed == 0 then
                loadTexture LoadTexture

              else
                Cmd.none
            )

        LoadTexture textureResult ->
            ( { model | maybeTexture = Result.toMaybe textureResult }
            , Cmd.none
            )


view : Model -> Html Msg
view { width, height, maybeTexture, mesh, color, pixelSize } =
    WebGL.toHtml
        [ HtmlAttributes.width (round width)
        , HtmlAttributes.height (round height)
        , HtmlAttributes.style
            [ ( "display", "block" )
            , ( "image-rendering", "optimizeSpeed" )
            , ( "image-rendering", "-moz-crisp-edges" )
            , ( "image-rendering", "-webkit-optimize-contrast" )
            , ( "image-rendering", "crisp-edges" )
            , ( "image-rendering", "pixelated" )
            , ( "-ms-interpolation-mode", "nearest-neighbor" )
            ]
        ]
        (case maybeTexture of
            Just texture ->
                [ WebGL.entity
                    texturedVertexShader
                    texturedFragmentShader
                    mesh
                    { projection = Mat4.makeOrtho2D 0 width -height 0
                    , pixelSize = pixelSize
                    , texture = texture
                    , color = color
                    , textureSize =
                        vec2
                            (toFloat (Tuple.first (Texture.size texture)))
                            (toFloat (Tuple.second (Texture.size texture)))
                    }
                ]

            Nothing ->
                []
        )


addLetter : MogeeFont.Letter -> List ( Vertex, Vertex, Vertex )
addLetter { x, y, width, height, textureX, textureY } =
    [ ( Vertex (vec2 x -y) (vec2 textureX textureY)
      , Vertex (vec2 (x + width) (-y - height)) (vec2 (textureX + width) (textureY + height))
      , Vertex (vec2 (x + width) -y) (vec2 (textureX + width) textureY)
      )
    , ( Vertex (vec2 x -y) (vec2 textureX textureY)
      , Vertex (vec2 x (-y - height)) (vec2 textureX (textureY + height))
      , Vertex (vec2 (x + width) (-y - height)) (vec2 (textureX + width) (textureY + height))
      )
    ]



-- Shaders


type alias Vertex =
    { position : Vec2
    , texPosition : Vec2
    }


type alias Uniform =
    { projection : Mat4
    , color : Vec3
    , pixelSize : Int
    , texture : Texture
    , textureSize : Vec2
    }


type alias Varying =
    { texturePos : Vec2
    , pixelPos : Vec2
    }


texturedVertexShader : Shader Vertex Uniform Varying
texturedVertexShader =
    [glsl|
        precision mediump float;
        attribute vec2 position;
        attribute vec2 texPosition;
        uniform mat4 projection;
        uniform int pixelSize;
        varying vec2 texturePos;
        varying vec2 pixelPos;
        void main () {
            gl_Position = projection * vec4(position * float(pixelSize), 0.0, 1.0);
            texturePos = texPosition;
            pixelPos = position;
        }
    |]


texturedFragmentShader : Shader {} Uniform Varying
texturedFragmentShader =
    [glsl|
        precision mediump float;
        uniform sampler2D texture;
        uniform vec3 color;
        uniform vec2 textureSize;
        varying vec2 texturePos;
        varying vec2 pixelPos;
        void main () {
            vec4 textureColor = texture2D(texture, texturePos / textureSize);
            gl_FragColor = vec4(color, 1.0);

            // Don't draw grid gaps:
            float gapSize = 0.07;
            float xDist = pixelPos.x - float(int(pixelPos.x));
            float yDist = pixelPos.y - float(int(pixelPos.y));
            if (abs(xDist) < gapSize || abs(yDist) < gapSize ) discard;

            // Don't draw transparent pixels:
            if (dot(textureColor, textureColor) == 4.0) discard;
        }
    |]


loadTexture : (Result Error Texture -> msg) -> Cmd msg
loadTexture msg =
    Texture.loadWith
        { defaultOptions
            | magnify = Texture.nearest
            , minify = Texture.nearest
            , flipY = False
        }
        MogeeFont.spriteSrc
        |> Task.attempt msg
