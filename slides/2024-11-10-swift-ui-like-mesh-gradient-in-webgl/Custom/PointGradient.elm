module Custom.PointGradient exposing (Model, Msg, Options, initial, subscriptions, update, view)

{- The shader code is adopted from https://github.com/ben-fornefeld/mesh_gradient -}

import Browser
import Browser.Dom exposing (getViewport)
import Browser.Events exposing (onAnimationFrame, onKeyPress, onMouseMove, onMouseUp, onResize)
import Color exposing (Color)
import Common.Palette as Palette
import Common.Types exposing (Gradient, Point)
import Html exposing (Html)
import Html.Attributes as Attributes exposing (style)
import Html.Events as Events
import Json.Decode as Decode
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3, vec3)
import Task
import WebGL exposing (Mesh, Shader)


type alias Options =
    { id : String
    , width : Float
    , height : Float
    , gradient : Gradient
    }


type alias Model =
    { id : String
    , width : Float
    , height : Float
    , n : Int
    , m : Int
    , element : Maybe Browser.Dom.Element
    , points : List Point
    , colors : List Color
    , moving : Maybe ( Int, Float -> Float -> Point -> Point, Bool )
    , editMode : Bool
    }


type Msg
    = MeasureSize
    | GotElement (Result Browser.Dom.Error Browser.Dom.Element)
    | ColorChange Int String
    | StartMove Int (Float -> Float -> Point -> Point)
    | Move Float Float
    | StopMove
    | ToggleEdit


initial : Options -> Model
initial { width, height, id, gradient } =
    { id = id
    , width = width
    , height = height
    , element = Nothing
    , moving = Nothing
    , n = gradient.width
    , m = gradient.height
    , points = gradient.points
    , colors = gradient.colors
    , editMode = False
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MeasureSize ->
            ( model, Task.attempt GotElement (Browser.Dom.getElement model.id) )

        GotElement element ->
            ( { model | element = Result.toMaybe element }, Cmd.none )

        ColorChange i color ->
            let
                colors =
                    List.indexedMap
                        (\idx col ->
                            if idx == i then
                                Palette.fromCss color
                                    |> Maybe.withDefault col

                            else
                                col
                        )
                        model.colors
            in
            ( { model | colors = colors }, Cmd.none )

        StartMove p fn ->
            ( { model | moving = Just ( p, fn, False ) }, Cmd.none )

        Move x y ->
            case model.moving of
                Just ( moving, fn, _ ) ->
                    let
                        points =
                            List.indexedMap
                                (\idx p ->
                                    if idx == moving then
                                        fn x y p

                                    else
                                        p
                                )
                                model.points
                    in
                    ( { model | points = points, moving = Just ( moving, fn, True ) }, Cmd.none )

                Nothing ->
                    ( model, Cmd.none )

        StopMove ->
            ( { model | moving = Nothing }, Cmd.none )

        ToggleEdit ->
            ( { model | editMode = not model.editMode }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ case model.element of
            Nothing ->
                -- Measure the element the first time
                -- This is a hack to get the element size
                -- Because elm slice show doesn't support initial command
                onAnimationFrame (\_ -> MeasureSize)

            Just element ->
                -- Keep measuring the element size on resize
                onResize (\_ _ -> MeasureSize)
        , onMouseUp (Decode.succeed StopMove)
        , onMouseMove
            (Decode.map2 Tuple.pair (Decode.field "pageX" Decode.float) (Decode.field "pageY" Decode.float)
                |> Decode.andThen
                    (\( mouseX, mouseY ) ->
                        case model.element of
                            Just { element } ->
                                Decode.succeed <|
                                    -- recalculate position on the page
                                    Move
                                        (min 1 (max 0 ((mouseX - element.x) / element.width)))
                                        (min 1 (max 0 ((mouseY - element.y) / element.height)))

                            Nothing ->
                                Decode.fail "No element found"
                    )
            )
        , onKeyPress
            (Decode.andThen
                (\code ->
                    if code == 101 then
                        -- letter 'e'
                        Decode.succeed ToggleEdit

                    else
                        Decode.fail "Invalid key"
                )
                Events.keyCode
            )
        ]


zero : Point
zero =
    Point 0 0


view : Model -> Html Msg
view ({ id, width, height, points, colors } as model) =
    let
        pos i =
            Maybe.withDefault zero (List.head (List.drop i points))

        col i =
            Maybe.withDefault Color.black (List.head (List.drop i colors))
    in
    Html.div
        [ Attributes.id id
        , style "width" (String.fromFloat width ++ "px")
        , style "height" (String.fromFloat height ++ "px")
        ]
        (WebGL.toHtml
            [ Attributes.width (round width)
            , Attributes.height (round height)
            , style "position" "absolute"
            , style "left" "0"
            , style "top" "0"
            , style "display" "block"
            ]
            [ WebGL.entity
                vertexShader
                fragmentShader
                mesh
                { uSize = vec2 width height
                , uOptions = vec3 2 0.01 (toFloat (List.length points))
                , uPosition1 = Vec2.fromRecord (pos 0)
                , uPosition2 = Vec2.fromRecord (pos 1)
                , uPosition3 = Vec2.fromRecord (pos 2)
                , uPosition4 = Vec2.fromRecord (pos 3)
                , uPosition5 = Vec2.fromRecord (pos 4)
                , uPosition6 = Vec2.fromRecord (pos 5)
                , uPosition7 = Vec2.fromRecord (pos 6)
                , uPosition8 = Vec2.fromRecord (pos 7)
                , uPosition9 = Vec2.fromRecord (pos 8)
                , uPosition10 = Vec2.fromRecord (pos 9)
                , uPosition11 = Vec2.fromRecord (pos 10)
                , uPosition12 = Vec2.fromRecord (pos 11)
                , uPosition13 = Vec2.fromRecord (pos 12)
                , uPosition14 = Vec2.fromRecord (pos 13)
                , uPosition15 = Vec2.fromRecord (pos 14)
                , uPosition16 = Vec2.fromRecord (pos 15)
                , uColor1 = Palette.toVec3 (col 0)
                , uColor2 = Palette.toVec3 (col 1)
                , uColor3 = Palette.toVec3 (col 2)
                , uColor4 = Palette.toVec3 (col 3)
                , uColor5 = Palette.toVec3 (col 4)
                , uColor6 = Palette.toVec3 (col 5)
                , uColor7 = Palette.toVec3 (col 6)
                , uColor8 = Palette.toVec3 (col 7)
                , uColor9 = Palette.toVec3 (col 8)
                , uColor10 = Palette.toVec3 (col 9)
                , uColor11 = Palette.toVec3 (col 10)
                , uColor12 = Palette.toVec3 (col 11)
                , uColor13 = Palette.toVec3 (col 12)
                , uColor14 = Palette.toVec3 (col 13)
                , uColor15 = Palette.toVec3 (col 14)
                , uColor16 = Palette.toVec3 (col 15)
                }
            ]
            :: (if model.editMode then
                    controlPoints model

                else
                    []
               )
        )


controlPoints : Model -> List (Html Msg)
controlPoints { points, colors, n, m, width, height, moving } =
    List.indexedMap
        (\idx ( position, color ) ->
            let
                shouldPinTop =
                    idx // n == 0

                shouldPinBottom =
                    idx // n == m - 1

                shouldPinLeading =
                    modBy n idx == 0

                shouldPinTrailing =
                    modBy n idx == n - 1

                hideColorInput =
                    case moving of
                        Just ( i, _, hide ) ->
                            i == idx && hide

                        Nothing ->
                            False

                move =
                    case ( shouldPinLeading || shouldPinTrailing, shouldPinTop || shouldPinBottom ) of
                        ( True, True ) ->
                            \_ _ p -> p

                        ( True, False ) ->
                            \_ y p -> Point p.x y

                        ( False, True ) ->
                            \x _ p -> Point x p.y

                        ( False, False ) ->
                            \x y p -> Point x y
            in
            Html.div
                [ style "position" "absolute"
                , style "left" (String.fromFloat (position.x * width) ++ "px")
                , style "top" (String.fromFloat (position.y * height) ++ "px")
                ]
                [ Html.label
                    [ style "position" "absolute"
                    , style "left" "-10px"
                    , style "top" "-10px"
                    , style "width" "20px"
                    , style "height" "20px"
                    , style "overflow" "hidden"
                    , style "background-color" (Color.toCssString color)
                    , style "border-radius" "50%"
                    , style "border" "solid 1px white"
                    , style "box-shadow" "0 0 5px rgba(0, 0, 0, 0.5)"
                    , Events.preventDefaultOn "dragstart" (Decode.succeed ( StartMove idx move, True ))
                    , Events.onMouseDown (StartMove idx move)
                    ]
                    [ if hideColorInput then
                        -- A trick to remove the color input when dragging
                        Html.text ""

                      else
                        Html.input
                            [ Attributes.type_ "color"
                            , Attributes.value (Color.toCssString color)
                            , Events.onInput (ColorChange idx)
                            , style "opacity" "0"
                            , style "width" "20px"
                            , style "height" "20px"
                            ]
                            []
                    ]
                ]
        )
        (List.map2 Tuple.pair points colors)



-- Mesh


mesh : Mesh { position : Vec2 }
mesh =
    WebGL.triangles
        [ ( { position = vec2 -1 1 }
          , { position = vec2 1 1 }
          , { position = vec2 -1 -1 }
          )
        , ( { position = vec2 -1 -1 }
          , { position = vec2 1 1 }
          , { position = vec2 1 -1 }
          )
        ]



-- Shaders


type alias Uniforms =
    { uSize : Vec2
    , uOptions : Vec3 -- uBlend, uNoiseIntensity, uNumPoints
    , uPosition1 : Vec2
    , uPosition2 : Vec2
    , uPosition3 : Vec2
    , uPosition4 : Vec2
    , uPosition5 : Vec2
    , uPosition6 : Vec2
    , uPosition7 : Vec2
    , uPosition8 : Vec2
    , uPosition9 : Vec2
    , uPosition10 : Vec2
    , uPosition11 : Vec2
    , uPosition12 : Vec2
    , uPosition13 : Vec2
    , uPosition14 : Vec2
    , uPosition15 : Vec2
    , uPosition16 : Vec2
    , uColor1 : Vec3
    , uColor2 : Vec3
    , uColor3 : Vec3
    , uColor4 : Vec3
    , uColor5 : Vec3
    , uColor6 : Vec3
    , uColor7 : Vec3
    , uColor8 : Vec3
    , uColor9 : Vec3
    , uColor10 : Vec3
    , uColor11 : Vec3
    , uColor12 : Vec3
    , uColor13 : Vec3
    , uColor14 : Vec3
    , uColor15 : Vec3
    , uColor16 : Vec3
    }


vertexShader : Shader { position : Vec2 } Uniforms { vFragCoord : Vec2 }
vertexShader =
    [glsl|

        precision mediump float;

        attribute vec2 position;
        varying vec2 vFragCoord;
        uniform vec2 uSize; // viewport resolution (in pixels)

        void main () {
            vFragCoord = (position * vec2(1.0, -1.0) + 1.0) / 2.0 * uSize;
            gl_Position = vec4(position, 0.0, 1.0);
        }

    |]


fragmentShader : Shader {} Uniforms { vFragCoord : Vec2 }
fragmentShader =
    [glsl|

        precision mediump float;

        varying vec2 vFragCoord;
        uniform vec2 uSize; // viewport resolution (in pixels)
        uniform vec3 uOptions; // uBlend, uNoiseIntensity, uNumPoints
        uniform vec2 uPosition1;
        uniform vec2 uPosition2;
        uniform vec2 uPosition3;
        uniform vec2 uPosition4;
        uniform vec2 uPosition5;
        uniform vec2 uPosition6;
        uniform vec2 uPosition7;
        uniform vec2 uPosition8;
        uniform vec2 uPosition9;
        uniform vec2 uPosition10;
        uniform vec2 uPosition11;
        uniform vec2 uPosition12;
        uniform vec2 uPosition13;
        uniform vec2 uPosition14;
        uniform vec2 uPosition15;
        uniform vec2 uPosition16;

        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        uniform vec3 uColor7;
        uniform vec3 uColor8;
        uniform vec3 uColor9;
        uniform vec3 uColor10;
        uniform vec3 uColor11;
        uniform vec3 uColor12;
        uniform vec3 uColor13;
        uniform vec3 uColor14;
        uniform vec3 uColor15;
        uniform vec3 uColor16;

        float uBlend = uOptions.x;
        float uNoiseIntensity = uOptions.y;
        float uNumPoints = uOptions.z;

        float noise(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        const float SRGB_GAMMA = 1.0 / 2.2;
        const float SRGB_INVERSE_GAMMA = 2.2;

        vec3 srgbToLinear(vec3 rgb) {
            return pow(rgb, vec3(SRGB_GAMMA));
        }

        vec3 linearToSrgb(vec3 srgb) {
            return pow(srgb, vec3(SRGB_INVERSE_GAMMA));
        }

        float complexNoise(vec2 st) {
            // Create a more complex noise by combining multiple noise functions
            float n1 = noise(st * 1.6);
            float n2 = noise(st * 3.2);
            float n3 = noise(st * 6.4);
            float n4 = noise(st * 12.8);

            // Combine the noises with different weights
            float totalNoise = n1 * 0.5 + n2 * 0.25 + n3 * 0.125 + n4 * 0.0625;

            // Normalize the result
            return totalNoise / (0.5 + 0.25 + 0.125 + 0.0625);
        }

        void processPoint(vec2 point, vec3 color, vec2 uv, float blend, inout vec3 sum, inout float valence) {
            float distance = length(uv - point);
            if (distance == 0.0) { distance = 1.0; }
            float w = 1.0 / pow(distance, blend);
            sum += w * color;
            valence += w;
        }

        void main () {
            float blend = uBlend;
            vec2 uv = vFragCoord / uSize;
            vec3 sum = vec3(0.0);
            float valence = 0.0;

            if (uNumPoints > 0.0) { processPoint(uPosition1, srgbToLinear(uColor1), uv, blend, sum, valence); }
            if (uNumPoints > 1.0) { processPoint(uPosition2, srgbToLinear(uColor2), uv, blend, sum, valence); }
            if (uNumPoints > 2.0) { processPoint(uPosition3, srgbToLinear(uColor3), uv, blend, sum, valence); }
            if (uNumPoints > 3.0) { processPoint(uPosition4, srgbToLinear(uColor4), uv, blend, sum, valence); }
            if (uNumPoints > 4.0) { processPoint(uPosition5, srgbToLinear(uColor5), uv, blend, sum, valence); }
            if (uNumPoints > 5.0) { processPoint(uPosition6, srgbToLinear(uColor6), uv, blend, sum, valence); }
            if (uNumPoints > 6.0) { processPoint(uPosition7, srgbToLinear(uColor7), uv, blend, sum, valence); }
            if (uNumPoints > 7.0) { processPoint(uPosition8, srgbToLinear(uColor8), uv, blend, sum, valence); }
            if (uNumPoints > 8.0) { processPoint(uPosition9, srgbToLinear(uColor9), uv, blend, sum, valence); }
            if (uNumPoints > 9.0) { processPoint(uPosition10, srgbToLinear(uColor10), uv, blend, sum, valence); }
            if (uNumPoints > 10.0) { processPoint(uPosition11, srgbToLinear(uColor11), uv, blend, sum, valence); }
            if (uNumPoints > 11.0) { processPoint(uPosition12, srgbToLinear(uColor12), uv, blend, sum, valence); }
            if (uNumPoints > 12.0) { processPoint(uPosition13, srgbToLinear(uColor13), uv, blend, sum, valence); }
            if (uNumPoints > 13.0) { processPoint(uPosition14, srgbToLinear(uColor14), uv, blend, sum, valence); }
            if (uNumPoints > 14.0) { processPoint(uPosition15, srgbToLinear(uColor15), uv, blend, sum, valence); }
            if (uNumPoints > 15.0) { processPoint(uPosition16, srgbToLinear(uColor16), uv, blend, sum, valence); }

            if (valence != 0.0) { sum /= valence; }

            float n = complexNoise(vFragCoord * 0.1);
            sum = mix(sum, sum * n, (uNoiseIntensity * -1.0));
            sum = linearToSrgb(sum);

            gl_FragColor = vec4(sum, 1.0);
        }

    |]
