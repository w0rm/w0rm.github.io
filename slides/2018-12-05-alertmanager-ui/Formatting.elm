module Formatting
    exposing
        ( arrow
        , bullet
        , bulletLink
        , bullets
        , code
        , col
        , color
        , image
        , link
        , position
        , row
        , spacer
        , text
        , title
        )

import Html exposing (Html)
import Html.Attributes exposing (height, href, src, style, width)
import SliceShow.Content exposing (Content, container, item)
import Svg
import Svg.Attributes
    exposing
        ( cx
        , cy
        , d
        , fill
        , id
        , markerEnd
        , markerHeight
        , markerStart
        , markerUnits
        , markerWidth
        , orient
        , r
        , refX
        , refY
        , stroke
        , strokeWidth
        , viewBox
        , x1
        , x2
        , y1
        , y2
        )


spacer : Int -> Content model msg
spacer h =
    item (Html.div [ style "height" (String.fromInt h ++ "px") ] [])


image : Int -> Int -> String -> Content model msg
image w h url =
    item
        (Html.img
            [ src url
            , width w
            , height h
            ]
            []
        )


title : String -> Content model msg
title txt =
    item (Html.h1 [ style "font" "bold 48px sans-serif", style "margin" "1em 0" ] [ Html.text txt ])


text : String -> Content model msg
text txt =
    item (Html.span [ style "font" "48px sans-serif" ] [ Html.text txt ])


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


bullets : List (Content model msg) -> Content model msg
bullets =
    container (Html.ul [])


bullet : String -> Content model msg
bullet str =
    item (Html.li [ style "font" "48px sans-serif", style "margin" "1em 0" ] [ Html.text str ])


bulletLink : String -> String -> Content model msg
bulletLink str url =
    item
        (Html.li [ style "font" "48px sans-serif", style "margin" "1em 0" ]
            [ Html.a [ href url, style "color" "inherit" ]
                [ Html.text str ]
            ]
        )


stripProto : String -> String
stripProto url =
    if String.startsWith "http://" url then
        String.dropLeft 7 url

    else if String.startsWith "https://" url then
        String.dropLeft 8 url

    else
        url


{-| Syntax higlighted code block, needs highlight.js in index.html
-}
code : String -> Content model msg
code str =
    item (Html.pre [ style "margin" "0" ] [ Html.code [ style "font" "36px monospace", style "margin" "0" ] [ Html.text str ] ])


{-| Draw an arrow
-}
arrow : ( Int, Int ) -> ( Int, Int ) -> Content model msg
arrow ( x01, y01 ) ( x02, y02 ) =
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
    Svg.svg
        [ style "position" "absolute"
        , style "left" (String.fromInt x ++ "px")
        , style "top" (String.fromInt y ++ "px")
        , style "width" (String.fromInt wid ++ "px")
        , style "height" (String.fromInt hei ++ "px")
        , viewBox ("0 0 " ++ String.fromInt wid ++ " " ++ String.fromInt hei ++ "")
        ]
        [ Svg.defs []
            [ Svg.marker
                [ id "arrow", markerWidth "10", markerHeight "10", refX "2", refY "2", orient "auto", markerUnits "strokeWidth" ]
                [ Svg.path [ d "M0,0 L0,4 L3,2 z", fill "#ffffff" ] [] ]
            , Svg.marker
                [ id "circle", markerWidth "20", markerHeight "20", refX "2", refY "2", orient "auto", markerUnits "strokeWidth" ]
                [ Svg.circle [ cx "2", cy "2", r "2", fill "#ffffff" ] [] ]
            ]
        , Svg.line
            [ x1 (String.fromInt (x01 - x))
            , x2 (String.fromInt (x02 - x))
            , y1 (String.fromInt (y01 - y))
            , y2 (String.fromInt (y02 - y))
            , stroke "#ffffff"
            , strokeWidth "5"
            , markerStart "url(#circle)"
            , markerEnd "url(#arrow)"
            ]
            []
        ]
        |> item
