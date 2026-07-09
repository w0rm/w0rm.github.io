module Scratch exposing (main)

import Html
import Length
import Physics exposing (Body)
import Physics.Material as Material exposing (Dense, Material, Surface)
import Sphere3d


felt : Material Surface
felt =
    Material.surface { friction = 0.9, bounciness = 0.2 }


ballShape =
    Sphere3d.atOrigin (Length.meters 0.1)


ball : Body
ball =
    Physics.sphere ballShape felt


main =
    Html.text "x"
