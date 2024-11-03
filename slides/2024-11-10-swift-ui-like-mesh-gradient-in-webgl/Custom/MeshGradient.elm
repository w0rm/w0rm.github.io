module Custom.MeshGradient exposing (Mode(..), Model, Msg, Options, initial, subscriptions, update, view)

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
import WebGL exposing (Mesh, Shader)
import WebGL.Settings as Settings exposing (Setting)
import WebGL.Settings.DepthTest as DepthTest


type Mode
    = Automatic Bool
    | Manual Bool
    | FreeForm


type alias Options =
    { id : String
    , width : Float
    , height : Float
    , gradient : Gradient
    , mode : Mode
    }


type alias Model =
    { id : String
    , width : Float
    , height : Float
    , element : Maybe Browser.Dom.Element
    , gradient : Grid BezierPoint
    , moving : Maybe ( Int, Float -> Float -> BezierPoint -> BezierPoint, Bool )
    , showGrid : Bool
    , editMode : Bool
    , mode : Mode
    }


type Msg
    = MeasureSize
    | GotElement (Result Browser.Dom.Error Browser.Dom.Element)
    | ColorChange Int String
    | StartMove Int (Float -> Float -> BezierPoint -> BezierPoint)
    | Move Float Float
    | StopMove
    | ToggleEdit
    | ToggleGrid
    | GenerateControlPoints


initial : Options -> Model
initial { width, height, id, gradient, mode } =
    { id = id
    , width = width
    , height = height
    , element = Nothing
    , moving = Nothing
    , gradient = Grid.initControlPoints gradient
    , showGrid = False
    , editMode =
        case mode of
            FreeForm ->
                True

            Manual editMore ->
                editMore

            Automatic editMore ->
                editMore
    , mode = mode
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
                        model.gradient.colors

                gradient =
                    model.gradient
            in
            ( { model | gradient = { gradient | colors = colors } }, Cmd.none )

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
                                model.gradient.points

                        gradient =
                            model.gradient
                    in
                    ( { model
                        | gradient =
                            case model.mode of
                                Automatic _ ->
                                    Grid.withControlPoints { gradient | points = points }

                                _ ->
                                    { gradient | points = points }
                        , moving = Just ( moving, fn, True )
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        StopMove ->
            ( { model | moving = Nothing }, Cmd.none )

        ToggleGrid ->
            ( { model | showGrid = not model.showGrid }, Cmd.none )

        ToggleEdit ->
            ( { model | editMode = not model.editMode }, Cmd.none )

        GenerateControlPoints ->
            ( { model | gradient = Grid.withControlPoints model.gradient }, Cmd.none )


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
                    if code == 103 then
                        -- letter 'g'
                        Decode.succeed ToggleGrid

                    else if code == 101 then
                        -- letter 'e'
                        Decode.succeed ToggleEdit

                    else if code == 97 then
                        -- letter 'a'
                        Decode.succeed GenerateControlPoints

                    else
                        Decode.fail "Invalid key"
                )
                Events.keyCode
            )
        ]


view : Model -> Html Msg
view ({ id, width, height, gradient, showGrid, mode, editMode } as model) =
    let
        dimensions =
            { width = width, height = height }
    in
    Html.div
        [ Attributes.id id
        , style "width" (String.fromFloat width ++ "px")
        , style "height" (String.fromFloat height ++ "px")
        ]
        (WebGL.toHtml
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
                (Shaders.uniforms dimensions gradient)
            )
            :: (if editMode then
                    case mode of
                        Automatic _ ->
                            controlPoints model

                        _ ->
                            svgGrid dimensions gradient :: controlPoints model

                else
                    []
               )
        )


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


controlPoints : Model -> List (Html Msg)
controlPoints { gradient, width, height, moving, mode } =
    List.indexedMap
        (\idx ( { position, top, leading, bottom, trailing }, color ) ->
            let
                isTop =
                    idx // gradient.width == 0

                isBottom =
                    idx // gradient.width == gradient.height - 1

                isLeading =
                    modBy gradient.width idx == 0

                isTrailing =
                    modBy gradient.width idx == gradient.width - 1

                shouldPinTop =
                    isTop && mode /= FreeForm

                shouldPinBottom =
                    isBottom && mode /= FreeForm

                shouldPinLeading =
                    isLeading && mode /= FreeForm

                shouldPinTrailing =
                    isTrailing && mode /= FreeForm

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
                            \_ y p -> { p | position = Point p.position.x y }

                        ( False, True ) ->
                            \x _ p -> { p | position = Point x p.position.y }

                        ( False, False ) ->
                            \x y p -> { p | position = Point x y }

                moveHorizontalOffset =
                    if shouldPinTop || shouldPinBottom then
                        \x _ p v -> Vector (x - p.position.x) v.dy

                    else
                        \x y p _ -> Vector (x - p.position.x) (y - p.position.y)

                moveVerticalOffset =
                    if shouldPinLeading || shouldPinTrailing then
                        \_ y p v -> Vector v.dx (y - p.position.y)

                    else
                        \x y p _ -> Vector (x - p.position.x) (y - p.position.y)
            in
            Html.div
                [ style "position" "absolute"
                , style "left" (String.fromFloat (position.x * width) ++ "px")
                , style "top" (String.fromFloat (position.y * height) ++ "px")
                ]
                (Html.label
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
                    :: List.filterMap
                        (\( hide, ( { dx, dy }, moveOffset ) ) ->
                            if hide || mode == Automatic False || mode == Automatic True then
                                Nothing

                            else
                                Just
                                    (Html.div
                                        [ style "position" "absolute"
                                        , style "left" (String.fromFloat (dx * width - 5) ++ "px")
                                        , style "top" (String.fromFloat (dy * height - 5) ++ "px")
                                        , style "width" "10px"
                                        , style "height" "10px"
                                        , style "overflow" "hidden"
                                        , style "background-color" (Color.toCssString color)
                                        , style "border-radius" "50%"
                                        , style "border" "solid 1px white"
                                        , style "box-shadow" "0 0 5px rgba(0, 0, 0, 0.5)"
                                        , Events.onMouseDown (StartMove idx moveOffset)
                                        ]
                                        []
                                    )
                        )
                        [ ( isTop, ( top, \x y p -> { p | top = moveVerticalOffset x y p p.top } ) )
                        , ( isLeading, ( leading, \x y p -> { p | leading = moveHorizontalOffset x y p p.leading } ) )
                        , ( isBottom, ( bottom, \x y p -> { p | bottom = moveVerticalOffset x y p p.bottom } ) )
                        , ( isTrailing, ( trailing, \x y p -> { p | trailing = moveHorizontalOffset x y p p.trailing } ) )
                        ]
                )
        )
        (List.map2 Tuple.pair gradient.points gradient.colors)


condList : List ( Bool, a ) -> List a
condList list =
    List.map Tuple.second (List.filter Tuple.first list)
