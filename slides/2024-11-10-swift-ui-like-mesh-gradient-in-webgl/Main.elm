module Main exposing (main)

import Animator exposing (Timeline)
import Color
import Common.Palette as Palette
import Common.Types exposing (Gradient, Point)
import Custom exposing (Content)
import Custom.MeshGradient exposing (Mode(..))
import Formatting exposing (background, bullet, bulletLink, bullets, code, color, cover, footnote, image, link, nonInteractive, position, text, title, width)
import Length exposing (foot)
import Scene3d exposing (nothing)
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (hide, item)
import SliceShow.Slide exposing (setDimensions, slide)
import Svg.Attributes exposing (scale)


main : Program () (Model Custom.Model Custom.Msg) (Message Custom.Msg)
main =
    [ intro
    , xkcd
    , koen
    , mesher
    , blurFilter
    , pointGradientVsMeshGradient
    , swiftUI
    , curvesAndSurfaces
    , bezierPatch
    , settings
    , meshGradient
    , webgl
    , animation
    , thankYou
    , links
    , controls
    ]
        |> List.map (slide >> setDimensions ( 1280, 800 ))
        |> SliceShow.init
        |> SliceShow.setSubscriptions Custom.subscriptions
        |> SliceShow.setUpdate Custom.update
        |> SliceShow.setView Custom.view
        |> SliceShow.show


intro : List Content
intro =
    [ Custom.meshGradient
        { id = "meshGradient"
        , width = 1280
        , height = 800
        , gradient = introGradient
        , mode = Manual False
        }
        |> position 0 0
    , title "SwiftUIのMeshGradientをWebGLで再現する方法" |> width 700 |> position 100 100
    , text "アンドレイ" |> position 100 540
    , link "https://twitter.com/unsoundscapes" (footnote "@unsoundscapes") |> position 100 620
    , link "https://elm-jp.connpass.com/event/334216/" (footnote "Elm-jp 2024：水道橋") |> position 930 620
    ]


settings : List Content
settings =
    [ text "グラデーションの設定" |> position 100 50
    , code """gradient =
    { width = 4
    , height = 4
    , points =
        List.concat
            [ [ Point 0 0, Point 0.333 0, Point 0.666 0, Point 1 0 ]
            , [ Point 0 0.33, Point 0.333 0.33, Point 0.666 0.33, Point 1 0.33 ]
            , [ Point 0 0.66, Point 0.333 0.66, Point 0.666 0.66, Point 1 0.66 ]
            , [ Point 0 1, Point 0.333 1, Point 0.666 1, Point 1 1 ]
            ]
    , colors =
        List.concat
            [ [ Palette.yellow, Palette.yellow, Palette.yellow, Palette.yellow ]
            , [ Palette.red, Palette.red, Palette.red, Palette.red ]
            , [ Palette.blue, Palette.blue, Palette.blue, Palette.blue ]
            , [ Palette.orange, Palette.orange, Palette.orange, Palette.orange ]
            ]
    }
""" |> position 100 160
    ]


webgl : List Content
webgl =
    [ text "WebGLで作る方法" |> position 100 50
    , bullets
        [ bullet "メッシュはただのUVグリッド"
        , bullet "Uniformsはコントロールポイントの位置と色"
        , bullet "Vertex shaderはUVの位置を変換し、色を計算する"
        , bullet "Fragment shaderは色を補間し、ノイズを追加する"
        ]
        |> position 100 160
    ]


links : List Content
links =
    [ text "リンク" |> position 100 50
    , bullets
        [ bulletLink "SwiftUIのMeshGradient" "https://developer.apple.com/documentation/SwiftUI/MeshGradient"
        , bulletLink "Curves and Surfaces" "https://ciechanow.ski/curves-and-surfaces/"
        , bulletLink "elm-explorations/webgl" "https://package.elm-lang.org/packages/elm-explorations/webgl/latest/"
        , bulletLink "mdgriffith/elm-animator" "https://package.elm-lang.org/packages/mdgriffith/elm-animator/latest/"
        ]
        |> position 100 160
    ]


controls : List Content
controls =
    [ text "キーボードのコントロール" |> position 100 50
    , bullets
        [ bullet "「e」― メッシュの編集モード"
        , bullet "「g」― グリッドを表示"
        , bullet "「a」― コントロールポイントを計算"
        ]
        |> position 100 160
    ]


{-| 沼にハマる
-}
xkcd : List Content
xkcd =
    [ image 1080 (371 * 1080 // 740) "assets/nerd-sniping.png" |> position 100 100
    , footnote "Nerd Sniping" |> position 410 700
    , link "https://xkcd.com/356/" (footnote "https://xkcd.com/356/") |> position 560 700
    ]


koen : List Content
koen =
    [ image (1360 * 600 // 1440) 600 "assets/koen.png" |> position 360 50
    , link "https://x.com/koenbok/status/1800483501281775847" (footnote "https://x.com/koenbok/status/1800483501281775847") |> position 360 700
    ]


mesher : List Content
mesher =
    [ image 1000 (1886 * 1000 // 2708) "assets/mesher.png" |> position 140 30
    , link "https://csshero.org/mesher/" (footnote "https://csshero.org/mesher/") |> position 470 700
    ]


blurFilter : List Content
blurFilter =
    [ image 550 (550 * 518 // 920) "assets/blur-1.png" |> position 100 280
    , image 550 (550 * 518 // 920) "assets/blur-2.png" |> position 660 280
    , code """.circle {
    filter: blur(calc(var(--box-width) / 5)) contrast(2.4);
}""" |> position 100 150
    , link "https://firstlayout.net/gradation-created-by-blurring" (footnote "https://firstlayout.net/gradation-created-by-blurring") |> position 660 630
    ]


pointGradientVsMeshGradient : List Content
pointGradientVsMeshGradient =
    [ Custom.pointGradient
        { id = "pointGradient"
        , width = (1280 - 60) / 2
        , height = 800 - 40
        , gradient = gradient
        }
        |> position 20 20
    , link "https://pub.dev/packages/mesh_gradient"
        (footnote "Flutterのmesh-gradient")
        |> position 60 720
    , footnote "（偽物）" |> position 300 720
    , Custom.meshGradient
        { id = "meshGradient"
        , width = (1280 - 60) / 2
        , height = 800 - 40
        , gradient = gradient
        , mode = Automatic False
        }
        |> position (40 + (1280 - 60) // 2) 20
    , footnote "本物のMeshGradient" |> position 690 720
    ]


swiftUI : List Content
swiftUI =
    [ text "SwiftUIで導入されたMeshGradient" |> position 100 50
    , image 1000 (1000 * 1020 // 1650) "assets/swift-ui.png" |> position 100 150
    , link "https://developer.apple.com/documentation/SwiftUI/MeshGradient" (footnote "developer.apple.com") |> position 840 700
    ]


curvesAndSurfaces : List Content
curvesAndSurfaces =
    [ cover 1280 800 (Just 0) "assets/curves-and-surfaces.png"
    , text "ベジェ曲面って何？" |> position 100 50
    , footnote "Curves and Surfaces" |> position 960 670
    , footnote "by Bartosz Ciechanowski" |> position 960 700
    , link "https://ciechanow.ski/curves-and-surfaces/#bézier-patches" (footnote "https://ciechanow.ski") |> position 960 730
    ]


bezierPatch : List Content
bezierPatch =
    [ background 1280 800 Color.darkGray
    , text "ベジェ曲面" |> color "#fff" |> position 100 50
    , Custom.meshGradient
        { id = "bezierPatch"
        , width = 1280
        , height = 800
        , gradient =
            { width = 2
            , height = 2
            , points =
                List.concat
                    [ [ Point 0.2 0.25, Point 0.8 0.25 ]
                    , [ Point 0.2 0.85, Point 0.8 0.85 ]
                    ]
            , colors =
                List.concat
                    [ [ Palette.yellow, Palette.orange ]
                    , [ Palette.red, Palette.blue ]
                    ]
            }
        , mode = FreeForm
        }
        |> position 0 0
    ]


meshGradient : List Content
meshGradient =
    [ Custom.meshGradient
        { id = "meshGradient"
        , width = 1280 - 40
        , height = 800 - 40
        , gradient = gradient2
        , mode = Manual True
        }
        |> position 20 20
    ]


animation : List Content
animation =
    [ Custom.animatedGradient
        { id = "meshGradient"
        , width = 1280
        , height = 800
        , gradient = animatedGradient
        }
        |> position 0 0
    , text "アニメーション" |> color "#fff" |> position 100 50
    , link "https://package.elm-lang.org/packages/mdgriffith/elm-animator/latest/" (footnote "mdgriffith/elm-animator") |> color "#fff" |> position 960 730
    ]


thankYou : List Content
thankYou =
    [ image 1000 (1043 * 1000 // 1600) "assets/kolja.png" |> position 120 50
    , text "ありがとうございました！" |> color "#fff" |> position 220 300
    , link "https://x.com/01k" (footnote "by @01k") |> position 980 690
    ]


introGradient : Gradient
introGradient =
    { width = 3
    , height = 3
    , points =
        List.concat
            [ [ Point 0 0, Point 0.5 0, Point 1 0 ]
            , [ Point 0 0.5, Point 0.5 0.5, Point 1 0.5 ]
            , [ Point 0 1, Point 0.5 1, Point 1 1 ]
            ]
    , colors =
        List.concat
            [ [ Palette.white, Palette.white, Palette.indigo ]
            , [ Palette.yellow, Palette.white, Palette.blue ]
            , [ Palette.orange, Palette.green, Palette.mint ]
            ]
    }


gradient : Gradient
gradient =
    { width = 3
    , height = 3
    , points =
        List.concat
            [ [ Point 0 0, Point 0.5 0, Point 1 0 ]
            , [ Point 0 0.5, Point 0.5 0.5, Point 1 0.5 ]
            , [ Point 0 1, Point 0.5 1, Point 1 1 ]
            ]
    , colors =
        List.concat
            [ [ Palette.red, Palette.purple, Palette.indigo ]
            , [ Palette.orange, Palette.white, Palette.blue ]
            , [ Palette.yellow, Palette.green, Palette.mint ]
            ]
    }


gradient2 : Gradient
gradient2 =
    { width = 4
    , height = 4
    , points =
        List.concat
            [ [ Point 0 0, Point 0.333 0, Point 0.666 0, Point 1 0 ]
            , [ Point 0 0.33, Point 0.333 0.33, Point 0.666 0.33, Point 1 0.33 ]
            , [ Point 0 0.66, Point 0.333 0.66, Point 0.666 0.66, Point 1 0.66 ]
            , [ Point 0 1, Point 0.333 1, Point 0.666 1, Point 1 1 ]
            ]
    , colors =
        List.concat
            [ [ Palette.yellow, Palette.yellow, Palette.yellow, Palette.yellow ]
            , [ Palette.red, Palette.red, Palette.red, Palette.red ]
            , [ Palette.blue, Palette.blue, Palette.blue, Palette.blue ]
            , [ Palette.orange, Palette.orange, Palette.orange, Palette.orange ]
            ]
    }


animatedGradient : Timeline () -> Gradient
animatedGradient timeline =
    let
        sinInRange start end duration =
            Animator.move timeline
                (\() -> Animator.loop (Animator.seconds duration) (Animator.wave start end))

        color start end duration =
            let
                progress =
                    Animator.move timeline
                        (\() -> Animator.loop (Animator.seconds duration) (Animator.wave 0 1))

                average x y =
                    sqrt ((x * x) * (1 - progress) + (y * y) * progress)

                one =
                    Color.toRgba start

                two =
                    Color.toRgba end
            in
            Color.rgba
                (average one.red two.red)
                (average one.green two.green)
                (average one.blue two.blue)
                (average one.alpha two.alpha)
    in
    { width = 3
    , height = 3
    , points =
        List.concat
            [ [ Point 0 0, Point 0.5 0, Point 1 0 ]
            , [ Point (sinInRange -0.4 0 4) (sinInRange 0.3 0.7 5)
              , Point (sinInRange 0.3 0.7 3) (sinInRange 0.3 0.7 4)
              , Point (sinInRange 1 1.4 2) (sinInRange 0.3 0.7 3)
              ]
            , [ Point (sinInRange -0.4 0 3) (sinInRange 1 1.2 5)
              , Point (sinInRange 0.3 0.7 5) (sinInRange 1 1.2 4)
              , Point (sinInRange 1 1.4 4) (sinInRange 1 1.2 2)
              ]
            ]
    , colors =
        List.concat
            [ [ Palette.red, Palette.purple, Palette.indigo ]
            , [ Palette.orange, color Palette.purple Palette.blue 3, Palette.blue ]
            , [ Palette.yellow, Palette.green, Palette.mint ]
            ]
    }
