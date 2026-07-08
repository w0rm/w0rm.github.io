module Custom exposing
    ( Content
    , Model
    , Msg
    , boxStack
    , chain
    , chart
    , character
    , clock
    , craneClaw
    , dice
    , jeep
    , lack
    , raycastCar
    , rewind
    , seesaw
    , shapeLab
    , subscriptions
    , update
    , view
    )

import Custom.BoxStack as BoxStack
import Custom.Chain as Chain
import Custom.Charts as Charts
import Custom.Character as Character
import Custom.Clock as Clock
import Custom.CraneClaw as CraneClaw
import Custom.Dice as Dice
import Custom.Jeep as Jeep
import Custom.Lack as Lack
import Custom.RaycastCar as RaycastCar
import Custom.Rewind as Rewind
import Custom.Seesaw as Seesaw
import Custom.ShapeLab as ShapeLab
import Html exposing (Html)
import SliceShow


type alias Content =
    SliceShow.Content Model Msg


type Model
    = CraneClawModel CraneClaw.Model
    | BoxStackModel BoxStack.Model
    | ChainModel Chain.Model
    | ChartsModel Charts.Model
    | CharacterModel Character.Model
    | ClockModel Clock.Model
    | DiceModel Dice.Model
    | JeepModel Jeep.Model
    | LackModel Lack.Model
    | RaycastCarModel RaycastCar.Model
    | RewindModel Rewind.Model
    | SeesawModel Seesaw.Model
    | ShapeLabModel ShapeLab.Model


type Msg
    = CraneClawMsg CraneClaw.Msg
    | BoxStackMsg BoxStack.Msg
    | ChainMsg Chain.Msg
    | ChartsMsg Charts.Msg
    | CharacterMsg Character.Msg
    | ClockMsg Clock.Msg
    | DiceMsg Dice.Msg
    | JeepMsg Jeep.Msg
    | LackMsg Lack.Msg
    | RaycastCarMsg RaycastCar.Msg
    | RewindMsg Rewind.Msg
    | SeesawMsg Seesaw.Msg
    | ShapeLabMsg ShapeLab.Msg


craneClaw : CraneClaw.Options -> Content
craneClaw options =
    SliceShow.custom (CraneClawModel (CraneClaw.initial options))


boxStack : BoxStack.Options -> Content
boxStack options =
    SliceShow.custom (BoxStackModel (BoxStack.initial options))


chain : Chain.Options -> Content
chain options =
    SliceShow.custom (ChainModel (Chain.initial options))


chart : Charts.Options -> Content
chart options =
    SliceShow.custom (ChartsModel (Charts.initial options))


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


rewind : Rewind.Options -> Content
rewind options =
    SliceShow.custom (RewindModel (Rewind.initial options))


seesaw : Seesaw.Options -> Content
seesaw options =
    SliceShow.custom (SeesawModel (Seesaw.initial options))


shapeLab : ShapeLab.Options -> Content
shapeLab options =
    SliceShow.custom (ShapeLabModel (ShapeLab.initial options))


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        CraneClawModel submodel ->
            Sub.map CraneClawMsg (CraneClaw.subscriptions submodel)

        BoxStackModel submodel ->
            Sub.map BoxStackMsg (BoxStack.subscriptions submodel)

        ChainModel submodel ->
            Sub.map ChainMsg (Chain.subscriptions submodel)

        ChartsModel submodel ->
            Sub.map ChartsMsg (Charts.subscriptions submodel)

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

        RewindModel submodel ->
            Sub.map RewindMsg (Rewind.subscriptions submodel)

        SeesawModel submodel ->
            Sub.map SeesawMsg (Seesaw.subscriptions submodel)

        ShapeLabModel submodel ->
            Sub.map ShapeLabMsg (ShapeLab.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( CraneClawMsg a, CraneClawModel m ) ->
            let
                ( newModel, newCmd ) =
                    CraneClaw.update a m
            in
            ( CraneClawModel newModel, Cmd.map CraneClawMsg newCmd )

        ( BoxStackMsg a, BoxStackModel m ) ->
            let
                ( newModel, newCmd ) =
                    BoxStack.update a m
            in
            ( BoxStackModel newModel, Cmd.map BoxStackMsg newCmd )

        ( ChartsMsg a, ChartsModel m ) ->
            let
                ( newModel, newCmd ) =
                    Charts.update a m
            in
            ( ChartsModel newModel, Cmd.map ChartsMsg newCmd )

        ( ChainMsg a, ChainModel m ) ->
            let
                ( newModel, newCmd ) =
                    Chain.update a m
            in
            ( ChainModel newModel, Cmd.map ChainMsg newCmd )

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

        ( RewindMsg a, RewindModel m ) ->
            let
                ( newModel, newCmd ) =
                    Rewind.update a m
            in
            ( RewindModel newModel, Cmd.map RewindMsg newCmd )

        ( SeesawMsg a, SeesawModel m ) ->
            let
                ( newModel, newCmd ) =
                    Seesaw.update a m
            in
            ( SeesawModel newModel, Cmd.map SeesawMsg newCmd )

        ( ShapeLabMsg a, ShapeLabModel m ) ->
            let
                ( newModel, newCmd ) =
                    ShapeLab.update a m
            in
            ( ShapeLabModel newModel, Cmd.map ShapeLabMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        CraneClawModel submodel ->
            Html.map CraneClawMsg (CraneClaw.view submodel)

        BoxStackModel submodel ->
            Html.map BoxStackMsg (BoxStack.view submodel)

        ChainModel submodel ->
            Html.map ChainMsg (Chain.view submodel)

        ChartsModel submodel ->
            Html.map ChartsMsg (Charts.view submodel)

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

        RewindModel submodel ->
            Html.map RewindMsg (Rewind.view submodel)

        SeesawModel submodel ->
            Html.map SeesawMsg (Seesaw.view submodel)

        ShapeLabModel submodel ->
            Html.map ShapeLabMsg (ShapeLab.view submodel)
