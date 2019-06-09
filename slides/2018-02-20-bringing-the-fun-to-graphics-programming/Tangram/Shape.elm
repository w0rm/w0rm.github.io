module Tangram.Shape
    exposing
        ( elm
        , elmCommunity
        , default
        , morph
        , Shape
        , Position
        )


type alias Position =
    { rotateZ : Float
    , rotateY : Float
    , x : Float
    , y : Float
    , z : Float
    }


type alias Shape =
    { parallelogramPyramid : Position
    , orangeTetrahedron1 : Position
    , orangeTetrahedron2 : Position
    , squarePyramid : Position
    , grayTetrahedron : Position
    , blueTetrahedron1 : Position
    , blueTetrahedron2 : Position
    }


defaultPosition : Position
defaultPosition =
    Position 0 0 0 0 0


default : Shape
default =
    Shape
        defaultPosition
        defaultPosition
        defaultPosition
        defaultPosition
        defaultPosition
        defaultPosition
        defaultPosition


e1 : Float
e1 =
    0.1


elm : Shape
elm =
    { parallelogramPyramid = Position 0 0 (-1 - e1) (3 + e1 * 3) 0
    , orangeTetrahedron1 = Position 90 0 0 (2 + e1 * 2) 0.01
    , orangeTetrahedron2 = Position 0 0 (4 + e1 * 2) (-2) 0
    , squarePyramid = Position 0 0 (2 + e1) (e1) 0
    , grayTetrahedron = Position 180 0 (-4 - e1) (e1) 0
    , blueTetrahedron1 = Position -135 0 (2 + e1 * 1.4) (2 + e1 * 2.5) 0
    , blueTetrahedron2 = Position -90 0 0 -4 0
    }


elmCommunity : Shape
elmCommunity =
    { parallelogramPyramid = Position -135 0 -3 (-3 - sqrt 2 - e1) 0
    , orangeTetrahedron1 = Position 45 0 (5 - e1) (-7 - e1) 0
    , orangeTetrahedron2 = Position -45 0 -6 -6 0
    , squarePyramid = Position 0 0 (3 + e1) 5 0
    , grayTetrahedron = Position 90 0 (3 + e1) 3 0
    , blueTetrahedron1 = Position -135 0 3 (-5 - e1) 0
    , blueTetrahedron2 = Position -90 0 1 -3 0
    }


morphValue : Float -> Float -> Float -> Float
morphValue d v1 v2 =
    v1 + (v2 - v1) * d


morphPosition : Float -> Position -> Position -> Position
morphPosition d p1 p2 =
    Position
        (morphValue d p1.rotateZ p2.rotateZ)
        (morphValue d p1.rotateY p2.rotateY)
        (morphValue d p1.x p2.x)
        (morphValue d p1.y p2.y)
        (morphValue d p1.z p2.z)


morph : Float -> Shape -> Shape -> Shape
morph d s1 s2 =
    { parallelogramPyramid = morphPosition d s1.parallelogramPyramid s2.parallelogramPyramid
    , orangeTetrahedron1 = morphPosition d s1.orangeTetrahedron1 s2.orangeTetrahedron1
    , orangeTetrahedron2 = morphPosition d s1.orangeTetrahedron2 s2.orangeTetrahedron2
    , squarePyramid = morphPosition d s1.squarePyramid s2.squarePyramid
    , grayTetrahedron = morphPosition d s1.grayTetrahedron s2.grayTetrahedron
    , blueTetrahedron1 = morphPosition d s1.blueTetrahedron1 s2.blueTetrahedron1
    , blueTetrahedron2 = morphPosition d s1.blueTetrahedron2 s2.blueTetrahedron2
    }
