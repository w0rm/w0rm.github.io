module Custom exposing
    ( Content
    , Model
    , Msg
    , Slide
    , cover
    , finalDemo
    , hingeCar
    , lack
    , subscriptions
    , update
    , view
    )

import Custom.Cover as Cover
import Custom.FinalDemo as FinalDemo
import Custom.HingeCar as HingeCar
import Custom.Lack as Lack
import Html exposing (Html)
import SliceShow.Content as Content
import SliceShow.Slide as Slide


type alias Content =
    Content.Content Model Msg


type alias Slide =
    Slide.Slide Model Msg


type Model
    = FinalDemoModel FinalDemo.Model
    | CoverModel Cover.Model
    | LackModel Lack.Model
    | HingeCarModel HingeCar.Model


type Msg
    = FinalDemoMsg FinalDemo.Msg
    | CoverMsg Cover.Msg
    | LackMsg Lack.Msg
    | HingeCarMsg HingeCar.Msg


finalDemo : FinalDemo.Options -> Content
finalDemo options =
    Content.custom (FinalDemoModel (FinalDemo.initial options))


cover : Cover.Options -> Content
cover options =
    Content.custom (CoverModel (Cover.initial options))


lack : Lack.Options -> Content
lack options =
    Content.custom (LackModel (Lack.initial options))


hingeCar : HingeCar.Options -> Content
hingeCar options =
    Content.custom (HingeCarModel (HingeCar.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        FinalDemoModel submodel ->
            Sub.map FinalDemoMsg (FinalDemo.subscriptions submodel)

        CoverModel submodel ->
            Sub.map CoverMsg (Cover.subscriptions submodel)

        LackModel submodel ->
            Sub.map LackMsg (Lack.subscriptions submodel)

        HingeCarModel submodel ->
            Sub.map HingeCarMsg (HingeCar.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( FinalDemoMsg a, FinalDemoModel m ) ->
            let
                ( newModel, newCmd ) =
                    FinalDemo.update a m
            in
            ( FinalDemoModel newModel, Cmd.map FinalDemoMsg newCmd )

        ( CoverMsg a, CoverModel m ) ->
            let
                ( newModel, newCmd ) =
                    Cover.update a m
            in
            ( CoverModel newModel, Cmd.map CoverMsg newCmd )

        ( LackMsg a, LackModel m ) ->
            let
                ( newModel, newCmd ) =
                    Lack.update a m
            in
            ( LackModel newModel, Cmd.map LackMsg newCmd )

        ( HingeCarMsg a, HingeCarModel m ) ->
            let
                ( newModel, newCmd ) =
                    HingeCar.update a m
            in
            ( HingeCarModel newModel, Cmd.map HingeCarMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        FinalDemoModel submodel ->
            Html.map FinalDemoMsg (FinalDemo.view submodel)

        CoverModel submodel ->
            Html.map CoverMsg (Cover.view submodel)

        LackModel submodel ->
            Html.map LackMsg (Lack.view submodel)

        HingeCarModel submodel ->
            Html.map HingeCarMsg (HingeCar.view submodel)
