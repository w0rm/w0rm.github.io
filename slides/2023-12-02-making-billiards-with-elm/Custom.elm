module Custom exposing
    ( Content
    , Model
    , Msg
    , Slide
    , subscriptions
    , thankYou
    , update
    , view
    )

import Custom.ThankYou as ThankYou
import Html exposing (Html)
import SliceShow.Content as Content
import SliceShow.Slide as Slide


type alias Content =
    Content.Content Model Msg


type alias Slide =
    Slide.Slide Model Msg


type Model
    = ThankYouModel ThankYou.Model


type Msg
    = ThankYouMsg ThankYou.Msg


thankYou : ThankYou.Options -> Content
thankYou options =
    Content.custom (ThankYouModel (ThankYou.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        ThankYouModel submodel ->
            Sub.map ThankYouMsg (ThankYou.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( ThankYouMsg a, ThankYouModel m ) ->
            let
                ( newModel, newCmd ) =
                    ThankYou.update a m
            in
            ( ThankYouModel newModel, Cmd.map ThankYouMsg newCmd )


view : Model -> Html Msg
view model =
    case model of
        ThankYouModel submodel ->
            Html.map ThankYouMsg (ThankYou.view submodel)
