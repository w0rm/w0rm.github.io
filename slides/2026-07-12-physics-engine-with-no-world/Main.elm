module Main exposing (main)

import Custom exposing (Content)
import Custom.Charts
import Formatting exposing (background, bullet, bulletLink, bullets, code, color, footnote, image, nextButton, position, prevButton, scale, swatch, timeline, title, width)
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
    , createBody
    , typesCatch
    , buildShapes
    , massDerived
    , rulesFunction
    , pureFunction
    , costSetup
    , costSlower
    , payoffStack
    , payoffSize
    , lessons
    , madeWithElmPhysics
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


{-| Left edge of the right-hand column (demos, second code panel, their
captions), shared by every two-column slide. Columns are 520 wide: left
spans 100–620, right spans 660–1180 — the same 100px margin on both sides.
-}
right : Int
right =
    660


-- COVER (CraneClaw demo) -----------------------------------------------------


cover : List Content
cover =
    [ Custom.craneClaw { width = 1280, height = 720 } |> position 0 0
    , title "世界がない物理エンジン" |> position left 40
    , Formatting.link "https://unsoundscapes.com/slides/2026-07-12-physics-engine-with-no-world/#1"
        (image 200 200 "qr.svg")
        |> position left 360
    , footnote "アンドレイ — Andrey Kuzmin (@unsoundscapes)" |> position left 600
    , footnote "3Dモデル設計：Kolja Wilcke（@01k）" |> position left 645
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
    [ title "World を手放すまでの歩み" |> position left 40
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
           , Formatting.coverFocus 420 340 690 ( 63, 40 ) "sharing-results.jpg" |> position 760 top
           , footnote "Evan さんも共有してくれた" |> position 760 505
           , footnote "問題：単位なし・Int id が面倒" |> position left 645
           , Custom.dice { width = 1280, height = 720 } |> position 0 0 |> hide
           ]


point2019 : List Content
point2019 =
    pointHeader "型のある形と単位"
        ++ [ footnote "elm-geometry の形 ＋ elm-units の単位" |> position left top
           , code """type Id = Floor | Mouse | Table

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
                |> position left 210
           , image 165 474 "lack-dimensions.png" |> position 788 top
           , Formatting.cover 215 150 Nothing "lack-1.jpg" |> position 965 top
           , Formatting.cover 215 150 Nothing "lack-2.jpg" |> position 965 314
           , Formatting.cover 215 150 Nothing "lack-3.jpg" |> position 965 476
           , footnote "ベルリンの路上の IKEA Lack" |> position 788 645
           , Custom.lack { width = 1280, height = 720 } |> position 0 0 |> hide
           ]


point2020 : List Content
point2020 =
    pointHeader "elm-obj-file で任意の3D形状"
        ++ [ code """collider =
    List.map Shape.unsafeConvex
        [ convexBase, convexWindow ]

jeep : Body Id
jeep =
    Body.compound collider Car
        |> Body.withBehavior
            (Body.dynamic (Mass.kilograms 4000))"""
                |> scale 0.55
                |> position left top
           , image 200 200 "obj-body.png" |> position 760 top
           , footnote "描画用" |> position 760 362
           , image 200 200 "obj-collider.png" |> position 980 top
           , footnote "衝突判定用" |> position 980 362
           , Custom.raycastCar { width = 1280, height = 720 } |> position 0 0 |> hide
           , footnote "メッシュを凸の衝突形状に・正しい慣性で転がる" |> position left 600
           , footnote "メッシュ読み込みは去年の発表で" |> position left 645
           ]


point2026 : List Content
point2026 =
    pointHeader "World を削除"
        ++ [ footnote "１フレーム進める関数、8年ぶん：" |> position left top
           , code """-- 2018
step : Time -> World -> World

-- 2020
simulate : Duration -> World data -> World data

-- 2026 — World が型から消えた
simulate :
    Config id
    -> List ( id, Body )
    -> ( List ( id, Body ), Contacts id )"""
                |> scale 0.65
                |> position left 210
           ]



-- 🎤 同じ役目の関数を8年分。2018も2020も、型の真ん中に World がいる。2026年、消えた。リストが入って、リストが出てくる。


declarativeVsOop : List Content
declarativeVsOop =
    [ title "専用 API から、標準の List 操作へ" |> position left 40
    , footnote "〜v5：World の専用メソッド" |> position 300 top
    , footnote "v6：ただのリスト" |> position 810 top
    , footnote "状態" |> position left 216
    , code "world : World Id" |> scale 0.55 |> position 300 225
    , code "bodies : List ( Id, Body )" |> scale 0.55 |> position 810 225
    , footnote "追加" |> position left 288
    , code "World.add table world" |> scale 0.55 |> position 300 297
    , code "( Table, table ) :: bodies" |> scale 0.55 |> position 810 297
    , footnote "削除" |> position left 360
    , code "World.keepIf keep world" |> scale 0.55 |> position 300 369
    , code "List.filter keep bodies" |> scale 0.55 |> position 810 369
    , footnote "１フレーム" |> position left 432
    , code "World.simulate dt world" |> scale 0.55 |> position 300 441
    , code "Physics.simulate onEarth bodies" |> scale 0.55 |> position 810 441
    , footnote "描画" |> position left 504
    , code """World.bodies world
    |> List.map (Body.data >> view)"""
        |> scale 0.55
        |> position 300 513
    , code "List.map view bodies" |> scale 0.55 |> position 810 513
    , footnote "物理エンジンの API は simulate だけ。残りは elm/core の標準操作。" |> position left 645
    ]



-- 🎤 上から：置き場所、追加、削除、実行、描画。描画は毎フレーム書くコード — 前は world から掘って、body からデータを掘り出す二段階。今はペアがもう手元に。左は覚える専用メソッド。右は simulate 以外ぜんぶ、もう知ってる List 操作。



-- ACT II — SIX TECHNIQUES ----------------------------------------------------


createBody : List Content
createBody =
    [ title "短くて、全部必須" |> position left 40
    , footnote "〜v5：設定の積み重ね — どれも省略可" |> position left top
    , code """table =
    Body.compound tableShapes Table
        |> Body.withBehavior
            (Body.dynamic
                (Mass.kilograms 3.58))
        |> Body.withMaterial
            (Material.custom
                { friction = 0.3
                , bounciness = 0
                })"""
        |> scale 0.55
        |> position left 210
    , footnote "v6：何でできているかを言うだけ" |> position right top
    , code """table =
    Physics.dynamic
        [ ( tableShape, Material.wood ) ]"""
        |> scale 0.55
        |> position right 210
    ]



-- 🎤 前は手順の積み重ね：形を組んで、データを付けて、behavior を設定して質量を手入力（3.58kg — 実物の机の数字）、素材を設定して摩擦と反発を…。そして全部「省略可」。withBehavior を忘れたら静かに static のまま、素材を忘れたら黙って既定の摩擦。今は「木でできてる」と言うだけ — 短くて、省略できるものが無い。種類はコンストラクタ、素材は必須引数、質量はそもそも無い。


buildShapes : List Content
buildShapes =
    [ title "足し算・引き算で形を作る" |> position left 40
    , Custom.shapeLab { width = 1280, height = 720 } |> position 0 0
    , code """snowman =
    Shape.sphere bottom
        |> Shape.plus
            (Shape.sphere top)"""
        |> scale 0.6
        |> position 300 480
    , code """box =
    Shape.block outer
        |> Shape.minus
            (Shape.block inner)"""
        |> scale 0.6
        |> position 720 480
    , footnote "※ 幾何のブーリアン演算ではない — 変わるのは質量・重心・慣性" |> position left 645
    ]



-- 🎤 plus で足す、minus で引く。注意：メッシュを削る幾何演算ではない — 変わるのは質量・重心・慣性。最後は実際に落として、１つの剛体になったことを確かめる。


massDerived : List Content
massDerived =
    [ title "質量・重心・慣性は形から" |> position left 40
    , code """box =
    Physics.dynamic
        [ ( shape, Material.wood ) ]

-- 形と素材だけ。あとは計算：
Physics.mass          -- 質量
Physics.centerOfMass  -- 重心"""
        |> scale 0.6
        |> position left 200
    , Custom.seesaw { width = 520, height = 430 } |> position right top
    , footnote "中まで木" |> position 730 490
    , footnote "133 kg" |> position 730 528
    , footnote "中は空洞" |> position 1030 490
    , footnote "32 kg" |> position 1030 528
    ]



-- 🎤 見た目は同じ — でもエンジンは知っている。質量も重心も慣性も、形×素材から導出される。楕円体が大きいほど回しやすい。


typesCatch : List Content
typesCatch =
    [ title "型で本物の間違いを防ぐ" |> position left 40
    , code """-- 動く物体には密度つき素材が要る
Physics.sphere :
    Sphere3d Meters BodyCoordinates
    -> Material Dense
    -> Body

-- felt は表面だけの素材（密度なし）
felt =
    Material.surface
        { friction = 0.9, bounciness = 0.2 }

-- 動く球に felt を渡すと…
ball =
    Physics.sphere ballShape felt"""
        |> scale 0.5
        |> position left top
    , code """-- TYPE MISMATCH ------- Ball.elm

The 2nd argument to `sphere`
is not what I expect:

21|  Physics.sphere ballShape felt
                              ^^^^
This `felt` value is a:

    Material Surface

But `sphere` needs the 2nd
argument to be:

    Material Dense"""
        |> scale 0.5
        |> position right top
    ]



-- 🎤 動く物体は密度が要る（質量を計算するから）。床は表面だけでいい。組み合わせを間違えたプログラムは存在できない。


rulesFunction : List Content
rulesFunction =
    [ title "世界の規則は関数" |> position left 40
    , footnote "鎖はどこにも保存されない — 規則だけ" |> position left top
    , code """Physics.simulate
    { onEarth
        | constrain = constrain -- つなぐ規則
        , collide = collide     -- 触れる規則
    }
    bodies

constrain id =
    case id of
        Anchor ->
            Just (distanceTo (Link 0))

        Link i ->
            Just (distanceTo (Link (i + 1)))"""
        |> scale 0.5
        |> position left 210
    , Custom.chain { width = 520, height = 430 } |> position right 210
    ]



-- 🎤 制約のリストは無い。設定に渡す関数が毎フレーム聞かれる：この2つ、今つながってる？


pureFunction : List Content
pureFunction =
    [ Custom.rewind { width = 1280, height = 720 } |> position 0 0
    , title "不変だから巻き戻せる" |> position left 40
    , code "history : List (List ( Id, Body ))" |> scale 0.6 |> position left top
    , footnote "タイムトラベル＝リストを逆に辿るだけ" |> position left 205
    ]



-- 🎤 ビデオの逆再生ではない。毎フレームの状態は不変な値 — 履歴はただのリスト。巻き戻しはそれを逆に辿るだけ。



-- ACT III — TRADEOFFS --------------------------------------------------------


costSetup : List Content
costSetup =
    [ title "欠点の測り方" |> position left 40
    , Custom.boxStack { width = 520, height = 430 } |> position left top
    , footnote "125 個の箱（5×5×5）" |> position left 600
    , bullets
        [ bullet "cannon.js と elm-physics を比較"
        , bullet "同じ初期配置から出発"
        , bullet "3600 フレームをシミュレート"
        , bullet "1 フレームの平均時間を計測（ms）"
        , bullet "描画なし・物理エンジンだけ"
        , bullet "cannon.js の sleep は無効化"
        ]
        |> width 945
        |> scale 0.55
        |> position right top
    ]



-- 🎤 同じ土俵：125個の箱を3600フレーム回して、1フレームの時間を測る。描画は外して、物理だけ。


costSlower : List Content
costSlower =
    [ title "欠点：約2倍遅い" |> position left 40
    , footnote "125個の箱・3600 フレーム・描画なし" |> position left top
    , Custom.chart { kind = Custom.Charts.Perf, width = 560, height = 430 } |> position left 200
    , swatch "#9ec8ef" "衝突判定 — elm の方が速い" |> position right 300
    , swatch "#2f6fed" "ソルバー — 差はここ。式あたり約2.2×" |> position right 380
    , swatch "#b9b9b9" "GC — 停止は60×、でもフレームの11%" |> position right 460
    ]



-- 🎤 犯人はソルバーであって、GC ではない。


payoffStack : List Content
payoffStack =
    [ title "利点：積み木が崩れない" |> position left 40
    , footnote "同じ完全な格子から・3600 フレーム（60秒）後" |> position left top
    , image 520 347 "boxstack-elm-3d-scene.png" |> position left 200
    , image 520 347 "boxstack-threejs-cannon.png" |> position right 200
    , footnote "elm-physics — 平均ズレ 130 mm" |> position left 565
    , footnote "cannon.js — 平均 847 mm・最悪 7.3 m" |> position right 565
    , footnote "※ cannon.js の sleep は無効化" |> position right 645
    ]



-- 🎤 左は録画ではない。話し終わる頃も、まだ崩れていない。


payoffSize : List Content
payoffSize =
    [ title "利点：小さいダウンロード" |> position left 40
    , footnote "同じシーン・minify + gzip 後" |> position left top
    -- 27 = left margin (100) minus the chart's internal padding before the
    -- first bar (10px chart margin + 0.25 × 250px bin margin ≈ 73px), so the
    -- first bar's left edge lands on the slide margin
    , Custom.chart { kind = Custom.Charts.BundlePhysics, width = 520, height = 400 } |> position 27 190
    , Custom.chart { kind = Custom.Charts.BundleRendered, width = 520, height = 400 } |> position right 190
    , Formatting.col [ footnote "物理エンジンのみ — ほぼ互角" ] |> width 520 |> position 27 620
    , Formatting.col [ footnote "描画こみ（影つき）" ] |> width 520 |> position right 620
    ]



-- 🎤 エンジンだけなら互角 — 描画こみで 51 対 138 KB。


lessons : List Content
lessons =
    [ title "まとめ：物理を超えて" |> position left 40
    , bullets
        [ bullet "コンテナは大抵 List のようなもの。開けよう。"
        , bullet "規則はデータより関数。関数は合成できる。"
        , bullet "型は境界に — 単位・座標・素材。"
        , bullet "純粋な state → state でリプレイも取り消しも可能。"
        , bullet "代償を知って、意図して選ぶ。"
        ]
        |> width 1300
        |> scale 0.7
        |> position left top
    ]



-- CLOSING --------------------------------------------------------------------




madeWithElmPhysics : List Content
madeWithElmPhysics =
    [ title "コミュニティの作品" |> position left 40
    , Formatting.cover 520 205 (Just 10) "elm-pool.png" |> position left top
    , Formatting.link "https://unsoundscapes.itch.io/pool"
        (footnote "Elm Pool — Andrey Kuzmin & Jared Smith")
        |> position left 365
    , Formatting.cover 520 205 (Just 40) "duckling-game.png" |> position right top
    , Formatting.link "https://github.com/ianmackenzie/elm-3d-scene/blob/main/examples/DucklingGame.elm"
        (footnote "Duckling Game — Ian Mackenzie")
        |> position right 365
    , Formatting.cover 520 205 (Just 79) "block-topple.png" |> position left 432
    , Formatting.link "https://github.com/wolfadex/block-topple"
        (footnote "Block Topple — Wolfgang Schuster")
        |> position left 645
    , Formatting.cover 520 205 (Just 28) "elm-physics-experiments.png" |> position right 432
    , Formatting.link "https://elm-physics-experiment.surge.sh"
        (footnote "Elm Physics Experiments — Erkal Selman")
        |> position right 645
    ]



-- 🎤 私だけじゃない。コミュニティも elm-physics で作っている。


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
