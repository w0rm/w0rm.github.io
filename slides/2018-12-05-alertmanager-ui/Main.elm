module Main exposing (main)

import Formatting exposing (..)
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (Content, hide)
import SliceShow.Slide exposing (Slide, setDimensions, slide)


main : Program () (Model model msg) (Message msg)
main =
    [ intro
    , about
    , schema
    , old
    , oldItems
    , new
    , newItems
    , prs
    , elm
    ]
        |> List.map (slide >> setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.show


intro : List (Content model msg)
intro =
    [ title "Improving UX and DX of the Alermanager UI" |> position 100 20
    , image 50 50 "assets/twitter.png" |> position 100 625
    , text "Andrey Kuzmin" |> position 170 620
    , text "@unsoundscapes" |> link "https://twitter.com/unsoundscapes" |> position 100 550
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



schema : List (Content model msg)
schema =
    [ col
        [ spacer 10
        , image (2124 // 2) (1348 // 2) "assets/schema.png"
        ]
    ]

old : List (Content model msg)
old =
    [ col
        [ spacer 10
        , image (2426 // 2) (1340 // 2) "assets/old.png"
        ]
    ]


oldItems : List (Content model msg)
oldItems =
    [ title "Old Alertmanager" |> position 100 50
    , bullets
        [ bullet "Missing features (e.g. filtering, grouping)"
        , bullet "Poor user experience"
        , bullet "Little amount of contributions"
        ]
        |> position 100 150
    ]

new : List (Content model msg)
new =
    [ col
        [ image (2558 // 2) (1342 // 2) "assets/new.png"
        , title "Demozeit!" |> position 500 300 |> hide
        ]
    ]

newItems : List (Content model msg)
newItems =
    [ title "New Alertmanager" |> position 100 50
    , bullets
        [ bullet "More features"
        , bullet "Improved user experience"
        , bullet "More contributors"
        ]
        |> position 100 150
    ]

prs : List (Content model msg)
prs =
    [ title "Pull requests" |> position 100 50
    , bullets
        [ bulletLink "#789 Rewrite UI in Elm" "https://github.com/prometheus/alertmanager/pull/789"
        , bulletLink "#827 Improved Validation" "https://github.com/prometheus/alertmanager/pull/827"
        , bulletLink "#1539 Upgrade Alertmanager UI to Elm 0.19" "https://github.com/prometheus/alertmanager/pull/1539"
        , bulletLink "#1613 Move /status & /silences to API v2" "https://github.com/prometheus/alertmanager/pull/1613"
        ]
        |> position 100 150
    ]


elm : List (Content model msg)
elm =
    [ title "Elm" |> position 100 50
    , bullets
        [ bullet "Simple setup"
        , bullet "Narrow developer focus"
        , bullet "Confidence in making changes"
        ]
        |> position 100 150
    ]

