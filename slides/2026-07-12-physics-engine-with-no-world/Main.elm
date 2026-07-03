module Main exposing (main)

import Custom exposing (Content)
import Formatting exposing (background, bullet, bulletLink, bullets, code, color, footnote, image, nextButton, position, prevButton, scale, text, timeline, title, width)
import SliceShow exposing (Message, Model, hide)


main : Program () (Model Custom.Model Custom.Msg) (Message Custom.Msg)
main =
    [ cover
    , timelineOverview
    , point2018
    , point2019
    , point2020
    , point2026
    , declarativeVsOop
    , oneFunction
    , constraintFunction
    , typesCatch
    , buildShapes
    , sameInOut
    , costSlower
    , payoffStack
    , payoffSize
    , lessons
    , wholeLoop
    , resources
    ]
        |> List.map addMobileNavigationButtons
        |> SliceShow.init
        |> SliceShow.setSubscriptions Custom.subscriptions
        |> SliceShow.setUpdate Custom.update
        |> SliceShow.setView Custom.view
        |> SliceShow.setDimensions ( 1280, 720 )
        |> SliceShow.show



-- LAYOUT HELPERS -------------------------------------------------------------


{-| Common left margin shared by every title and content block.
-}
left : Int
left =
    100


{-| Top of the first content element on every slide, so the gap below the
title is consistent slide to slide.
-}
top : Int
top =
    152


{-| A single table cell, positioned on a grid.
-}
gridText : Int -> Int -> String -> Content
gridText x y string =
    footnote string |> position x y



-- COVER (CraneClaw demo) -----------------------------------------------------


cover : List Content
cover =
    [ Custom.craneClaw { width = 1280, height = 720 } |> position 0 0
    , title "世界がない物理エンジン" |> position left 40
    , footnote "アンドレイ — Andrey Kuzmin (@unsoundscapes)" |> position left 600
    , footnote "3Dモデル設計：Kolja Wilcke（@01k）" |> position left 645
    , footnote "WASD で動かす・Space でつかむ" |> color "#333" |> position 880 645
    ]



-- ACT I — A SHORT HISTORY (timeline) -----------------------------------------


historyNodes : List { year : String, version : String, headline : String }
historyNodes =
    [ { year = "2018", version = "v1.0", headline = "cannon.js 移植" }
    , { year = "2019", version = "v4.0", headline = "型と単位" }
    , { year = "2020", version = "v5", headline = "3Dモデル" }
    , { year = "2026", version = "v6.0", headline = "World 削除" }
    ]


{-| A point slide's title. (The timeline itself lives only on the overview.)
-}
pointHeader : String -> List Content
pointHeader heading =
    [ title heading |> position left 40 ]


timelineOverview : List Content
timelineOverview =
    [ title "elm-physics の歩み" |> position left 40
    , timeline { width = 1180, active = -1, headlines = True } historyNodes
        |> position 50 340
    ]


point2018 : List Content
point2018 =
    pointHeader "cannon.js を移植"
        ++ [ code """initialWorld =
    Physics.world
        |> Physics.setGravity (vec3 0 0 -10)

die =
    Physics.body
        |> Physics.addShape (Physics.box (vec3 1 1 1))
        |> Physics.setMass 5
        |> Physics.offsetBy (vec3 0 0 15)

( worldWithDie, dieId ) =
    Physics.addBody die initialWorld

simulatedWorld =
    Physics.step (1 / 60) world"""
                |> scale 0.55
                |> position left top
           , Formatting.cover 400 400 Nothing "sharing-results.jpg" |> position 780 210
           , footnote "Evan も共有してくれた" |> position 780 645
           , footnote "簡単だが、動いた" |> position left 600
           , footnote "課題：単位なし・Int id が面倒" |> position left 645
           , Custom.dice { width = 1280, height = 720 } |> position 0 0 |> hide
           ]


point2019 : List Content
point2019 =
    pointHeader "型のある形と単位"
        ++ [ code """type Id = Floor | Mouse | Table

tableBlocks =
    [ Block3d.from (Point3d.millimeters 222 222 0)
        (Point3d.millimeters 272 272 400)
    ]

table : Body Id
table =
    Body.compound (List.map Shape.block tableBlocks) Table
        |> Body.setBehavior
            (Body.dynamic (Mass.kilograms 3.58))

world : World Id
world =
    World.empty |> World.add table"""
                |> scale 0.52
                |> position left top
           , image 165 474 "lack-dimensions.png" |> position 788 200
           , Formatting.cover 215 150 Nothing "lack-1.jpg" |> position 965 200
           , Formatting.cover 215 150 Nothing "lack-2.jpg" |> position 965 362
           , Formatting.cover 215 150 Nothing "lack-3.jpg" |> position 965 524
           , Custom.lack { width = 1280, height = 720 } |> position 0 0 |> hide
           , footnote "elm-geometry の形 ＋ elm-units の単位" |> position left 600
           , footnote "単位・座標の取り違えを型が防ぐ" |> position left 645
           ]


point2020 : List Content
point2020 =
    pointHeader "任意の3D形状"
        ++ [ code """collider =
    List.map Shape.unsafeConvex [ convexBase, convexWindow ]

jeep : Body Id
jeep =
    Body.compound collider Car
        |> Body.withBehavior (Body.dynamic (Mass.kilograms 4000))"""
                |> scale 0.55
                |> position left top
           , image 200 200 "obj-body.png" |> position 760 435
           , footnote "描画用" |> position 760 645
           , image 200 200 "obj-collider.png" |> position 980 435
           , footnote "衝突判定用" |> position 980 645
           , Custom.raycastCar { width = 1280, height = 720 } |> position 0 0 |> hide
           , footnote "メッシュを凸の衝突形状に・正しい慣性で転がる" |> position left 600
           , footnote "メッシュ読み込みは去年の発表で（elm-obj-file）" |> position left 645
           ]


point2026 : List Content
point2026 =
    pointHeader "World を削除"
        ++ [ code """simulate :
    Config id
    -> List ( id, Body )
    -> ( List ( id, Body ), Contacts id )"""
                |> scale 0.55
                |> position left top
           , footnote "リスト入力・出力／宣言的" |> position left 470
           , Custom.character { width = 560, height = 470 } |> position 690 210
           , footnote "WASD で歩く・Space でジャンプ" |> position 720 690
           ]


declarativeVsOop : List Content
declarativeVsOop =
    [ title "宣言的 ＞ OOP 風" |> position left 40
    , footnote "OOP 風（〜v5）：不透明な World ＋ 専用メソッド" |> position left 190
    , code """World.empty
    |> World.add floor
    |> World.add table
    |> World.simulate dt
    |> World.keepIf keep   -- 削除

-- 物体を探す：World.bodies を掘る"""
        |> scale 0.55
        |> position left 245
    , footnote "宣言的（v6）：自分の List ＋ 標準操作" |> position 680 190
    , code """bodies =
    [ ( Floor, floor )
    , ( Table, table )
    ]

( next, contacts ) =
    Physics.simulate cfg bodies

-- 追加 (::)・削除 List.filter・探す List.filter"""
        |> scale 0.55
        |> position 680 245
    , text "コンテナを消すと、標準の List 操作だけで済む。" |> position left 600
    ]



-- ACT II — FIVE TECHNIQUES ---------------------------------------------------


oneFunction : List Content
oneFunction =
    [ title "① エンジンは関数一つ" |> position left 40
    , code """simulate :
    Config id
    -> List ( id, Body )
    -> ( List ( id, Body ), Contacts id )"""
        |> scale 0.75
        |> position left top
    , bullets
        [ bullet "小さい刻み → ループ"
        , bullet "一時停止 → 呼ばない"
        , bullet "巻き戻し → 古いリストを持つ"
        ]
        |> width 1200
        |> scale 0.62
        |> position left 380
    ]


constraintFunction : List Content
constraintFunction =
    [ title "② 制約はデータでなく関数" |> position left 40
    , code """lockMouseTo :
    Point3d Meters BodyCoordinates -> Id
    -> Maybe (Id -> List Constraint)
lockMouseTo pointOnTable mouseId =
    if mouseId == Mouse then
        Just (\\tableId ->
            if tableId == Table then
                [ Constraint.pointToPoint origin pointOnTable ]
            else
                []
        )
    else
        Nothing"""
        |> scale 0.62
        |> position left top
    , text "保存しない。毎フレーム、状況から計算する。" |> position left 600
    ]


typesCatch : List Content
typesCatch =
    [ title "③ 型で本物の間違いを防ぐ" |> position left 40
    , code """type Dense   = Dense Never    -- 密度を持つ（質量を計算）
type Surface = Surface Never  -- 摩擦と反発だけ

dense :
    { density : Density, friction : Float, bounciness : Float }
    -> Material Dense

surface :
    { friction : Float, bounciness : Float }
    -> Material Surface"""
        |> scale 0.62
        |> position left top
    , text "単位・座標・素材 — テストが見逃すバグ。" |> position left 600
    ]


buildShapes : List Content
buildShapes =
    [ title "④ 足し算・引き算で形を作る" |> position left 40
    , code """snowman =                    -- 形を足す
    Shape.sphere bottom
        |> Shape.plus (Shape.sphere top)

crate =                      -- 引く（本物の穴）
    Shape.block outer
        |> Shape.minus (Shape.block inner)

body =                       -- 質量は計算され、書かない
    Physics.dynamic [ ( crate, Material.wood ) ]"""
        |> scale 0.62
        |> position left top
    , text "質量・重心・回転は形から計算される。" |> position left 600
    ]


sameInOut : List Content
sameInOut =
    [ title "⑤ 同じ入力、同じ出力" |> position left 40
    , code """( next, contacts ) =
    Physics.simulate onEarth bodies

-- 同じ入力でもう一度
--   → 毎回まったく同じ結果"""
        |> scale 0.72
        |> position left top
    , bullets
        [ bullet "保存とロード"
        , bullet "リプレイ・巻き戻し"
        , bullet "ネットワーク同期"
        ]
        |> width 1200
        |> scale 0.62
        |> position left 400
    ]



-- ACT III — TRADEOFFS --------------------------------------------------------


costSlower : List Content
costSlower =
    let
        ( c0, c1, c2 ) =
            ( left, 540, 840 )

        row n =
            top + 60 + n * 52
    in
    [ title "コスト：約2倍遅い" |> position left 40
    , footnote "125個の箱・2000ステップ・直接比較" |> position left top
    , gridText c1 (row 0) "elm-physics"
    , gridText c2 (row 0) "cannon-es"
    , gridText c0 (row 1) "衝突判定"
    , gridText c1 (row 1) "0.64 ms"
    , gridText c2 (row 1) "0.87 ms"
    , gridText c0 (row 2) "ソルバー + GC"
    , gridText c1 (row 2) "~4.1 ms"
    , gridText c2 (row 2) "~1.25 ms"
    , gridText c0 (row 3) "合計"
    , gridText c1 (row 3) "~4.8 ms"
    , gridText c2 (row 3) "~2.1 ms"
    , text "代償は純粋性 — GC が約5倍働く。" |> position left 600
    ]


payoffStack : List Content
payoffStack =
    let
        ( c0, c1, c2 ) =
            ( left, 540, 840 )

        row n =
            top + 60 + n * 52
    in
    [ title "利点：積み木が崩れない" |> position left 40
    , footnote "125個の箱・60秒静置・同じ完全な格子" |> position left top
    , gridText c1 (row 0) "elm-physics"
    , gridText c2 (row 0) "cannon-es"
    , gridText c0 (row 1) "平均のズレ"
    , gridText c1 (row 1) "130 mm"
    , gridText c2 (row 1) "847 mm"
    , gridText c0 (row 2) "最悪のズレ"
    , gridText c1 (row 2) "289 mm"
    , gridText c2 (row 2) "7.3 m"
    , text "丁寧で不変なソルバーが積み木を支える。" |> position left 600
    ]


payoffSize : List Content
payoffSize =
    let
        ( c0, c1, c2 ) =
            ( left, 540, 840 )

        row n =
            top + 60 + n * 52
    in
    [ title "利点：小さいダウンロード" |> position left 40
    , footnote "描画こみのデモ・gzip 後" |> position left top
    , gridText c1 (row 0) "elm-physics"
    , gridText c2 (row 0) "three.js + cannon-es"
    , gridText c0 (row 1) "シーン + 影"
    , gridText c1 (row 1) "51 KB"
    , gridText c2 (row 1) "138 KB"
    , text "エンジン・描画・影こみで約50KB。" |> position left 600
    ]


lessons : List Content
lessons =
    [ title "まとめ：物理を超えて" |> position left 40
    , bullets
        [ bullet "コンテナは大抵 List の変装。開けよう。"
        , bullet "ルールはデータより関数。関数は合成できる。"
        , bullet "型は境界に — 単位・座標・素材。"
        , bullet "純粋な state → state でリプレイも取り消しも無料。"
        , bullet "代償を知って、意図して選ぶ。"
        ]
        |> width 1300
        |> scale 0.7
        |> position left top
    ]



-- CLOSING --------------------------------------------------------------------




wholeLoop : List Content
wholeLoop =
    [ title "全部で5行" |> position left 40
    , code """type alias Model =
    { bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    }

update : Msg -> Model -> Model
update Tick model =
    let
        ( bs, cs ) =
            Physics.simulate
                { onEarth | contacts = model.contacts }
                model.bodies
    in
    { model | bodies = bs, contacts = cs }"""
        |> scale 0.6
        |> position left top
    ]


resources : List Content
resources =
    [ Custom.clock { width = 980, height = 720 } |> position 380 0
    , title "ありがとうございました！" |> position left 40
    , bullets
        [ bulletLink "elm-physics — package docs" "https://package.elm-lang.org/packages/w0rm/elm-physics/latest"
        , bulletLink "github.com/w0rm/elm-physics" "https://github.com/w0rm/elm-physics"
        , bulletLink "@unsoundscapes" "https://twitter.com/unsoundscapes"
        ]
        |> width 800
        |> scale 0.7
        |> position left top
    ]



-- NAVIGATION -----------------------------------------------------------------


addMobileNavigationButtons : List Content -> List Content
addMobileNavigationButtons contents =
    [ background contents
    , prevButton ( 100, 720 ) |> position 0 0
    , nextButton ( 100, 720 ) |> position (1280 - 100) 0
    ]
