module Model
    exposing
        ( Model(..)
        , Message(..)
        , fountain
        , pathfinder
        , randomize
        , animatedImage
        , animatedHtml
        , sphere
        )

import Fountain
import Pathfinder
import Randomize
import AnimatedImage
import AnimatedHtml
import Sphere
import Time exposing (Time)
import Html exposing (Html)


type Message
    = FountainMessage Fountain.Message
    | PathfinderMessage Pathfinder.Message
    | RandomizeMessage Randomize.Message
    | AnimatedImageMessage AnimatedImage.Message
    | AnimatedHtmlMessage AnimatedHtml.Message
    | SphereMessage Sphere.Message


type Model
    = FountainModel Fountain.Model
    | PathfinderModel Pathfinder.Model
    | RandomizeModel Randomize.Model
    | AnimatedImageModel AnimatedImage.Model
    | AnimatedHtmlModel AnimatedHtml.Model
    | SphereModel Sphere.Model


animatedHtml : Time -> (Time -> Html AnimatedHtml.Message) -> Model
animatedHtml time view =
    AnimatedHtmlModel (AnimatedHtml.initial time view)


animatedImage : Time -> ( Int, Int ) -> List String -> Model
animatedImage time size frames =
    AnimatedImageModel (AnimatedImage.initial time size frames)


fountain : Model
fountain =
    FountainModel Fountain.initial


pathfinder : Model
pathfinder =
    PathfinderModel Pathfinder.initial


randomize : Model
randomize =
    RandomizeModel Randomize.initial


sphere : Model
sphere =
    SphereModel Sphere.initial
