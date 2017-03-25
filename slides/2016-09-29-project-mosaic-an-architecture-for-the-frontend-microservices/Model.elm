module Model
    exposing
        ( Model(..)
        , Message(..)
        , animatedImage
        , animatedHtml
        )

import AnimatedImage
import AnimatedHtml
import Time exposing (Time)
import Html exposing (Html)


type Message
    = AnimatedImageMessage AnimatedImage.Message
    | AnimatedHtmlMessage AnimatedHtml.Message


type Model
    = AnimatedImageModel AnimatedImage.Model
    | AnimatedHtmlModel AnimatedHtml.Model


animatedHtml : Time -> (Time -> Html AnimatedHtml.Message) -> Model
animatedHtml time view =
    AnimatedHtmlModel (AnimatedHtml.initial time view)


animatedImage : Time -> ( Int, Int ) -> List String -> Model
animatedImage time size frames =
    AnimatedImageModel (AnimatedImage.initial time size frames)
