module Mogee (Model, Action, initial, update, input, view) where

import Effects exposing (Effects)
import Html exposing (..)
import Html.Attributes exposing (..)
import Time exposing (Time)

type alias Action = Time

type alias Model = List Int


input : Signal Action
input =
  Time.fps 2


update : Action -> Model -> (Model, Effects Action)
update _ model =
  (animate model, Effects.none)


view : Signal.Address Action -> Model -> Html.Html
view _ frames =
  let
    frame = List.head frames |> Maybe.withDefault 0
  in
    div
        [ style
            [ ("width", "69px")
            , ("height", "100px")
            , ("background-image", "url(assets/mogee.png)")
            , ("background-size", "210px 100px")
            , ("background-position", toString (-frame * 70) ++ "px 0")
            ]
        ]
        []


initial : Model
initial =
  [0, 1, 2, 1]


animate : Model -> Model
animate frames =
  case frames of
    [] -> []
    frame :: rest -> rest ++ [frame]
