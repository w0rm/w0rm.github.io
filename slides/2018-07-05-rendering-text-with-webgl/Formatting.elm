module Formatting
    exposing
        ( Align(..)
        , align
        , background
        , bullet
        , bulletLink
        , bulletRed
        , bullets
        , char
        , code
        , dark
        , demo
        , group
        , icon
        , image
        , imageLink
        , padded
        , position
        , richtext
        , scale
        , shout
        , spacing
        , split
        , title
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import Markdown
import SliceShow.Content exposing (..)


type Align
    = Left
    | Right
    | Center


slidePadding : String
slidePadding =
    "50px 100px"


{-| Custom slide that adds the padding
-}
padded : List (Content a b) -> Content a b
padded =
    div [ style [ ( "padding", slidePadding ) ] ]
        |> container


{-| Custom slide with the background
-}
background : String -> List (Content a b) -> Content a b
background url =
    div
        [ style
            [ ( "height", "100%" )
            , ( "box-sizing", "border-box" )
            , ( "background-image", "url(" ++ url ++ ")" )
            , ( "background-size", "cover" )
            , ( "padding", slidePadding )
            ]
        ]
        |> container


{-| Custom slide with the background
-}
dark : List (Content a b) -> Content a b
dark =
    div
        [ style
            [ ( "height", "100%" )
            , ( "box-sizing", "border-box" )
            , ( "background", "rgb(22,17,22)" )
            , ( "color", "white" )
            , ( "padding", slidePadding )
            ]
        ]
        |> container


{-| Text alignment
-}
align : Align -> List (Content a b) -> Content a b
align align =
    let
        alignValue =
            case align of
                Left ->
                    "left"

                Right ->
                    "right"

                Center ->
                    "center"
    in
    div [ style [ ( "text-align", alignValue ) ] ]
        |> container


{-| Title content item
-}
title : String -> Content a b
title message =
    h1 [] [ text message ]
        |> item


{-| Image
-}
image : ( Int, Int ) -> String -> Content a b
image ( wid, hei ) url =
    img [ src url, width wid, height hei, style [ ( "vertical-align", "middle" ) ] ] []
        |> item


{-| Image Link
-}
imageLink : ( Int, Int ) -> String -> String -> Content a b
imageLink ( wid, hei ) url linkUrl =
    a [ href linkUrl ]
        [ img
            [ src url
            , width wid
            , height hei
            , style [ ( "border", "none" ) ]
            ]
            []
        ]
        |> item


{-| Richtext
-}
richtext : String -> Content a b
richtext =
    Markdown.toHtml [] >> item


{-| Code block
-}
code : String -> String -> Content a b
code lang str =
    Markdown.toHtml [] ("```" ++ lang ++ "\n" ++ str ++ "\n```")
        |> item


{-| Vertical spacing
-}
spacing : Int -> Content a b
spacing px =
    div [ style [ ( "height", toString px ++ "px" ) ] ] []
        |> item


{-| Absolute positioning
-}
position : ( Int, Int ) -> List (Content a b) -> Content a b
position ( x, y ) =
    div
        [ style
            [ ( "position", "absolute" )
            , ( "left", toString x ++ "px" )
            , ( "top", toString y ++ "px" )
            ]
        ]
        |> container


{-| Demo
-}
demo : String -> Content a b
demo url =
    iframe
        [ src url
        , style
            [ ( "position", "absolute" )
            , ( "left", "0" )
            , ( "top", "0" )
            , ( "width", "100%" )
            , ( "height", "100%" )
            , ( "border", "0" )
            ]
        ]
        []
        |> item


{-| List
-}
bullets : List (Content a b) -> Content a b
bullets =
    container (ol [])


{-| List item
-}
bullet : String -> Content a b
bullet str =
    item (li [] [ text str ])


{-| List item
-}
bulletRed : String -> Content a b
bulletRed str =
    item (li [ style [ ( "color", "red" ) ] ] [ text str ])


{-| List link item
-}
bulletLink : String -> String -> Content a b
bulletLink str url =
    item (li [] [ a [ href url ] [ text str ] ])


{-| Shout
-}
shout : String -> Content a b
shout str =
    div
        [ style
            [ ( "position", "absolute" )
            , ( "left", "0" )
            , ( "right", "0" )
            , ( "top", "0" )
            , ( "bottom", "20%" )
            , ( "padding", slidePadding )
            , ( "font", "90px/1.2 FiraSans-Light, sans-serif" )
            , ( "letter-spacing", "-2px" )
            , ( "text-align", "left" )
            , ( "display", "flex" )
            , ( "align-items", "center" )
            ]
        ]
        [ div [] [ text str ] ]
        |> item


split : List (Content a b) -> List (Content a b) -> Content a b
split leftContent rightContent =
    container
        (table
            [ style
                [ ( "width", "100%" )
                , ( "table-layout", "fixed" )
                , ( "border-spacing", "0" )
                , ( "border-collapse", "collapse" )
                , ( "vertical-align", "top" )
                ]
            ]
        )
        [ container (td []) leftContent
        , container (td []) rightContent
        ]


icon : String -> Content a b
icon name =
    image ( 60, 60 ) ("assets/" ++ name ++ ".png")


char : String -> Content a b
char str =
    span
        [ style
            [ ( "font", "30px/60px FiraSans-Regular, sans-serif" )
            , ( "display", "inline-block" )
            , ( "vertical-align", "middle" )
            , ( "color", "#666" )
            ]
        ]
        [ text str ]
        |> item


group : List (Content a b) -> Content a b
group =
    div [] |> container


scale : Float -> List (Content a b) -> Content a b
scale ratio =
    div
        [ style
            [ ( "transform", "scale(" ++ toString ratio ++ ")" )
            , ( "transform-origin", "0 0" )
            ]
        ]
        |> container
