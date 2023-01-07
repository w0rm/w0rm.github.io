module Main exposing (main)

import Custom exposing (Content)
import Formatting exposing (bullet, bulletLink, bullets, code, footnote, image, link, nonInteractive, position, text, title, width)
import Length exposing (foot)
import Schema
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (hide, item)
import SliceShow.Slide exposing (setDimensions, slide)
import Svg.Attributes exposing (scale)


main : Program () (Model Custom.Model Custom.Msg) (Message Custom.Msg)
main =
    [ intro
    , topics
    , blender
    , elmObjFile
    , elmPhysics
    , hinge
    , hingeCar
    , raycast
    , finalDemo
    , links
    ]
        |> List.map (slide >> setDimensions ( 1280, 800 ))
        |> SliceShow.init
        |> SliceShow.setSubscriptions Custom.subscriptions
        |> SliceShow.setUpdate Custom.update
        |> SliceShow.setView Custom.view
        |> SliceShow.show


intro : List Content
intro =
    [ Custom.cover { width = 1280, height = 800 }
    , title "Elmでスムーズに運転する方法" |> position 100 50
    , text "アンドレイ" |> position 100 240
    , footnote "@unsoundscapes" |> position 115 320
    ]


topics : List Content
topics =
    [ title "Elmでスムーズに運転する方法" |> position 100 50
    , bullets
        [ bullet "3Dモデルを読み込む方法"
        , bullet "elm-physicsの紹介"
        , bullet "ヒンジ拘束で作った乗り物"
        , bullet "レイキャストの乗り物"
        ]
        |> position 100 180
    ]


blender : List Content
blender =
    [ title "ジープの3Dモデル" |> position 100 50
    , bullets
        [ bullet "Blenderで設計する"
        , bullet "OBJ形式に変換する"
        , bullet "Elmに読み込む"
        ]
        |> position 100 180
    , image (round (2366 / 4)) (round (1606 / 4)) "blender.png" |> position 620 200
    , footnote "ジープの3Dモデルは、Kolja Wilcke によって設計されている (@01k)" |> position 450 650
    ]


elmObjFile : List Content
elmObjFile =
    List.concat <|
        [ title "elm-obj-file" |> position 100 50
        , text "elm/jsonのようにデコーディング" |> width 400 |> position 100 220
        , image 250 250 "obj-all.png" |> position 770 90
        , footnote "jeep.obj (64kb)" |> position 770 (90 + 260)
        ]
            :: List.indexedMap
                (\i ( url, txt ) ->
                    [ image 250 250 (url ++ ".png") |> position (100 + i * 270) 420
                    , footnote txt |> position (100 + i * 270) (420 + 260)
                    ]
                )
                [ ( "obj-body", "車体" )
                , ( "obj-wheel", "車輪" )
                , ( "obj-collider", "衝突判定形状" )
                , ( "obj-axes", "車輪の位置と方向" )
                ]


elmPhysics : List Content
elmPhysics =
    [ Custom.lack { width = 1280, height = 800 }
    , title "elm-physics 物理エンジン" |> nonInteractive |> position 100 50
    , bullets
        [ bullet "形状：球、直方体、円柱、平面、点、凸多面体" |> width 600
        , bullet "拘束：ポイント、ロック、ディスタンス、ヒンジ" |> width 630
        , bullet "相互作用：力、力積、レイキャスト" |> width 500
        ]
        |> position 100 180
        |> nonInteractive
    , footnote "ELMP1 ミートアップの例" |> position 850 700
    ]


hinge : List Content
hinge =
    [ title "実験1：ヒンジ拘束で作った乗り物" |> position 100 50
    , image 200 400 "hinge.png" |> position 950 320
    , footnote "ヒンジ" |> position 1050 700
    , bullets
        [ bullet "ボディ：凸多面体の車体と円柱の車輪"
        , bullet "車輪は車体にヒンジで付ける"
        , bullet "操舵：ヒンジの方向"
        , bullet "加速：車輪に回転方向の力を加える"
        ]
        |> position 100 180
    ]


hingeCar : List Content
hingeCar =
    [ Custom.hingeCar { width = 1280, height = 800 }
    , footnote "コントロール：W-S-A-D" |> position 900 700
    ]


raycast : List Content
raycast =
    [ title "実験2：レイキャストの乗り物" |> position 100 50
    , bullets
        [ bullet "ボディ：凸多面体の車体、車輪は偽物" |> width 600
        , bullet "車輪の下へレイキャストする"
        , bullet "レイの交点を使って車体に力を加える"
        , bullet "操舵と加速：車体に力を加える"
        ]
        |> position 100 180
    , image (892 // 2) (595 // 2) "hoverboard.jpg" |> position 800 40 |> hide
    ]


finalDemo : List Content
finalDemo =
    [ Custom.finalDemo { width = 1280, height = 800 }
    , footnote "コントロール：W-S-A-D-B" |> position 900 700
    ]


links : List Content
links =
    [ title "ありがとうございます！" |> position 100 50
    , bullets
        [ bulletLink "elm-obj-file" "https://github.com/w0rm/elm-obj-file"
        , bulletLink "elm-physics" "https://github.com/w0rm/elm-physics"
        , bulletLink "elm-physicsについて" "https://discourse.elm-lang.org/search?q=%223D%20Physics%20Engine%22"
        , bulletLink "bullet3のレイキャストの乗り物" "https://github.com/bulletphysics/bullet3/blob/master/src/BulletDynamics/Vehicle/btRaycastVehicle.cpp"
        , bulletLink "cannon.jsのレイキャストの乗り物" "https://github.com/schteppe/cannon.js/blob/master/src/objects/RaycastVehicle.js"
        ]
        |> position 100 180
    ]
