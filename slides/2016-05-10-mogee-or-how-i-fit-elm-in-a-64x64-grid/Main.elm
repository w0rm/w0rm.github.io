import Html exposing (Html)
import Task exposing (Task)
import Effects exposing (Effects, Never)
import SliceShow exposing (..)
import Model exposing (Model(..))
import Slides exposing (slides)
import Mogee

type Action
  = MogeeAction Mogee.Action


inputs : List (Signal Action)
inputs =
  [ Signal.map MogeeAction Mogee.input
  ]


update : Action -> Model -> (Model, Effects Action)
update action model =
  case (action, model) of
    (MogeeAction a, MogeeModel m) ->
      let
        (newModel, newEffect) = Mogee.update a m
      in
        (MogeeModel newModel, Effects.map MogeeAction newEffect)


view : Signal.Address Action -> Model -> Html
view action model =
  case model of
    MogeeModel fountain ->
      Mogee.view (Signal.forwardTo action MogeeAction) fountain


sliceShow : SliceShow
sliceShow =
  {- Init the slides -}
  init slides
  {- Set initial dimensions and locationHash from the corresponding ports -}
  |> setDimensions windowDimensions
  |> setHash locationHash
  {- Set inputs-update-view for the custom content -}
  |> setUpdate update
  |> setView view
  |> setInputs inputs
  {- Show the slides -}
  |> show


main : Signal Html
main = sliceShow.html


port tasks : Signal (Task Never ())
port tasks = sliceShow.tasks


port windowDimensions : (Int, Int)


port locationHash : String
