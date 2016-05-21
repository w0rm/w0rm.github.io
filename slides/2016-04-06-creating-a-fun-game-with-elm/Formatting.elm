module Formatting
  ( background
  , padded
  , title
  , align
  , image
  , Align(..)
  , richtext
  , spacing
  , position
  , demo
  , bullets
  , bullet
  , code
  , shout
  , split
  , char
  , icon
  , group
  , scale
  ) where

import Model exposing (Model)
import SliceShow.Content exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Markdown


type Align = Left | Right | Center


slidePadding : String
slidePadding = "50px 100px"


{- Custom slide that adds the padding -}
padded : List (Content Model) -> Content Model
padded =
  div [style [("padding", slidePadding)]]
  |> container


{- Custom slide with the background -}
background : String -> List (Content Model) -> Content Model
background url =
  div
    [ style
        [ ("height", "100%")
        , ("box-sizing", "border-box")
        , ("background-image", "url(" ++ url ++ ")")
        , ("background-size", "cover")
        , ("padding", slidePadding)
        ]
    ]
  |> container


{- Text alignment -}
align : Align -> List (Content Model) -> Content Model
align align =
  let
    alignValue =
      case align of
        Left -> "left"
        Right -> "right"
        Center -> "center"
  in
    div [style [("text-align", alignValue)]]
    |> container


{- Title content item -}
title : String -> Content Model
title message =
  h1 [] [text message]
  |> item


{- Image -}
image : (Int, Int) -> String -> Content Model
image (wid, hei) url =
  img [src url, width wid, height hei, style [("vertical-align", "middle")]] []
  |> item


{- Richtext -}
richtext : String -> Content Model
richtext =
  Markdown.toHtml >> item


{- Code block -}
code : String -> String -> Content Model
code lang str =
  Markdown.toHtml ("```" ++ lang ++ "\n" ++ str ++ "\n```")
  |> item


{- Vertical spacing -}
spacing : Int -> Content Model
spacing px =
  div [style [("height", toString px ++ "px" )]] []
  |> item


{- Absolute positioning -}
position : (Int, Int) -> List (Content Model) -> Content Model
position (x, y) =
  div
    [ style
        [ ("position", "absolute")
        , ("left", toString x ++ "px")
        , ("top", toString y ++ "px")
        ]
    ]
  |> container


{- Demo -}
demo : String -> Content Model
demo url =
  iframe
    [ src url
    , style
        [ ("position", "absolute")
        , ("left", "0")
        , ("top", "0")
        , ("width", "100%")
        , ("height", "100%")
        , ("border", "0")
        ]
    ]
    []
  |> item


{- List -}
bullets : List (Content Model) -> Content Model
bullets = container (ul [])


{- List item -}
bullet : String -> Content Model
bullet str = item (li [] [text str])


{- Shout -}
shout : String -> Content Model
shout str =
  div
    [ style
        [ ("position", "absolute")
        , ("left", "0")
        , ("right", "0")
        , ("top", "0")
        , ("bottom", "0")
        , ("padding", slidePadding)
        , ("font", "90px/1.2 FiraSans-Light, sans-serif")
        , ("letter-spacing", "-2px")
        , ("text-align", "left")
        , ("display", "flex")
        , ("align-items", "center")
        ]
    ]
    [ div [] [text str]]
  |> item


split : List (Content Model) -> List (Content Model) -> Content Model
split leftContent rightContent =
  container
    ( table
        [ style
            [ ("width", "100%")
            , ("table-layout", "fixed")
            , ("border-spacing", "0")
            , ("border-collapse", "collapse")
            ]
        ]
    )
    [ container (td []) leftContent
    , container (td []) rightContent
    ]


icon : String -> Content Model
icon name =
  image (60, 60) ("assets/" ++ name ++ ".png")


char : String -> Content Model
char str =
  span
    [ style
        [ ("font", "30px/60px FiraSans-Regular, sans-serif")
        , ("display", "inline-block")
        , ("vertical-align", "middle")
        , ("color", "#666")
        ]
    ]
    [ text str ]
  |> item


group : List (Content Model) -> Content Model
group =
  div [] |> container

scale : Float -> List (Content Model) -> Content Model
scale ratio =
  div
    [ style
      [ ("transform", "scale(" ++ (toString ratio) ++ ")")
      , ("transform-origin", "0 0")
      ]
    ]
  |> container
