module Main exposing (main)

import Custom exposing (Model, Msg, subscriptions, update, view)
import SliceShow
import Slides exposing (slides)


main : Program Never (SliceShow.Model Model Msg) (SliceShow.Message Msg)
main =
    SliceShow.init slides
        |> SliceShow.setSubscriptions subscriptions
        |> SliceShow.setUpdate update
        |> SliceShow.setView view
        |> SliceShow.show
