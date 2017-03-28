module Main exposing (main)

import SliceShow
import Messages exposing (Message)
import Model exposing (Model, view, update, subscriptions)
import Slides exposing (slides)


main : Program Never (SliceShow.Model Model Message) (SliceShow.Message Message)
main =
    SliceShow.init slides
        |> SliceShow.setSubscriptions subscriptions
        |> SliceShow.setUpdate update
        |> SliceShow.setView view
        |> SliceShow.show
