module Formatting exposing
    ( bullet
    , bulletLink
    , bullets
    , code
    , col
    , color
    , group
    , image
    , noPointerEvents
    , position
    , row
    , spacer
    , text
    , title
    )

import Html exposing (Html)
import Html.Attributes exposing (height, href, src, style, width)
import SliceShow.Content exposing (Content, container, item)


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


group : Int -> Int -> Int -> Int -> List (Content model msg) -> Content model msg
group left top width height content =
    container
        (Html.div
            [ style "position" "absolute"
            , style "left" (String.fromInt left ++ "px")
            , style "top" (String.fromInt top ++ "px")
            , style "width" (String.fromInt width ++ "px")
            , style "height" (String.fromInt height ++ "px")
            ]
        )
        content


noPointerEvents : Content model msg -> Content model msg
noPointerEvents content =
    container
        (Html.div [ style "pointer-events" "none" ])
        [ content ]


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
            [ Html.a [ href url, style "color" "inherit" ] [ Html.text str ] ]
        )


{-| Code block
-}
code : String -> Content model msg
code str =
    item (Html.pre [ style "margin" "0" ] [ Html.code [ style "font" "36px monospace", style "margin" "0" ] [ Html.text str ] ])
