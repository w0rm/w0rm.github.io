module Schema exposing (view)

import Angle
import Axis3d exposing (Axis3d)
import Block3d
import Camera3d exposing (Camera3d)
import Circle2d exposing (Circle2d)
import Direction3d exposing (Direction3d)
import Frame2d
import Html exposing (Html)
import Html.Attributes as HtmlAttributes
import Length exposing (Meters)
import LineSegment2d exposing (LineSegment2d)
import LineSegment3d
import LineSegment3d.Projection as LineSegment3d
import Pixels exposing (Pixels, pixels)
import Plane3d exposing (Plane3d)
import Point2d exposing (Point2d)
import Point3d exposing (Point3d)
import Point3d.Projection as Point3d
import Rectangle2d exposing (Rectangle2d)
import Svg
import Svg.Attributes as SvgAttributes
import Viewpoint3d


type World
    = World


type Screen
    = Screen


camera : Camera3d Meters World
camera =
    Camera3d.perspective
        { viewpoint =
            Viewpoint3d.lookAt
                { eyePoint = Point3d.meters 3.05 4.2 2.1
                , focalPoint = Point3d.meters 0.3 -0.7 0
                , upDirection = Direction3d.positiveZ
                }
        , verticalFieldOfView = Angle.degrees 24
        }


screen : Rectangle2d Pixels Screen
screen =
    Rectangle2d.with
        { x1 = pixels 0
        , y1 = pixels 720
        , x2 = pixels 1280
        , y2 = pixels 0
        }


eyePoint : Point3d Meters World
eyePoint =
    Point3d.meters 3 4 2


cameraPoint : Point2d Pixels Screen
cameraPoint =
    eyePoint
        |> Point3d.toScreenSpace camera screen


focalPoint : Point3d Meters World
focalPoint =
    Point3d.meters -0.5 -0.5 0


cameraDirection : Direction3d World
cameraDirection =
    Direction3d.from eyePoint focalPoint
        |> Maybe.withDefault Direction3d.z


screenPlane : Plane3d Meters World
screenPlane =
    Plane3d.through
        (Point3d.translateIn cameraDirection (Length.meters 0.1) eyePoint)
        cameraDirection


raycastPoint : Point3d Meters World
raycastPoint =
    Point3d.meters
        0.2749908595123403
        0.01770722162219407
        0.41410641712205626


mouseRay1 : Axis3d Meters World
mouseRay1 =
    Axis3d.through
        eyePoint
        (Direction3d.from eyePoint raycastPoint |> Maybe.withDefault Direction3d.z)


mouseDownPoint : Point3d Meters World
mouseDownPoint =
    Axis3d.intersectionWithPlane screenPlane mouseRay1
        |> Maybe.withDefault Point3d.origin


cameraMouseDownSegment : LineSegment2d Pixels Screen
cameraMouseDownSegment =
    LineSegment3d.from eyePoint mouseDownPoint
        |> LineSegment3d.toScreenSpace camera screen


mouseDownRaycastSegment : LineSegment2d Pixels Screen
mouseDownRaycastSegment =
    LineSegment3d.from mouseDownPoint raycastPoint
        |> LineSegment3d.toScreenSpace camera screen


draggingPlane : Plane3d Meters World
draggingPlane =
    Plane3d.through
        raycastPoint
        cameraDirection


mouseMovePoint : Point3d Meters World
mouseMovePoint =
    Point2d.pixels 300 300
        |> Camera3d.ray screenCamera screen
        |> Axis3d.intersectionWithPlane screenPlane
        |> Maybe.withDefault Point3d.origin


draggingPoint : Point3d Meters World
draggingPoint =
    Point2d.pixels 300 300
        |> Camera3d.ray screenCamera screen
        |> Axis3d.intersectionWithPlane draggingPlane
        |> Maybe.withDefault Point3d.origin


cameraMouseMoveSegment : LineSegment2d Pixels Screen
cameraMouseMoveSegment =
    LineSegment3d.from eyePoint mouseMovePoint
        |> LineSegment3d.toScreenSpace camera screen


mouseMoveDraggingSegment : LineSegment2d Pixels Screen
mouseMoveDraggingSegment =
    LineSegment3d.from mouseMovePoint draggingPoint
        |> LineSegment3d.toScreenSpace camera screen


screenCamera : Camera3d Meters World
screenCamera =
    Camera3d.perspective
        { viewpoint =
            Viewpoint3d.lookAt
                { eyePoint = Point3d.meters 3 4 2
                , focalPoint = Point3d.meters -0.5 -0.5 0
                , upDirection = Direction3d.positiveZ
                }
        , verticalFieldOfView = Angle.degrees 24
        }


draggingPlaneRectangle : List (LineSegment2d Pixels Screen)
draggingPlaneRectangle =
    let
        corners =
            Rectangle2d.vertices screen
                |> List.map (Point2d.scaleAbout (Point2d.pixels 400 260) 0.5)
                |> List.map (Camera3d.ray screenCamera screen)
                |> List.filterMap (Axis3d.intersectionWithPlane draggingPlane)
                |> List.map (Point3d.toScreenSpace camera screen)
    in
    case corners of
        [ c1, c2, c3, c4 ] ->
            [ LineSegment2d.from c1 c2
            , LineSegment2d.from c2 c3
            , LineSegment2d.from c3 c4
            , LineSegment2d.from c4 c1
            ]

        _ ->
            []


screenPlaneRectangle : List (LineSegment2d Pixels Screen)
screenPlaneRectangle =
    let
        corners =
            Rectangle2d.vertices screen
                |> List.map (Camera3d.ray screenCamera screen)
                |> List.filterMap (Axis3d.intersectionWithPlane screenPlane)
                |> List.map (Point3d.toScreenSpace camera screen)
    in
    case corners of
        [ c1, c2, c3, c4 ] ->
            [ LineSegment2d.from c1 c2
            , LineSegment2d.from c2 c3
            , LineSegment2d.from c3 c4
            , LineSegment2d.from c4 c1
            ]

        _ ->
            []


table : List (LineSegment2d Pixels Screen)
table =
    [ Block3d.from
        (Point3d.millimeters 222 222 0)
        (Point3d.millimeters 272 272 400)
    , Block3d.from
        (Point3d.millimeters -272 222 0)
        (Point3d.millimeters -222 272 400)
    , Block3d.from
        (Point3d.millimeters -272 -272 0)
        (Point3d.millimeters -222 -222 400)
    , Block3d.from
        (Point3d.millimeters 222 -272 0)
        (Point3d.millimeters 272 -222 400)
    , Block3d.from
        (Point3d.millimeters -275 -275 400)
        (Point3d.millimeters 275 275 450)
    ]
        |> List.concatMap Block3d.edges
        |> List.map (LineSegment3d.toScreenSpace camera screen)


movedTable : List (LineSegment2d Pixels Screen)
movedTable =
    table
        |> List.map
            (LineSegment2d.relativeTo (Frame2d.atPoint (LineSegment2d.endPoint mouseDownRaycastSegment)))
        |> List.map
            (LineSegment2d.placeIn (Frame2d.withAngle (Angle.degrees -15) (LineSegment2d.endPoint mouseMoveDraggingSegment)))


view : Int -> Html a
view step =
    Svg.svg
        [ HtmlAttributes.style "display" "block"
        , SvgAttributes.width "1280"
        , SvgAttributes.height "720"
        ]
        (case step of
            1 ->
                step1

            2 ->
                step2

            3 ->
                step3

            4 ->
                step4

            5 ->
                step5

            _ ->
                step6
        )


step1 : List (Html a)
step1 =
    defs
        :: List.map (line Table) table
        ++ List.map (line Display) screenPlaneRectangle
        ++ [ label (Point2d.pixels 630 640) End "画面"
           , circle White (Circle2d.atPoint cameraPoint (pixels 10))
           , line MouseRay cameraMouseDownSegment
           , label (LineSegment2d.endPoint cameraMouseDownSegment) MouseDown "マウスダウン"
           , label cameraPoint End "カメラ"
           ]


step2 : List (Html a)
step2 =
    defs
        :: List.map (line Table) table
        ++ List.map (line Display) screenPlaneRectangle
        ++ [ label (Point2d.pixels 630 640) End "画面"
           , circle Black (Circle2d.atPoint (LineSegment2d.endPoint mouseDownRaycastSegment) (pixels 10))
           , label (LineSegment2d.endPoint mouseDownRaycastSegment) MouseBody "マウスのボディ"
           , circle White (Circle2d.atPoint cameraPoint (pixels 10))
           , line Ray mouseDownRaycastSegment
           , line MouseRay cameraMouseDownSegment
           , label (LineSegment2d.endPoint cameraMouseDownSegment) MouseDown "マウスダウン"
           , label cameraPoint End "カメラ"
           ]


step3 : List (Html a)
step3 =
    defs
        :: List.map (line TableRed) table
        ++ List.map (line Display) screenPlaneRectangle
        ++ [ label (Point2d.pixels 630 640) End "画面"
           , circle Red (Circle2d.atPoint (LineSegment2d.endPoint mouseDownRaycastSegment) (pixels 10))
           , label (LineSegment2d.endPoint mouseDownRaycastSegment) MouseBody "マウスのボディ"
           , circle White (Circle2d.atPoint cameraPoint (pixels 10))
           , line Ray mouseDownRaycastSegment
           , line MouseRay cameraMouseDownSegment
           , label (LineSegment2d.endPoint cameraMouseDownSegment) MouseDown "マウスダウン"
           , label cameraPoint End "カメラ"
           ]


step4 : List (Html a)
step4 =
    defs
        :: List.map (line TableRed) table
        ++ List.map (line Display) screenPlaneRectangle
        ++ List.map (line DraggingPlane) draggingPlaneRectangle
        ++ [ label (Point2d.pixels 1060 515) End "カメラに向いた平面"
           , label (Point2d.pixels 630 640) End "画面"
           , circle Red (Circle2d.atPoint (LineSegment2d.endPoint mouseDownRaycastSegment) (pixels 10))
           , label (LineSegment2d.endPoint mouseDownRaycastSegment) MouseBody "マウスのボディ"
           , circle White (Circle2d.atPoint cameraPoint (pixels 10))
           , line Ray mouseDownRaycastSegment
           , line MouseRay cameraMouseDownSegment
           , label (LineSegment2d.endPoint cameraMouseDownSegment) MouseDown "マウスダウン"
           , label cameraPoint End "カメラ"
           ]


step5 : List (Html a)
step5 =
    defs
        :: List.map (line TableRed) table
        ++ List.map (line Display) screenPlaneRectangle
        ++ List.map (line DraggingPlane) draggingPlaneRectangle
        ++ [ circle Red (Circle2d.atPoint (LineSegment2d.endPoint mouseMoveDraggingSegment) (pixels 10))
           , label (LineSegment2d.endPoint mouseMoveDraggingSegment) MouseBody "マウスのボディ"
           , line Ray mouseMoveDraggingSegment
           , label (Point2d.pixels 1060 515) End "カメラに向いた平面"
           , label (Point2d.pixels 630 640) End "画面"
           , circle White (Circle2d.atPoint cameraPoint (pixels 10))
           , line MouseRay cameraMouseMoveSegment
           , label (LineSegment2d.endPoint cameraMouseMoveSegment) MouseMove "マウス移動"
           , label cameraPoint End "カメラ"
           ]


step6 : List (Html a)
step6 =
    defs
        :: List.map (line TableRed) movedTable
        ++ List.map (line Display) screenPlaneRectangle
        ++ List.map (line DraggingPlane) draggingPlaneRectangle
        ++ [ circle Red (Circle2d.atPoint (LineSegment2d.endPoint mouseMoveDraggingSegment) (pixels 10))
           , label (LineSegment2d.endPoint mouseMoveDraggingSegment) MouseBody "マウスのボディ"
           , line Ray mouseMoveDraggingSegment
           , label (Point2d.pixels 1060 515) End "カメラに向いた平面"
           , label (Point2d.pixels 630 640) End "画面"
           , circle White (Circle2d.atPoint cameraPoint (pixels 10))
           , line MouseRay cameraMouseMoveSegment
           , label (LineSegment2d.endPoint cameraMouseMoveSegment) MouseMove "マウス移動"
           , label cameraPoint End "カメラ"
           ]


type Fill
    = White
    | Black
    | Red


circle : Fill -> Circle2d Pixels Screen -> Html a
circle fill circle2d =
    let
        ( strokeColor, fillColor ) =
            case fill of
                White ->
                    ( "black", "white" )

                Black ->
                    ( "black", "black" )

                Red ->
                    ( "red", "red" )

        radius =
            Pixels.inPixels (Circle2d.radius circle2d)

        c =
            Point2d.toPixels (Circle2d.centerPoint circle2d)
    in
    Svg.circle
        [ SvgAttributes.r (String.fromFloat radius)
        , SvgAttributes.stroke strokeColor
        , SvgAttributes.fill fillColor
        , SvgAttributes.strokeWidth "3"
        , SvgAttributes.cx (String.fromFloat c.x)
        , SvgAttributes.cy (String.fromFloat c.y)
        ]
        []


type Style
    = Table
    | TableRed
    | MouseRay
    | Ray
    | Display
    | DraggingPlane


line : Style -> LineSegment2d Pixels Screen -> Html a
line style segment =
    let
        p1 =
            Point2d.toPixels (LineSegment2d.startPoint segment)

        p2 =
            Point2d.toPixels (LineSegment2d.endPoint segment)
    in
    Svg.line
        ([ SvgAttributes.x1 (String.fromFloat p1.x)
         , SvgAttributes.y1 (String.fromFloat p1.y)
         , SvgAttributes.x2 (String.fromFloat p2.x)
         , SvgAttributes.y2 (String.fromFloat p2.y)
         ]
            ++ styleAttrs style
        )
        []


styleAttrs : Style -> List (Svg.Attribute a)
styleAttrs style =
    case style of
        Table ->
            [ SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "1"
            ]

        TableRed ->
            [ SvgAttributes.stroke "red"
            , SvgAttributes.strokeWidth "1"
            ]

        MouseRay ->
            [ SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "2"
            , SvgAttributes.markerEnd "url(#arrow)"
            ]

        Ray ->
            [ SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "2"
            , SvgAttributes.strokeDasharray "10,5"
            , SvgAttributes.markerEnd "url(#gray-arrow)"
            ]

        Display ->
            [ SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "3"
            ]

        DraggingPlane ->
            [ SvgAttributes.stroke "black"
            , SvgAttributes.strokeWidth "2"
            , SvgAttributes.strokeDasharray "10,5"
            ]


defs : Html a
defs =
    Svg.defs []
        [ Svg.marker
            [ SvgAttributes.id "arrow"
            , SvgAttributes.markerHeight "10"
            , SvgAttributes.markerWidth "10"
            , SvgAttributes.orient "auto"
            , SvgAttributes.refX "10"
            , SvgAttributes.refY "5"
            ]
            [ Svg.path
                [ SvgAttributes.d "M0,0 L10,5 0,10"
                , SvgAttributes.fill "transparent"
                , SvgAttributes.stroke "black"
                ]
                []
            ]
        , Svg.marker
            [ SvgAttributes.id "gray-arrow"
            , SvgAttributes.markerHeight "10"
            , SvgAttributes.markerWidth "10"
            , SvgAttributes.orient "auto"
            , SvgAttributes.refX "10"
            , SvgAttributes.refY "5"
            ]
            [ Svg.path
                [ SvgAttributes.d "M0,0 L10,5 0,10"
                , SvgAttributes.fill "transparent"
                , SvgAttributes.stroke "black"
                ]
                []
            ]
        ]


type TextAnchor
    = End
    | MouseDown
    | MouseBody
    | MouseMove


label : Point2d Pixels Screen -> TextAnchor -> String -> Html msg
label point2d textAnchor str =
    let
        { x, y } =
            Point2d.toPixels point2d

        ( anchor, offsetX, offsetY ) =
            case textAnchor of
                End ->
                    ( "end", -15, 0 )

                MouseMove ->
                    ( "end", -25, -10 )

                MouseDown ->
                    ( "start", 15, 25 )

                MouseBody ->
                    ( "start", 15, -20 )
    in
    Svg.text_
        [ SvgAttributes.x (String.fromFloat (x + offsetX))
        , SvgAttributes.y (String.fromFloat (y + offsetY))
        , SvgAttributes.textAnchor anchor
        , HtmlAttributes.style "font" "bold 24px/1.3 sans-serif"
        , HtmlAttributes.style "paint-order" "stroke"
        , HtmlAttributes.style "stroke" "white"
        , HtmlAttributes.style "stroke-width" "10px"
        ]
        [ Svg.text str ]
