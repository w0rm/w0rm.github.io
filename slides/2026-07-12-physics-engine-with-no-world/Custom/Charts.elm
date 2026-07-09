module Custom.Charts exposing (Kind(..), Model, Msg, Options, initial, subscriptions, update, view)

{-| The comparison charts, drawn live with terezka/elm-charts from the
chart-ready CSVs in `elm-physics-extra/comparison/data/` (copied next to the
slides). The CSVs are fetched on the first animation frame (slice-show custom
content has no init command) and decoded with BrianHicks/elm-csv.

Text inherits the slide font from the wrapping div, so the charts match the
deck typography.

-}

import Chart as C
import Chart.Attributes as CA
import Csv.Decode as Decode
import Html exposing (Html)
import Html.Attributes
import Http
import Time


type Kind
    = Perf
    | BundlePhysics
    | BundleRendered


type alias Options =
    { kind : Kind
    , width : Int
    , height : Int
    }


type alias PerfRow =
    { component : String
    , cannon : Float
    , elm : Float
    }


type alias BundleRow =
    { target : String
    , variant : String
    , gzipKb : Float
    }


type Data
    = Loading
    | Failed String
    | PerfData (List PerfRow)
    | BundleData (List BundleRow)


type alias Model =
    { kind : Kind
    , width : Int
    , height : Int
    , started : Bool
    , data : Data
    }


type Msg
    = Tick
    | GotCsv (Result Http.Error String)


initial : Options -> Model
initial { kind, width, height } =
    { kind = kind
    , width = width
    , height = height
    , started = False
    , data = Loading
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.started then
        Sub.none

    else
        -- slice-show custom content has no init command; a timer (not an
        -- animation frame) kicks off the fetch so it also runs headless
        Time.every 50 (\_ -> Tick)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick ->
            if model.started then
                ( model, Cmd.none )

            else
                ( { model | started = True }
                , Http.get
                    { url =
                        -- .csv.txt: elm reactor wraps bare .csv in an HTML
                        -- source viewer, but serves .txt raw (same reason the
                        -- OBJ assets are .obj.txt)
                        case model.kind of
                            Perf ->
                                "perf.csv.txt"

                            _ ->
                                "bundle.csv.txt"
                    , expect = Http.expectString GotCsv
                    }
                )

        GotCsv (Ok csv) ->
            ( { model | data = parse model.kind csv }, Cmd.none )

        GotCsv (Err _) ->
            ( { model | data = Failed "http" }, Cmd.none )


parse : Kind -> String -> Data
parse kind csv =
    case kind of
        Perf ->
            Decode.decodeCsv Decode.FieldNamesFromFirstRow perfDecoder csv
                |> Result.map PerfData
                |> Result.mapError (Decode.errorToString >> Failed)
                |> mergeResult

        _ ->
            Decode.decodeCsv Decode.FieldNamesFromFirstRow bundleDecoder csv
                |> Result.map BundleData
                |> Result.mapError (Decode.errorToString >> Failed)
                |> mergeResult


mergeResult : Result Data Data -> Data
mergeResult result =
    case result of
        Ok data ->
            data

        Err data ->
            data


perfDecoder : Decode.Decoder PerfRow
perfDecoder =
    Decode.into PerfRow
        |> Decode.pipeline (Decode.field "component" Decode.string)
        |> Decode.pipeline (Decode.field "cannon_ms_per_step" Decode.float)
        |> Decode.pipeline (Decode.field "elm_ms_per_step" Decode.float)


bundleDecoder : Decode.Decoder BundleRow
bundleDecoder =
    Decode.into BundleRow
        |> Decode.pipeline (Decode.field "target" Decode.string)
        |> Decode.pipeline (Decode.field "variant" Decode.string)
        |> Decode.pipeline (Decode.field "min_gzip_kb" Decode.float)



-- VIEW


accentBlue : String
accentBlue =
    "#2f6fed"


lightBlue : String
lightBlue =
    "#9ec8ef"


gray : String
gray =
    "#b9b9b9"


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        , Html.Attributes.style "width" (String.fromInt model.width ++ "px")
        , Html.Attributes.style "height" (String.fromInt model.height ++ "px")
        , Html.Attributes.style "font"
            ("22px "
                ++ String.join ", "
                    [ "\"Helvetica Neue\""
                    , "Arial"
                    , "\"Hiragino Kaku Gothic ProN\""
                    , "\"Hiragino Sans\""
                    , "Meiryo"
                    , "sans-serif"
                    ]
            )
        , Html.Attributes.style "color" "#333"
        ]
        [ case ( model.kind, model.data ) of
            ( Perf, PerfData rows ) ->
                perfChart model rows

            ( BundlePhysics, BundleData rows ) ->
                bundleChart model "physics_only" rows

            ( BundleRendered, BundleData rows ) ->
                bundleChart model "rendered" rows

            ( _, Failed reason ) ->
                Html.text ("data error: " ++ String.left 200 reason)

            ( _, Loading ) ->
                Html.text "loading…"

            _ ->
                Html.text "wrong data kind"
        ]


type alias EngineBar =
    { engine : String
    , collision : Float
    , solver : Float
    , gc : Float
    , total : Float
    }


perfChart : Model -> List PerfRow -> Html Msg
perfChart model rows =
    let
        get component pick =
            rows
                |> List.filter (\r -> r.component == component)
                |> List.head
                |> Maybe.map pick
                |> Maybe.withDefault 0

        engine name pick =
            { engine = name
            , collision = get "collision_broadphase" pick
            , solver = get "solver" pick
            , gc = get "gc" pick
            , total = get "total" pick
            }
    in
    C.chart
        [ CA.width (toFloat model.width)
        , CA.height (toFloat model.height)
        , CA.margin { top = 20, bottom = 45, left = 10, right = 10 }
        ]
        [ C.bars [ CA.margin 0.35 ]
            [ -- C.stacked puts the first property on top: GC ends up the
              -- sliver at the top, collision sits on the baseline so the
              -- cannon/elm collision segments compare directly
              C.stacked
                [ C.bar .gc [ CA.color gray ] |> C.named "GC"
                , C.bar .solver [ CA.color accentBlue ] |> C.named "ソルバー"
                , C.bar .collision [ CA.color lightBlue ] |> C.named "衝突判定"
                ]
            ]
            [ engine "cannon-es" .cannon
            , engine "elm-physics" .elm
            ]
        , C.binLabels (\e -> e.engine ++ " — " ++ String.fromFloat e.total)
            [ CA.color "#000", CA.moveDown 34 ]
        ]


bundleChart : Model -> String -> List BundleRow -> Html Msg
bundleChart model target rows =
    let
        variantLabel variant =
            case variant of
                "elm_app_dce" ->
                    "elm"

                "cannon_es_treeshaken" ->
                    "cannon-es"

                "elm_elm3dscene" ->
                    "elm + elm-3d-scene"

                _ ->
                    "three.js + cannon-es"

        variantColor variant =
            if String.startsWith "elm" variant then
                accentBlue

            else
                gray

        bars =
            rows
                |> List.filter (\r -> r.target == target && r.variant /= "cannon_es_full_lib")
                |> List.map
                    (\r ->
                        { label = variantLabel r.variant
                        , kb = r.gzipKb
                        , color = variantColor r.variant
                        }
                    )
    in
    C.chart
        [ CA.width (toFloat model.width)
        , CA.height (toFloat model.height)
        , CA.margin { top = 40, bottom = 75, left = 10, right = 10 }

        -- both panels share the same scale, so the bars compare across panels
        , CA.domain [ CA.lowest 0 CA.exactly, CA.highest 150 CA.exactly ]
        ]
        [ C.bars [ CA.margin 0.25 ]
            [ C.bar .kb []
                |> C.variation (\_ d -> [ CA.color d.color ])
            ]
            bars
        , C.binLabels .label [ CA.color "#000", CA.moveDown 34 ]
        , C.binLabels (\b -> String.fromFloat b.kb ++ " KB")
            [ CA.color "#000", CA.moveDown 64 ]
        ]
