module Custom
    exposing
        ( Content
        , Model
        , Msg
        , Slide
        , cubicglyph
        , ivernifont
        , metrics
        , outline
        , outlines
        , pixelfont
        , pixelglyph
        , sort
        , subscriptions
        , typewriter
        , update
        , view
        , wordwapping
        , zoom
        )

import Custom.Cubicglyph as Cubicglyph
import Custom.Ivernifont as Ivernifont
import Custom.Metrics as Metrics
import Custom.Outline as Outline
import Custom.Outlines as Outlines
import Custom.Pixelfont as Pixelfont
import Custom.Pixelglyph as Pixelglyph
import Custom.Sort as Sort
import Custom.Typewriter as Typewriter
import Custom.Wordwrapping as Wordwrapping
import Custom.Zoom as Zoom
import Html exposing (Html)
import SliceShow.Content as Content
import SliceShow.Slide as Slide


type alias Content =
    Content.Content Model Msg


type alias Slide =
    Slide.Slide Model Msg


type Model
    = SortModel Sort.Model
    | ZoomModel Zoom.Model
    | TypewriterModel Typewriter.Model
    | PixelfontModel Pixelfont.Model
    | MetricsModel Metrics.Model
    | OutlinesModel Outlines.Model
    | PixelglyphModel Pixelglyph.Model
    | CubicglyphModel Cubicglyph.Model


type Msg
    = SortMsg Sort.Msg
    | ZoomMsg Zoom.Msg
    | TypewriterMsg Typewriter.Msg
    | PixelfontMsg Pixelfont.Msg
    | MetricsMsg Metrics.Msg
    | OutlinesMsg Outlines.Msg
    | PixelglyphMsg Pixelglyph.Msg
    | CubicglyphMsg Cubicglyph.Msg


sort : Sort.Options -> Content
sort options =
    Content.custom (SortModel (Sort.initial options))


zoom : Zoom.Options -> Content
zoom options =
    Content.custom (ZoomModel (Zoom.initial options))


typewriter : Typewriter.Options -> Content
typewriter options =
    Content.custom (TypewriterModel (Typewriter.initial options))


pixelfont : Pixelfont.Options -> Content
pixelfont options =
    Content.custom (PixelfontModel (Pixelfont.initial options))


metrics : Metrics.Options -> Content
metrics options =
    Content.custom (MetricsModel (Metrics.initial options))


outline : Outline.Options -> Content
outline options =
    Content.item (Outline.view options)


ivernifont : Ivernifont.Options -> Content
ivernifont options =
    Content.item (Ivernifont.view options)


outlines : Outlines.Options -> Content
outlines options =
    Content.custom (OutlinesModel (Outlines.initial options))


pixelglyph : Pixelglyph.Options -> Content
pixelglyph options =
    Content.custom (PixelglyphModel (Pixelglyph.initial options))


cubicglyph : Cubicglyph.Options -> Content
cubicglyph options =
    Content.custom (CubicglyphModel (Cubicglyph.initial options))


wordwapping : Wordwrapping.Options -> Content
wordwapping options =
    Content.item (Wordwrapping.view options)


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        SortModel submodel ->
            Sub.map SortMsg (Sort.subscriptions submodel)

        ZoomModel submodel ->
            Sub.map ZoomMsg (Zoom.subscriptions submodel)

        TypewriterModel submodel ->
            Sub.map TypewriterMsg (Typewriter.subscriptions submodel)

        PixelfontModel submodel ->
            Sub.map PixelfontMsg (Pixelfont.subscriptions submodel)

        MetricsModel submodel ->
            Sub.map MetricsMsg (Metrics.subscriptions submodel)

        OutlinesModel submodel ->
            Sub.map OutlinesMsg (Outlines.subscriptions submodel)

        PixelglyphModel submodel ->
            Sub.map PixelglyphMsg (Pixelglyph.subscriptions submodel)

        CubicglyphModel submodel ->
            Sub.map CubicglyphMsg (Cubicglyph.subscriptions submodel)


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case ( action, model ) of
        ( SortMsg a, SortModel m ) ->
            let
                ( newModel, newCmd ) =
                    Sort.update a m
            in
            ( SortModel newModel, Cmd.map SortMsg newCmd )

        ( ZoomMsg a, ZoomModel m ) ->
            let
                ( newModel, newCmd ) =
                    Zoom.update a m
            in
            ( ZoomModel newModel, Cmd.map ZoomMsg newCmd )

        ( TypewriterMsg a, TypewriterModel m ) ->
            let
                ( newModel, newCmd ) =
                    Typewriter.update a m
            in
            ( TypewriterModel newModel, Cmd.map TypewriterMsg newCmd )

        ( PixelfontMsg a, PixelfontModel m ) ->
            let
                ( newModel, newCmd ) =
                    Pixelfont.update a m
            in
            ( PixelfontModel newModel, Cmd.map PixelfontMsg newCmd )

        ( MetricsMsg a, MetricsModel m ) ->
            let
                ( newModel, newCmd ) =
                    Metrics.update a m
            in
            ( MetricsModel newModel, Cmd.map MetricsMsg newCmd )

        ( OutlinesMsg a, OutlinesModel m ) ->
            let
                ( newModel, newCmd ) =
                    Outlines.update a m
            in
            ( OutlinesModel newModel, Cmd.map OutlinesMsg newCmd )

        ( PixelglyphMsg a, PixelglyphModel m ) ->
            let
                ( newModel, newCmd ) =
                    Pixelglyph.update a m
            in
            ( PixelglyphModel newModel, Cmd.map PixelglyphMsg newCmd )

        ( CubicglyphMsg a, CubicglyphModel m ) ->
            let
                ( newModel, newCmd ) =
                    Cubicglyph.update a m
            in
            ( CubicglyphModel newModel, Cmd.map CubicglyphMsg newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        SortModel submodel ->
            Html.map SortMsg (Sort.view submodel)

        ZoomModel submodel ->
            Html.map ZoomMsg (Zoom.view submodel)

        TypewriterModel submodel ->
            Html.map TypewriterMsg (Typewriter.view submodel)

        PixelfontModel submodel ->
            Html.map PixelfontMsg (Pixelfont.view submodel)

        MetricsModel submodel ->
            Html.map MetricsMsg (Metrics.view submodel)

        OutlinesModel submodel ->
            Html.map OutlinesMsg (Outlines.view submodel)

        PixelglyphModel submodel ->
            Html.map PixelglyphMsg (Pixelglyph.view submodel)

        CubicglyphModel submodel ->
            Html.map CubicglyphMsg (Cubicglyph.view submodel)
