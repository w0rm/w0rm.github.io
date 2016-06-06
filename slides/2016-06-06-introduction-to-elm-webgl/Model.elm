module Model exposing (Model, sphere, triangle, subscriptions, update, view)

import Sphere
import Triangle
import Html.App as Html
import Html exposing (Html)
import Actions exposing (Action)

type Model
  = Sphere Sphere.Model
  | Triangle Triangle.Model


sphere : Model
sphere =
  Sphere Sphere.initial


triangle : Model
triangle =
  Triangle Triangle.initial


subscriptions : Model -> Sub Action
subscriptions model =
  case model of
    Sphere sphere ->
      Sub.map Actions.Sphere (Sphere.subscriptions sphere)
    Triangle triangle ->
      Sub.map Actions.Triangle (Triangle.subscriptions triangle)


update : Action -> Model -> (Model, Cmd Action)
update action model =
  case (action, model) of
    (Actions.Sphere a, Sphere m) ->
      let
        (newModel, newCmd) = Sphere.update a m
      in
        (Sphere newModel, Cmd.map Actions.Sphere newCmd)
    (Actions.Triangle a, Triangle m) ->
      let
        (newModel, newCmd) = Triangle.update a m
      in
        (Triangle newModel, Cmd.map Actions.Triangle newCmd)
    _ ->
      (model, Cmd.none)


view : Model -> Html Action
view model =
  case model of
    Sphere sphere ->
      Html.map Actions.Sphere (Sphere.view sphere)
    Triangle triangle ->
      Html.map Actions.Triangle (Triangle.view triangle)
