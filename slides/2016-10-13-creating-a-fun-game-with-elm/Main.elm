module Main exposing (..)

import Html exposing (Html)
import SliceShow
import Model exposing (Model(..), Message(..))
import Slides exposing (slides)
import Fountain
import Pathfinder
import Sphere
import Randomize
import AnimatedImage
import AnimatedHtml


update : Message -> Model -> ( Model, Cmd Message )
update message model =
    case ( message, model ) of
        ( SphereMessage a, SphereModel m ) ->
            let
                ( newModel, newEffect ) =
                    Sphere.update a m
            in
                ( SphereModel newModel, Cmd.map SphereMessage newEffect )

        ( FountainMessage a, FountainModel m ) ->
            let
                ( newModel, newEffect ) =
                    Fountain.update a m
            in
                ( FountainModel newModel, Cmd.map FountainMessage newEffect )

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

        ( PathfinderMessage a, PathfinderModel m ) ->
            let
                ( newModel, newEffect ) =
                    Pathfinder.update a m
            in
                ( PathfinderModel newModel, Cmd.map PathfinderMessage newEffect )

        ( RandomizeMessage a, RandomizeModel m ) ->
            let
                ( newModel, newEffect ) =
                    Randomize.update a m
            in
                ( RandomizeModel newModel, Cmd.map RandomizeMessage newEffect )

        _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Message
subscriptions model =
    case model of
        FountainModel m ->
            Fountain.subscriptions m |> Sub.map FountainMessage

        AnimatedImageModel m ->
            AnimatedImage.subscriptions m |> Sub.map AnimatedImageMessage

        AnimatedHtmlModel m ->
            AnimatedHtml.subscriptions m |> Sub.map AnimatedHtmlMessage

        SphereModel m ->
            Sphere.subscriptions m |> Sub.map SphereMessage

        _ ->
            Sub.none


view : Model -> Html Message
view model =
    case model of
        FountainModel fountain ->
            Fountain.view fountain |> Html.map FountainMessage

        SphereModel fountain ->
            Sphere.view fountain |> Html.map SphereMessage

        AnimatedImageModel fountain ->
            AnimatedImage.view fountain |> Html.map AnimatedImageMessage

        AnimatedHtmlModel fountain ->
            AnimatedHtml.view fountain |> Html.map AnimatedHtmlMessage

        PathfinderModel pathfinder ->
            Pathfinder.view pathfinder |> Html.map PathfinderMessage

        RandomizeModel randomize ->
            Randomize.view randomize |> Html.map RandomizeMessage


main : Program Never (SliceShow.Model Model Message) (SliceShow.Message Message)
main =
    slides
        |> SliceShow.init
        |> SliceShow.setUpdate update
        |> SliceShow.setView view
        |> SliceShow.setSubscriptions subscriptions
        {- Show the slides -} |> SliceShow.show
