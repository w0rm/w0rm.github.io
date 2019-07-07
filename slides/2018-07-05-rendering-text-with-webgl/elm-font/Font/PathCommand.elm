module Font.PathCommand
    exposing
        ( PathCommand(..)
        , parse
        , pathToPolygon
        , removeDuplicates
        , triangulate
        , winding
        )

import CubicSpline2d exposing (CubicSpline2d)
import Curve.ParameterValue as ParameterValue exposing (ParameterValue)
import Parser exposing ((|.), (|=), Parser)
import Point2d exposing (Point2d)
import Polygon2d as Polygon2d exposing (Polygon2d)
import QuadraticSpline2d exposing (QuadraticSpline2d)
import TriangularMesh


type PathCommand
    = MoveTo Float Float
    | LineTo Float Float
    | QuadraticCurveTo Float Float Float Float
    | BezierCurveTo Float Float Float Float Float Float


{-| True for counter-clock-wise
-}
winding : List Point2d -> Bool
winding points =
    case points of
        first :: _ :: rest ->
            windingHelp first points 0 < 0

        _ ->
            False


windingHelp : Point2d -> List Point2d -> Float -> Float
windingHelp first points w =
    case points of
        p1 :: p2 :: rest ->
            let
                ( x1, y1 ) =
                    Point2d.coordinates p1

                ( x2, y2 ) =
                    Point2d.coordinates p2
            in
            windingHelp first (p2 :: rest) (w + (x2 - x1) * (y2 + y1))

        p1 :: [] ->
            let
                ( x1, y1 ) =
                    Point2d.coordinates p1

                ( x2, y2 ) =
                    Point2d.coordinates first
            in
            w + (x2 - x1) * (y2 + y1)

        [] ->
            w


pointInPath : List Point2d -> Point2d -> Bool
pointInPath startPath point =
    let
        ( px, py ) =
            Point2d.coordinates point

        checkFor ( pjx, pjy ) ( pix, piy ) result =
            if ((piy > py) /= (pjy > py)) && (px < (pjx - pix) * (py - piy) / (pjy - piy) + pix) then
                not result

            else
                result

        pointInPathHelp veryFirst path result =
            case path of
                first :: second :: rest ->
                    pointInPathHelp
                        veryFirst
                        (second :: rest)
                        (checkFor (Point2d.coordinates first) (Point2d.coordinates second) result)

                last :: [] ->
                    checkFor (Point2d.coordinates last) (Point2d.coordinates veryFirst) result

                [] ->
                    result
    in
    case startPath of
        first :: second :: rest ->
            pointInPathHelp first startPath False

        _ ->
            False


triangulate : List (List Point2d) -> List ( Point2d, Point2d, Point2d )
triangulate path =
    let
        ( outlines, holes ) =
            List.partition winding path
    in
    outlines
        |> List.map
            (\outerLoop ->
                Polygon2d.with
                    { outerLoop = outerLoop
                    , innerLoops =
                        holes
                            |> List.filter
                                (List.head
                                    >> Maybe.map (pointInPath outerLoop)
                                    >> Maybe.withDefault False
                                )
                    }
                    |> Polygon2d.triangulate
            )
        -- TODO: maybe use indices to make it work with indexTriangles
        |> List.concatMap TriangularMesh.faceVertices


pathToPolygon : Int -> List PathCommand -> List Point2d
pathToPolygon n commands =
    removeDuplicates
        (List.reverse (pathToPolygonHelp (ParameterValue.steps n) commands []))


pathToPolygonHelp : List ParameterValue -> List PathCommand -> List Point2d -> List Point2d
pathToPolygonHelp samples commands loop =
    case commands of
        [] ->
            loop

        (MoveTo x y) :: remaining ->
            pathToPolygonHelp samples
                remaining
                (Point2d.fromCoordinates ( x, y ) :: loop)

        (LineTo x y) :: remaining ->
            pathToPolygonHelp samples
                remaining
                (Point2d.fromCoordinates ( x, y ) :: loop)

        (QuadraticCurveTo x1 y1 x2 y2) :: remaining ->
            pathToPolygonHelp samples
                remaining
                (case loop of
                    [] ->
                        loop

                    point :: rest ->
                        QuadraticSpline2d.pointsAt
                            samples
                            (QuadraticSpline2d.with
                                { startPoint = Point2d.fromCoordinates ( x2, y2 )
                                , controlPoint = Point2d.fromCoordinates ( x1, y1 )
                                , endPoint = point
                                }
                            )
                            ++ rest
                )

        (BezierCurveTo x1 y1 x2 y2 x3 y3) :: remaining ->
            pathToPolygonHelp samples
                remaining
                (case loop of
                    [] ->
                        loop

                    point :: rest ->
                        CubicSpline2d.pointsAt
                            samples
                            (CubicSpline2d.with
                                { startPoint = Point2d.fromCoordinates ( x3, y3 )
                                , startControlPoint = Point2d.fromCoordinates ( x2, y2 )
                                , endControlPoint = Point2d.fromCoordinates ( x1, y1 )
                                , endPoint = point
                                }
                            )
                            ++ rest
                )


{-| Removes consequitive duplicates. Copied from ianmackenzie/elm-geometry
-}
removeDuplicates : List Point2d -> List Point2d
removeDuplicates points =
    case points of
        [] ->
            []

        firstPoint :: rest ->
            let
                -- Strip out adjacent duplicates
                accumulatedPoints =
                    accumulateDistinctPoints firstPoint rest []
            in
            case accumulatedPoints of
                lastPoint :: otherPoints ->
                    if lastPoint == firstPoint then
                        -- Drop the last point since it's equal to the
                        -- first
                        firstPoint :: List.reverse otherPoints

                    else
                        -- Keep all points
                        firstPoint :: List.reverse accumulatedPoints

                [] ->
                    -- Just have the first point
                    [ firstPoint ]


accumulateDistinctPoints : Point2d -> List Point2d -> List Point2d -> List Point2d
accumulateDistinctPoints previousPoint points accumulatedPoints =
    case points of
        [] ->
            accumulatedPoints

        point :: rest ->
            let
                updatedPoints =
                    if point == previousPoint then
                        accumulatedPoints

                    else
                        point :: accumulatedPoints
            in
            accumulateDistinctPoints point rest updatedPoints



-- PARSING


parse : String -> Maybe (List (List PathCommand))
parse string =
    Parser.run path string
        |> Result.toMaybe


path : Parser (List (List PathCommand))
path =
    Parser.succeed identity
        |= Parser.repeat Parser.zeroOrMore commands
        |. Parser.end


commands : Parser (List PathCommand)
commands =
    Parser.succeed identity
        |= Parser.repeat Parser.zeroOrMore command
        |. close


command : Parser PathCommand
command =
    Parser.oneOf
        [ moveTo
        , lineTo
        , quadraticCurveTo
        , bezierCurveTo
        ]


moveTo : Parser PathCommand
moveTo =
    Parser.succeed MoveTo
        |. Parser.symbol "M"
        |= number
        |. spaces
        |= number
        |. spaces


lineTo : Parser PathCommand
lineTo =
    Parser.succeed LineTo
        |. Parser.symbol "L"
        |= number
        |. spaces
        |= number
        |. spaces


quadraticCurveTo : Parser PathCommand
quadraticCurveTo =
    Parser.succeed QuadraticCurveTo
        |. Parser.symbol "Q"
        |= number
        |. spaces
        |= number
        |. spaces
        |= number
        |. spaces
        |= number
        |. spaces


bezierCurveTo : Parser PathCommand
bezierCurveTo =
    Parser.succeed BezierCurveTo
        |. Parser.symbol "C"
        |= number
        |. spaces
        |= number
        |. spaces
        |= number
        |. spaces
        |= number
        |. spaces
        |= number
        |. spaces
        |= number
        |. spaces


close : Parser ()
close =
    Parser.succeed ()
        |. Parser.symbol "Z"
        |. spaces


number : Parser Float
number =
    Parser.oneOf
        [ Parser.succeed negate
            |. Parser.symbol "-"
            |= Parser.float
        , Parser.float
        ]


spaces : Parser ()
spaces =
    Parser.ignore Parser.zeroOrMore (\char -> char == ' ')
