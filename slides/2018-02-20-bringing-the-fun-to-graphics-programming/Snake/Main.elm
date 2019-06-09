module Snake.Main exposing (initial, Message, Model, update, view, subscriptions)

import Time exposing (Time, second)
import Keyboard.Extra
import Random
import Html
import Window exposing (Size)
import Keyboard.Extra
import Time exposing (Time, second)
import Window exposing (Size)
import Html exposing (..)
import Html.Attributes exposing (..)
import WebGL exposing (Mesh, Shader, Entity)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Math.Matrix4 exposing (Mat4, mul)
import WebGL.Settings.DepthTest as DepthTest
import WebGL.Settings.StencilTest as StencilTest


type alias Position =
    ( Int, Int )


type alias Model =
    { snake : List Position
    , apple : Position
    , arrows : Position
    , direction : Position
    , keyboardModel : List Keyboard.Extra.Key
    , size : Size
    }


type Message
    = Tick Time
    | TickControl Time
    | KeyboardMsg Keyboard.Extra.Msg
    | NewApple ( Int, Int )
    | Resize Size


config =
    { fps = 60
    , tps = 5
    , max = 10
    , spriteSize = 20
    }


initialKeyboard : List Keyboard.Extra.Key
initialKeyboard =
    []


initial : Int -> Int -> Model
initial width height =
    Model
        [ ( 0, 0 ) ]
        ( 0, 0 )
        ( 0, 0 )
        ( 1, 0 )
        initialKeyboard
        (Size width height)


subscriptions : Model -> Sub Message
subscriptions model =
    Sub.batch
        [ Sub.map KeyboardMsg Keyboard.Extra.subscriptions
        , Time.every (second / config.fps) TickControl
        , Time.every (second / config.tps) Tick
        ]


dropLastVertebra =
    List.reverse
        << List.drop 1
        << List.reverse


calculateNewVertebra ( x, y ) ( directionX, directionY ) =
    ( directionX + x
    , directionY + y
    )


addNewVertebra : ( Int, Int ) -> List ( Int, Int ) -> List ( Int, Int )
addNewVertebra direction snake =
    let
        currentHead =
            snake
                |> List.head
                |> Maybe.withDefault ( 0, 0 )

        newVertebra =
            calculateNewVertebra currentHead direction
    in
        (newVertebra :: snake)


collision =
    List.member


generateNewApple =
    Random.generate NewApple
        (Random.pair
            (Random.int 1 config.max)
            (Random.int 1 config.max)
        )


between minimum maximum value =
    value >= minimum && value <= maximum


out minimum maximum ( x, y ) =
    let
        betweenBorders =
            between minimum maximum
    in
        (not <| betweenBorders y)
            || (not <| betweenBorders x)


collisionWithHimselfOrWall snake =
    case snake of
        head :: tail ->
            collision head tail || out 0 config.max head

        [] ->
            False


moveSnake : Model -> ( Model, Cmd Message )
moveSnake ({ direction, snake, apple } as model) =
    let
        movedSnake =
            snake
                |> addNewVertebra direction

        appleEaten =
            movedSnake
                |> collision apple

        finalSnake =
            if appleEaten then
                movedSnake
            else
                movedSnake |> dropLastVertebra
    in
        if collisionWithHimselfOrWall movedSnake then
            ( initial model.size.width model.size.height, Cmd.none )
        else
            ( { model | snake = finalSnake }
            , if appleEaten then
                generateNewApple
              else
                Cmd.none
            )


applyKeyboard ( arrowX, arrowY ) (( snakeDirectionX, snakeDirectionY ) as snakeDirection) =
    if arrowX /= 0 && snakeDirectionX == 0 then
        ( arrowX, 0 )
    else if arrowY /= 0 && snakeDirectionY == 0 then
        ( 0, -arrowY )
    else
        snakeDirection


updateDirection : Model -> Model
updateDirection model =
    let
        newDirection =
            model.direction
                |> applyKeyboard model.arrows
    in
        { model | direction = newDirection }


handleKeyboard : Model -> Keyboard.Extra.Msg -> ( Model, Cmd Message )
handleKeyboard model keyMsg =
    let
        keyboardModel =
            Keyboard.Extra.update keyMsg model.keyboardModel

        arrows =
            Keyboard.Extra.wasd keyboardModel

        newArrows : ( Int, Int )
        newArrows =
            ( arrows.x, arrows.y )
    in
        ( { model
            | keyboardModel = keyboardModel
            , arrows = newArrows
          }
        , Cmd.none
        )


addNewApple : ( Int, Int ) -> Model -> ( Model, Cmd Message )
addNewApple newApple model =
    if collision newApple model.snake then
        ( model, generateNewApple )
    else
        ( { model | apple = newApple }, Cmd.none )


update : Message -> Model -> ( Model, Cmd Message )
update msg model =
    case msg of
        KeyboardMsg keyMsg ->
            handleKeyboard model keyMsg

        TickControl time ->
            ( model |> updateDirection, Cmd.none )

        Tick time ->
            model
                |> moveSnake

        NewApple newApple ->
            model
                |> addNewApple newApple

        Resize size ->
            ( { model | size = size }, Cmd.none )


type alias Attributes =
    { position : Vec3
    , normal : Vec3
    }


{-| Direction of the light
-}
light : Vec3
light =
    vec3 -1 1 3 |> Vec3.normalize


{-| Normal to the floor
-}
floorNormal : Vec3
floorNormal =
    vec3 0 0 -1 |> Vec3.normalize


{-| Camera projection matrix
-}
camera : Float -> Mat4
camera ratio =
    let
        c =
            toFloat config.max / 2

        eye =
            vec3 c -c 15

        center =
            vec3 c c 0
    in
        mul (Math.Matrix4.makePerspective 45 ratio 0.01 100)
            (Math.Matrix4.makeLookAt eye center Vec3.j)


{-| Adds a normal to the attributes
-}
attributes : Vec3 -> Vec3 -> Vec3 -> ( Attributes, Attributes, Attributes )
attributes p1 p2 p3 =
    let
        normal =
            Vec3.cross (Vec3.sub p1 p2) (Vec3.sub p1 p3) |> Vec3.normalize
    in
        ( Attributes p1 normal, Attributes p2 normal, Attributes p3 normal )


{-| A "squash" matrix that smashes things to the ground plane,
defined by a normal, parallel to a given light vector
-}
shadow : Vec3 -> Vec3 -> Mat4
shadow normal light =
    let
        p =
            Vec3.toRecord normal

        l =
            Vec3.toRecord light

        d =
            Vec3.dot normal light
    in
        Math.Matrix4.fromRecord
            { m11 = p.x * l.x - d
            , m21 = p.x * l.y
            , m31 = p.x * l.z
            , m41 = 0
            , m12 = p.y * l.x
            , m22 = p.y * l.y - d
            , m32 = p.y * l.z
            , m42 = 0
            , m13 = p.z * l.x
            , m23 = p.z * l.y
            , m33 = p.z * l.z - d
            , m43 = 0
            , m14 = 0
            , m24 = 0
            , m34 = 0
            , m44 = -d
            }


cube : Mesh Attributes
cube =
    WebGL.triangles
        [ -- back
          attributes (vec3 -0.5 0.5 -0.5) (vec3 -0.5 0.5 0.5) (vec3 0.5 0.5 0.5)
        , attributes (vec3 0.5 0.5 0.5) (vec3 0.5 0.5 -0.5) (vec3 -0.5 0.5 -0.5)

        -- top
        , attributes (vec3 -0.5 0.5 0.5) (vec3 -0.5 -0.5 0.5) (vec3 0.5 0.5 0.5)
        , attributes (vec3 -0.5 -0.5 0.5) (vec3 0.5 -0.5 0.5) (vec3 0.5 0.5 0.5)

        -- right
        , attributes (vec3 0.5 0.5 0.5) (vec3 0.5 -0.5 0.5) (vec3 0.5 -0.5 -0.5)
        , attributes (vec3 0.5 -0.5 -0.5) (vec3 0.5 0.5 -0.5) (vec3 0.5 0.5 0.5)

        -- left
        , attributes (vec3 -0.5 0.5 -0.5) (vec3 -0.5 -0.5 0.5) (vec3 -0.5 0.5 0.5)
        , attributes (vec3 -0.5 0.5 -0.5) (vec3 -0.5 -0.5 -0.5) (vec3 -0.5 -0.5 0.5)

        -- bottom
        , attributes (vec3 -0.5 0.5 -0.5) (vec3 0.5 0.5 -0.5) (vec3 0.5 -0.5 -0.5)
        , attributes (vec3 -0.5 0.5 -0.5) (vec3 0.5 -0.5 -0.5) (vec3 -0.5 -0.5 -0.5)

        -- front
        , attributes (vec3 -0.5 -0.5 -0.5) (vec3 0.5 -0.5 0.5) (vec3 -0.5 -0.5 0.5)
        , attributes (vec3 0.5 -0.5 0.5) (vec3 -0.5 -0.5 -0.5) (vec3 0.5 -0.5 -0.5)
        ]


square : Mesh Attributes
square =
    WebGL.triangles
        [ attributes (vec3 -0.5 0.5 0) (vec3 -0.5 -0.5 0) (vec3 0.5 0.5 0)
        , attributes (vec3 -0.5 -0.5 0) (vec3 0.5 -0.5 0) (vec3 0.5 0.5 0)
        ]


sphere : Mesh Attributes
sphere =
    divideSphere 5 octahedron
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

0 a 2

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


type alias Uniforms =
    { color : Vec3
    , offset : Vec3
    , camera : Mat4
    , light : Vec3
    }


vertebraShadowView : Float -> ( Int, Int ) -> Entity
vertebraShadowView ratio ( x, y ) =
    WebGL.entityWith
        [ StencilTest.test
            { ref = 1
            , mask = 0xFF
            , test = StencilTest.equal
            , fail = StencilTest.keep
            , zfail = StencilTest.keep
            , zpass = StencilTest.keep
            , writeMask = 0
            }
        , DepthTest.default
        ]
        shadowVertexShader
        shadowFragmentShader
        cube
        (Uniforms
            (vec3 0.32 0.16 0.24)
            (vec3 (toFloat x) (toFloat (config.max - y)) 0.5)
            (Math.Matrix4.mul (camera ratio) (shadow floorNormal light))
            light
        )


appleShadowView : Float -> ( Int, Int ) -> Entity
appleShadowView ratio ( x, y ) =
    WebGL.entityWith
        [ StencilTest.test
            { ref = 1
            , mask = 0xFF
            , test = StencilTest.equal
            , fail = StencilTest.keep
            , zfail = StencilTest.keep
            , zpass = StencilTest.keep
            , writeMask = 0
            }
        , DepthTest.default
        ]
        shadowVertexShader
        shadowFragmentShader
        sphere
        (Uniforms
            (vec3 0.32 0.16 0.24)
            (vec3 (toFloat x) (toFloat (config.max - y)) 0.5)
            (Math.Matrix4.mul (camera ratio) (shadow floorNormal light))
            light
        )


vertebraView : Float -> ( Int, Int ) -> Entity
vertebraView ratio ( x, y ) =
    WebGL.entity
        vertexShader
        fragmentShader
        cube
        (Uniforms
            (vec3 0 1 0)
            (vec3 (toFloat x) (toFloat (config.max - y)) 0.5)
            (camera ratio)
            light
        )


appleView : Float -> ( Int, Int ) -> Entity
appleView ratio ( x, y ) =
    WebGL.entity
        vertexShader
        fragmentShader
        sphere
        (Uniforms
            (vec3 1 0 0)
            (vec3 (toFloat x) (toFloat (config.max - y)) 0.5)
            (camera ratio)
            light
        )


wallsView : Float -> Entity
wallsView ratio =
    WebGL.entityWith
        [ StencilTest.test
            { ref = 1
            , mask = 0xFF
            , test = StencilTest.always
            , fail = StencilTest.keep
            , zfail = StencilTest.keep
            , zpass = StencilTest.replace
            , writeMask = 0xFF
            }
        ]
        vertexShader
        fragmentShader
        square
        (Uniforms (vec3 0.4 0.2 0.3)
            (vec3 0 0 0)
            (Math.Matrix4.makeScale3 (toFloat config.max + 1) (toFloat config.max + 1) 1
                |> Math.Matrix4.mul (Math.Matrix4.makeTranslate3 (toFloat config.max / 2) (toFloat config.max / 2) 0)
                |> Math.Matrix4.mul (camera ratio)
            )
            light
        )


type alias Varying =
    { vlighting : Float
    }


vertexShader : Shader Attributes Uniforms Varying
vertexShader =
    [glsl|
        attribute vec3 position;
        attribute vec3 normal;
        uniform vec3 offset;
        uniform mat4 camera;
        uniform vec3 light;
        varying highp float vlighting;
        void main () {
            highp float ambientLight = 0.5;
            highp float directionalLight = 0.5;
            gl_Position = camera * vec4(position + offset, 1.0);
            vlighting = ambientLight + max(dot(normal, light), 0.0) * directionalLight;
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


shadowVertexShader : Shader Attributes Uniforms {}
shadowVertexShader =
    [glsl|
        attribute vec3 position;
        uniform vec3 offset;
        uniform mat4 camera;
        void main () {
            gl_Position = camera * vec4(position + offset, 1.0);
        }
    |]


shadowFragmentShader : Shader {} Uniforms {}
shadowFragmentShader =
    [glsl|
        precision mediump float;
        uniform vec3 color;
        void main () {
            gl_FragColor = vec4(color, 1.0);
        }
    |]


view : Model -> Html.Html Message
view { apple, snake, size } =
    let
        ratio =
            (toFloat size.width / toFloat size.height)
    in
        WebGL.toHtmlWith
            [ WebGL.alpha True
            , WebGL.antialias
            , WebGL.depth 1
            , WebGL.stencil 0
            ]
            [ style
                [ ( "display", "block" )
                , ( "width", toString size.width ++ "px" )
                , ( "height", toString size.height ++ "px" )
                ]
            , width size.width
            , height size.height
            ]
            (wallsView ratio
                :: appleShadowView ratio apple
                :: appleView ratio apple
                :: List.map (vertebraShadowView ratio) snake
                ++ List.map (vertebraView ratio) snake
            )
