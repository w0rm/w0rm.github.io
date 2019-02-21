module Main exposing (main)

import Formatting exposing (..)
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (Content, hide)
import SliceShow.Slide exposing (Slide, setDimensions, slide)


main : Program () (Model model msg) (Message msg)
main =
    [ intro
    , games
    , dice
    , api
    , howItWorks
    , demo
    , future
    , elmBerlin
    ]
        |> List.map (slide >> setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.show


intro : List (Content model msg)
intro =
    [ image 568 720 "assets/beeryoga.jpg" |> position 0 0
    , title "Fighting the Law of\u{00A0}Physics\u{00A0}with\u{00A0}Elm" |> position 620 20
    , image 50 50 "assets/twitter.png" |> position 620 620
    , arrow ( 265, 100 ) ( 265, 200 )
    , text "Andrey Kuzmin" |> position 690 620
    ]


games : List (Content model msg)
games =
    [ spacer 50
    , row [ col [ title "Games Created with Elm" ] ]
    , spacer 50
    , row
        [ col [ image 315 250 "assets/flatris.png", spacer 20, text "Flatris" |> color "rgb(57,147,208)" ]
        , col [ image 315 250 "assets/elm-street-404.png", spacer 20, text "404 Elm Street" |> color "rgb(220,169,81)" ]
        , col [ image 315 250 "assets/mogee.png", spacer 20, text "Mogee" |> color "rgb(50,60,56)" ]
        , col [ image 315 250 "assets/cubik.png", spacer 20, text "Cubik" |> color "rgb(0,0,120)" ]
        ]
    ]


dice : List (Content model msg)
dice =
    [ col
        [ spacer 50
        , title "Physically Simulated Dice" |> color "#555555"
        , image 400 400 "assets/dice.gif"
        ]
    ]


api : List (Content model msg)
api =
    [ col
        [ spacer 50
        , title "elm-physics API"
        , code """
-- create a new world
world : World

-- add a body to the world
addBody : Body -> World -> ( World, BodyId )

-- simulate the world by N milliseconds
step : Float -> World -> World

-- ...
"""
        ]
    ]


howItWorks : List (Content model msg)
howItWorks =
    [ title "How elm-phyics Works" |> position 100 50
    , bullets
        [ bullet "Find pairs of bodies that can collide"
        , bullet "Find collision points between bodies"
        , bullet "Calculate updated velocities"
        , bullet "Update positions and rotations"
        ]
        |> position 100 150
    ]


demo : List (Content model msg)
demo =
    [ col
        [ spacer 250
        , title "Demo Time！" |> link "https://unsoundscapes.com/elm-physics/examples/spheres/"
        ]
    ]


future : List (Content model msg)
future =
    [ title "The Future of elm-physics" |> position 100 50
    , bullets
        [ bullet "Build a more complex game"
        , bullet "Improve engine performance"
        , bullet "Allow interaction with bodies"
        , bullet "Expose collision events"
        ]
        |> position 100 150
    ]


elmBerlin : List (Content model msg)
elmBerlin =
    [ col
        [ spacer 150
        , image 300 300 "assets/elm-berlin.svg"
        , title "\u{00A0}\u{00A0}\u{00A0}\u{00A0}Elm Berlin" |> color "#5a6378"
        ]
    ]
