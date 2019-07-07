module Custom.Metrics exposing (Model, Msg, Options, initial, subscriptions, update, view)

import Char
import Font.Font as Font
import Font.Glyph as Glyph exposing (Glyph)
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Iverni exposing (font)
import Keyboard exposing (KeyCode)
import Svg exposing (Svg)
import Svg.Attributes as SvgAttributes


type Msg
    = KeyPress KeyCode


type alias Model =
    { glyph : Glyph
    , fontSize : Float
    , width : Float
    , height : Float
    }


type alias Options =
    { fontSize : Float, width : Float, height : Float }


initial : Options -> Model
initial options =
    let
        glyph =
            Font.getGlyph font 'H'
                |> Maybe.withDefault Glyph.empty
    in
    { glyph = glyph
    , fontSize = options.fontSize
    , width = options.width
    , height = options.height
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Keyboard.presses KeyPress


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case action of
        KeyPress keyCode ->
            let
                glyph =
                    Font.getGlyph font (Char.fromCode keyCode)
                        |> Maybe.withDefault Glyph.empty
            in
            ( { model | glyph = glyph }
            , Cmd.none
            )


view : Model -> Html msg
view { width, height, glyph, fontSize } =
    let
        k =
            fontSize / font.unitsPerEm

        ( centerX, centerY ) =
            ( (width - k * glyph.advanceWidth) / 2
            , height / 2 - (font.unitsPerEm / 2 - font.ascender) * k
            )
    in
    Svg.svg
        [ HtmlAttributes.style [ ( "display", "block" ) ]
        , SvgAttributes.width (toString width)
        , SvgAttributes.height (toString height)
        ]
        [ Svg.g
            [ SvgAttributes.transform ("translate(" ++ toString centerX ++ "," ++ toString centerY ++ ")") ]
            [ viewGlyph k glyph
            , viewMetrics k glyph
            ]
        ]


viewMetrics : Float -> Glyph -> Svg msg
viewMetrics k { advanceWidth, leftSideBearing } =
    Svg.g
        []
        [ Svg.circle [ SvgAttributes.r "5", SvgAttributes.fill "black" ] []
        , Svg.line
            [ SvgAttributes.x1 (toString (-k * 400))
            , SvgAttributes.x2 (toString (k * (advanceWidth + 400)))
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "2"
            , SvgAttributes.markerEnd "url(#arrow)"
            ]
            []
        , label ( k * (advanceWidth + 400) - 30, -20 ) "end" "baseline"

        -- units per em
        , label ( k * (advanceWidth + 400), k * (-font.ascender - 50) ) "middle" ("units per em = " ++ toString font.unitsPerEm)

        -- advance
        , Svg.circle [ SvgAttributes.r "5", SvgAttributes.fill "black", SvgAttributes.cx (toString (k * advanceWidth)) ] []
        , Svg.line
            [ SvgAttributes.y1 (toString (k * (-font.descender + 50)))
            , SvgAttributes.x1 (toString (k * advanceWidth))
            , SvgAttributes.x2 (toString (k * advanceWidth))
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "1"
            , SvgAttributes.strokeDasharray "10,5"
            ]
            []
        , Svg.line
            [ SvgAttributes.y1 (toString (k * (-font.descender + 20)))
            , SvgAttributes.y2 (toString (k * (-font.descender + 20)))
            , SvgAttributes.x2 (toString (k * advanceWidth))
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "1"
            , SvgAttributes.markerEnd "url(#arrow)"
            ]
            []
        , label ( 0, k * (-font.descender + 50) + 30 ) "start" ("advance width = " ++ toString advanceWidth)

        -- left bearing
        , Svg.line
            [ SvgAttributes.y1 (toString (k * (-font.ascender / 2 - 50)))
            , SvgAttributes.x1 (toString (k * leftSideBearing))
            , SvgAttributes.x2 (toString (k * leftSideBearing))
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "1"
            , SvgAttributes.strokeDasharray "10,5"
            ]
            []
        , Svg.line
            [ SvgAttributes.y1 (toString (k * (-font.ascender / 2)))
            , SvgAttributes.y2 (toString (k * (-font.ascender / 2)))
            , SvgAttributes.x2 (toString (k * leftSideBearing))
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "1"
            , if abs leftSideBearing >= 30 then
                SvgAttributes.markerEnd "url(#arrow)"

              else
                SvgAttributes.markerEnd ""
            ]
            []
        , label ( min 0 (k * leftSideBearing) - 20, k * (-font.ascender / 2) + 8 ) "end" ("left bearing = " ++ toString leftSideBearing)
        , Svg.line
            [ SvgAttributes.y1 (toString (k * (-font.descender + 50)))
            , SvgAttributes.y2 (toString (-k * (font.ascender + 50)))
            , SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "2"
            , SvgAttributes.markerEnd "url(#arrow)"
            ]
            []
        ]


label : ( number, number ) -> String -> String -> Svg msg
label ( x, y ) anchor str =
    Svg.text_
        [ SvgAttributes.x (toString x)
        , SvgAttributes.y (toString y)
        , SvgAttributes.textAnchor anchor
        , HtmlAttributes.style [ ( "font", "24px/1.3 FiraMono, monospace" ) ]
        ]
        [ Svg.text str ]


viewGlyph : Float -> Glyph -> Svg msg
viewGlyph k { path } =
    Svg.path
        [ SvgAttributes.d path
        , SvgAttributes.fill "#bbb"
        , SvgAttributes.transform
            ("scale("
                ++ toString k
                ++ ","
                ++ toString -k
                ++ ")"
            )
        ]
        []
