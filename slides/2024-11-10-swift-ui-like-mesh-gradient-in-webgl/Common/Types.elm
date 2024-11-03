module Common.Types exposing (Gradient, Point)

import Color exposing (Color)


type alias Point =
    { x : Float
    , y : Float
    }


type alias Gradient =
    { width : Int
    , height : Int
    , points : List Point
    , colors : List Color
    }
