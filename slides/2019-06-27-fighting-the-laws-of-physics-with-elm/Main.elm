module Main exposing (main)

import Custom exposing (Content, Msg, Slide)
import Formatting exposing (..)
import SliceShow exposing (Message, Model)
import SliceShow.Slide exposing (setDimensions, slide)


main : Program () (Model Custom.Model Msg) (Message Msg)
main =
    [ intro
    , games
    , dice
    , apiWorld
    , apiBody
    , apiBody2
    , howItWorks
    , why
    , snapshots
    , sharingResults
    , challenges
    , migrationFromOOP
    , troubleshooting
    , bugs
    , performance
    , performanceImprovements
    , future
    , renderingEngine
    , links
    , thanks
    ]
        |> List.map (slide >> setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.setSubscriptions Custom.subscriptions
        |> SliceShow.setView Custom.view
        |> SliceShow.setUpdate Custom.update
        |> SliceShow.show


intro : List Content
intro =
    [ Custom.lack { width = 1280, height = 720 } |> position 0 0
    , [ title "Fighting the Laws of\u{00A0}Physics\u{00A0}with\u{00A0}Elm" |> color "#fff"
      , text "Andrey Kuzmin" |> color "#fff"
      , spacer 260
      , image 304 36 "assets/soundcloud.svg"
      ]
        |> group 100 50 500 280
        |> noPointerEvents
    ]


games : List Content
games =
    [ spacer 50
    , row [ col [ title "Games Created in Elm" ] ]
    , spacer 50
    , row
        [ col [ image 315 250 "assets/flatris.png", spacer 20, text "Flatris" ]
        , col [ image 315 250 "assets/elm-street-404.png", spacer 20, text "404 Elm Street" ]
        , col [ image 315 250 "assets/mogee.png", spacer 20, text "Mogee" ]
        , col [ image 315 250 "assets/cubik.png", spacer 20, text "Cubik" ]
        ]
    ]


dice : List Content
dice =
    [ Custom.dice { width = 1280, height = 720 } |> position 0 0
    , [ title "Physically Simulated Dice" |> color "#fff" ]
        |> group 100 50 100 100
        |> noPointerEvents
    ]


apiWorld : List Content
apiWorld =
    [ title "Physics.World" |> position 100 50
    , code """
-- Let be the new world!
empty : World data

-- Add a body to the world
add : Body data -> World data -> World data

-- Simulate the world by N milliseconds
simulate : Float -> World data -> World data

-- Get bodies for rendering
getBodies : World data -> List (Body data)
""" |> position 100 160
    ]


apiBody : List Content
apiBody =
    [ title "Physics.Body" |> position 100 50
    , code """
box :
    { x : Float
    , y : Float
    , z : Float
    }
    -> data
    -> Body data

plane : data -> Body data

sphere : Float -> data -> Body data
""" |> position 100 160
    ]


apiBody2 : List Content
apiBody2 =
    [ title "Physics.Body" |> position 100 50
    , code """
box :
    { x : Float
    , y : Float
    , z : Float
    }
    -> data
    -> Body data

plane : data -> Body data

sphere : Float -> data -> Body data
"""
        |> position 100 160
        |> color "#999"
    , code """
setMass
rotateBy
setPosition
setMaterial

getTransformation
getData
"""
        |> position 800 160
    ]


howItWorks : List Content
howItWorks =
    [ title "How It Works" |> position 100 50
    , bullets
        [ bullet "Broadphase: pairs of bodies"
        , bullet "Narrowphase: collision contacts"
        , bullet "Solver: new velocities"
        , bullet "Update positions and orientations"
        ]
        |> position 100 160
    ]


why : List Content
why =
    [ Custom.why { width = 1280, height = 720 } |> position 0 0
    , title "Why?" |> color "#fff" |> position 100 50
    , bullets
        [ bullet "Fun games and demos"
        , bullet "Small size (30kb gzipped)"
        , bullet "Research and education"
        , bullet "Sharing results"
        ]
        |> color "#fff"
        |> position 100 160
    ]


snapshots : List Content
snapshots =
    [ Custom.snapshots { width = 1280, height = 720 } |> position 0 0
    , title "Time Travel" |> color "#fff" |> position 100 50 |> noPointerEvents
    ]


sharingResults : List Content
sharingResults =
    [ image 1280 720 "assets/sharing-results.jpg" |> position 0 0
    ]


renderingEngine : List Content
renderingEngine =
    [ title "A 3D Rendering Engine for Elm" |> position 100 50
    , text "by Ian Mackenzie" |> position 100 210
    , image 600 400 "assets/rendering-engine.png" |> position 600 250
    , bullets
        [ bullet "High-level API"
        , bullet "Physically-based"
        , bullet "Coming soon!"
        ]
        |> position 100 270
    ]


challenges : List Content
challenges =
    [ Custom.challenges { width = 1280, height = 720 } |> position 0 0
    , title "Challenges" |> color "#fff" |> position 100 50
    , bullets
        [ bullet "Migration from OOP"
        , bullet "Troubleshooting"
        , bullet "Performance"
        ]
        |> color "#fff"
        |> position 100 160
    ]


migrationFromOOP : List Content
migrationFromOOP =
    [ title "OOP in JS" |> position 100 50
    , [ bullets
            [ bullet "Complex class hierarchies"
            , bullet "Methods coupled with data"
            , bullet "Implicit execution order"
            ]
      ]
        |> group 100 150 500 500
    , title "FP in Elm" |> position 650 50
    , [ bullets
            [ bullet "Custom types and pattern matching"
            , bullet "Functions separated from data"
            , bullet "Explicit execution order"
            ]
      ]
        |> group 650 150 500 500
    ]


troubleshooting : List Content
troubleshooting =
    [ Custom.troubleshooting { width = 1280, height = 720 }
        |> position 0 0
    , title
        "Troubleshooting"
        |> color "#fff"
        |> position 100 50
    , bullets
        [ bullet "DevTools"
        , bullet "Tests"
        , bullet "Visual"
        ]
        |> color "#fff"
        |> position 100 160
    ]


bugs : List Content
bugs =
    [ title "Bugs" |> position 100 50
    , bullets
        [ bullet "Order of arguments of the same type"
        , bullet "Reversing lists changes normals"
        , bullet "Wrong algorithms"
        ]
        |> position 100 160
    ]


performance : List Content
performance =
    [ Custom.performance { width = 1280, height = 720 } |> position 0 0
    , title "Performance" |> color "#fff" |> position 100 50 |> noPointerEvents
    ]


performanceImprovements : List Content
performanceImprovements =
    [ title "Performance Improvements" |> position 100 50
    , bullets
        [ bullet "Use record-based linear-algebra"
        , bullet "Minimize Array usage"
        , bullet "Inline vector operations per x, y, z"
        , bullet "Use tail optimized recursion"
        ]
        |> position 100 160
    ]


future : List Content
future =
    [ Custom.future { width = 1280, height = 720 } |> position 0 0
    , title "Future" |> color "#fff" |> position 100 50 |> noPointerEvents
    , bullets
        [ bullet "Demos & games"
        , bullet "Improve stability"
        , bullet "Collision events"
        , bullet "Applied forces"
        ]
        |> color "#fff"
        |> position 100 160
        |> noPointerEvents
    ]


links : List Content
links =
    [ title "Links" |> position 100 50
    , bullets
        [ bulletLink "elm-physics on package.elm-lang.org" "https://package.elm-lang.org/packages/w0rm/elm-physics/latest/"
        , bulletLink "posts on discourse.elm-lang.org" "https://discourse.elm-lang.org/search?q=physics%20engine%20%40unsoundscapes%20order%3Alatest_topic"
        , bulletLink "games on unsoundscapes.itch.io" "https://unsoundscapes.itch.io/"
        , bulletLink "@unsoundscapes on twitter" "https://twitter.com/unsoundscapes"
        ]
        |> position 100 160
    ]


thanks : List Content
thanks =
    [ Custom.dominoes
        { width = 1280
        , height = 720
        , paths =
            [ --f
              "M1,472.5 C4,498.5 37,524 80.5,524 C175.461,524 230.556,380.993 268.5,264.5 C290.579,196.714 321.461,1 421.5,1 C451.5,1 469.5,24 469.5,39"
            , "M293.5 184C338 188.5 390 188 435.5 184z"
            , "M288.5,184 C267.729,184 246.65,181.418 225.5,184"

            -- i
            , "M445.5 185C435.5 206.5 417.618 245.652 406.5 270.111C379.505 329.5 383.746 361 408 361C441 361 486 340 511 313z"

            -- n
            , "M570 210.5C556.5 270 531 320.5 502.5 376z"
            , "M567.998,257.336 C591.559,229.71 635.406,205.759 668.361,204.42 C692.582,202.78 712,239.5 668.361,323 C654.982,348.599 631.382,395.5 683,395.5 C748,395.5 812.5,350.5 828.5,326z"
            ]
        }
        |> position 0 0
    ]
