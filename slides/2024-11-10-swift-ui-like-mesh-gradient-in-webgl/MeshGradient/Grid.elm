module MeshGradient.Grid exposing (Grid, fold, get, getColor, initControlPoints, withControlPoints)

import Color exposing (Color)
import Common.Types exposing (Point)
import MeshGradient.BezierPoint as BezierPoint exposing (BezierPoint, Vector)


type alias Grid a =
    { points : List a
    , width : Int
    , height : Int
    , colors : List Color
    }


getPoint : Grid Point -> Int -> Int -> Point
getPoint { points, width } i j =
    List.head (List.drop (j * width + i) points) |> Maybe.withDefault (Point 0 0)


get : Grid BezierPoint -> Int -> Int -> BezierPoint
get { points, width } i j =
    List.head (List.drop (j * width + i) points) |> Maybe.withDefault BezierPoint.zero


getColor : Grid a -> Int -> Int -> Color
getColor { colors, width } i j =
    List.head (List.drop (j * width + i) colors) |> Maybe.withDefault Color.black


withControlPoints : Grid BezierPoint -> Grid BezierPoint
withControlPoints grid =
    let
        getPosition i j =
            (get grid i j).position
    in
    { grid
        | points =
            foldr
                (\i j pts ->
                    let
                        position =
                            getPosition i j

                        leading =
                            getPosition (i - 1) j

                        trailing =
                            getPosition (i + 1) j

                        bottom =
                            getPosition i (j + 1)

                        top =
                            getPosition i (j - 1)
                    in
                    { position = position
                    , leading = Vector ((leading.x - position.x) / 3) 0
                    , trailing = Vector ((trailing.x - position.x) / 3) 0
                    , bottom = Vector 0 ((bottom.y - position.y) / 3)
                    , top = Vector 0 ((top.y - position.y) / 3)
                    }
                        :: pts
                )
                []
                grid.width
                grid.height
    }


initControlPoints : Grid Point -> Grid BezierPoint
initControlPoints grid =
    let
        getPosition i j =
            getPoint grid i j
    in
    { width = grid.width
    , height = grid.height
    , colors = grid.colors
    , points =
        foldr
            (\i j pts ->
                let
                    position =
                        getPosition i j

                    leading =
                        getPosition (i - 1) j

                    trailing =
                        getPosition (i + 1) j

                    bottom =
                        getPosition i (j + 1)

                    top =
                        getPosition i (j - 1)
                in
                { position = position
                , leading = Vector ((leading.x - position.x) / 3) 0
                , trailing = Vector ((trailing.x - position.x) / 3) 0
                , bottom = Vector 0 ((bottom.y - position.y) / 3)
                , top = Vector 0 ((top.y - position.y) / 3)
                }
                    :: pts
            )
            []
            grid.width
            grid.height
    }


fold : (Int -> Int -> a -> a) -> a -> Int -> Int -> a
fold f acc n m =
    foldHelp 0 0 f acc n m


foldHelp : Int -> Int -> (Int -> Int -> a -> a) -> a -> Int -> Int -> a
foldHelp i j f acc n m =
    if j >= m then
        acc

    else if i >= n then
        foldHelp 0 (j + 1) f acc n m

    else
        foldHelp (i + 1) j f (f i j acc) n m


foldr : (Int -> Int -> a -> a) -> a -> Int -> Int -> a
foldr f acc n m =
    foldrHelp (n - 1) (m - 1) f acc n m


foldrHelp : Int -> Int -> (Int -> Int -> a -> a) -> a -> Int -> Int -> a
foldrHelp i j f acc n m =
    if j < 0 then
        acc

    else if i < 0 then
        foldrHelp (n - 1) (j - 1) f acc n m

    else
        foldrHelp (i - 1) j f (f i j acc) n m
