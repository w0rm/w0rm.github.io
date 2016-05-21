import Html exposing (Html)
import Task exposing (Task)
import Effects exposing (Effects, Never)
import SliceShow exposing (..)
import Model exposing (Model(..))
import Slides exposing (slides)
import Fountain
import Pathfinder

type Action
  = FountainAction Fountain.Action
  | PathfinderAction Pathfinder.Action


update : Action -> Model -> (Model, Effects Action)
update action model =
  case (action, model) of
    (FountainAction a, FountainModel m) ->
      let
        (newModel, newEffect) = Fountain.update a m
      in
        (FountainModel newModel, Effects.map FountainAction newEffect)
    (PathfinderAction a, PathfinderModel m) ->
      let
        (newModel, newEffect) = Pathfinder.update a m
      in
        (PathfinderModel newModel, Effects.map PathfinderAction newEffect)
    _ -> (model, Effects.none)


view : Signal.Address Action -> Model -> Html
view action model =
  case model of
    FountainModel fountain ->
      Fountain.view (Signal.forwardTo action FountainAction) fountain
    PathfinderModel pathfinder ->
      Pathfinder.view (Signal.forwardTo action PathfinderAction) pathfinder


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
  {- Show the slides -}
  |> show


main : Signal Html
main = sliceShow.html


port tasks : Signal (Task Never ())
port tasks = sliceShow.tasks


port windowDimensions : (Int, Int)


port locationHash : String
