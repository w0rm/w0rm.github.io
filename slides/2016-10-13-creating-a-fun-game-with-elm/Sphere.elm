module Sphere exposing (Model, Message, initial, subscriptions, update, view)

import WebGL exposing (Drawable(..), Renderable, Shader, toHtml, render)
import Math.Vector3 exposing (Vec3, vec3, add, scale, normalize, length, dot)
import Math.Matrix4 exposing (Mat4, makeRotate, mul, makeLookAt, makePerspective, inverseOrthonormal, transpose)
import Time exposing (Time)
import Html exposing (..)
import Html.Attributes exposing (width, height, style)
import AnimationFrame


type alias Message =
    Time


type alias Model =
    Float


subscriptions : Model -> Sub Message
subscriptions _ =
    AnimationFrame.diffs identity


update : Message -> Model -> ( Model, Cmd Message )
update elapsed angle =
    ( angle + elapsed / 1000, Cmd.none )


view : Model -> Html Message
view angle =
    WebGL.toHtml
        [ width 550
        , height 550
        , style
            [ ( "display", "block" )
            , ( "position", "absolute" )
            , ( "top", "0" )
            , ( "right", "0" )
            , ( "opacity", ".5" )
            ]
        ]
        [ WebGL.render
            vertexShader
            fragmentShader
            sphere
            { rotation = makeRotate angle (vec3 0 1 1)
            , perspective = perspective
            , camera = camera
            }
        ]


perspective : Mat4
perspective =
    makePerspective 45 1 0.01 100


camera : Mat4
camera =
    makeLookAt (vec3 0 0 3) (vec3 0 0 0) (vec3 0 1 0)


initial : Model
initial =
    0



-- Mesh and shaders


type alias Vertex =
    { position : Vec3
    }


type alias Uniform =
    { rotation : Mat4
    , perspective : Mat4
    , camera : Mat4
    }


type alias Varying =
    { depth : Float
    }



{- Sphere mesh -}


sphere : Drawable Vertex
sphere =
    let
        vec3ToVertex ( a, b, c ) =
            [ ( Vertex a, Vertex b )
            , ( Vertex b, Vertex c )
            , ( Vertex c, Vertex a )
            ]
    in
        Lines (List.concatMap vec3ToVertex (divideSphere 3 octahedron))



{- Recursively divide an octahedron to turn it into a sphere -}


divideSphere : Int -> List ( Vec3, Vec3, Vec3 ) -> List ( Vec3, Vec3, Vec3 )
divideSphere step triangles =
    if step <= 0 then
        triangles
    else
        divideSphere (step - 1) (List.concatMap divide triangles)



{- 1
       / \
    b /___\ c
     /\   /\
    /__\ /__\
   0    a    2
-}


divide : ( Vec3, Vec3, Vec3 ) -> List ( Vec3, Vec3, Vec3 )
divide ( v0, v1, v2 ) =
    let
        a =
            add v0 v2 |> normalize

        b =
            add v0 v1 |> normalize

        c =
            add v1 v2 |> normalize
    in
        [ ( v0, b, a ), ( b, v1, c ), ( a, b, c ), ( a, c, v2 ) ]



{- Octahedron mesh -}


octahedron : List ( Vec3, Vec3, Vec3 )
octahedron =
    [ ( vec3 1 0 0, vec3 0 0 1, vec3 0 1 0 )
    , ( vec3 0 1 0, vec3 0 0 1, vec3 -1 0 0 )
    , ( vec3 -1 0 0, vec3 0 0 1, vec3 0 -1 0 )
    , ( vec3 0 -1 0, vec3 0 0 1, vec3 1 0 0 )
    , ( vec3 1 0 0, vec3 0 1 0, vec3 0 0 -1 )
    , ( vec3 0 1 0, vec3 -1 0 0, vec3 0 0 -1 )
    , ( vec3 -1 0 0, vec3 0 -1 0, vec3 0 0 -1 )
    , ( vec3 0 -1 0, vec3 1 0 0, vec3 0 0 -1 )
    ]


vertexShader : Shader Vertex Uniform Varying
vertexShader =
    [glsl|
  attribute vec3 position;
  uniform mat4 perspective;
  uniform mat4 camera;
  uniform mat4 rotation;
  varying float depth;
  void main () {
    gl_Position = perspective * camera * rotation * vec4(position, 1.0);
    depth = (perspective * rotation * vec4(position, 1.0)).z;
  }
|]


fragmentShader : Shader {} Uniform Varying
fragmentShader =
    [glsl|
  precision mediump float;
  varying float depth;
  void main () {
    gl_FragColor = vec4(0.1, 0.1, 0.1, 0.7 - depth / 2.0);
  }
|]
