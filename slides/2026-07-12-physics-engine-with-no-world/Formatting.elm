module Formatting exposing
    ( arrow
    , arrowMarker
    , background
    , bullet
    , bulletLink
    , bullets
    , code
    , col
    , color
    , cover
    , coverFocus
    , font
    , footnote
    , group
    , image
    , link
    , nextButton
    , nonInteractive
    , position
    , prevButton
    , row
    , scale
    , spacer
    , swatch
    , text
    , timeline
    , title
    , width
    )

import Html
import Html.Attributes exposing (class, height, href, src, style)
import SliceShow exposing (Content, container, item)
import Svg exposing (line, svg)
import Svg.Attributes exposing (markerEnd, stroke, strokeWidth, viewBox, x1, x2, y1, y2)


prevButton : ( Int, Int ) -> Content model msg
prevButton ( wid, height ) =
    SliceShow.prev
        [ style "width" (String.fromInt wid ++ "px")
        , style "height" (String.fromInt height ++ "px")
        , style "background" "none"
        , style "border" "none"
        , style "padding" "0"
        , style "margin" "0"
        , style "cursor" "pointer"
        ]
        []


nextButton : ( Int, Int ) -> Content model msg
nextButton ( wid, height ) =
    SliceShow.next
        [ style "width" (String.fromInt wid ++ "px")
        , style "height" (String.fromInt height ++ "px")
        , style "background" "none"
        , style "border" "none"
        , style "padding" "0"
        , style "margin" "0"
        , style "cursor" "pointer"
        ]
        []


scale : Float -> Content model msg -> Content model msg
scale factor content =
    container
        (Html.div
            [ style "transform" ("scale(" ++ String.fromFloat factor ++ ")")
            , style "transform-origin" "top left"
            , style "overflow" "hidden"
            , style "position" "absolute"
            ]
        )
        [ content ]


spacer : Int -> Content model msg
spacer h =
    item (Html.div [ style "height" (String.fromInt h ++ "px") ] [])


image : Int -> Int -> String -> Content model msg
image w h url =
    item
        (Html.img
            [ src url
            , Html.Attributes.width w
            , height h
            ]
            []
        )


title : String -> Content model msg
title txt =
    item (Html.h1 [ font True 48, style "margin" "0.2em 0" ] [ Html.text txt ])


text : String -> Content model msg
text txt =
    item (Html.span [ font False 48 ] [ Html.text txt ])


footnote : String -> Content model msg
footnote txt =
    item (Html.span [ font False 24 ] [ Html.text txt ])


{-| A footnote-sized line with a colored square in front — a legend entry.
-}
swatch : String -> String -> Content model msg
swatch swatchColor txt =
    item
        (Html.span [ font False 24 ]
            [ Html.span
                [ style "display" "inline-block"
                , style "width" "18px"
                , style "height" "18px"
                , style "background" swatchColor
                , style "border-radius" "3px"
                , style "margin-right" "12px"
                , style "vertical-align" "-1px"
                ]
                []
            , Html.text txt
            ]
        )


link : String -> Content model msg -> Content model msg
link url content =
    container (Html.a [ style "color" "inherit", href url ]) [ content ]


position : Int -> Int -> Content model msg -> Content model msg
position left top content =
    container
        (Html.div
            [ style "position" "absolute"
            , style "left" (String.fromInt left ++ "px")
            , style "top" (String.fromInt top ++ "px")
            ]
        )
        [ content ]


width : Int -> Content model msg -> Content model msg
width wid content =
    container
        (Html.div
            [ style "width" (String.fromInt wid ++ "px")
            ]
        )
        [ content ]


nonInteractive : Content model msg -> Content model msg
nonInteractive content =
    container
        (Html.div
            [ style "pointer-events" "none"
            ]
        )
        [ content ]


color : String -> Content model msg -> Content model msg
color c content =
    container (Html.div [ style "color" c ]) [ content ]


col : List (Content model msg) -> Content model msg
col =
    container
        (Html.div
            [ style "display" "flex"
            , style "flex-direction" "column"
            , style "align-items" "center"
            ]
        )


row : List (Content model msg) -> Content model msg
row contents =
    container
        (Html.div
            [ style "display" "flex"
            , style "justify-content" "space-around"
            , style "width" "100%"
            ]
        )
        contents


group : List (Content model msg) -> Content model msg
group contents =
    container (Html.div []) contents


bullets : List (Content model msg) -> Content model msg
bullets =
    container (Html.ul [])


bullet : String -> Content model msg
bullet str =
    item (Html.li [ font False 48, style "margin" "1em 0" ] [ Html.text str ])


bulletLink : String -> String -> Content model msg
bulletLink str url =
    item
        (Html.li [ font False 48, style "margin" "1em 0" ]
            [ Html.a [ href url, style "color" "inherit" ]
                [ Html.text str ]
            ]
        )


font : Bool -> Int -> Html.Attribute msg
font isBold size =
    style "font"
        ((if isBold then
            "bold "

          else
            ""
         )
            ++ String.fromInt size
            ++ "px "
            ++ String.join ", "
                [ "\"Helvetica Neue\""
                , "Arial"
                , "\"Hiragino Kaku Gothic ProN\""
                , "\"Hiragino Sans\""
                , "Meiryo"
                , "sans-serif"
                ]
        )


{-| Syntax higlighted code block, needs highlight.js in index.html
-}
code : String -> Content model msg
code str =
    item (Html.pre [ style "margin" "0" ] [ Html.code [ style "font" "36px monospace", style "margin" "0" ] [ Html.text str ] ])


{-| A cropped image tile. The percentage picks the vertical window of the
source image (0 = top, 100 = bottom); `Nothing` keeps the top.
-}
cover : Int -> Int -> Maybe Int -> String -> Content model msg
cover w h percentage url =
    let
        bg =
            case percentage of
                Just p ->
                    "url(" ++ url ++ ") 0% " ++ String.fromInt p ++ "% / cover"

                Nothing ->
                    "url(" ++ url ++ ") 0% 0% / cover"
    in
    item
        (Html.div
            [ Html.Attributes.style "background" bg
            , Html.Attributes.style "width" (String.fromInt w ++ "px")
            , Html.Attributes.style "height" (String.fromInt h ++ "px")
            ]
            []
        )


{-| A cropped image tile that can zoom past the box: the source is rendered
`imageWidth` px wide (height auto), then `( xp, yp )` picks which part of it
shows through the w×h window (both in percent, 50/50 = centred). Larger
`imageWidth` = tighter zoom.
-}
coverFocus : Int -> Int -> Int -> ( Int, Int ) -> String -> Content model msg
coverFocus w h imageWidth ( xp, yp ) url =
    item
        (Html.div
            [ Html.Attributes.style "background"
                ("url("
                    ++ url
                    ++ ") "
                    ++ String.fromInt xp
                    ++ "% "
                    ++ String.fromInt yp
                    ++ "% / "
                    ++ String.fromInt imageWidth
                    ++ "px auto no-repeat"
                )
            , Html.Attributes.style "width" (String.fromInt w ++ "px")
            , Html.Attributes.style "height" (String.fromInt h ++ "px")
            ]
            []
        )


arrow : String -> ( Int, Int ) -> ( Int, Int ) -> Content model msg
arrow strColor ( x01, y01 ) ( x02, y02 ) =
    let
        border =
            20

        x =
            min x01 x02 - border

        y =
            min y01 y02 - border

        wid =
            max x01 x02 - x + border

        hei =
            max y01 y02 - y + border
    in
    svg
        [ style "position" "absolute"
        , style "left" (String.fromInt x ++ "px")
        , style "top" (String.fromInt y ++ "px")
        , style "width" (String.fromInt wid ++ "px")
        , style "height" (String.fromInt hei ++ "px")
        , viewBox ("0 0 " ++ String.fromInt wid ++ " " ++ String.fromInt hei ++ "")
        ]
        [ line
            [ x1 (String.fromInt (x01 - x))
            , x2 (String.fromInt (x02 - x))
            , y1 (String.fromInt (y01 - y))
            , y2 (String.fromInt (y02 - y))
            , stroke strColor
            , strokeWidth "2"
            , markerEnd ("url(#arrow-" ++ strColor ++ ")")
            ]
            []
        ]
        |> item


arrowMarker : String -> Content model msg
arrowMarker strColor =
    svg
        [ style "position" "absolute"
        ]
        [ Svg.defs []
            [ Svg.marker
                [ Svg.Attributes.id ("arrow-" ++ strColor)
                , Svg.Attributes.markerWidth "10"
                , Svg.Attributes.markerHeight "10"
                , Svg.Attributes.refX "5"
                , Svg.Attributes.refY "4"
                , Svg.Attributes.orient "auto"
                , Svg.Attributes.markerUnits "strokeWidth"
                ]
                [ Svg.path
                    [ Svg.Attributes.d "M0,0 L6,4 M0,8 L6,4"
                    , Svg.Attributes.fill "none"
                    , Svg.Attributes.stroke strColor
                    ]
                    []
                ]
            ]
        ]
        |> item


{-| Wrap a whole slide's content in a fixed 1280x720 box with a background
and clip anything that would otherwise escape the slide region.
-}
background : List (Content model msg) -> Content model msg
background contents =
    container
        (Html.div
            [ style "position" "absolute"
            , style "left" "0"
            , style "top" "0"
            , style "width" "1280px"
            , style "height" "720px"
            , style "overflow" "hidden"
            , style "background" "linear-gradient(160deg, #fbfbfd 0%, #e9edf3 100%)"
            ]
        )
        contents


{-| A horizontal SVG timeline: a line with a labelled dot per node (year above,
version below). One node can be highlighted as "active"; pass -1 for none.
With `headlines = True` a short caption is drawn under each node.
-}
timeline :
    { width : Int, active : Int, headlines : Bool }
    -> List { year : String, version : String, headline : String }
    -> Content model msg
timeline options nodes =
    let
        count =
            List.length nodes

        pad =
            160

        cy =
            80

        boxHeight =
            if options.headlines then
                170

            else
                116

        xAt i =
            toFloat pad
                + toFloat i
                * toFloat (options.width - 2 * pad)
                / toFloat (max 1 (count - 1))

        accent =
            "#2f6fed"

        baseline =
            Svg.line
                [ Svg.Attributes.x1 (String.fromFloat (xAt 0))
                , Svg.Attributes.y1 (String.fromInt cy)
                , Svg.Attributes.x2 (String.fromFloat (xAt (count - 1)))
                , Svg.Attributes.y2 (String.fromInt cy)
                , Svg.Attributes.stroke "#cfcfcf"
                , Svg.Attributes.strokeWidth "3"
                ]
                []

        label x y size weight fill string =
            Svg.text_
                [ Svg.Attributes.x (String.fromFloat x)
                , Svg.Attributes.y (String.fromInt y)
                , Svg.Attributes.textAnchor "middle"
                , Svg.Attributes.fontSize (String.fromInt size)
                , Svg.Attributes.fontWeight weight
                , Svg.Attributes.fill fill
                , Svg.Attributes.fontFamily "\"Helvetica Neue\", Arial, \"Hiragino Sans\", sans-serif"
                ]
                [ Svg.text string ]

        dot i node_ =
            let
                x =
                    xAt i

                on =
                    i == options.active
            in
            Svg.g []
                (Svg.circle
                    [ Svg.Attributes.cx (String.fromFloat x)
                    , Svg.Attributes.cy (String.fromInt cy)
                    , Svg.Attributes.r
                        (if on then
                            "15"

                         else
                            "9"
                        )
                    , Svg.Attributes.fill
                        (if on then
                            accent

                         else
                            "#ffffff"
                        )
                    , Svg.Attributes.stroke
                        (if on then
                            accent

                         else
                            "#b9b9b9"
                        )
                    , Svg.Attributes.strokeWidth "3"
                    ]
                    []
                    :: label x 40 30 "bold"
                        (if on then
                            accent

                         else
                            "#333"
                        )
                        node_.year
                    :: label x 112 22 "normal" "#888" node_.version
                    :: (if options.headlines then
                            [ label x 150 25 "normal" "#444" node_.headline ]

                        else
                            []
                       )
                )
    in
    item
        (Svg.svg
            [ Svg.Attributes.width (String.fromInt (options.width))
            , Svg.Attributes.height (String.fromInt boxHeight)
            , Svg.Attributes.viewBox ("0 0 " ++ String.fromInt (options.width) ++ " " ++ String.fromInt boxHeight)
            ]
            (baseline :: List.indexedMap dot nodes)
        )

