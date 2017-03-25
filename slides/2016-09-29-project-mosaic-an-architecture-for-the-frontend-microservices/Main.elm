module Main exposing (..)

import Html exposing (Html)
import SliceShow
import Model exposing (Model(..), Message(..))
import Slides exposing (slides)
import AnimatedImage
import AnimatedHtml


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case ( message, model ) of
        ( AnimatedImageMessage a, AnimatedImageModel m ) ->
            let
                ( newModel, newEffect ) =
                    AnimatedImage.update a m
            in
                ( AnimatedImageModel newModel, Cmd.map AnimatedImageMessage newEffect )

        ( AnimatedHtmlMessage a, AnimatedHtmlModel m ) ->
            let
                ( newModel, newEffect ) =
                    AnimatedHtml.update a m
            in
                ( AnimatedHtmlModel newModel, Cmd.map AnimatedHtmlMessage newEffect )

        _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Message
subscriptions model =
    case model of
        AnimatedImageModel m ->
            AnimatedImage.subscriptions m |> Sub.map AnimatedImageMessage

        AnimatedHtmlModel m ->
            AnimatedHtml.subscriptions m |> Sub.map AnimatedHtmlMessage


view : Model -> Html Message
view model =
    case model of
        AnimatedImageModel fountain ->
            AnimatedImage.view fountain |> Html.map AnimatedImageMessage

        AnimatedHtmlModel fountain ->
            AnimatedHtml.view fountain |> Html.map AnimatedHtmlMessage


main : Program Never (SliceShow.Model Model Message) (SliceShow.Message Message)
main =
    slides
        |> SliceShow.init
        |> SliceShow.setUpdate update
        |> SliceShow.setView view
        |> SliceShow.setSubscriptions subscriptions
        |> SliceShow.show
