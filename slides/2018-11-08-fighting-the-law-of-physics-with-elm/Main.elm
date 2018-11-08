module Main exposing (main)

import Formatting exposing (..)
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (Content, hide)
import SliceShow.Slide exposing (Slide, setDimensions, slide)


main : Program () (Model model msg) (Message msg)
main =
    [ intro
    , about
    , games
    , dice
    , api
    , howItWorks
    , debug
    , demo
    , learnings
    , future
    , links
    ]
        |> List.map (slide >> setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.show


intro : List (Content model msg)
intro =
    [ image 568 720 "assets/beeryoga.jpg" |> position 0 0
    , title "Fighting the Law of Physics with Elm" |> position 620 20
    , image 50 50 "assets/twitter.png" |> position 620 625
    , text "Andrey Kuzmin" |> position 690 620
    , arrow ( 265, 100 ) ( 265, 200 )
    , text "@unsoundscapes" |> link "https://twitter.com/unsoundscapes" |> position 620 550
    ]


about : List (Content model msg)
about =
    let
        h =
            200
    in
    [ spacer 200
    , row
        [ col
            [ spacer 50
            , image (93 * h // 54) h "assets/soundcloud.svg"
            ]
        , col
            [ image (480 * h // 480) h "assets/elm-berlin.svg"
            , spacer 10
            , text " Elm Berlin" |> color "#5a6378"
            ]
            |> hide
        , col
            [ image (115 * h // 114) h "assets/prometheus.svg"
            , spacer 10
            , text "Prometheus" |> color "#e6522c"
            , text "Alertmanager" |> color "#e6522c"
            ]
            |> hide
        ]
    ]


games : List (Content model msg)
games =
    [ spacer 50
    , row [ col [ title "Games Created in Elm" ] ]
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
"""
        ]
    ]


howItWorks : List (Content model msg)
howItWorks =
    [ title "How It Works" |> position 100 50
    , bullets
        [ bullet "Broadphase collision: collision pairs"
        , bullet "Narrowphase collision: contact equations"
        , bullet "Solver: new velocities"
        , bullet "Update body positions and rotations"
        ]
        |> position 100 150
    ]


debug : List (Content model msg)
debug =
    [ title "Troubleshooting" |> position 100 50
    , bullets
        [ bullet "Chrome DevTools"
        , bullet "Writing unit tests"
        , bullet "Visual debugging"
        ]
        |> position 100 150
    , image 511 452 "assets/bug.gif" |> position 670 120 |> hide
    ]


demo : List (Content model msg)
demo =
    [ col
        [ spacer 250
        , title "Demo Time！" |> link "https://unsoundscapes.com/elm-physics/examples/spheres/"
        ]
    ]


learnings : List (Content model msg)
learnings =
    [ title "Learnings" |> position 100 50
    , bullets
        [ bullet "Data sctructures impact performance"
        , bullet "Linear algebra in pure Elm is faster than elm-explorations/linear-algera"
        , bullet "Creating a record is faster than updating it"
        ]
        |> position 100 150
    ]


future : List (Content model msg)
future =
    [ title "Future" |> position 100 50
    , bullets
        [ bullet "Build a more complex game"
        , bullet "Improve collision performance"
        , bullet "Allow interacting with bodies"
        , bullet "Expose collision events"
        ]
        |> position 100 150
    ]


links : List (Content model msg)
links =
    [ title "Links" |> position 100 50
    , bullets
        [ bulletLink "cannon.js" "http://www.cannonjs.org"
        , bulletLink "elm-physics" "https://github.com/w0rm/elm-physics"
        , bulletLink "games" "https://unsoundscapes.itch.io"
        , bulletLink "github" "https://github.com/w0rm"
        ]
        |> position 100 150
    ]
