module Fountain (Model, Action, initial, update, view) where

import Time exposing (Time)
import Effects exposing (Effects)
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)


type Action = Click | Tick Time

type State = Playing | Stopped


type alias Model =
  { prevTime : Maybe Time
  , state : State
  , frame : Int
  , elapsed : Time
  , timeout : Time
  }


update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Click ->
      if model.state == Playing then
        ({model | state = Stopped}, Effects.none)
      else
        ({model | state = Playing}, Effects.tick Tick)
    Tick time ->
      if model.state == Playing then
        (animate time model, Effects.tick Tick)
      else
        ({model | prevTime = Nothing}, Effects.none)


view : Signal.Address Action -> Model -> Html.Html
view address {state, frame, elapsed, timeout} =
  div
    []
    [ div
        [ style
            [ ("float", "left")
            , ("width", "200px")
            , ("padding", "30px 0 0 0")
            ]
        ]
        [ div [] [text ("state = " ++ if state == Playing then "Playing" else "Stopped" )]
        , div [] [text ("timeout = " ++ toString timeout)]
        , div [] [text ("elapsed = " ++ toString (round elapsed))]
        , div [] [text ("frame = " ++ toString frame)]
        ]
    , div
        [ onClick address Click
        , style
            [ ("position", "relative")
            , ("float", "left")
            , ("height", "160px")
            , ("width", "240px")
            , ("cursor", "pointer")
            , ("background-image", "url(assets/fountain-base.png)")
            , ("background-repeat", "no-repeat")
            , ("background-position", "bottom")
            ]
        ]
        [ div
            [ style
                [ ("width", "80px")
                , ("height", "160px")
                , ("position", "absolute")
                , ("top", "-80px")
                , ("left", "80px")
                , ("background-image", "url(assets/fountain-spring.png)")
                , ("background-position", toString (-frame * 80) ++ "px 0")
                ]
            ]
            []
        ]
    , div [style [("clear", "both")]] []
    ]


initial : Model
initial =
  { state = Stopped
  , prevTime = Nothing
  , elapsed = 0
  , timeout = 1000
  , frame = 0
  }


animate : Time -> Model -> Model
animate time model =
  case model.prevTime of
    Nothing ->
      {model | prevTime = Just time}
    Just prevTime ->
      animationLoop (Basics.min (time - prevTime) 25) {model | prevTime = Just time}


animationLoop : Time -> Model -> Model
animationLoop elapsed state =
  let
    elapsed' = state.elapsed + elapsed
  in
    if elapsed' >= state.timeout then
      { state | elapsed = elapsed' - state.timeout
      , frame = (state.frame + 1) % 4
      }
    else
      {state | elapsed = elapsed'}
