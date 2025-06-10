module Custom exposing
    ( Content
    , Model
    , Msg
    , cover
    , duck
    , duckYUp
    , elm3d
    , fallingDucks
    , jeep
    , subscriptions
    , tangram
    , update
    , view
    )

import Custom.Cover as Cover
import Custom.Duck as Duck
import Custom.DuckYUp as DuckYUp
import Custom.Elm3D as Elm3D
import Custom.FallingDucks as FallingDucks
import Custom.Jeep as Jeep
import Custom.Tangram as Tangram
import Html exposing (Html)
import SliceShow


type alias Content =
    SliceShow.Content Model Msg


type alias FallingDucksOptions =
    { width : Int
    , height : Int
    }


type Model
    = JeepModel Jeep.Model
    | CoverModel Cover.Model
    | Elm3DModel Elm3D.Model
    | FallingDucksModel FallingDucks.Model
    | DuckModel Duck.Model
    | DuckYUpModel DuckYUp.Model
    | TangramModel Tangram.Model


type Msg
    = JeepMsg Jeep.Msg
    | CoverMsg Cover.Msg
    | Elm3DMsg Elm3D.Msg
    | FallingDucksMsg FallingDucks.Msg
    | DuckMsg Duck.Msg
    | DuckYUpMsg DuckYUp.Msg
    | TangramMsg Tangram.Msg


jeep : Jeep.Options -> Content
jeep options =
    SliceShow.custom (JeepModel (Jeep.initial options))


cover : Cover.Options -> Content
cover options =
    SliceShow.custom (CoverModel (Cover.initial options))


elm3d : { width : Int, height : Int } -> Content
elm3d options =
    SliceShow.custom (Elm3DModel (Elm3D.initial options))


fallingDucks : FallingDucksOptions -> Content
fallingDucks options =
    SliceShow.custom (FallingDucksModel (FallingDucks.initial options))


duck : Duck.Options -> Content
duck options =
    SliceShow.custom (DuckModel (Duck.initial options))


duckYUp : DuckYUp.Options -> Content
duckYUp options =
    SliceShow.custom (DuckYUpModel (DuckYUp.initial options))


tangram : Tangram.Options -> Content
tangram options =
    SliceShow.custom (TangramModel (Tangram.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        JeepModel submodel ->
            Sub.map JeepMsg (Jeep.subscriptions submodel)

        CoverModel submodel ->
            Sub.map CoverMsg (Cover.subscriptions submodel)

        Elm3DModel submodel ->
            Sub.map Elm3DMsg (Elm3D.subscriptions submodel)

        FallingDucksModel submodel ->
            Sub.map FallingDucksMsg (FallingDucks.subscriptions submodel)

        DuckModel submodel ->
            Sub.map DuckMsg (Duck.subscriptions submodel)

        DuckYUpModel submodel ->
            Sub.map DuckYUpMsg (DuckYUp.subscriptions submodel)

        TangramModel submodel ->
            Sub.map TangramMsg (Tangram.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( JeepMsg a, JeepModel m ) ->
            let
                ( newModel, newCmd ) =
                    Jeep.update a m
            in
            ( JeepModel newModel, Cmd.map JeepMsg newCmd )

        ( CoverMsg a, CoverModel m ) ->
            let
                ( newModel, newCmd ) =
                    Cover.update a m
            in
            ( CoverModel newModel, Cmd.map CoverMsg newCmd )

        ( Elm3DMsg a, Elm3DModel m ) ->
            let
                ( newModel, newCmd ) =
                    Elm3D.update a m
            in
            ( Elm3DModel newModel, Cmd.map Elm3DMsg newCmd )

        ( FallingDucksMsg a, FallingDucksModel m ) ->
            let
                ( newModel, newCmd ) =
                    FallingDucks.update a m
            in
            ( FallingDucksModel newModel, Cmd.map FallingDucksMsg newCmd )

        ( DuckMsg a, DuckModel m ) ->
            let
                ( newModel, newCmd ) =
                    Duck.update a m
            in
            ( DuckModel newModel, Cmd.map DuckMsg newCmd )

        ( DuckYUpMsg a, DuckYUpModel m ) ->
            let
                ( newModel, newCmd ) =
                    DuckYUp.update a m
            in
            ( DuckYUpModel newModel, Cmd.map DuckYUpMsg newCmd )

        ( TangramMsg a, TangramModel m ) ->
            let
                ( newModel, newCmd ) =
                    Tangram.update a m
            in
            ( TangramModel newModel, Cmd.map TangramMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        JeepModel submodel ->
            Html.map JeepMsg (Jeep.view submodel)

        CoverModel submodel ->
            Html.map CoverMsg (Cover.view submodel)

        Elm3DModel submodel ->
            Html.map Elm3DMsg (Elm3D.view submodel)

        FallingDucksModel submodel ->
            Html.map FallingDucksMsg (FallingDucks.view submodel)

        DuckModel submodel ->
            Html.map DuckMsg (Duck.view submodel)

        DuckYUpModel submodel ->
            Html.map DuckYUpMsg (DuckYUp.view submodel)

        TangramModel submodel ->
            Html.map TangramMsg (Tangram.view submodel)
