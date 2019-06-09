module AnimatedImage
    exposing
        ( Model
        , Message
        , initial
        , update
        , view
        , subscriptions
        )

import Time exposing (Time)
import AnimationFrame
import Html exposing (..)
import Html.Attributes exposing (..)


type Message
    = Tick Time


type alias Model =
    { frames : List String
    , elapsed : Time
    , timeout : Time
    , size : ( Int, Int )
    }


subscriptions : Model -> Sub Message
subscriptions model =
    AnimationFrame.diffs Tick


update : Message -> Model -> ( Model, Cmd Message )
update action model =
    case action of
        Tick time ->
            ( animationLoop time model, Cmd.none )


view : Model -> Html.Html Message
view { frames, size } =
    img
        [ width (Tuple.first size)
        , height (Tuple.second size)
        , style [ ( "display", "block" ) ]
        , src (Maybe.withDefault "" (List.head frames))
        ]
        []


initial : Time -> ( Int, Int ) -> List String -> Model
initial time size frames =
    { elapsed = 0
    , timeout = time
    , frames = frames
    , size = size
    }


animationLoop : Time -> Model -> Model
animationLoop elapsed state =
    let
        elapsed_ =
            state.elapsed + elapsed
    in
        if elapsed_ >= state.timeout then
            { state
                | elapsed = elapsed_ - state.timeout
                , frames =
                    case state.frames of
                        frame :: frames ->
                            frames ++ [ frame ]

                        _ ->
                            state.frames
            }
        else
            { state | elapsed = elapsed_ }
