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
    , debug
    , demo
    , links
    ]
        |> List.map (slide >> setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.show


intro : List (Content model msg)
intro =
    [ image 568 720 "assets/beeryoga.jpg" |> position 0 0
    , title "エルムで物理法則と戦う" |> position 620 20
    , image 50 50 "assets/twitter.png" |> position 620 633
    , text "アンドレイ" |> position 690 620
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
            [ image (93 * h // 54) h "assets/soundcloud.svg"
            , spacer 20
            , text "仕事" |> color "#f8310e"
            ]
        , col
            [ image (480 * h // 480) h "assets/elm-berlin.svg"
            , spacer 20
            , text "エルム" |> color "#5a6378"
            , text "ベルリン" |> color "#5a6378"
            ]
            |> hide
        , col
            [ image (115 * h // 114) h "assets/prometheus.svg"
            , spacer 20
            , text "Prometheusの" |> color "#e6522c"
            , text "Alertmanager" |> color "#e6522c"
            ]
            |> hide
        ]
    ]


games : List (Content model msg)
games =
    [ spacer 50
    , row [ col [ title "エルムで作ったゲーム" ] ]
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
        , title "サイコロを振るゲーム" |> color "#555555"
        , image 400 400 "assets/dice.gif"
        ]
    ]


api : List (Content model msg)
api =
    [ col
        [ spacer 50
        , title "elm-physicsのAPI"
        , code """
-- 新しい世界を作る
world : World

-- ボディを加える
addBody : Body -> World -> ( World, BodyId )

-- シミュレーションする
step : Float -> World -> World
"""
        ]
    ]


debug : List (Content model msg)
debug =
    [ title "デバッグ" |> position 100 50
    , bullets
        [ bullet "Chrome DevTools"
        , bullet "テストを書く"
        , bullet "ビジュアルデバッグ"
        ]
        |> position 100 150
    , image 511 452 "assets/bug.gif" |> position 670 120 |> hide
    ]


demo : List (Content model msg)
demo =
    [ col
        [ spacer 250
        , title "デモの時間！" |> link "https://unsoundscapes.com/elm-physics/examples/spheres/"
        ]
    ]


links : List (Content model msg)
links =
    [ title "リンク" |> position 100 50
    , bullets
        [ bulletLink "cannon.js" "http://www.cannonjs.org"
        , bulletLink "elm-physics" "https://github.com/w0rm/elm-physics"
        , bulletLink "ゲーム" "https://unsoundscapes.itch.io"
        , bulletLink "github" "https://github.com/w0rm"
        ]
        |> position 100 150
    ]
