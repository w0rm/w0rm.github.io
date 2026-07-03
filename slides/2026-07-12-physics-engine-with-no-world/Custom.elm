module Custom exposing
    ( Content
    , Model
    , Msg
    , character
    , clock
    , craneClaw
    , dice
    , jeep
    , lack
    , raycastCar
    , subscriptions
    , update
    , view
    )

import Custom.Character as Character
import Custom.Clock as Clock
import Custom.CraneClaw as CraneClaw
import Custom.Dice as Dice
import Custom.Jeep as Jeep
import Custom.Lack as Lack
import Custom.RaycastCar as RaycastCar
import Html exposing (Html)
import SliceShow


type alias Content =
    SliceShow.Content Model Msg


type Model
    = CraneClawModel CraneClaw.Model
    | CharacterModel Character.Model
    | ClockModel Clock.Model
    | DiceModel Dice.Model
    | JeepModel Jeep.Model
    | LackModel Lack.Model
    | RaycastCarModel RaycastCar.Model


type Msg
    = CraneClawMsg CraneClaw.Msg
    | CharacterMsg Character.Msg
    | ClockMsg Clock.Msg
    | DiceMsg Dice.Msg
    | JeepMsg Jeep.Msg
    | LackMsg Lack.Msg
    | RaycastCarMsg RaycastCar.Msg


craneClaw : CraneClaw.Options -> Content
craneClaw options =
    SliceShow.custom (CraneClawModel (CraneClaw.initial options))


character : Character.Options -> Content
character options =
    SliceShow.custom (CharacterModel (Character.initial options))


clock : Clock.Options -> Content
clock options =
    SliceShow.custom (ClockModel (Clock.initial options))


dice : Dice.Options -> Content
dice options =
    SliceShow.custom (DiceModel (Dice.initial options))


jeep : Jeep.Options -> Content
jeep options =
    SliceShow.custom (JeepModel (Jeep.initial options))


lack : Lack.Options -> Content
lack options =
    SliceShow.custom (LackModel (Lack.initial options))


raycastCar : RaycastCar.Options -> Content
raycastCar options =
    SliceShow.custom (RaycastCarModel (RaycastCar.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        CraneClawModel submodel ->
            Sub.map CraneClawMsg (CraneClaw.subscriptions submodel)

        CharacterModel submodel ->
            Sub.map CharacterMsg (Character.subscriptions submodel)

        ClockModel submodel ->
            Sub.map ClockMsg (Clock.subscriptions submodel)

        DiceModel submodel ->
            Sub.map DiceMsg (Dice.subscriptions submodel)

        JeepModel submodel ->
            Sub.map JeepMsg (Jeep.subscriptions submodel)

        LackModel submodel ->
            Sub.map LackMsg (Lack.subscriptions submodel)

        RaycastCarModel submodel ->
            Sub.map RaycastCarMsg (RaycastCar.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( CraneClawMsg a, CraneClawModel m ) ->
            let
                ( newModel, newCmd ) =
                    CraneClaw.update a m
            in
            ( CraneClawModel newModel, Cmd.map CraneClawMsg newCmd )

        ( CharacterMsg a, CharacterModel m ) ->
            let
                ( newModel, newCmd ) =
                    Character.update a m
            in
            ( CharacterModel newModel, Cmd.map CharacterMsg newCmd )

        ( ClockMsg a, ClockModel m ) ->
            let
                ( newModel, newCmd ) =
                    Clock.update a m
            in
            ( ClockModel newModel, Cmd.map ClockMsg newCmd )

        ( DiceMsg a, DiceModel m ) ->
            let
                ( newModel, newCmd ) =
                    Dice.update a m
            in
            ( DiceModel newModel, Cmd.map DiceMsg newCmd )

        ( JeepMsg a, JeepModel m ) ->
            let
                ( newModel, newCmd ) =
                    Jeep.update a m
            in
            ( JeepModel newModel, Cmd.map JeepMsg newCmd )

        ( LackMsg a, LackModel m ) ->
            let
                ( newModel, newCmd ) =
                    Lack.update a m
            in
            ( LackModel newModel, Cmd.map LackMsg newCmd )

        ( RaycastCarMsg a, RaycastCarModel m ) ->
            let
                ( newModel, newCmd ) =
                    RaycastCar.update a m
            in
            ( RaycastCarModel newModel, Cmd.map RaycastCarMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        CraneClawModel submodel ->
            Html.map CraneClawMsg (CraneClaw.view submodel)

        CharacterModel submodel ->
            Html.map CharacterMsg (Character.view submodel)

        ClockModel submodel ->
            Html.map ClockMsg (Clock.view submodel)

        DiceModel submodel ->
            Html.map DiceMsg (Dice.view submodel)

        JeepModel submodel ->
            Html.map JeepMsg (Jeep.view submodel)

        LackModel submodel ->
            Html.map LackMsg (Lack.view submodel)

        RaycastCarModel submodel ->
            Html.map RaycastCarMsg (RaycastCar.view submodel)
