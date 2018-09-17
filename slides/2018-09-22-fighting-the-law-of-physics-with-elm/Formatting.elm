module Formatting
    exposing
        ( bullet
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
                [ Html.text (str ++ " (" ++ stripProto url ++ ")") ]
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
