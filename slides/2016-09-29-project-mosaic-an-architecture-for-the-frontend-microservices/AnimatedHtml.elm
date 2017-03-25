module AnimatedHtml
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


type Message
    = Tick Time


type alias Model =
    { timeout : Time
    , view : Time -> Html Message
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
view model =
    model.view model.timeout


initial : Time -> (Time -> Html Message) -> Model
initial timeout view =
    { timeout = timeout
    , view = view
    }


animationLoop : Time -> Model -> Model
animationLoop elapsed state =
    { state
        | timeout = max (state.timeout - elapsed) 0
    }
