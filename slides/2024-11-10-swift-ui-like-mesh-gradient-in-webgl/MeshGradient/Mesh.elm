module MeshGradient.Mesh exposing (gradient, wireframe)

import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import MeshGradient.Grid as Grid
import WebGL exposing (Mesh)


resolution : number
resolution =
    32


makeVertex : Float -> Float -> { uv : Vec2 }
makeVertex u v =
    { uv = vec2 (u / toFloat resolution) (v / toFloat resolution) }


gradient : Mesh { uv : Vec2 }
gradient =
    WebGL.triangles
        (Grid.fold
            (\x y l ->
                ( makeVertex (toFloat x) (toFloat y)
                , makeVertex (toFloat (x + 1)) (toFloat y)
                , makeVertex (toFloat x) (toFloat (y + 1))
                )
                    :: ( makeVertex (toFloat x) (toFloat (y + 1))
                       , makeVertex (toFloat (x + 1)) (toFloat y)
                       , makeVertex (toFloat (x + 1)) (toFloat (y + 1))
                       )
                    :: l
            )
            []
            resolution
            resolution
        )


wireframe : Mesh { uv : Vec2 }
wireframe =
    WebGL.lines
        (Grid.fold
            (\t t2 l ->
                ( makeVertex (toFloat t) (toFloat t2), makeVertex (toFloat (t + 1)) (toFloat t2) )
                    :: ( makeVertex (toFloat t2) (toFloat t), makeVertex (toFloat t2) (toFloat (t + 1)) )
                    :: l
            )
            []
            resolution
            resolution
        )
