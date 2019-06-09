module Randomize
    exposing
        ( Model
        , Message
        , view
        , initial
        , update
        )

import Astar exposing (findPath, getPath, Point)
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes as HA exposing (..)
import Random


type alias Box =
    { size : ( Int, Int )
    , position : ( Int, Int )
    }


type alias Model =
    { seed : Random.Seed
    , elements : List Box
    , boxes : List Box
    , size : ( Int, Int )
    }


type Message
    = Click ( Int, Int )
    | Reset


initial : Model
initial =
    { seed = Random.initialSeed 0
    , elements = []
    , boxes = [ Box ( 30, 20 ) ( 0, 0 ) ]
    , size = ( 30, 20 )
    }


tiles : Point -> List Point
tiles ( w, h ) =
    List.foldl (\x -> (++) (List.map ((,) x) (List.range 0 (h - 1)))) [] (List.range 0 (w - 1))


update : Message -> Model -> ( Model, Cmd Message )
update action model =
    case action of
        Click size ->
            let
                ( ( element, boxes ), seed ) =
                    Random.step (placeRandom size model.boxes) model.seed
            in
                case element of
                    Just el ->
                        { model
                            | elements = el :: model.elements
                            , boxes = boxes
                        }
                            ! []

                    Nothing ->
                        model ! []

        Reset ->
            initial ! []


filterSize : ( Int, Int ) -> List Box -> List Box
filterSize ( w, h ) =
    List.filter (\{ size } -> Tuple.first size >= w && Tuple.second size >= h)


sortBySize : List Box -> List Box
sortBySize =
    List.sortBy (\{ size } -> Tuple.first size * Tuple.second size) >> List.reverse


placeRandom : ( Int, Int ) -> List Box -> Random.Generator ( Maybe Box, List Box )
placeRandom size boxes =
    case filterSize size boxes of
        [] ->
            Random.map (always ( Nothing, [] )) (Random.int 0 0)

        box :: rest ->
            Random.map
                (\position ->
                    ( Just (Box size position)
                    , sortBySize (splitBy (Box size position) box ++ rest)
                    )
                )
                (fitRandom box size)


splitBy : Box -> Box -> List Box
splitBy box1 box2 =
    let
        ( x1, y1 ) =
            box1.position

        ( w1, h1 ) =
            box1.size

        ( x2, y2 ) =
            box2.position

        ( w2, h2 ) =
            box2.size
    in
        List.filter
            (\{ size } -> Tuple.first size > 0 && Tuple.second size > 0)
            [ { position = ( x2, y2 ), size = ( x1 - x2, h1 + y1 - y2 ) }
            , { position = ( x1, y2 ), size = ( x2 + w2 - x1, y1 - y2 ) }
            , { position = ( x1 + w1, y1 ), size = ( x2 + w2 - (x1 + w1), y2 + h2 - y1 ) }
            , { position = ( x2, y1 + h1 ), size = ( x1 + w1 - x2, y2 + h2 - (y1 + h1) ) }
            ]


fitRandom : Box -> ( Int, Int ) -> Random.Generator ( Int, Int )
fitRandom { size, position } ( w, h ) =
    Random.pair
        (Random.int (Tuple.first position) (Tuple.first position + Tuple.first size - w))
        (Random.int (Tuple.second position) (Tuple.second position + Tuple.second size - h))


view : Model -> Html Message
view { boxes, elements, size } =
    let
        width =
            Tuple.first size
    in
        div
            [ HA.style
                [ ( "width", toString (Tuple.first size * 20) ++ "px" )
                , ( "height", toString (Tuple.second size * 20) ++ "px" )
                , ( "position", "relative" )
                , ( "background", "linear-gradient(0deg, #ccc 0, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%), linear-gradient(90deg, #ccc 0, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 100%)" )
                , ( "background-origin", "padding-box" )
                , ( "background-clip", "border-box" )
                , ( "border", "1px solid #ccc" )
                , ( "background-size", "20px 20px" )
                ]
            ]
            (renderItem True (Box ( 2, 3 ) ( width + 1, 0 ))
                :: renderItem True (Box ( 3, 3 ) ( width + 1, 4 ))
                :: renderItem True (Box ( 3, 5 ) ( width + 1, 8 ))
                :: List.map (renderItem False) elements
                ++ List.map renderSquare boxes
            )


renderItem : Bool -> Box -> Html Message
renderItem clickable { size, position } =
    img
        ((if clickable then
            (::) (onClick (Click size))
          else
            identity
         )
            [ HA.style
                [ ( "left", toString (Tuple.first position * 20) ++ "px" )
                , ( "top", toString (Tuple.second position * 20) ++ "px" )
                , ( "width", toString (Tuple.first size * 20) ++ "px" )
                , ( "height", toString (Tuple.second size * 20) ++ "px" )
                , ( "position", "absolute" )
                , ( "cursor"
                  , if clickable then
                        "pointer"
                    else
                        "default"
                  )
                ]
            , src (itemName size)
            ]
        )
        []


itemName : ( Int, Int ) -> String
itemName ( w, h ) =
    "assets/element-" ++ toString w ++ "x" ++ toString h ++ ".png"


renderSquare : Box -> Html Message
renderSquare { size, position } =
    div
        [ HA.style
            [ ( "left", toString (Tuple.first position * 20) ++ "px" )
            , ( "top", toString (Tuple.second position * 20) ++ "px" )
            , ( "width", toString (Tuple.first size * 20) ++ "px" )
            , ( "height", toString (Tuple.second size * 20) ++ "px" )
            , ( "position", "absolute" )
            , ( "border", "1px solid black" )
            ]
        ]
        []
