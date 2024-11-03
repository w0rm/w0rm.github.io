module Custom.AnimatedGradient exposing (Model, Msg, Options, initial, subscriptions, update, view)

import Animator exposing (Timeline)
import Browser
import Browser.Dom
import Browser.Events exposing (onAnimationFrame, onKeyPress, onMouseMove, onMouseUp, onResize)
import Color exposing (Color)
import Common.Palette as Palette
import Common.Types exposing (Gradient, Point)
import Hex
import Html exposing (Html)
import Html.Attributes as Attributes exposing (style)
import Html.Events as Events
import Json.Decode as Decode
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3, vec3)
import MeshGradient.BezierPoint as BezierPoint exposing (BezierPoint, Vector, point)
import MeshGradient.Grid as Grid exposing (Grid)
import MeshGradient.Mesh as Mesh
import MeshGradient.Shaders as Shaders exposing (Uniforms)
import Svg
import Svg.Attributes
import Task
import Time
import WebGL exposing (Mesh, Shader)
import WebGL.Settings as Settings exposing (Setting)
import WebGL.Settings.DepthTest as DepthTest


type alias Options =
    { id : String
    , width : Float
    , height : Float
    , gradient : Timeline () -> Gradient
    }


type alias Model =
    { id : String
    , width : Float
    , height : Float
    , element : Maybe Browser.Dom.Element
    , gradient : Timeline () -> Gradient
    , showGrid : Bool
    , timeline : Timeline ()
    }


type Msg
    = MeasureSize
    | GotElement (Result Browser.Dom.Error Browser.Dom.Element)
    | ToggleGrid
    | Animate Time.Posix


initial : Options -> Model
initial { width, height, id, gradient } =
    { id = id
    , width = width
    , height = height
    , element = Nothing
    , gradient = gradient
    , showGrid = False
    , timeline = Animator.init ()
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Animate posix ->
            ( { model | timeline = Animator.updateTimeline posix model.timeline }, Cmd.none )

        MeasureSize ->
            ( model, Task.attempt GotElement (Browser.Dom.getElement model.id) )

        GotElement element ->
            ( { model | element = Result.toMaybe element }, Cmd.none )

        ToggleGrid ->
            ( { model | showGrid = not model.showGrid }, Cmd.none )


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
        , onAnimationFrame Animate
        , onKeyPress
            (Decode.andThen
                (\code ->
                    if code == 103 then
                        -- letter 'g'
                        Decode.succeed ToggleGrid

                    else
                        Decode.fail "Invalid key"
                )
                Events.keyCode
            )
        ]


view : Model -> Html Msg
view { id, width, height, gradient, timeline, showGrid } =
    let
        grid =
            Grid.initControlPoints (gradient timeline)

        dimensions =
            { width = width, height = height }
    in
    Html.div
        [ Attributes.id id
        , style "width" (String.fromFloat width ++ "px")
        , style "height" (String.fromFloat height ++ "px")
        ]
        [ WebGL.toHtml
            [ Attributes.width (round width)
            , Attributes.height (round height)
            , style "pointer-events" "none"
            , style "display" "block"
            ]
            (List.concatMap
                (\uniforms ->
                    condList
                        [ ( True, WebGL.entityWith settings Shaders.vertex Shaders.fragment Mesh.gradient (uniforms False) )
                        , ( showGrid, WebGL.entityWith settings Shaders.vertex Shaders.fragment Mesh.wireframe (uniforms True) )
                        ]
                )
                (Shaders.uniforms dimensions grid)
            )
        ]


settings : List Setting
settings =
    [ DepthTest.default, Settings.cullFace Settings.front ]


svgGrid : { width : Float, height : Float } -> Grid BezierPoint -> Html msg
svgGrid { width, height } grid =
    let
        verticalPath : Int -> Int -> String
        verticalPath i j =
            let
                p1 =
                    Grid.get grid i (j - 1)

                p2 =
                    Grid.get grid i j

                x1 =
                    String.fromFloat (p1.position.x * width)

                y1 =
                    String.fromFloat (p1.position.y * height)

                x12 =
                    String.fromFloat ((p1.bottom.dx + p1.position.x) * width)

                y12 =
                    String.fromFloat ((p1.bottom.dy + p1.position.y) * height)

                x22 =
                    String.fromFloat ((p2.top.dx + p2.position.x) * width)

                y22 =
                    String.fromFloat ((p2.top.dy + p2.position.y) * height)

                x2 =
                    String.fromFloat (p2.position.x * width)

                y2 =
                    String.fromFloat (p2.position.y * height)
            in
            "M" ++ x1 ++ " " ++ y1 ++ "C" ++ x12 ++ " " ++ y12 ++ " " ++ x22 ++ " " ++ y22 ++ " " ++ x2 ++ " " ++ y2

        horizontalPath : Int -> Int -> String
        horizontalPath i j =
            let
                p1 =
                    Grid.get grid (i - 1) j

                p2 =
                    Grid.get grid i j

                x1 =
                    String.fromFloat (p1.position.x * width)

                y1 =
                    String.fromFloat (p1.position.y * height)

                x12 =
                    String.fromFloat ((p1.trailing.dx + p1.position.x) * width)

                y12 =
                    String.fromFloat ((p1.trailing.dy + p1.position.y) * height)

                x22 =
                    String.fromFloat ((p2.leading.dx + p2.position.x) * width)

                y22 =
                    String.fromFloat ((p2.leading.dy + p2.position.y) * height)

                x2 =
                    String.fromFloat (p2.position.x * width)

                y2 =
                    String.fromFloat (p2.position.y * height)
            in
            "M" ++ x1 ++ " " ++ y1 ++ "C" ++ x12 ++ " " ++ y12 ++ " " ++ x22 ++ " " ++ y22 ++ " " ++ x2 ++ " " ++ y2

        gridLines i j =
            [ ( j > 0, verticalPath i j )
            , ( i > 0, horizontalPath i j )
            ]
                |> condList
                |> String.concat

        fourLinesToControlPoints i j =
            let
                p =
                    Grid.get grid i j

                x =
                    String.fromFloat (p.position.x * width)

                y =
                    String.fromFloat (p.position.y * height)

                trailingX =
                    String.fromFloat (p.trailing.dx * width)

                trailingY =
                    String.fromFloat (p.trailing.dy * height)

                leadingX =
                    String.fromFloat (p.leading.dx * width)

                leadingY =
                    String.fromFloat (p.leading.dy * height)

                topX =
                    String.fromFloat (p.top.dx * width)

                topY =
                    String.fromFloat (p.top.dy * height)

                bottomX =
                    String.fromFloat (p.bottom.dx * width)

                bottomY =
                    String.fromFloat (p.bottom.dy * height)
            in
            [ ( i < grid.width - 1, "M" ++ x ++ " " ++ y ++ "l" ++ trailingX ++ " " ++ trailingY )
            , ( i > 0, "M" ++ x ++ " " ++ y ++ "l" ++ leadingX ++ " " ++ leadingY )
            , ( j > 0, "M" ++ x ++ " " ++ y ++ "l" ++ topX ++ " " ++ topY )
            , ( j < grid.height - 1, "M" ++ x ++ " " ++ y ++ "l" ++ bottomX ++ " " ++ bottomY )
            ]
                |> condList
                |> String.concat
    in
    Svg.svg
        [ Svg.Attributes.width (String.fromFloat width)
        , Svg.Attributes.height (String.fromFloat height)
        , Svg.Attributes.fill "none"
        , Svg.Attributes.stroke "white"
        , Svg.Attributes.strokeWidth "1"
        , style "position" "absolute"
        , style "left" "0"
        , style "top" "0"
        , style "pointer-events" "none"
        ]
        (Grid.fold
            (\x y l ->
                Svg.path [ Svg.Attributes.d (gridLines x y) ] []
                    :: Svg.path [ Svg.Attributes.d (fourLinesToControlPoints x y), Svg.Attributes.strokeDasharray "5,5" ] []
                    :: l
            )
            []
            grid.width
            grid.height
        )


condList : List ( Bool, a ) -> List a
condList list =
    List.map Tuple.second (List.filter Tuple.first list)
