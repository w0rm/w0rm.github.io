module Custom.Pixelglyph exposing (Model, Msg, Options, initial, subscriptions, update, view)

import AnimationFrame
import Char
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Keyboard exposing (KeyCode)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import MogeeFont
import Svg exposing (Svg)
import Svg.Attributes as SvgAttributes
import Task
import Time exposing (Time)
import WebGL exposing (Entity, Mesh, Shader)
import WebGL.Texture as Texture exposing (Error, Texture, defaultOptions)


type Msg
    = Animate Time
    | LoadTexture (Result Error Texture)
    | KeyPress KeyCode


type alias Model =
    { elapsed : Time
    , pixelSize : Int
    , maybeTexture : Maybe Texture
    , glyph : Char
    , mesh : Mesh Vertex
    , width : Float
    , height : Float
    }


type alias Options =
    { pixelSize : Int
    , width : Float
    , height : Float
    }


initial : Options -> Model
initial options =
    { elapsed = 0
    , pixelSize = options.pixelSize
    , glyph = 'A'
    , mesh =
        'A'
            |> String.fromChar
            |> MogeeFont.text addLetter
            |> WebGL.triangles
    , maybeTexture = Nothing
    , width = options.width
    , height = options.height
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ AnimationFrame.diffs Animate
        , Keyboard.presses KeyPress
        ]


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

        KeyPress keyCode ->
            let
                mesh =
                    keyCode
                        |> Char.fromCode
                        |> String.fromChar
                        |> MogeeFont.text addLetter
                        |> WebGL.triangles
            in
            ( { model | glyph = Char.fromCode keyCode, mesh = mesh }
            , Cmd.none
            )

        LoadTexture textureResult ->
            ( { model | maybeTexture = Result.toMaybe textureResult }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    let
        ( offsetX, offsetY ) =
            ( model.width / 3
            , -(model.height - toFloat model.pixelSize * 11) / 2
            )
    in
    Html.div []
        (case model.maybeTexture of
            Just texture ->
                [ renderBack offsetX offsetY (Texture.size texture) model
                , renderGlyph offsetX offsetY texture model
                , renderFront offsetX offsetY (Texture.size texture) model
                ]

            Nothing ->
                []
        )


renderBack : Float -> Float -> ( Int, Int ) -> Model -> Svg Msg
renderBack offsetX offsetY textureSize { width, height, glyph, pixelSize } =
    let
        data =
            MogeeFont.text (\l -> [ l ]) (String.fromChar glyph)
                |> List.head
                |> Maybe.withDefault { textureX = 0, textureY = 0, width = 0, height = 0, x = 0, y = 0 }

        textureK =
            3

        ( textureWidth, textureHeight ) =
            ( toFloat (Tuple.first textureSize) * textureK
            , toFloat (Tuple.second textureSize) * textureK
            )

        ( textureLeft, textureTop ) =
            ( width * 3 / 4 - textureWidth / 2, height / 2 - textureHeight / 2 )

        ( glyphWidth, glyphHeight ) =
            ( data.width * toFloat pixelSize + 5
            , data.height * toFloat pixelSize + 5
            )
    in
    Svg.svg
        [ HtmlAttributes.style
            [ ( "display", "block" )
            , ( "position", "absolute" )
            , ( "left", "0" )
            , ( "top", "0" )
            ]
        , SvgAttributes.width (toString width)
        , SvgAttributes.height (toString height)
        ]
        [ Svg.image
            [ HtmlAttributes.style crispyEdges
            , SvgAttributes.xlinkHref MogeeFont.spriteSrc
            , SvgAttributes.width (toString textureWidth)
            , SvgAttributes.height (toString textureHeight)
            , SvgAttributes.x (toString textureLeft)
            , SvgAttributes.y (toString textureTop)
            ]
            []
        , Svg.circle
            [ SvgAttributes.r "5"
            , SvgAttributes.fill "red"
            , SvgAttributes.cx (toString offsetX)
            , SvgAttributes.cy (toString -offsetY)
            ]
            []
        , Svg.line
            [ SvgAttributes.x1 (toString offsetX)
            , SvgAttributes.y1 (toString -offsetY)
            , SvgAttributes.x2 (toString (data.textureX * textureK + textureLeft))
            , SvgAttributes.y2 (toString (data.textureY * textureK + textureTop))
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeDasharray "10,5"
            , SvgAttributes.strokeWidth "1"
            ]
            []
        , Svg.line
            [ SvgAttributes.x1 (toString offsetX)
            , SvgAttributes.y1 (toString (-offsetY + glyphHeight))
            , SvgAttributes.x2 (toString (data.textureX * textureK + textureLeft))
            , SvgAttributes.y2 (toString ((data.textureY + data.height) * textureK + textureTop))
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeDasharray "10,5"
            , SvgAttributes.strokeWidth "1"
            ]
            []
        ]


renderFront : Float -> Float -> ( Int, Int ) -> Model -> Svg Msg
renderFront offsetX offsetY textureSize { width, height, glyph, pixelSize } =
    let
        data =
            MogeeFont.text (\l -> [ l ]) (String.fromChar glyph)
                |> List.head
                |> Maybe.withDefault { textureX = 0, textureY = 0, width = 0, height = 0, x = 0, y = 0 }

        textureK =
            3

        ( textureWidth, textureHeight ) =
            ( toFloat (Tuple.first textureSize) * textureK
            , toFloat (Tuple.second textureSize) * textureK
            )

        ( textureLeft, textureTop ) =
            ( width * 3 / 4 - textureWidth / 2, height / 2 - textureHeight / 2 )

        ( glyphWidth, glyphHeight ) =
            ( data.width * toFloat pixelSize + 5
            , data.height * toFloat pixelSize + 5
            )
    in
    Svg.svg
        [ HtmlAttributes.style
            [ ( "display", "block" )
            , ( "position", "absolute" )
            , ( "left", "0" )
            , ( "top", "0" )
            ]
        , SvgAttributes.width (toString width)
        , SvgAttributes.height (toString height)
        ]
        [ Svg.rect
            [ SvgAttributes.width (toString glyphWidth)
            , SvgAttributes.height (toString glyphHeight)
            , SvgAttributes.x (toString offsetX)
            , SvgAttributes.y (toString -offsetY)
            , SvgAttributes.fill "transparent"
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeWidth "2"
            ]
            []
        , Svg.line
            [ SvgAttributes.x1 (toString offsetX)
            , SvgAttributes.y1 (toString -offsetY)
            , SvgAttributes.x2 (toString (offsetX + glyphWidth))
            , SvgAttributes.y2 (toString (-offsetY + glyphHeight))
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeWidth "2"
            ]
            []
        , Svg.line
            [ SvgAttributes.x1 (toString (offsetX + glyphWidth))
            , SvgAttributes.y1 (toString -offsetY)
            , SvgAttributes.x2 (toString ((data.textureX + data.width) * textureK + textureLeft))
            , SvgAttributes.y2 (toString (data.textureY * textureK + textureTop))
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeDasharray "10,5"
            , SvgAttributes.strokeWidth "1"
            ]
            []
        , Svg.line
            [ SvgAttributes.x1 (toString (offsetX + glyphWidth))
            , SvgAttributes.y1 (toString (-offsetY + glyphHeight))
            , SvgAttributes.x2 (toString ((data.textureX + data.width) * textureK + textureLeft))
            , SvgAttributes.y2 (toString ((data.textureY + data.height) * textureK + textureTop))
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeDasharray "10,5"
            , SvgAttributes.strokeWidth "1"
            ]
            []
        , Svg.rect
            [ SvgAttributes.width (toString (data.width * textureK))
            , SvgAttributes.height (toString (data.height * textureK))
            , SvgAttributes.x (toString (data.textureX * textureK + textureLeft))
            , SvgAttributes.y (toString (data.textureY * textureK + textureTop))
            , SvgAttributes.fill "transparent"
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeWidth "2"
            ]
            []
        , label ( offsetX - 300, -offsetY )
            [ "letter"
            , " { x = x"
            , " , y = y"
            , " , textureX = " ++ toString data.textureX
            , " , textureY = " ++ toString data.textureY
            , " , width = " ++ toString data.width
            , " , height = " ++ toString data.height
            , " }"
            ]
        ]


renderGlyph : Float -> Float -> Texture -> Model -> Html Msg
renderGlyph offsetX offsetY texture { width, height, mesh, pixelSize } =
    WebGL.toHtml
        [ HtmlAttributes.width (round width)
        , HtmlAttributes.height (round height)
        , HtmlAttributes.style crispyEdges
        ]
        [ WebGL.entity
            texturedVertexShader
            texturedFragmentShader
            mesh
            { projection = Mat4.makeOrtho2D 0 width -height 0
            , transform = Mat4.makeTranslate3 offsetX offsetY 0
            , pixelSize = pixelSize
            , texture = texture
            , color = vec3 1 1 1
            , textureSize =
                vec2
                    (toFloat (Tuple.first (Texture.size texture)))
                    (toFloat (Tuple.second (Texture.size texture)))
            }
        ]


addLetter : MogeeFont.Letter -> List ( Vertex, Vertex, Vertex )
addLetter { width, height, textureX, textureY } =
    let
        ( x, y ) =
            ( 0, 0 )
    in
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
    , transform : Mat4
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
        uniform mat4 transform;
        uniform int pixelSize;
        varying vec2 texturePos;
        varying vec2 pixelPos;
        void main () {
            gl_Position = projection * transform * vec4(position * float(pixelSize), 0.0, 1.0);
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


label : ( number, number ) -> List String -> Svg msg
label ( x, y ) str =
    Svg.text_
        [ SvgAttributes.x (toString x)
        , SvgAttributes.y (toString y)
        , SvgAttributes.fill "white"
        , HtmlAttributes.style [ ( "font", "24px/1.3 FiraMono, monospace" ) ]
        ]
        (List.map
            (\text ->
                Svg.tspan
                    [ SvgAttributes.dy "1.3em"
                    , SvgAttributes.x (toString x)
                    ]
                    [ Svg.text text ]
            )
            str
        )


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


crispyEdges : List ( String, String )
crispyEdges =
    [ ( "display", "block" )
    , ( "position", "relative" )
    , ( "image-rendering", "optimizeSpeed" )
    , ( "image-rendering", "-moz-crisp-edges" )
    , ( "image-rendering", "-webkit-optimize-contrast" )
    , ( "image-rendering", "crisp-edges" )
    , ( "image-rendering", "pixelated" )
    , ( "-ms-interpolation-mode", "nearest-neighbor" )
    ]
