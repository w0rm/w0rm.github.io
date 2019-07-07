module Custom.Outlines exposing (Model, Msg, Options, initial, subscriptions, update, view)

import Char
import Font.Font as Font
import Font.Glyph as Glyph exposing (Glyph)
import Font.PathCommand as PathCommand exposing (PathCommand(..))
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Iverni exposing (font)
import Keyboard exposing (KeyCode)
import Point2d exposing (Point2d)
import Svg exposing (Svg)
import Svg.Attributes as SvgAttributes


type Msg
    = KeyPress KeyCode


type alias Model =
    { glyph : Glyph
    , step : Int
    , width : Float
    , height : Float
    }


type alias Options =
    { step : Int
    , width : Float
    , height : Float
    }


initial : Options -> Model
initial options =
    let
        glyph =
            Font.getGlyph font '8'
                |> Maybe.withDefault Glyph.empty
    in
    { glyph = glyph
    , step = options.step
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


view : Model -> Html Msg
view { width, height, glyph, step } =
    let
        p =
            20

        k =
            (height - p * 2) / font.unitsPerEm

        ( centerX, centerY ) =
            ( (width / 2 - k * glyph.advanceWidth) / 2
            , font.ascender * k + p
            )
    in
    Html.div
        [ HtmlAttributes.style [ ( "display", "flex" ) ] ]
        [ Svg.svg
            [ HtmlAttributes.style
                [ ( "display", "block" )
                , ( "width", toString (width / 2) ++ "px" )
                ]
            , SvgAttributes.width (toString (width / 2))
            , SvgAttributes.height (toString height)
            ]
            [ Svg.g
                [ SvgAttributes.transform
                    ("translate("
                        ++ toString centerX
                        ++ ","
                        ++ toString centerY
                        ++ ") scale("
                        ++ toString k
                        ++ ","
                        ++ toString -k
                        ++ ")"
                    )
                ]
                [ viewGlyph step k glyph
                ]
            ]
        , Html.div
            [ HtmlAttributes.style
                [ ( "width", toString (width / 2) ++ "px" )
                , ( "box-sizing", "border-box" )
                , ( "padding", "100px 100px 100px 0" )
                , ( "font", "20px/1.2 FiraMono, monospace" )
                ]
            ]
            [ viewText step glyph ]
        ]


viewGlyph : Int -> Float -> Glyph -> Svg msg
viewGlyph step =
    case step of
        1 ->
            viewSvgOutlinesGlyph

        2 ->
            viewSvgOutlinesGlyph

        3 ->
            viewSegmentedGlyph

        4 ->
            viewCountursGlyph

        _ ->
            viewTriangulatedGlyph


viewText : Int -> Glyph -> Html msg
viewText step =
    case step of
        1 ->
            viewSvgOutlinesText

        _ ->
            \_ -> Html.text ""


viewSvgOutlinesText : Glyph -> Html msg
viewSvgOutlinesText glyph =
    Html.div
        []
        (glyph.path
            |> String.split "Z"
            |> List.filter ((/=) "")
            |> List.map
                (\t ->
                    Html.div
                        [ HtmlAttributes.style [ ( "margin-bottom", "10px" ) ] ]
                        [ Html.text (t ++ "Z") ]
                )
        )


viewSvgOutlinesGlyph : Float -> Glyph -> Svg msg
viewSvgOutlinesGlyph k { path } =
    let
        paths =
            path
                |> PathCommand.parse
                |> Maybe.withDefault []

        dots path =
            List.foldl
                (\p res ->
                    case p of
                        MoveTo x y ->
                            circle x y 5 "black" :: res

                        LineTo x y ->
                            circle x y 5 "black" :: res

                        QuadraticCurveTo x1 y1 x2 y2 ->
                            circle x1 y1 5 "red" :: circle x2 y2 5 "black" :: res

                        BezierCurveTo x1 y1 x2 y2 x3 y3 ->
                            circle x1 y1 5 "red" :: circle x2 y2 5 "red" :: circle x3 y3 5 "black" :: res
                )
                []
                path
    in
    paths
        |> List.foldl (dots >> (++)) []
        |> (::)
            (Svg.path
                [ SvgAttributes.d path
                , SvgAttributes.fill "transparent"
                , SvgAttributes.stroke "black"
                , SvgAttributes.strokeWidth "2"
                ]
                []
            )
        |> Svg.g []


viewSegmentedGlyph : Float -> Glyph -> Svg msg
viewSegmentedGlyph k glyph =
    glyph.path
        |> PathCommand.parse
        |> Maybe.withDefault []
        |> List.map (PathCommand.pathToPolygon samples)
        |> (\path ->
                path
                    |> List.concat
                    |> List.map (\p -> circle (Point2d.xCoordinate p) (Point2d.yCoordinate p) 4 "black")
                    |> (++)
                        (List.map
                            (\p ->
                                Svg.path
                                    [ SvgAttributes.d (polylineToSvgPath p)
                                    , SvgAttributes.fill "transparent"
                                    , SvgAttributes.stroke "black"
                                    , SvgAttributes.strokeWidth "2"
                                    ]
                                    []
                            )
                            path
                        )
                    |> Svg.g []
           )


viewCountursGlyph : Float -> Glyph -> Svg msg
viewCountursGlyph k glyph =
    let
        ( ccw, cw ) =
            glyph.path
                |> PathCommand.parse
                |> Maybe.withDefault []
                |> List.map (PathCommand.pathToPolygon samples)
                |> List.partition PathCommand.winding
    in
    (List.map
        (\p ->
            Svg.path
                [ SvgAttributes.d (polylineToSvgPath p)
                , SvgAttributes.fill "transparent"
                , SvgAttributes.stroke "red"
                , SvgAttributes.strokeWidth "2"
                , SvgAttributes.markerEnd "url(#arrow-red)"
                ]
                []
        )
        cw
        ++ List.map
            (\p ->
                Svg.path
                    [ SvgAttributes.d (polylineToSvgPath p)
                    , SvgAttributes.fill "transparent"
                    , SvgAttributes.stroke "black"
                    , SvgAttributes.strokeWidth "2"
                    , SvgAttributes.markerEnd "url(#arrow)"
                    ]
                    []
            )
            ccw
    )
        |> Svg.g []


viewTriangulatedGlyph : Float -> Glyph -> Svg msg
viewTriangulatedGlyph k glyph =
    glyph.path
        |> PathCommand.parse
        |> Maybe.withDefault []
        |> List.map (PathCommand.pathToPolygon samples)
        |> PathCommand.triangulate
        |> List.foldl
            (\( p1, p2, p3 ) result ->
                svgLine p1 p2
                    :: svgLine p1 p3
                    :: svgLine p2 p3
                    :: result
            )
            []
        |> Svg.g []


svgLine : Point2d -> Point2d -> Svg msg
svgLine p1 p2 =
    let
        ( x1, y1 ) =
            Point2d.coordinates p1

        ( x2, y2 ) =
            Point2d.coordinates p2
    in
    Svg.line
        [ SvgAttributes.x1 (toString x1)
        , SvgAttributes.y1 (toString y1)
        , SvgAttributes.x2 (toString x2)
        , SvgAttributes.y2 (toString y2)
        , SvgAttributes.strokeWidth "1"
        , SvgAttributes.stroke "black"
        ]
        []


circle : Float -> Float -> Float -> String -> Svg msg
circle x y r color =
    Svg.circle
        [ SvgAttributes.cx (toString x)
        , SvgAttributes.cy (toString y)
        , SvgAttributes.fill color
        , SvgAttributes.r (toString r)
        ]
        []


polylineToSvgPath : List Point2d -> String
polylineToSvgPath points =
    case PathCommand.removeDuplicates points of
        first :: rest ->
            "M"
                ++ toString (Point2d.xCoordinate first)
                ++ ","
                ++ toString (Point2d.yCoordinate first)
                ++ List.foldl
                    (\p r ->
                        r
                            ++ "L"
                            ++ toString (Point2d.xCoordinate p)
                            ++ ","
                            ++ toString (Point2d.yCoordinate p)
                    )
                    ""
                    points
                ++ "Z"

        _ ->
            ""


samples : Int
samples =
    3
