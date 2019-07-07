module Custom.Wordwrapping exposing (Options, view)

import Array.Hamt as Array exposing (Array)
import Font.Glyph as Glyph exposing (Glyph)
import Font.TextStepper as Text exposing (Context, GlyphInfo)
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Iverni exposing (font)
import Svg exposing (Svg)
import Svg.Attributes as SvgAttributes


type alias Options =
    { fontSize : Float
    , text : String
    , width : Float
    , height : Float
    , lineWidth : Float
    , step : Int
    }


view : Options -> Html msg
view { step, width, height, lineWidth, text, fontSize } =
    let
        style =
            Text.style
                { fontSize = fontSize
                , width = lineWidth
                , lineHeight = 1.2
                , font = Iverni.font
                , step = step
                , features = []
                }

        context =
            Text.text identity style text
    in
    Svg.svg
        [ HtmlAttributes.style [ ( "display", "block" ) ]
        , SvgAttributes.width (toString width)
        , SvgAttributes.height (toString height)
        ]
        [ Svg.g
            [ SvgAttributes.transform
                ("translate("
                    ++ toString ((width - lineWidth) / 2)
                    ++ ","
                    ++ toString ((height - 2 * context.lineHeight * context.size) / 2 + 50)
                    ++ ")"
                )
            ]
            [ renderBaselines context
            , Svg.g [] (List.map (renderGlyph [ SvgAttributes.fill "#bbb" ]) (List.drop (List.length context.currentWordIndices) context.glyphs))
            , Svg.g [] (List.map (renderGlyph [ SvgAttributes.fill "black" ]) (List.take (List.length context.currentWordIndices) context.glyphs))
            , renderNextGlyph context
            , renderPen context
            ]
        , label ( width - 70, 60 ) "end" "black" ("current step = " ++ toString (step - context.step + 1))
        ]


renderGlyph : List (Svg.Attribute msg) -> GlyphInfo Glyph -> Svg msg
renderGlyph attrs { x, y, size, glyph } =
    Svg.g
        [ SvgAttributes.transform
            ("translate("
                ++ toString (x * size)
                ++ ","
                ++ toString (-y * size)
                ++ ") scale("
                ++ toString size
                ++ ","
                ++ toString -size
                ++ ")"
            )
        ]
        [ Svg.path (SvgAttributes.d glyph.path :: attrs) [] ]


renderNextGlyph : Context Glyph -> Svg msg
renderNextGlyph context =
    case
        List.head context.nextIndices
            |> Maybe.map .index
            |> Maybe.andThen (\i -> Array.get i context.font.glyphs)
    of
        Nothing ->
            Svg.g [] []

        Just glyph ->
            let
                color =
                    if context.penX + glyph.advanceWidth > context.width then
                        "red"

                    else
                        "black"
            in
            Svg.g []
                [ Svg.rect
                    [ SvgAttributes.x (toString (context.penX * context.size))
                    , SvgAttributes.y (toString (-(context.penY + context.font.ascender) * context.size))
                    , SvgAttributes.width (toString (glyph.advanceWidth * context.size))
                    , SvgAttributes.height (toString (context.font.unitsPerEm * context.size))
                    , SvgAttributes.fill color
                    ]
                    []
                , renderGlyph
                    [ SvgAttributes.fill "white" ]
                    { x = context.penX
                    , y = context.penY
                    , size = context.size
                    , glyph = glyph
                    }
                ]


renderBaselines : Context Glyph -> Svg msg
renderBaselines context =
    List.range 0 1
        |> List.map
            (\n ->
                Svg.line
                    [ SvgAttributes.x1 (toString 0)
                    , SvgAttributes.x2 (toString (0 + context.width * context.size))
                    , SvgAttributes.y1 (toString (toFloat n * context.lineHeight * context.size + context.font.ascender * context.size))
                    , SvgAttributes.y2 (toString (toFloat n * context.lineHeight * context.size + context.font.ascender * context.size))
                    , SvgAttributes.stroke "black"
                    , SvgAttributes.strokeWidth "1"
                    ]
                    []
            )
        |> (++)
            [ Svg.line
                [ SvgAttributes.x1 (toString 0)
                , SvgAttributes.x2 (toString (0 + context.width * context.size))
                , SvgAttributes.y1 "-20"
                , SvgAttributes.y2 "-20"
                , SvgAttributes.stroke "red"
                , SvgAttributes.strokeWidth "1"
                , SvgAttributes.markerEnd "url(#arrow-red)"
                ]
                []
            , Svg.line
                [ SvgAttributes.x1 (toString (0 + context.width * context.size))
                , SvgAttributes.x2 (toString (0 + context.width * context.size))
                , SvgAttributes.y1 "-40"
                , SvgAttributes.y2 (toString (40 + context.lineHeight * context.size + context.font.ascender * context.size))
                , SvgAttributes.stroke "red"
                , SvgAttributes.strokeWidth "1"
                , SvgAttributes.strokeDasharray "10,5"
                ]
                []
            , label ( context.width * context.size / 2, -40 )
                "middle"
                "red"
                ("line width = " ++ toString context.width)
            ]
        |> Svg.g []


renderPen : Context Glyph -> Svg msg
renderPen context =
    Svg.g []
        [ Svg.circle
            [ SvgAttributes.r "5"
            , SvgAttributes.fill "red"
            , SvgAttributes.cx (toString (context.penX * context.size))
            , SvgAttributes.cy (toString (-context.penY * context.size))
            ]
            []
        , Svg.line
            [ SvgAttributes.x1 (toString (context.penX * context.size))
            , SvgAttributes.y1 (toString (-context.penY * context.size))
            , SvgAttributes.x2 (toString (context.penX * context.size - 40))
            , SvgAttributes.y2 (toString (-context.penY * context.size + 40))
            , SvgAttributes.stroke "red"
            , SvgAttributes.strokeWidth "1"
            , SvgAttributes.strokeDasharray "10,5"
            ]
            []
        , label
            ( context.penX * context.size - 50, -context.penY * context.size + 70 )
            "end"
            "red"
            ("pen = (" ++ toString context.penX ++ ", " ++ toString context.penY ++ ")")
        ]


label : ( number, number ) -> String -> String -> String -> Svg msg
label ( x, y ) anchor color str =
    Svg.text_
        [ SvgAttributes.x (toString x)
        , SvgAttributes.y (toString y)
        , SvgAttributes.textAnchor anchor
        , SvgAttributes.fill color
        , HtmlAttributes.style
            [ ( "font", "24px/1.3 FiraMono, monospace" ) ]
        ]
        [ Svg.text str ]
