import SliceShow exposing (init, show)
import Slides exposing (slides)


main : Program Never
main =
  init slides
  |> show
