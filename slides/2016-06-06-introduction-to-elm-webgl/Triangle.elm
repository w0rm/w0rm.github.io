module Triangle exposing (view, Model, Action, update, initial, subscriptions)

import WebGL exposing (Drawable(..), Shader, toHtml, render)
import Math.Vector3 exposing (Vec3, vec3, add, scale, normalize, length, dot)
import Html exposing (..)
import Html.Attributes exposing (width, height, style)
import Math.Matrix4 exposing (Mat4, makeRotate)
import Time exposing (Time)
import AnimationFrame


type alias Action = Time


type alias Model = Float


subscriptions : Model -> Sub Action
subscriptions _ =
  AnimationFrame.diffs identity


update : Action -> Model -> (Model, Cmd Action)
update elapsed angle =
  (angle + elapsed / 1000, Cmd.none)


initial : Model
initial =
  0


view : Model -> Html a
view angle =
  WebGL.toHtml
    [ width 300
    , height 300
    , style
        [ ("display", "block")
        , ("margin", "auto")
        ]
    ]
    [ WebGL.render
        vertexShader
        fragmentShader
        triangle
        { rotation = makeRotate angle (vec3 0 1 0) }
    ]


type alias Attribute =
  { position : Vec3
  , color : Vec3
  }


triangle : Drawable Attribute
triangle =
  Triangle
    [ ( Attribute (vec3 0 1 0) (vec3 1 0 0)
      , Attribute (vec3 -1 -1 0) (vec3 0 1 0)
      , Attribute (vec3 1 -1 0) (vec3 0 0 1)
      )
    ]


type alias Uniform =
  { rotation : Mat4
  }


type alias Varying =
  { vColor : Vec3
  }


vertexShader : Shader Attribute Uniform Varying
vertexShader = [glsl|
  attribute vec3 position;
  attribute vec3 color;
  varying vec3 vColor;
  uniform mat4 rotation;
  void main () {
    gl_Position = rotation * vec4(position, 1.0);
    vColor = color;
  }
|]


fragmentShader : Shader {} Uniform Varying
fragmentShader = [glsl|
  precision mediump float;
  varying vec3 vColor;
  void main () {
    gl_FragColor = vec4(vColor, 1.0);
  }
|]
