module Slides exposing (slides)
import Model exposing (Model)
import Actions exposing (Action)
import Formatting exposing (..)
import SliceShow.Slide exposing (..)
import SliceShow.Content exposing (Content, hide, custom)


type alias CustomContent = Content Model Action


type alias CustomSlide = Slide Model Action


intro : List CustomContent
intro =
  [ title "An Introduction to Elm-WebGL"
  , spacing 60
  , image (100, 100) "assets/elm.png"
  , char "  "
  , image (130, 130) "assets/webgl.jpg"
  , spacing 60
  , custom Model.sphere
  , richtext "Andrey Kuzmin [@unsoundscapes](https://twitter.com/unsoundscapes)"
  , richtext """elm—([street-404](https://github.com/zalando/elm-street-404),
[mogee](https://github.com/w0rm/elm-mogee),
[slice-show](https://github.com/w0rm/elm-slice-show))"""
  ]


history : List CustomContent
history =
  [ title "History"
  , bullets
      [ bullet "Elm-WebGL created by John P Mayer and Evan Czaplicki"
      , bullet "Released in May 2013 (2 years after Elm)"
      , bulletLink "Video: John P Mayer — Delightful WebGL in Elm" "https://vimeo.com/97408205"
      , bullet "Current fork is maintained by Elm Community"
      ]
  ]


why : List CustomContent
why =
  [ title "Why WebGL?"
  , bullets
      [ bullet "Single threaded Virtual DOM rendering is slow for many objects"
      , bullet "Existing Graphics module in Elm has some limitations"
      ]
    |> hide
  , bullets
      [ bullet "WebGL has access to parallel processing on GPU"
      , bullet "WebGL gives a fine grain control of the graphics pipeline"
      , bullet "Elm-WebGL makes WebGL API much nicer to use"
      , bullet "Elm compiler checks the shaders' type signatures"
      ]
    |> hide
  ]


familiarApi : List CustomContent
familiarApi =
  [ title "Familiar high-level API"
  , split
      [ code
          "elm"
          """WebGL.toHtml
  [ width 400
  , height 400
  , style
      [ ( "display"
        , "block"
        )
      ]
  ]
  [ renderable1
  , renderable2
  ]"""
      ]
      [ code
          "elm"
          """toHtml :
  List (Attribute msg) ->
  List Renderable ->
  Html msg"""
        |> hide
      ]
  ]


rendering : List CustomContent
rendering =
  [ title "Rendering Pipeline"
  , spacing 20
  , image (700, 160) "assets/schema.png"
  , spacing 30
  , code
      "elm"
      """render :
  Shader attributes uniforms varyings -> -- Vertex Shader
  Shader {} uniforms varyings ->         -- Fragment Shader
  Drawable attributes ->                 -- mesh
  uniforms ->                            -- scene
  Renderable"""
     |> hide
  ]


example : List CustomContent
example =
  [ title "Example: Rotating RGB Triangle"
  , spacing 30
  , custom Model.triangle
  ]


codeMesh : List CustomContent
codeMesh =
  [ title "Code: Mesh"
  , code
      "elm"
      """type alias Attribute = { position : Vec3, color : Vec3 }


triangle : Drawable Attribute
triangle =
  Triangle
    [ ( Attribute (vec3 0 1 0) (vec3 1 0 0)
      , Attribute (vec3 -1 -1 0) (vec3 0 1 0)
      , Attribute (vec3 1 -1 0) (vec3 0 0 1)
      )
    ]"""
  ]


codeVertexShader : List CustomContent
codeVertexShader =
  [ title "Code: Vertex Shader"
  , code
      "elm"
      """type alias Attribute = { position : Vec3, color : Vec3 }
type alias Uniform = { rotation : Mat4 }
type alias Varying = { vColor : Vec3 }

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
|]"""
  ]


codeFragmentShader : List CustomContent
codeFragmentShader =
  [ title "Code: Fragment Shader"
  , code
      "elm"
      """type alias Uniform = { rotation : Mat4 }
type alias Varying = { vColor : Vec3 }

fragmentShader : Shader {} Uniform Varying
fragmentShader = [glsl|
  precision mediump float;
  varying vec3 vColor;
  void main () {
    gl_FragColor = vec4(vColor, 1.0);
  }
|]"""
  ]


codeView : List CustomContent
codeView =
  [ title "Code: Render"
  , code
      "elm"
      """view : Model -> Html a
view angle =
  WebGL.toHtml
    [ width 300
    , height 300
    , style [("display", "block")]
    ]
    [ WebGL.render
        vertexShader
        fragmentShader
        triangle
        { rotation = makeRotate angle (vec3 0 1 0) }
    ]"""
  ]


linearAlgebra : List CustomContent
linearAlgebra =
  [ title "Elm-linear-algebra"
  , bullets
      [ bullet "Fast because of native JavaScript arrays (Float32Array)"
      , bullet "Provides Vec2, Vec3, Vec4 and Mat4 types"
      , bullet "Implements many useful functions for 3D Graphics"
      , bullet "Powers elm-webgl"
      ]
  ]


moreExamples : List CustomContent
moreExamples =
  [ title "More Examples"
  , imageLink (320, 75) "assets/elm-webgl-examples.png" "https://github.com/elm-community/elm-webgl/tree/master/examples"
  , richtext "[github.com/elm-community/elm-webgl](https://github.com/elm-community/elm-webgl/tree/master/examples)"
  , spacing 50
  , imageLink (300, 75) "assets/elm-webgl-playground.png" "https://github.com/w0rm/elm-webgl-playground"
  , richtext "[github.com/w0rm/elm-webgl-playground](https://github.com/w0rm/elm-webgl-playground)"
  ]


games : List CustomContent
games =
  [ title "Games using Elm-WebGL"
  , position
      (100, 200)
      [ imageLink (250, 250) "assets/into-the-heavens.png" "http://intotheheavens.net/"
      , richtext "[Into The Heavens](http://intotheheavens.net/)"
      ]
  , position
      (390, 200)
      [ imageLink (250, 250) "assets/elm-street-404.png" "http://zalando.github.io/elm-street-404/"
      , richtext "[Elm Street 404](http://zalando.github.io/elm-street-404/)"
      ]
  , position
      (680, 200)
      [ imageLink (250, 250) "assets/elm-mogee.png" "https://unsoundscapes.itch.io/mogee"
      , richtext "[Mogee](https://unsoundscapes.itch.io/mogee)"
      ]
  ]


slides : List CustomSlide
slides =
  [ [padded intro]
  , [padded history]
  , [padded why]
  , [padded familiarApi]
  , [padded rendering]
  , [padded example]
  , [padded codeMesh]
  , [padded codeVertexShader]
  , [padded codeFragmentShader]
  , [padded codeView]
  , [padded linearAlgebra]
  , [padded moreExamples]
  , [padded games]
  , [shout "Thank you!"]
  ]
  |> List.map slide
