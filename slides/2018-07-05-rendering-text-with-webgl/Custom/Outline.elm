module Custom.Outline exposing (Options, view)

import Font.Feature as Feature
import Font.Text as Text
import Html.Attributes as HtmlAttributes
import Iverni
import Svg exposing (Svg)
import Svg.Attributes as SvgAttributes


type alias Options =
    { fontSize : Float
    , text : String
    , width : Float
    , height : Float
    , left : Float
    , top : Float
    }


view : Options -> Svg msg
view { width, height, left, top, fontSize, text } =
    let
        style =
            Text.style
                { font = Iverni.font
                , width = width - left
                , fontSize = fontSize
                , lineHeight = 1
                , features = [ Feature.Kern ]
                }
    in
    Text.text .path style text
        -- drop the cached style
        |> Tuple.first
        |> List.map (renderGlyph left top)
        |> Svg.svg
            [ HtmlAttributes.style [ ( "display", "block" ) ]
            , SvgAttributes.width (toString width)
            , SvgAttributes.height (toString height)
            ]


renderGlyph : Float -> Float -> { x : Float, y : Float, size : Float, glyph : String } -> Svg msg
renderGlyph left top { x, y, size, glyph } =
    Svg.g
        [ SvgAttributes.transform
            ("translate("
                ++ toString (x * size + left)
                ++ ","
                ++ toString (-y * size + top)
                ++ ") scale("
                ++ toString size
                ++ ","
                ++ toString -size
                ++ ")"
            )
        ]
        [ Svg.path
            [ SvgAttributes.d glyph
            , SvgAttributes.fill "transparent"
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth (toString (2 / size))
            ]
            []
        ]
