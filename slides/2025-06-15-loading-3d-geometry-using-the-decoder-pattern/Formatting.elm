module Formatting exposing
    ( arrow
    , arrowMarker
    , bullet
    , bulletLink
    , bullets
    , code
    , col
    , color
    , cover
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
    , text
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
    item (Html.h1 [ font True 48, style "margin" "1em 0" ] [ Html.text txt ])


text : String -> Content model msg
text txt =
    item (Html.span [ font False 48 ] [ Html.text txt ])


footnote : String -> Content model msg
footnote txt =
    item (Html.span [ font False 24 ] [ Html.text txt ])


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


cover : Int -> Int -> Maybe Int -> String -> Content model msg
cover w h percentage url =
    let
        bg =
            case percentage of
                Just p ->
                    "url(" ++ url ++ ") " ++ String.fromInt p ++ "% 0% / cover"

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
