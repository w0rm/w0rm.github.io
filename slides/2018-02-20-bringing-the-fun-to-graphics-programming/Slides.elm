module Slides exposing (slides)

import Model exposing (Model, Message)
import Formatting exposing (..)
import SliceShow.Slide as Slide
import SliceShow.Content as Content
import Html exposing (h1, text)
import Html.Attributes exposing (style)


type alias Content =
    Content.Content Model Message


type alias Slide =
    Slide.Slide Model Message


intro : List Content
intro =
    [ Content.item
        (h1
            [ style
                [ ( "font", "90px/1.2 FiraSans-Light, sans-serif" )
                , ( "letter-spacing", "-2px" )
                , ( "margin", "30px 0 150px" )
                ]
            ]
            [ text "Bringing the Fun to Graphics Programming" ]
        )
    , image ( 160, 160 ) "assets/mogee.png"
    , position ( 320, 435 )
        [ richtext """Andrey Kuzmin

Twitter: [@unsoundscapes](https://twitter.com/unsoundscapes)

GitHub: [@w0rm](https://github.com/w0rm)"""
        ]
    , position ( 840, 465 ) [ image ( 240, 140 ) "assets/soundcloud.png" ]
    ]


toc : List Content
toc =
    [ spacing 50
    , image ( 360, 160 ) "assets/webgl.jpg"
    , image ( 290, 160 ) "assets/plus-elm.png" |> Content.hide
    , spacing 50
    , bullets
        [ bullet "Why WebGL in Elm?"
        , bullet "Graphics Pipeline"
        , bullet "Demos"
        ]
        |> Content.hide
    ]


existing : List Content
existing =
    [ title "Existing Packages"
    , bullets
        [ bullet "html is slow for many game objects"
        , bullet "elm-graphics has limited texture support"
        , bullet "svg is for vector graphics"
        ]
    ]


webgl : List Content
webgl =
    [ title "WebGL"
    , bullets
        [ bullet "Parallel processing on the GPU"
        , bullet "Fine grain control of the graphics pipeline"
        , bullet "Steep learning curve"
        ]
    , [ richtext "<small>[https://github.com/zalando/elm-street-404/pull/21](https://github.com/zalando/elm-street-404/pull/21)</small>"
      ]
        |> position ( 100, 620 )
    ]


webglInElm : List Content
webglInElm =
    [ title "WebGL in Elm"
    , bullets
        [ bullet "Declarative API"
        , bullet "Triangles instead of native arrays"
        , bullet "The linear-algebra package"
        , bullet "Baked in GLSL support"
        , bullet "Compiler type checks GLSL code"
        ]
    ]


videos : List Content
videos =
    [ title "Thanks"
    , spacing 10
    , split
        [ imageLink ( 480, 270 ) "assets/delightful-webgl-in-elm.jpg" "https://vimeo.com/97408205"
        , spacing 10
        , richtext "John P Mayer\n\n[Delightful WebGL in Elm](https://vimeo.com/97408205)"
        ]
        [ imageLink ( 480, 270 ) "assets/api-design-sessions.jpg" "https://www.youtube.com/watch?v=qaTy_F98Moo"
        , spacing 10
        , richtext "Evan Czaplicki\n\nAPI Design Sessions ([part 1](https://www.youtube.com/watch?v=qaTy_F98Moo), [part 2](https://www.youtube.com/watch?v=vQFGaGPPz2Q))"
        ]
    ]


rendering : List Content
rendering =
    [ title "Graphics Pipeline"
    , spacing 30
    , image ( 1080, 400 ) "assets/schema.png"
    ]


entity : List Content
entity =
    [ title "Entity"
    , spacing 20
    , code
        "elm"
        """entity :
  Shader attributes uniforms varyings -> -- vertex shader
  Shader {} uniforms varyings ->         -- fragment shader
  Mesh attributes ->                     -- mesh
  uniforms ->                            -- scene params
  Entity


toHtml : List (Attribute msg) -> List Entity -> Html msg
  """
    ]


example : List Content
example =
    [ title "RGB Triangle (a.k.a. “Hello World”)"
    , split
        [ bullets
            [ bullet "Define a mesh"
            , bullet "Implement shaders"
            , bullet "Make an entity"
            ]
        ]
        [ Content.custom Model.triangle
        ]
    ]


codeMesh : List Content
codeMesh =
    [ title "Mesh"
    , code
        "elm"
        """type alias Attributes = { position : Vec3, color : Vec3 }

triangle : Mesh Attributes
triangle =
  WebGL.triangles
    [ ( { position = vec3 0 1 0,   color = vec3 1 0 0 }
      , { position = vec3 -1 -1 0, color = vec3 0 1 0 }
      , { position = vec3 1 -1 0,  color = vec3 0 0 1 }
      )
    ]"""
    ]


codeVertexShader : List Content
codeVertexShader =
    [ title "Vertex Shader"
    , [ code
            "elm"
            """type alias Attributes = { position : Vec3, color : Vec3 }
type alias Uniforms = { rotation : Mat4 }
type alias Varyings = { vColor : Vec3 }

vertexShader : Shader Attributes Uniforms Varyings
vertexShader = [glsl|
  attribute vec3 position;
  attribute vec3 color;
  uniform mat4 rotation;
  varying vec3 vColor;
  void main () {
    gl_Position = rotation * vec4(position, 1.0);
    vColor = color;
  }
|]"""
      ]
        |> scale 0.9
    ]


codeFragmentShader : List Content
codeFragmentShader =
    [ title "Fragment Shader"
    , code
        "elm"
        """type alias Uniforms = { rotation : Mat4 }
type alias Varyings = { vColor : Vec3 }

fragmentShader : Shader {} Uniforms Varyings
fragmentShader = [glsl|
  precision mediump float;
  varying vec3 vColor;
  void main () {
    gl_FragColor = vec4(vColor, 1.0);
  }
|]"""
    ]


codeView : List Content
codeView =
    [ title "View"
    , code
        "elm"
        """view : Float -> Html a
view angle =
  WebGL.toHtml
    [ width 300, height 300 ]
    [ WebGL.entity
        vertexShader
        fragmentShader
        triangle
        { rotation = makeRotate angle (vec3 0 1 0) }
    ]"""
    , [ Content.custom Model.triangle ] |> position ( 800, 100 )
    ]


animation2d : List Content
animation2d =
    [ title "Animation2D"
    , [ Content.custom (Model.animation2d "assets/animation2d.png") ] |> position ( 200, 200 )
    , [ image ( 256, 256 ) "assets/animation2d.png" ] |> position ( 800, 120 )
    , [ richtext "<small>illustration by [@01k](https://twitter.com/01k)</small>" ] |> position ( 800, 300 )
    , spacing 260
    , bullets
        [ bullet "Convert pixels to clipSpace [-1…1] and texture coordinates [0…1]"
        , bullet "Calculate the frame offset based on frame number and size"
        , bullet "Address alpha transparency issues"
        ]
    ]


recursiveSphere : List Content
recursiveSphere =
    [ title "Recursive Sphere"
    , position
        ( 100, 200 )
        [ Content.custom (Model.sphere 240 240 0)
        , [ richtext "n = 0" ] |> align Center
        ]
    , position
        ( 380, 200 )
        [ Content.custom (Model.sphere 240 240 1)
        , [ richtext "n = 1" ] |> align Center
        ]
    , position
        ( 660, 200 )
        [ Content.custom (Model.sphere 240 240 2)
        , [ richtext "n = 2" ] |> align Center
        ]
    , position
        ( 940, 200 )
        [ Content.custom (Model.sphere 240 240 3)
        , [ richtext "n = 3" ] |> align Center
        ]
    , spacing 330
    , bullets
        [ bullet "Start with octahedron made of 8 triangles"
        , bullet "Divide each triangle by 4 and project the vertices on to the sphere"
        ]
    ]


snake : List Content
snake =
    [ title "Snake"

    -- group is to trigger the new canvas
    , [ [ Content.custom (Model.snake 500 500) ] |> position ( 100, 100 ) ] |> group
    , [ richtext "<small>[elm-snake](https://github.com/tibastral/elm-snake) by Thibaut Assus  \nplay with <kbd>wasd</kbd> keys here</small>" ] |> position ( 170, 550 )
    , [ bullets
            [ bullet "Migrated to WebGL"
            , bullet "Introduced flat lighting"
            , bullet "Implemented planar shadows"
            ]
      ]
        |> position ( 630, 220 )
    ]


games : List Content
games =
    [ title "Games using WebGL in Elm"
    , position
        ( 100, 220 )
        [ imageLink ( 240, 240 ) "assets/elm-street-404.png" "https://unsoundscapes.itch.io/404-elm-street"
        , richtext "[404 Elm Street](https://unsoundscapes.itch.io/404-elm-street)"
        ]
    , position
        ( 380, 220 )
        [ imageLink ( 240, 240 ) "assets/elm-mogee.png" "https://unsoundscapes.itch.io/mogee"
        , richtext "[Mogee](https://unsoundscapes.itch.io/mogee)"
        ]
    , position
        ( 660, 220 )
        [ imageLink ( 240, 240 ) "assets/mage-city.png" "http://lab.passiomatic.com/mage-city"
        , richtext "[Mage City](http://lab.passiomatic.com/mage-city)  \n<small>by Andrea Peltrin</small>"
        ]
    , position
        ( 940, 220 )
        [ imageLink ( 240, 240 ) "assets/into-the-heavens.png" "https://github.com/nphollon/into-the-heavens/"
        , richtext "[Into The Heavens](https://github.com/nphollon/into-the-heavens)  \n<small>by Nick Hollon</small>"
        ]
    ]


moreGames : List Content
moreGames =
    [ title "More Games Using WebGL in Elm"
    , position
        ( 100, 220 )
        [ imageLink ( 240, 240 ) "assets/flappy-bird.png" "http://lab.passiomatic.com/flappy-bird/"
        , richtext "[Flappy Bird](http://lab.passiomatic.com/flappy-bird/)  \n<small>by Andrea Peltrin</small>"
        ]
    , position
        ( 380, 220 )
        [ imageLink ( 240, 240 ) "assets/count-down.png" "https://github.com/psandahl/count-down"
        , richtext "[Count Down](https://github.com/psandahl/count-down)  \n<small>by Patrik Sandahl</small>"
        ]
    , position
        ( 660, 220 )
        [ imageLink ( 240, 240 ) "assets/cubik.png" "https://unsoundscapes.itch.io/cubik"
        , richtext "[Cubik](https://unsoundscapes.itch.io/cubik)"
        ]
    ]


shadertoy : List Content
shadertoy =
    [ title "Shadertoy"
    , Content.custom Model.shadertoy
    , richtext "<small>Shader code from “[Seascape](https://www.shadertoy.com/view/Ms2SD1)” by Alexander Alekseev</small>"
    , [ bullets
            [ bullet "Mesh is just a rectangle"
            , bullet "Everything is done in the fragment shader"
            , bullet "Subscriptions are wired to the shader inputs"
            , bulletLink "kfish/elm-shadertoy" "https://github.com/kfish/elm-shadertoy"
            ]
      ]
        |> position ( 770, 170 )
    ]


cubik : List Content
cubik =
    [ title "Rubik’s Cube in Elm"
    , imageLink ( 390, 425 ) "assets/cubik-large.png" "http://unsoundscapes.itch.io/cubik"
    , [ bullets
            [ bullet "Complex interaction state"
            , bullet "Using quaternions for rotation"
            , bulletLink "Clicking a 3D mesh" "https://medium.com/@voorkanter/clicking-a-3d-mesh-in-elm-webgl-faadfdf703a0"
            , bulletLink "kfish/quaternion" "https://github.com/kfish/quaternion"
            ]
      , bullets [ bulletLink "Open sourced (w0rm/elm-cubik)" "https://github.com/w0rm/elm-cubik" ] |> Content.hide
      ]
        |> position ( 600, 230 )
    ]


elmTerrain : List Content
elmTerrain =
    [ title "Terrain"
    , imageLink ( 640, 400 ) "assets/elm-terrain.jpg" "https://lepoetemaudit.github.io/elm-terrain/"
    , richtext "<small>[elm-terrain](https://github.com/lepoetemaudit/elm-terrain) by Dave Jeffrey</small>"
    , [ bullets
            [ bullet "Mesh is a grid"
            , bullet "Vertex shader uses the heightmap texture"
            , bullet "Fragment shader fuses base and details textures"
            , bullet "Skybox on the background"
            ]
      ]
        |> position ( 770, 170 )
    ]


elmObjLoader : List Content
elmObjLoader =
    [ title "OBJ Format Support"
    , imageLink ( 640, 400 ) "assets/elm-obj-loader.jpg" "https://zinggi.github.io/randomDemos/webgl/objLoader_modelViewer.html"
    , richtext "<small>[elm-obj-loader](https://github.com/Zinggi/elm-obj-loader) by Florian Zinggeler</small>"
    , [ bullets
            [ bullet "Parses a small subset of the obj file format"
            , bullet "Export a mesh and textures from Blender"
            , bullet "Including the normal map"
            ]
      ]
        |> position ( 770, 170 )
    ]


sceneGraph : List Content
sceneGraph =
    [ title "WIP Scene Graph Package"
    , imageLink ( 640, 400 ) "assets/scene-graph.png" "https://opensolid.github.io/examples/sprocket.html"
    , richtext "<small>[opensolid/scene](https://github.com/opensolid/scene) by Ian Mackenzie</small>"
    , [ bullets
            [ bullet "Physically-based rendering"
            , bullet "Different types of lighting"
            , bullet "Customizable materials"
            , bullet "Integrates with the geometry package"
            , bulletLink "ianmackenzie/elm-geometry" "https://github.com/ianmackenzie/elm-geometry"
            ]
      ]
        |> position ( 770, 200 )
    ]


slides : List Slide
slides =
    [ [ padded intro ]
    , [ Content.custom Model.tangram ]
    , [ padded toc ]
    , [ background "assets/elm-street-404-delivery.jpg" []
      , shout "Why WebGL in Elm?"
      ]
    , [ background "assets/elm-street-404.jpg" existing ]
    , [ background "assets/elm-street-404.jpg" webgl ]
    , [ background "assets/elm-street-404.jpg" webglInElm ]
    , [ shout "How to get started?" ]
    , [ padded rendering ]
    , [ padded entity ]
    , [ padded example ]
    , [ padded codeMesh ]
    , [ padded codeVertexShader ]
    , [ padded codeFragmentShader ]
    , [ padded codeView ]
    , [ shout "Demo Time!" ]
    , [ padded animation2d ]
    , [ padded recursiveSphere ]
    , [ padded snake ]
    , [ padded games ]
    , [ padded moreGames ]
    , [ padded cubik ]
    , [ padded shadertoy ]
    , [ padded elmTerrain ]
    , [ padded elmObjLoader ]
    , [ padded sceneGraph ]
    , [ padded videos ]
    , [ shout "Thank you!" ]
    ]
        -- make 16:9 slides
        |> List.map (Slide.slide >> Slide.setDimensions ( 1280, 720 ))
