module Tangram.Mesh exposing (tetrahedron, squarePyramid, parallelogramPyramid)

import Math.Vector3 exposing (Vec3, vec3, sub, cross)
import Tangram.Shader exposing (Attribute)
import WebGL exposing (Mesh)


tetrahedron : Mesh Attribute
tetrahedron =
    WebGL.triangles
        [ -- front face
          attribute (vec3 0 1 0) (vec3 -1 0 0) (vec3 0 -1 0)

        -- rest faces
        , attribute (vec3 -0.5 0 -1) (vec3 -1 0 0) (vec3 0 1 0)
        , attribute (vec3 -0.5 0 -1) (vec3 0 -1 0) (vec3 -1 0 0)
        , attribute (vec3 -0.5 0 -1) (vec3 0 1 0) (vec3 0 -1 0)
        ]


squarePyramid : Mesh Attribute
squarePyramid =
    WebGL.triangles
        [ -- front face
          attribute (vec3 -1 0 0) (vec3 1 0 0) (vec3 0 1 0)
        , attribute (vec3 -1 0 0) (vec3 0 -1 0) (vec3 1 0 0)

        -- rest faces
        , attribute (vec3 -1 0 0) (vec3 0 1 0) (vec3 0 0 -sqrt2)
        , attribute (vec3 0 1 0) (vec3 1 0 0) (vec3 0 0 -sqrt2)
        , attribute (vec3 -1 0 0) (vec3 0 0 -sqrt2) (vec3 0 -1 0)
        , attribute (vec3 1 0 0) (vec3 0 -1 0) (vec3 0 0 -sqrt2)
        ]


parallelogramPyramid : Mesh Attribute
parallelogramPyramid =
    WebGL.triangles
        [ -- front face
          attribute (vec3 -3 1 0) (vec3 3 -1 0) (vec3 1 1 0)
        , attribute (vec3 -3 1 0) (vec3 -1 -1 0) (vec3 3 -1 0)

        -- rest faces
        , attribute (vec3 -3 1 0) (vec3 1 1 0) (vec3 0 0 -2)
        , attribute (vec3 1 1 0) (vec3 3 -1 0) (vec3 0 0 -2)
        , attribute (vec3 3 -1 0) (vec3 -1 -1 0) (vec3 0 0 -2)
        , attribute (vec3 -3 1 0) (vec3 0 0 -2) (vec3 -1 -1 0)
        ]


{-| Adds a normal to each vertex
-}
attribute : Vec3 -> Vec3 -> Vec3 -> ( Attribute, Attribute, Attribute )
attribute v1 v2 v3 =
    let
        normal =
            cross (sub v1 v2) (sub v1 v3)
    in
        ( Attribute v1 normal
        , Attribute v2 normal
        , Attribute v3 normal
        )


sqrt2 : Float
sqrt2 =
    sqrt 2
