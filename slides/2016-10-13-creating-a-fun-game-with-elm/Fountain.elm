module Fountain
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
    { frame : Int
    , timeout : Time
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
view { frame, timeout } =
    div
        []
        [ div
            [ style
                [ ( "position", "relative" )
                , ( "height", "160px" )
                , ( "width", "240px" )
                , ( "background-image", "url(assets/fountain-base.png)" )
                , ( "background-repeat", "no-repeat" )
                , ( "background-position", "bottom" )
                ]
            ]
            [ div
                [ style
                    [ ( "width", "80px" )
                    , ( "height", "160px" )
                    , ( "position", "absolute" )
                    , ( "top", "-80px" )
                    , ( "left", "80px" )
                    , ( "background-image", "url(assets/fountain-spring.png)" )
                    , ( "background-repeat", "no-repeat" )
                    , ( "background-position", toString (-frame * 80) ++ "px 0" )
                    ]
                ]
                []
            ]
        , div
            [ style [ ( "padding", "30px 0 0 10px" ), ( "font-family", "FiraCode" ) ]
            ]
            [ div [] [ text ("{ timeout = " ++ toString (round timeout)) ]
            , div [] [ text (", frame = " ++ toString frame) ]
            , div [] [ text "}" ]
            ]
        ]


initial : Model
initial =
    { timeout = 0
    , frame = 0
    }


animationLoop : Time -> Model -> Model
animationLoop elapsed state =
    let
        timeout =
            state.timeout + elapsed
    in
        if timeout >= 1000 then
            { state
                | timeout = timeout - 1000
                , frame = (state.frame + 1) % 4
            }
        else
            { state | timeout = timeout }
