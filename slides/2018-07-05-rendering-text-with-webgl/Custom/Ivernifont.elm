module Custom.Ivernifont exposing (Options, view)

import Font.Feature exposing (Feature)
import Font.Mesh as Mesh exposing (Attributes2d, glyph2d)
import Font.Text as Text exposing (GlyphInfo)
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Iverni exposing (font)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import WebGL exposing (Mesh, Shader)


type alias Options =
    { text : String
    , fontSize : Float
    , lineHeight : Float
    , width : Float
    , color : Vec3
    , height : Float
    , features : List Feature
    }


view : Options -> Html msg
view { width, features, color, height, text, lineHeight, fontSize } =
    let
        style =
            Text.style
                { font = Iverni.font
                , fontSize = fontSize
                , lineHeight = lineHeight
                , width = width
                , features = features
                }

        renderedText =
            Tuple.first (Text.text glyph2d style text)

        devicePixelRatio =
            2

        projection =
            Mat4.makeOrtho2D 0 width -height 0

        glyphToEntity { glyph, x, y, size } =
            WebGL.entity
                vertex2d
                fragment2d
                glyph
                { projection = projection
                , color = color
                , transform =
                    Mat4.makeTranslate3 x y 0
                        |> Mat4.mul (Mat4.makeScale3 size size size)
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
        (List.map glyphToEntity renderedText)


type alias Uniforms2d =
    { projection : Mat4
    , transform : Mat4
    , color : Vec3
    }


vertex2d : Shader Attributes2d Uniforms2d {}
vertex2d =
    [glsl|
        precision highp float;
        attribute vec3 position;
        uniform mat4 projection;
        uniform mat4 transform;
        void main () {
            gl_Position = projection * transform * vec4(position, 1.0);
        }
    |]


fragment2d : Shader {} Uniforms2d {}
fragment2d =
    [glsl|
        precision mediump float;
        uniform vec3 color;
        void main () {
            gl_FragColor = vec4(color, 1.0);
        }
    |]
