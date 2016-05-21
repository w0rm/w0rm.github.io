module Formatting
  ( background
  , padded
  , title
  , image
  , richtext
  , spacing
  , position
  , demo
  , bullets
  , bullet
  , code
  , shout
  , group
  , scale
  , node
  , arrow
  , split
  ) where

import Model exposing (Model)
import SliceShow.Content exposing (..)
import Html exposing (div, h1, text, img, iframe, ul, li, table, td)
import Html.Attributes exposing (style, width, height, src)
import Svg exposing (svg, line)
import Svg.Attributes exposing (x1, y1, x2, y2, stroke, markerEnd, strokeWidth, viewBox)

import Markdown


slidePadding : String
slidePadding = "50px 100px"


slideStyles : List (String, String)
slideStyles =
  [ ("padding", slidePadding)
  , ("height", "640px")
  , ("box-sizing", "border-box")
  , ("color", "#eee")
  , ("position", "relative")
  ]


{- Custom slide that adds the padding -}
padded : List (Content Model) -> Content Model
padded =
  div [style (("background-color", "#161116") :: slideStyles)] |> container


{- Custom slide with the background -}
background : String -> List (Content Model) -> Content Model
background url =
  div
    [ style
        ( slideStyles ++
          [ ("background-image", "url(" ++ url ++ ")")
          , ("background-size", "cover")
          , ("background-color", "#000")
          ]
        )
    ]
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


{- node -}
node : (Int, Int) -> String -> Content Model
node (x, y) str =
  div
    [ style
        [ ("position", "absolute")
        , ("left", toString x ++ "px")
        , ("top", toString y ++ "px")
        , ("font-family", "FiraCode")
        , ("font-size", "20px")
        ]
    ]
    [text str]
  |> item


{- arrow -}
arrow : (Int, Int) -> (Int, Int) -> Content Model
arrow (x01, y01) (x02, y02) =
  let
    border = 20
    x = min x01 x02 - border
    y = min y01 y02 - border
    wid = max x01 x02 - x + border
    hei = max y01 y02 - y + border
  in
    svg
      [ style
          [ ("position", "absolute")
          , ("left", toString x ++ "px")
          , ("top", toString y ++ "px")
          , ("width", toString wid ++ "px")
          , ("height", toString hei ++ "px")
          ]
      , viewBox ("0 0 " ++ toString wid ++ " " ++ toString hei ++ "")
      ]
      [ line
          [ x1 (toString (x01 - x))
          , x2 (toString (x02 - x))
          , y1 (toString (y01 - y))
          , y2 (toString (y02 - y))
          , stroke "#808e69"
          , strokeWidth "5"
          , markerEnd "url(#arrow)"
          ]
          []

      ]
    |> item


{- Demo -}
demo : String -> String -> String -> Content Model
demo width height url =
  iframe
    [ src url
    , style
        [ ("width", width)
        , ("height", height)
        , ("border", "0")
        , ("display", "block")
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
        ( slideStyles ++
          [ ("background-color", "#161116")
          , ("font-size", "72px")
          , ("line-height", "1.2")
          , ("text-align", "left")
          , ("display", "flex")
          , ("align-items", "center")
          ]
        )
    ]
    [ div [] [text str]]
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
