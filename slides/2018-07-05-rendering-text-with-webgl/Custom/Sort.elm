module Custom.Sort exposing (Model, Msg, Options, initial, subscriptions, update, view)

import AnimationFrame
import Char
import Font.Font as Font
import Font.Glyph as Glyph exposing (Glyph)
import Font.Mesh as Mesh exposing (Attributes3d)
import Font.PathCommand as PathCommand exposing (PathCommand(..))
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Iverni exposing (font)
import Keyboard exposing (KeyCode)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Time exposing (Time)
import WebGL exposing (Mesh, Shader)


type Msg
    = Animate Time
    | KeyPress KeyCode


type alias Model =
    { elapsed : Time
    , glyph : Glyph
    , mesh : Mesh Attributes3d
    , width : Float
    , height : Float
    }


type alias Options =
    { width : Float, height : Float }


initial : Options -> Model
initial options =
    let
        ( glyph, mesh ) =
            getGlyphAndMesh (Char.toCode 'H')
    in
    { elapsed = 0
    , glyph = glyph
    , mesh = mesh
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
            , Cmd.none
            )

        KeyPress keyCode ->
            let
                ( glyph, mesh ) =
                    getGlyphAndMesh keyCode
            in
            ( { model | glyph = glyph, mesh = mesh }
            , Cmd.none
            )


getGlyphAndMesh : Int -> ( Glyph, Mesh Attributes3d )
getGlyphAndMesh keyCode =
    let
        glyph =
            Font.getGlyph font (Char.fromCode keyCode)
                |> Maybe.withDefault Glyph.empty
    in
    ( glyph, Mesh.glyph3d glyph )


{-| A model of the sort's base, hardcoded for Iverni font
-}
base : Mesh Attributes3d
base =
    Mesh.mesh3d
        [ PathCommand.pathToPolygon 10
            [ MoveTo 0 780 -- ascender
            , LineTo 0 -220 -- descender
            , LineTo 694 -220
            , BezierCurveTo 694 -182 725 -152 763 -152
            , BezierCurveTo 800 -152 831 -182 831 -220
            , LineTo 1000 -220
            , LineTo 1000 142
            , LineTo 958 177
            , LineTo 958 499
            , LineTo 1000 534
            , LineTo 1000 780
            ]
        ]


view : Model -> Html msg
view { elapsed, width, height, glyph, mesh } =
    let
        camera =
            Mat4.makeLookAt
                (Vec3.vec3 0 0 (font.unitsPerEm * 4))
                (Vec3.vec3 0 0 0)
                Vec3.j

        devicePixelRatio =
            2

        projection =
            Mat4.makePerspective 24 (width / height) 5 5000

        angle =
            elapsed / 1000

        depth =
            50

        positionAndRotate =
            Mat4.makeTranslate3 0 (font.unitsPerEm / 2 - font.ascender) (font.unitsPerEm / 2)
                |> Mat4.mul (Mat4.makeRotate angle Vec3.j)
                |> Mat4.mul (Mat4.makeRotate (angle / 2) Vec3.k)
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
            vertex3d
            fragment3d
            base
            { camera = camera
            , color = vec3 1 0 0
            , projection = projection
            , transform =
                Mat4.makeScale3 1 1 glyph.advanceWidth
                    -- rotate perpendicular to the letter
                    |> Mat4.mul (Mat4.makeRotate (pi / 2) Vec3.j)
                    -- world position & rotate
                    |> Mat4.mul positionAndRotate
            }
        , WebGL.entity
            vertex3d
            fragment3d
            mesh
            { camera = camera
            , color = vec3 1 0 0
            , projection = projection
            , transform =
                -- center
                Mat4.makeTranslate3 (-glyph.advanceWidth / 2) 0 -0.5
                    -- mirror
                    |> Mat4.mul (Mat4.makeRotate pi Vec3.j)
                    -- scale the depth
                    |> Mat4.mul (Mat4.makeScale3 1 1 depth)
                    -- world position & rotate
                    |> Mat4.mul positionAndRotate
            }
        ]


type alias Uniforms3d =
    { camera : Mat4
    , projection : Mat4
    , transform : Mat4
    , color : Vec3
    }


vertex3d : Shader Attributes3d Uniforms3d { vcolor : Vec3 }
vertex3d =
    [glsl|
        precision highp float;
        attribute vec3 position;
        attribute vec3 normal;
        uniform vec3 color;
        uniform mat4 camera;
        uniform mat4 projection;
        uniform mat4 transform;
        varying vec3 vcolor;

        float ambientLight = 0.4;
        float directionalLight = 0.6;
        vec3 directionalVector = normalize(vec3(0.3, 0.1, 1.0));
        void main () {
            gl_Position = projection * camera * transform * vec4(position, 1.0);
            vec4 transformedNormal = normalize(transform * vec4(normal, 0.0));
            float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
            float vlighting = ambientLight + directional * directionalLight;
            vcolor = vlighting * color;
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
