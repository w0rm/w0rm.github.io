module Custom exposing
    ( Content
    , Model
    , Msg
    , Slide
    , challenges
    , dice
    , dominoes
    , future
    , lack
    , performance
    , snapshots
    , subscriptions
    , troubleshooting
    , update
    , view
    , why
    )

import Custom.Challenges as Challenges
import Custom.Dice as Dice
import Custom.Dominoes as Dominoes
import Custom.Future as Future
import Custom.Lack as Lack
import Custom.Performance as Performance
import Custom.Snapshots as Snapshots
import Custom.Troubleshooting as Troubleshooting
import Custom.Why as Why
import Html exposing (Html)
import SliceShow.Content as Content
import SliceShow.Slide as Slide


type alias Content =
    Content.Content Model Msg


type alias Slide =
    Slide.Slide Model Msg


type Model
    = WhyModel Why.Model
    | LackModel Lack.Model
    | SnapshotsModel Snapshots.Model
    | PerformanceModel Performance.Model
    | ChallengesModel Challenges.Model
    | DiceModel Dice.Model
    | DominoesModel Dominoes.Model
    | FutureModel Future.Model
    | TroubleshootingModel Troubleshooting.Model


type Msg
    = WhyMsg Why.Msg
    | LackMsg Lack.Msg
    | SnapshotsMsg Snapshots.Msg
    | PerformanceMsg Performance.Msg
    | ChallengesMsg Challenges.Msg
    | DiceMsg Dice.Msg
    | DominoesMsg Dominoes.Msg
    | FutureMsg Future.Msg
    | TroubleshootingMsg Troubleshooting.Msg


why : Why.Options -> Content
why options =
    Content.custom (WhyModel (Why.initial options))


lack : Lack.Options -> Content
lack options =
    Content.custom (LackModel (Lack.initial options))


snapshots : Snapshots.Options -> Content
snapshots options =
    Content.custom (SnapshotsModel (Snapshots.initial options))


performance : Performance.Options -> Content
performance options =
    Content.custom (PerformanceModel (Performance.initial options))


challenges : Challenges.Options -> Content
challenges options =
    Content.custom (ChallengesModel (Challenges.initial options))


dice : Dice.Options -> Content
dice options =
    Content.custom (DiceModel (Dice.initial options))


dominoes : Dominoes.Options -> Content
dominoes options =
    Content.custom (DominoesModel (Dominoes.initial options))


future : Future.Options -> Content
future options =
    Content.custom (FutureModel (Future.initial options))


troubleshooting : Troubleshooting.Options -> Content
troubleshooting options =
    Content.custom (TroubleshootingModel (Troubleshooting.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        WhyModel submodel ->
            Sub.map WhyMsg (Why.subscriptions submodel)

        LackModel submodel ->
            Sub.map LackMsg (Lack.subscriptions submodel)

        SnapshotsModel submodel ->
            Sub.map SnapshotsMsg (Snapshots.subscriptions submodel)

        PerformanceModel submodel ->
            Sub.map PerformanceMsg (Performance.subscriptions submodel)

        ChallengesModel submodel ->
            Sub.map ChallengesMsg (Challenges.subscriptions submodel)

        DiceModel submodel ->
            Sub.map DiceMsg (Dice.subscriptions submodel)

        DominoesModel submodel ->
            Sub.map DominoesMsg (Dominoes.subscriptions submodel)

        FutureModel submodel ->
            Sub.map FutureMsg (Future.subscriptions submodel)

        TroubleshootingModel submodel ->
            Sub.map TroubleshootingMsg (Troubleshooting.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( WhyMsg a, WhyModel m ) ->
            let
                ( newModel, newCmd ) =
                    Why.update a m
            in
            ( WhyModel newModel, Cmd.map WhyMsg newCmd )

        ( LackMsg a, LackModel m ) ->
            let
                ( newModel, newCmd ) =
                    Lack.update a m
            in
            ( LackModel newModel, Cmd.map LackMsg newCmd )

        ( SnapshotsMsg a, SnapshotsModel m ) ->
            let
                ( newModel, newCmd ) =
                    Snapshots.update a m
            in
            ( SnapshotsModel newModel, Cmd.map SnapshotsMsg newCmd )

        ( PerformanceMsg a, PerformanceModel m ) ->
            let
                ( newModel, newCmd ) =
                    Performance.update a m
            in
            ( PerformanceModel newModel, Cmd.map PerformanceMsg newCmd )

        ( ChallengesMsg a, ChallengesModel m ) ->
            let
                ( newModel, newCmd ) =
                    Challenges.update a m
            in
            ( ChallengesModel newModel, Cmd.map ChallengesMsg newCmd )

        ( DiceMsg a, DiceModel m ) ->
            let
                ( newModel, newCmd ) =
                    Dice.update a m
            in
            ( DiceModel newModel, Cmd.map DiceMsg newCmd )

        ( DominoesMsg a, DominoesModel m ) ->
            let
                ( newModel, newCmd ) =
                    Dominoes.update a m
            in
            ( DominoesModel newModel, Cmd.map DominoesMsg newCmd )

        ( FutureMsg a, FutureModel m ) ->
            let
                ( newModel, newCmd ) =
                    Future.update a m
            in
            ( FutureModel newModel, Cmd.map FutureMsg newCmd )

        ( TroubleshootingMsg a, TroubleshootingModel m ) ->
            let
                ( newModel, newCmd ) =
                    Troubleshooting.update a m
            in
            ( TroubleshootingModel newModel, Cmd.map TroubleshootingMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        WhyModel submodel ->
            Html.map WhyMsg (Why.view submodel)

        LackModel submodel ->
            Html.map LackMsg (Lack.view submodel)

        SnapshotsModel submodel ->
            Html.map SnapshotsMsg (Snapshots.view submodel)

        PerformanceModel submodel ->
            Html.map PerformanceMsg (Performance.view submodel)

        ChallengesModel submodel ->
            Html.map ChallengesMsg (Challenges.view submodel)

        DiceModel submodel ->
            Html.map DiceMsg (Dice.view submodel)

        DominoesModel submodel ->
            Html.map DominoesMsg (Dominoes.view submodel)

        FutureModel submodel ->
            Html.map FutureMsg (Future.view submodel)

        TroubleshootingModel submodel ->
            Html.map TroubleshootingMsg (Troubleshooting.view submodel)
