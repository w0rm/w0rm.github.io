module MeshGradient.BezierPoint exposing (BezierPoint, Vector, point, zero)

import Common.Types exposing (Point)


type alias Vector =
    { dx : Float, dy : Float }


type alias BezierPoint =
    { position : Point
    , leading : Vector
    , bottom : Vector
    , trailing : Vector
    , top : Vector
    }


zero : BezierPoint
zero =
    { position = Point 0 0
    , leading = Vector 0 0
    , bottom = Vector 0 0
    , trailing = Vector 0 0
    , top = Vector 0 0
    }


point : Point -> BezierPoint
point pos =
    { zero | position = pos }
