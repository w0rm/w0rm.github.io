module Model exposing (Model, sphere, triangle, subscriptions, update, view)

import Sphere
import Triangle
import Html exposing (Html)
import Messages exposing (Message)


type Model
    = Sphere Sphere.Model
    | Triangle Triangle.Model


sphere : Model
sphere =
    Sphere Sphere.initial


triangle : Model
triangle =
    Triangle Triangle.initial


subscriptions : Model -> Sub Message
subscriptions model =
    case model of
        Sphere sphere ->
            Sub.map Messages.Sphere (Sphere.subscriptions sphere)

        Triangle triangle ->
            Sub.map Messages.Triangle (Triangle.subscriptions triangle)


update : Message -> Model -> ( Model, Cmd Message )
update action model =
    case ( action, model ) of
        ( Messages.Sphere a, Sphere m ) ->
            let
                ( newModel, newCmd ) =
                    Sphere.update a m
            in
                ( Sphere newModel, Cmd.map Messages.Sphere newCmd )

        ( Messages.Triangle a, Triangle m ) ->
            let
                ( newModel, newCmd ) =
                    Triangle.update a m
            in
                ( Triangle newModel, Cmd.map Messages.Triangle newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Message
view model =
    case model of
        Sphere sphere ->
            Html.map Messages.Sphere (Sphere.view sphere)

        Triangle triangle ->
            Html.map Messages.Triangle (Triangle.view triangle)
