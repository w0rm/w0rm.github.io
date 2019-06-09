module Animation2D.Main exposing (Model, Message, initial, update, view, subscriptions)

import WebGL exposing (Mesh, Shader)
import WebGL.Settings.Blend as Blend
import WebGL.Texture as Texture exposing (Texture, Error)
import Math.Vector2 exposing (Vec2, vec2)
import AnimationFrame
import Html.Attributes exposing (width, height, style)
import Html exposing (Html)
import Time exposing (Time)
import Task


{-| Types
-}
type Message
    = Animate Time
    | TextureLoad Texture
    | TextureError Error


type TextureData
    = Initial
    | Success Texture
    | Failure Error


type alias Model =
    { texture : TextureData
    , elapsed : Time
    , frame : Int
    , path : String
    }


initial : String -> Model
initial path =
    { texture = Initial
    , elapsed = 0
    , frame = 0
    , path = path
    }


subscriptions : Model -> Sub Message
subscriptions _ =
    Sub.batch
        [ AnimationFrame.diffs Animate
        ]


update : Message -> Model -> ( Model, Cmd Message )
update action model =
    case action of
        Animate elapsed ->
            if model.texture == Initial then
                ( animate elapsed model
                , Texture.load model.path
                    |> Task.attempt
                        (\result ->
                            case result of
                                Err err ->
                                    TextureError err

                                Ok val ->
                                    TextureLoad val
                        )
                )
            else
                ( animate elapsed model, Cmd.none )

        TextureLoad texture ->
            { model | texture = Success texture } ! []

        TextureError error ->
            { model | texture = Failure error } ! []


animate : Time -> Model -> Model
animate elapsed model =
    let
        timeout =
            150

        newElapsed =
            elapsed + model.elapsed
    in
        if newElapsed > timeout then
            { model
                | frame = (model.frame + 1) % 24
                , elapsed = newElapsed - timeout
            }
        else
            { model
                | elapsed = newElapsed
            }


size : { width : Int, height : Int }
size =
    { width = 128, height = 256 }


view : Model -> Html Message
view { texture, frame } =
    WebGL.toHtml
        [ width size.width
        , height size.height
        , style [ ( "display", "block" ) ]
        ]
        (case texture of
            Success tex ->
                [ WebGL.entityWith
                    [ Blend.add Blend.one Blend.oneMinusSrcAlpha ]
                    vertexShader
                    fragmentShader
                    mesh
                    { screenSize = vec2 (toFloat size.width) (toFloat size.height)
                    , texture = tex
                    , frame = frame
                    , textureSize = vec2 (toFloat (Tuple.first (Texture.size tex))) (toFloat (Tuple.second (Texture.size tex)))
                    , frameSize = vec2 128 256
                    }
                ]

            _ ->
                []
        )


type alias Vertex =
    { position : Vec2 }


mesh : Mesh Vertex
mesh =
    WebGL.triangles
        [ ( Vertex (vec2 0 0)
          , Vertex (vec2 1 1)
          , Vertex (vec2 1 0)
          )
        , ( Vertex (vec2 0 0)
          , Vertex (vec2 0 1)
          , Vertex (vec2 1 1)
          )
        ]


vertexShader : WebGL.Shader { attr | position : Vec2 } { unif | frameSize : Vec2, screenSize : Vec2 } { texturePos : Vec2 }
vertexShader =
    [glsl|

  precision mediump float;
  attribute vec2 position;
  uniform vec2 screenSize;
  uniform vec2 frameSize;
  varying vec2 texturePos;

  void main () {
    vec2 clipSpace = position * frameSize / screenSize * 2.0 - 1.0;
    gl_Position = vec4(clipSpace.x, -clipSpace.y, 0, 1);
    texturePos = position;
  }

|]


fragmentShader : WebGL.Shader {} { u | texture : WebGL.Texture, textureSize : Vec2, frameSize : Vec2, frame : Int } { texturePos : Vec2 }
fragmentShader =
    [glsl|

  precision mediump float;
  uniform sampler2D texture;
  uniform vec2 textureSize;
  uniform vec2 frameSize;
  uniform int frame;
  varying vec2 texturePos;

  void main () {
    vec2 size = frameSize / textureSize;
    int frames = int(1.0 / size.x);
    vec2 frameOffset = vec2(float(frame - frame / frames * frames), float(frame / frames));
    vec2 textureSpace = size * (texturePos + frameOffset);
    vec4 temp = texture2D(texture, vec2(textureSpace.x, -textureSpace.y));
    float a = temp.a;
    gl_FragColor = vec4(temp.r * a, temp.g * a, temp.b * a, a);
  }

|]
