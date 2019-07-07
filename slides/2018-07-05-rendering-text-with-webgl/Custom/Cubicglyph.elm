module Custom.Cubicglyph exposing (Model, Msg, Options, initial, subscriptions, update, view)

import AnimationFrame
import Char
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Keyboard exposing (KeyCode)
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
    | KeyPress KeyCode
    | KeyDown KeyCode


type alias Model =
    { elapsed : Time
    , pixelSize : Int
    , maybeTexture : Maybe Texture
    , text : String
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
    , text = "Cubik"
    , mesh =
        "Cubik"
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
        , Keyboard.downs KeyDown
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

        KeyDown keyCode ->
            let
                text =
                    case keyCode of
                        8 ->
                            String.dropRight 1 model.text

                        _ ->
                            model.text

                mesh =
                    text
                        |> MogeeFont.text addLetter
                        |> WebGL.triangles
            in
            ( { model | text = text, mesh = mesh }
            , Cmd.none
            )

        KeyPress keyCode ->
            let
                text =
                    String.right 5 (model.text ++ String.fromChar (Char.fromCode keyCode))

                mesh =
                    text
                        |> MogeeFont.text addLetter
                        |> WebGL.triangles
            in
            ( { model | text = text, mesh = mesh }
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
                [ renderGlyph offsetX offsetY texture model
                ]

            Nothing ->
                []
        )


renderGlyph : Float -> Float -> Texture -> Model -> Html Msg
renderGlyph offsetX offsetY texture { elapsed, width, height, text, mesh, pixelSize } =
    let
        camera =
            Mat4.makeLookAt
                (Vec3.vec3 -30 -6 (toFloat -pixelSize / 1.5))
                (Vec3.vec3 -10 -6 0)
                Vec3.j

        devicePixelRatio =
            2

        projection =
            Mat4.makePerspective 24 (width / height) 5 1000

        angle =
            -pi / 8
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
        [ WebGL.entity
            texturedVertexShader
            texturedFragmentShader
            mesh
            { projection = projection
            , transform = Mat4.identity
            , camera = camera
            , depth = 15 * (1 - cos (elapsed / 1000))
            , texture = texture
            , textureSize =
                vec2
                    (toFloat (Tuple.first (Texture.size texture)))
                    (toFloat (Tuple.second (Texture.size texture)))
            }
        ]


addLetter : MogeeFont.Letter -> List ( Vertex, Vertex, Vertex )
addLetter { x, y, width, height, textureX, textureY } =
    List.foldl
        (\dx l ->
            List.foldl
                (\dy -> addPixel (x + toFloat dx) (y + toFloat dy) (textureX + toFloat dx) (textureY + toFloat dy))
                l
                (List.range 0 (round height - 1))
        )
        []
        (List.range 0 (round width))


addPixel : Float -> Float -> Float -> Float -> List ( Vertex, Vertex, Vertex ) -> List ( Vertex, Vertex, Vertex )
addPixel x y textureX textureY =
    let
        offset =
            vec3 -x -y 0

        texturePosition =
            vec2 textureX textureY

        s =
            0.48

        rft =
            Vec3.add (vec3 s s s) offset

        lft =
            Vec3.add (vec3 -s s s) offset

        lbt =
            Vec3.add (vec3 -s -s s) offset

        rbt =
            Vec3.add (vec3 s -s s) offset

        rbb =
            Vec3.add (vec3 s -s -s) offset

        rfb =
            Vec3.add (vec3 s s -s) offset

        lfb =
            Vec3.add (vec3 -s s -s) offset

        lbb =
            Vec3.add (vec3 -s -s -s) offset

        white =
            vec3 1 1 1

        grey =
            vec3 0.2 0.2 0.2
    in
    face lfb rfb rft lft texturePosition grey
        >> face rft rfb rbb rbt texturePosition grey
        >> face lbt lft rft rbt texturePosition white
        >> face rfb lfb lbb rbb texturePosition white
        >> face lbb lfb lft lbt texturePosition grey
        >> face rbb lbb lbt rbt texturePosition grey


face : Vec3 -> Vec3 -> Vec3 -> Vec3 -> Vec2 -> Vec3 -> List ( Vertex, Vertex, Vertex ) -> List ( Vertex, Vertex, Vertex )
face a b c d texturePosition color =
    (::)
        ( Vertex a texturePosition color
        , Vertex b texturePosition color
        , Vertex c texturePosition color
        )
        >> (::)
            ( Vertex c texturePosition color
            , Vertex d texturePosition color
            , Vertex a texturePosition color
            )



-- Shaders


type alias Vertex =
    { position : Vec3
    , texturePosition : Vec2
    , color : Vec3
    }


type alias Uniform =
    { texture : Texture
    , textureSize : Vec2
    , camera : Mat4
    , projection : Mat4
    , transform : Mat4
    , depth : Float
    }


type alias Varying =
    { vcolor : Vec3
    }


texturedVertexShader : Shader Vertex Uniform Varying
texturedVertexShader =
    [glsl|
        precision mediump float;
        attribute vec3 color;
        attribute vec3 position;
        attribute vec2 texturePosition;
        uniform sampler2D texture;
        uniform vec2 textureSize;
        uniform mat4 projection;
        uniform mat4 camera;
        uniform mat4 transform;
        uniform float depth;
        varying vec3 vcolor;
        void main () {
            vec4 textureColor = texture2D(texture, texturePosition / textureSize);
            if (dot(textureColor, textureColor) == 4.0) {
                vec3 pos = vec3(position.xy, position.z + depth);
                gl_Position = projection * camera * transform * vec4(pos, 1.0);
                vcolor = color * 0.5;
            } else {
                gl_Position = projection * camera * transform * vec4(position, 1.0);
                vcolor = color;
            }
        }
    |]


texturedFragmentShader : Shader {} Uniform Varying
texturedFragmentShader =
    [glsl|
        precision mediump float;
        varying vec3 vcolor;
        void main () {
            gl_FragColor = vec4(vcolor, 1.0);
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
