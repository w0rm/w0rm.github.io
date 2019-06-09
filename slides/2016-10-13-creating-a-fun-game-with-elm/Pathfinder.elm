module Pathfinder
    exposing
        ( Model
        , Message
        , view
        , initial
        , update
        )

import Astar exposing (findPath, getPath, Point)
import Html exposing (..)
import Svg exposing (polyline)
import Svg.Attributes as SA exposing (..)
import Html.Events exposing (..)
import Html.Attributes as HA exposing (..)


type alias Model =
    { source : Point
    , dest : Maybe Point
    , obstacles : List Point
    , size : Point
    }


type Message
    = Click Point


initial : Model
initial =
    { source = ( 5, 5 )
    , dest = Nothing
    , obstacles =
        [ ( 3, 5 )
        , ( 3, 4 )
        , ( 3, 3 )
        , ( 4, 3 )
        , ( 4, 8 )
        , ( 5, 8 )
        , ( 10, 3 )
        , ( 10, 4 )
        , ( 10, 5 )
        ]
    , size = ( 15, 10 )
    }


tiles : Point -> List Point
tiles ( w, h ) =
    List.foldl (\x -> (++) (List.map ((,) x) (List.range 0 (h - 1)))) [] (List.range 0 (w - 1))


update : Message -> Model -> ( Model, Cmd Message )
update action model =
    case action of
        Click point ->
            ( { model | dest = Just point }, Cmd.none )


view : Model -> Html Message
view { source, dest, obstacles, size } =
    let
        destinations =
            tiles size
                |> List.filter (\a -> not (List.member a obstacles))
                |> List.filter ((/=) source)

        ( opened, closed, route ) =
            case dest of
                Nothing ->
                    ( [], [], [] )

                Just destination ->
                    let
                        state =
                            findPath size obstacles source destination

                        path =
                            getPath state

                        { nodeStates, openNodes, closedNodes } =
                            state
                    in
                        ( openNodes, closedNodes, path )
    in
        div
            [ HA.style
                [ ( "width", toString (Tuple.first size * 40) ++ "px" )
                , ( "height", toString (Tuple.second size * 40) ++ "px" )
                , ( "position", "relative" )
                , ( "background", "linear-gradient(0deg, #ccc 0, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), linear-gradient(90deg, #ccc 0, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%)" )
                , ( "background-origin", "padding-box" )
                , ( "background-clip", "border-box" )
                , ( "border", "1px solid #ccc" )
                , ( "background-size", "40px 40px" )
                ]
            ]
            (List.concat
                [ List.map (renderSquare "#eee") opened
                , List.map (renderSquare "#ddd") closed
                , List.map (renderItem "house") obstacles
                , [ renderItem "delivery-person" source
                  , renderPath size 40 route
                  ]
                , List.map (renderTile "transparent") destinations
                ]
            )


renderItem : String -> Point -> Html Message
renderItem name ( x, y ) =
    img
        [ HA.style
            [ ( "left", toString (x * 40) ++ "px" )
            , ( "top", toString (y * 40) ++ "px" )
            , ( "width", "40px" )
            , ( "height", "40px" )
            , ( "position", "absolute" )
            ]
        , src ("assets/" ++ name ++ ".png")
        ]
        []


renderSquare : String -> Point -> Html Message
renderSquare color ( x, y ) =
    div
        [ HA.style
            [ ( "left", toString (x * 40) ++ "px" )
            , ( "top", toString (y * 40) ++ "px" )
            , ( "width", "40px" )
            , ( "height", "40px" )
            , ( "position", "absolute" )
            , ( "background", color )
            ]
        ]
        []


renderTile : String -> Point -> Html Message
renderTile color ( x, y ) =
    div
        [ HA.style
            [ ( "left", toString (x * 40) ++ "px" )
            , ( "top", toString (y * 40) ++ "px" )
            , ( "width", "40px" )
            , ( "height", "40px" )
            , ( "position", "absolute" )
            , ( "background", color )
            ]
        , onClick (Click ( x, y ))
        ]
        []


addPointToSring : Int -> ( Int, Int ) -> String -> String
addPointToSring tileSize ( x, y ) =
    (++)
        (" "
            ++ toString (x * tileSize + tileSize // 2)
            ++ ","
            ++ toString (y * tileSize + tileSize // 2)
        )


renderPoints : Int -> List ( Int, Int ) -> Html Message
renderPoints tileSize waypoints =
    polyline
        [ points (List.foldl (addPointToSring tileSize) "" waypoints)
        , strokeLinejoin "round"
        , strokeLinecap "round"
        , stroke "#000"
        , strokeWidth "2"
        , opacity "0.5"
        , fill "transparent"
        ]
        []


renderPath : ( Int, Int ) -> Int -> List ( Int, Int ) -> Html Message
renderPath ( w, h ) tileSize route =
    Svg.svg
        [ version "1.1"
        , viewBox ("0 0 " ++ toString (w * tileSize) ++ " " ++ toString (h * tileSize))
        , SA.width (toString (w * tileSize))
        , SA.height (toString (h * tileSize))
        , SA.style "position: absolute"
        ]
        [ renderPoints tileSize route ]
