module Formatting exposing
    ( bullet
    , bulletLink
    , bullets
    , code
    , col
    , color
    , cover
    , footnote
    , image
    , link
    , nonInteractive
    , position
    , row
    , spacer
    , text
    , title
    , width
    )

import Html
import Html.Attributes exposing (height, href, src, style)
import SliceShow.Content exposing (Content, container, item)


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
font bold size =
    style "font"
        ((if bold then
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
    item (Html.pre [ style "margin" "0" ] [ Html.code [ style "font" "23px monospace", style "margin" "0" ] [ Html.text str ] ])
