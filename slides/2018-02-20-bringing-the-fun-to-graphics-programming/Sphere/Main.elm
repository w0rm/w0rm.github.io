module Sphere.Main exposing (Model, Message, initial, view, update, subscriptions)

import Html exposing (Html)
import Html.Attributes exposing (..)
import WebGL exposing (Mesh, Shader, Entity)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Math.Matrix4 exposing (Mat4, mul)
import Time exposing (Time)
import AnimationFrame


type alias Model =
    { angle : Float
    , width : Int
    , height : Int
    , iterations : Int
    }


type Message
    = Message Time


initial : Int -> Int -> Int -> Model
initial =
    Model 0


update : Message -> Model -> ( Model, Cmd Message )
update (Message elapsed) model =
    ( { model | angle = model.angle + elapsed / 5000 }, Cmd.none )


subscriptions : Model -> Sub Message
subscriptions _ =
    AnimationFrame.diffs Message


view : Model -> Html Message
view model =
    let
        ratio =
            toFloat model.width / toFloat model.height
    in
        WebGL.toHtml
            [ style [ ( "display", "block" ) ]
            , width model.width
            , height model.height
            ]
            [ appleView ratio model.angle model.iterations ]


appleView : Float -> Float -> Int -> Entity
appleView ratio angle iterations =
    WebGL.entity
        vertexShader
        fragmentShader
        (List.drop iterations spheres |> List.head |> Maybe.withDefault sphere)
        (Uniforms
            (vec3 0.2 0.2 1)
            (camera ratio)
            (Math.Matrix4.makeRotate angle (vec3 0 1 0))
            light
        )


type alias Attributes =
    { position : Vec3
    , normal : Vec3
    }


type alias Uniforms =
    { color : Vec3
    , camera : Mat4
    , rotation : Mat4
    , light : Vec3
    }


type alias Varying =
    { vlighting : Float
    }


{-| Camera projection matrix
-}
camera : Float -> Mat4
camera ratio =
    let
        c =
            0

        eye =
            vec3 0 0 1.5

        center =
            vec3 0 0 0
    in
        (Math.Matrix4.makeLookAt eye center Vec3.j)
            |> mul (Math.Matrix4.makePerspective 45 ratio 0.01 100)


{-| Direction of the light
-}
light : Vec3
light =
    vec3 -1 1 3 |> Vec3.normalize


{-| Adds a normal to the attributes
-}
attributes : Vec3 -> Vec3 -> Vec3 -> ( Attributes, Attributes, Attributes )
attributes p1 p2 p3 =
    let
        normal =
            Vec3.cross (Vec3.sub p1 p2) (Vec3.sub p1 p3) |> Vec3.normalize
    in
        ( Attributes p1 normal, Attributes p2 normal, Attributes p3 normal )


{-| Precreate the meshes so they are properly cached
-}
spheres : List (Mesh Attributes)
spheres =
    List.map
        (\i ->
            divideSphere i octahedron
                |> List.map (\( p1, p2, p3 ) -> attributes p1 p2 p3)
                |> WebGL.triangles
        )
        [ 0, 1, 2, 3 ]


sphere : Mesh Attributes
sphere =
    divideSphere 4 octahedron
        |> List.map (\( p1, p2, p3 ) -> attributes p1 p2 p3)
        |> WebGL.triangles


{-| Recursively divide an octahedron to turn it into a sphere
-}
divideSphere : Int -> List ( Vec3, Vec3, Vec3 ) -> List ( Vec3, Vec3, Vec3 )
divideSphere step triangles =
    if step == 0 then
        triangles
    else
        divideSphere (step - 1) (List.concatMap divide triangles)


{-|

        1
       / \
    b /___\ c
     /\   /\
    /__\ /__\
    0   a    2
-}
divide : ( Vec3, Vec3, Vec3 ) -> List ( Vec3, Vec3, Vec3 )
divide ( v0, v1, v2 ) =
    let
        a =
            Vec3.add v0 v2 |> Vec3.normalize |> Vec3.scale 0.5

        b =
            Vec3.add v0 v1 |> Vec3.normalize |> Vec3.scale 0.5

        c =
            Vec3.add v1 v2 |> Vec3.normalize |> Vec3.scale 0.5
    in
        [ ( v0, b, a ), ( b, v1, c ), ( a, b, c ), ( a, c, v2 ) ]


{-| Octahedron
-}
octahedron : List ( Vec3, Vec3, Vec3 )
octahedron =
    [ ( vec3 0.5 0 0, vec3 0 0.5 0, vec3 0 0 0.5 )
    , ( vec3 0 0.5 0, vec3 -0.5 0 0, vec3 0 0 0.5 )
    , ( vec3 -0.5 0 0, vec3 0 -0.5 0, vec3 0 0 0.5 )
    , ( vec3 0 -0.5 0, vec3 0.5 0 0, vec3 0 0 0.5 )
    , ( vec3 0.5 0 0, vec3 0 0 -0.5, vec3 0 0.5 0 )
    , ( vec3 0 0.5 0, vec3 0 0 -0.5, vec3 -0.5 0 0 )
    , ( vec3 -0.5 0 0, vec3 0 0 -0.5, vec3 0 -0.5 0 )
    , ( vec3 0 -0.5 0, vec3 0 0 -0.5, vec3 0.5 0 0 )
    ]


vertexShader : Shader Attributes Uniforms Varying
vertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        uniform mat4 camera;
        uniform mat4 rotation;
        uniform vec3 light;
        varying highp float vlighting;
        void main () {
            highp float ambientLight = 0.5;
            highp float directionalLight = 0.5;
            gl_Position = camera * rotation * vec4(position, 1.0);
            vlighting = ambientLight + max(dot((rotation * vec4(normal, 1.0)).xyz, light), 0.0) * directionalLight;
        }
    |]


fragmentShader : Shader {} Uniforms Varying
fragmentShader =
    [glsl|
        precision mediump float;
        varying highp float vlighting;
        uniform vec3 color;
        void main () {
            gl_FragColor = vec4(color * vlighting, 1.0);
        }
    |]
