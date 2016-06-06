import SliceShow exposing (..)
import Model exposing (view, update, subscriptions)
import Slides exposing (slides)


main : Program Never
main =
  {- Init the slides -}
  init slides
  {- Set subscriptions-update-view for the custom content -}
  |> setSubscriptions subscriptions
  |> setUpdate update
  |> setView view
  {- Show the slides -}
  |> show
