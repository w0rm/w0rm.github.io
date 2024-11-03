module Custom exposing
    ( Content
    , Model
    , Msg
    , Slide
    , animatedGradient
    , meshGradient
    , pointGradient
    , subscriptions
    , update
    , view
    )

import Custom.AnimatedGradient as AnimatedGradient
import Custom.MeshGradient as MeshGradient
import Custom.PointGradient as PointGradient
import Html exposing (Html)
import SliceShow.Content as Content
import SliceShow.Slide as Slide


type alias Content =
    Content.Content Model Msg


type alias Slide =
    Slide.Slide Model Msg


type Model
    = MeshGradientModel MeshGradient.Model
    | PointGradientModel PointGradient.Model
    | AnimatedGradientModel AnimatedGradient.Model


type Msg
    = MeshGradientMsg MeshGradient.Msg
    | PointGradientMsg PointGradient.Msg
    | AnimatedGradientMsg AnimatedGradient.Msg


meshGradient : MeshGradient.Options -> Content
meshGradient options =
    Content.custom (MeshGradientModel (MeshGradient.initial options))


pointGradient : PointGradient.Options -> Content
pointGradient options =
    Content.custom (PointGradientModel (PointGradient.initial options))


animatedGradient : AnimatedGradient.Options -> Content
animatedGradient options =
    Content.custom (AnimatedGradientModel (AnimatedGradient.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        MeshGradientModel submodel ->
            Sub.map MeshGradientMsg (MeshGradient.subscriptions submodel)

        PointGradientModel submodel ->
            Sub.map PointGradientMsg (PointGradient.subscriptions submodel)

        AnimatedGradientModel submodel ->
            Sub.map AnimatedGradientMsg (AnimatedGradient.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( MeshGradientMsg a, MeshGradientModel m ) ->
            let
                ( newModel, newCmd ) =
                    MeshGradient.update a m
            in
            ( MeshGradientModel newModel, Cmd.map MeshGradientMsg newCmd )

        ( PointGradientMsg a, PointGradientModel m ) ->
            let
                ( newModel, newCmd ) =
                    PointGradient.update a m
            in
            ( PointGradientModel newModel, Cmd.map PointGradientMsg newCmd )

        ( AnimatedGradientMsg a, AnimatedGradientModel m ) ->
            let
                ( newModel, newCmd ) =
                    AnimatedGradient.update a m
            in
            ( AnimatedGradientModel newModel, Cmd.map AnimatedGradientMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        MeshGradientModel submodel ->
            Html.map MeshGradientMsg (MeshGradient.view submodel)

        PointGradientModel submodel ->
            Html.map PointGradientMsg (PointGradient.view submodel)

        AnimatedGradientModel submodel ->
            Html.map AnimatedGradientMsg (AnimatedGradient.view submodel)
