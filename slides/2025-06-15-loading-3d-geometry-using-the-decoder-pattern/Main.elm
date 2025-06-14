module Main exposing (main)

import Custom exposing (Content)
import Formatting exposing (arrow, arrowMarker, bullet, bulletLink, bullets, code, color, cover, footnote, group, image, link, nextButton, nonInteractive, position, prevButton, scale, text, title, width)
import Frame3d
import Length exposing (foot)
import SliceShow exposing (Message, Model, hide, item)


main : Program () (Model Custom.Model Custom.Msg) (Message Custom.Msg)
main =
    [ intro
    , topics
    , why3dInElm
    , elm3dEcosystem
    , blenderToElm
    , objFormat
    , fromObjToElmTypes
    , decodeSections
    , decodersInElm
    , elmObjFileApi
    , loadDuck
    , fixCoordinates
    , meshAndCollider
    , fallingDucks
    , whatIsDecoder
    , mapImplementation
    , miscApi
    , jeepIntro
    , jeepDemo
    , poolIntro
    , poolDemo
    , links
    ]
        |> List.map addMobileNavigationButtons
        |> SliceShow.init
        |> SliceShow.setSubscriptions Custom.subscriptions
        |> SliceShow.setUpdate Custom.update
        |> SliceShow.setView Custom.view
        |> SliceShow.setDimensions ( 1280, 720 )
        |> SliceShow.show


intro : List Content
intro =
    [ Custom.cover { width = 1280, height = 720 }
    , title "デコーダーパターンによる" |> position 100 50
    , title "3Dジオメトリの読み込み" |> position 100 110
    , text "アンドレイ" |> position 100 340
    , footnote "Andrey Kuzmin (@unsoundscapes)" |> position 100 420
    , footnote "3Dモデル設計：Kolja Wilcke（@01k）" |> width 500 |> position 100 600
    ]


topics : List Content
topics =
    [ title "目次" |> position 100 50
    , bullets
        [ bullet "Elmにおける3Dの紹介"
        , bullet "デコーダーでOBJ読み込み"
        , bullet "実例を使ったデモ"
        ]
        |> position 100 180
    , image 310 310 "qr.svg" |> position 820 230
    ]


why3dInElm : List Content
why3dInElm =
    let
        top =
            260
    in
    [ title "なぜ Elm で 3D をやるのか？" |> position 100 50
    , Custom.elm3d { width = 300, height = 300 } |> position 450 (top + 40)
    , text "不変性の利点" |> position 200 top
    , text "バグを防ぐ仕組み" |> position 700 top
    , text "型安全な座標" |> position 100 (top + 150)
    , text "型安全な単位" |> position 150 (top + 300)
    , text "堅牢な物理と描画" |> position 740 (top + 300)
    , text "ゲームに限らない" |> position 800 (top + 150)
    ]


elm3dEcosystem : List Content
elm3dEcosystem =
    let
        ( col0, col1, col2 ) =
            ( 100, 380, 710 )

        ( row0, row1, row2 ) =
            ( 220, 400, 600 )
    in
    [ title "Elm の 3D エコシステム" |> position col0 50
    , image 100 100 "andrey.jpg" |> position col1 row0
    , footnote "Andrey Kuzmin" |> position col1 (row0 + 110)
    , image 100 100 "ian.jpg" |> position col2 row0
    , footnote "Ian Mackenzie" |> position col2 (row0 + 110)
    , footnote "低レベルパッケージ" |> position col0 row1
    , footnote "elm-explorations/webgl\u{3000}" |> position col1 row1
    , footnote "ianmackenzie/elm-units、" |> position col2 row1
    , footnote "ianmackenzie/elm-geometry、" |> position col2 (row1 + 40)
    , footnote "ianmackenzie/elm-3d-camera、" |> position col2 (row1 + 80)
    , footnote "ianmackenzie/elm-triangular-mesh" |> position col2 (row1 + 120)
    , footnote "高レベルパッケージ" |> position col0 row2
    , footnote "w0rm/elm-physics、" |> position col1 row2
    , footnote "w0rm/elm-obj-file" |> position col1 (row2 + 40)
    , footnote "ianmackenzie/elm-3d-scene\u{3000}" |> position col2 row2
    ]


blenderToElm : List Content
blenderToElm =
    [ title "BlenderからElmへ" |> position 100 50
    , bullets
        [ bullet "Blenderで造形"
        , bullet "OBJでエクスポート"
        , bullet "Elmで読み込み"
        ]
        |> position 100 180
    , let
        wid =
            650

        hei =
            round (wid / 1306 * 1232)
      in
      image wid hei "duck-blender.png" |> position (1280 - wid - 20) ((720 - hei) // 2)
    ]


objFormat : List Content
objFormat =
    [ title "OBJフォーマット" |> position 100 50
    , code """# 頂点 (v) - 3Dの点の位置
v 0.0 0.0 0.0
v 1.0 0.0 0.0
v 1.0 1.0 0.0

# テクスチャ座標 (vt) - 画像の位置（UV）
vt 0.0 0.0
vt 1.0 0.0

# 法線 (vn) - 面の向き（方向）
vn 0.0 0.0 1.0

# オブジェクト名 (o) - モデルの名前
o MyObject""" |> scale 0.7 |> position 100 200
    , code """# グループ名 (g) - パーツの名前
g MyGroup

# マテリアル名 (usemtl) - 見た目の素材
usemtl MyMaterial

# 面 (f) - 点をつないでポリゴンを作る
# インデックス番号を使う（v/vt/vn の順）
f 1/1/1 2/2/1 3/2/1

# 線 (l) - 点をつないでポリラインを作る
l 1/1 2/2

# 点 (p)
p 1 2""" |> scale 0.7 |> position 700 153
    ]


fromObjToElmTypes : List Content
fromObjToElmTypes =
    [ title "OBJからTriangularMesh型へ" |> position 100 50
    , code """f 1 2 3


f 1//1 2//1 3//1





f 1/1/1 2/2/1 3/2/1
""" |> scale 0.7 |> position 100 230
    , code """TriangularMesh (Point3d Meters MyCoordinates)


TriangularMesh
  { position = Point3d Meters MyCoordinates
  , normal = Vector3d Unitless MyCoordinates
  }


TriangularMesh
  { position = Point3d Meters MyCoordinates
  , normal = Vector3d Unitless MyCoordinates
  , uv = ( Float, Float )
  }""" |> scale 0.7 |> position 500 230
    ]


decodeSections : List Content
decodeSections =
    [ title "オブジェクト名ごとにモデルを読み込む" |> position 100 50
    , code """# file.obj

o Object1
f 1 2 3
# ...

o Object2
f 1//1 2//1 3//1
# ...

o Object3
f 1/1/1 2/2/1 3/2/1
# ...
""" |> scale 0.7 |> position 100 230
    , code """TriangularMesh (Point3d Meters MyCoordinates)


TriangularMesh
  { position = Point3d Meters MyCoordinates
  , normal = Vector3d Unitless MyCoordinates
  }


TriangularMesh
  { position = Point3d Meters MyCoordinates
  , normal = Vector3d Unitless MyCoordinates
  , uv = ( Float, Float )
  }""" |> scale 0.7 |> position 500 230
    , arrowMarker "black"
    , arrow "black" ( 260, 300 ) ( 460, 250 )
    , arrow "black" ( 260, 410 ) ( 460, 340 )
    , arrow "black" ( 260, 530 ) ( 460, 505 )
    ]


decodersInElm : List Content
decodersInElm =
    [ title "Elmのデコーダーパターン" |> position 100 50
    , code """import Json.Decode as Decode exposing (Decoder)

type alias Person = { name: String, age: Int }

decoder : Decoder Person
decoder =
    Decode.map2 Person
        (Decode.field "name" Decode.string)
        (Decode.field "age" Decode.int)

jsonString = "{\\"name\\": \\"Alice\\", \\"age\\": 30}"
result = Decode.decodeString decoder jsonString
--> Ok { name = "Alice", age = 30 }""" |> scale 0.7 |> position 100 230
    ]


elmObjFileApi : List Content
elmObjFileApi =
    [ title "elm-obj-fileのコアAPI" |> position 100 50
    , code """-- プリミティブのデコーダー
triangles : Decoder (TriangularMesh (Point3d Meters ObjCoordinates))
texturedFaces : Decoder (TriangularMesh
                          { position : Point3d Meters ObjCoordinates
                          , normal : Vector3d Unitless ObjCoordinates
                          , uv : (Float, Float)
                          })

-- オブジェクト名ごとにモデルを読み込む関数
object : String -> Decoder a -> Decoder a

-- マッピング関数
map : (a -> b) -> Decoder a -> Decoder b
map2 : (a -> b -> c) -> Decoder a -> Decoder b -> Decoder c""" |> scale 0.7 |> position 100 230
    ]


loadDuck : List Content
loadDuck =
    [ title "モデルの読み込み" |> position 100 50
    , code """duckDecoder : Decoder (Scene3d.Mesh.Textured ObjCoordinates)
duckDecoder =
    Obj.Decode.texturedFaces
        |> Obj.Decode.map Scene3d.Mesh.texturedFaces

-- Cmd Msg
Http.get
    { url = "duck-y-up.obj"
    , expect = Obj.Decode.expectObj
                   LoadedDuck -- Msg型を作成
                   Length.meters -- 単位を定義
                   duckDecoder
    }""" |> scale 0.7 |> position 100 230
    , Custom.duckYUp { width = 520, height = 520 } |> position (1280 - 520) (720 - 520)
    ]


fixCoordinates : List Content
fixCoordinates =
    [ title "座標系変換関数" |> position 100 50
    , code """type ZUpCoords = ZUpCoords Never

yUpToZUp : Frame3d Meters ZUpCoords
               { defines : ObjCoordinates }
yUpToZUp =
    Frame3d.atOrigin
        |> Frame3d.rotateAround
            Axis3d.x
            (Angle.degrees 90)

duckDecoder : Decoder (Scene3d.Mesh.Textured ZUpCoords)
duckDecoder =
    Obj.Decode.texturedFacesIn yUpToZUp -- 座標系変換関数
        |> Obj.Decode.map Scene3d.Mesh.texturedFaces""" |> scale 0.7 |> position 100 230
    , Custom.duck { width = 520, height = 520 } |> position (1280 - 520) (720 - 520)
    ]


meshAndCollider : List Content
meshAndCollider =
    let
        wid =
            450

        hei =
            wid * 1162 // 906
    in
    [ title "デコーダーの合成" |> position 100 50
    , code """duckDecoder : Decoder (Body Data)
duckDecoder =
    Obj.Decode.map2 bodyFromMeshAndCollider
      --- 視覚的な形状 elm-3d-scene
      (Obj.Decode.object "Duck"
        (Obj.Decode.texturedFacesIn bodyFrame)
      )
      -- 衝突判定形状 elm-physics
      (Obj.Decode.object "Convex"
        (Obj.Decode.trianglesIn bodyFrame)
      )""" |> scale 0.7 |> position 100 230
    , image wid hei "blender-collider.png" |> position (1280 - wid - 20) ((720 - hei) // 2)
    , arrowMarker "red"
    , arrow "red" ( 1280 - 180, (720 - hei) // 2 + 130 ) ( 620, 485 )
    ]


fallingDucks : List Content
fallingDucks =
    [ Custom.fallingDucks { width = 1280, height = 720 }
    , footnote "落ちるラバーダックのデモ" |> color "white" |> position 950 650
    ]


whatIsDecoder : List Content
whatIsDecoder =
    [ title "デコーダーって何？" |> position 100 50
    , group
        [ text "解析されたデータをElm型に変換する関数" |> position 100 220
        , code """type Decoder a
  = Decoder (VertexData -> List String -> List Group -> Result String a)
--           |             |              |            /
--           |             |              |           成功またはエラーの結果型
--           |             |              |
--           |             |              メタデータ付き面、線、点のグループ
--           |             |
--           |             適用されるフィルタ（オブジェクト名など）
--           |
--           解析された頂点、法線、画像の位置""" |> scale 0.7 |> position 100 320
        ]
        |> hide
    ]


mapImplementation : List Content
mapImplementation =
    [ title "Obj.Decode.map関数" |> position 100 50
    , text "型を見ながらmap関数を書こう" |> position 100 220
    , code """type Decoder a
  = Decoder (VertexData -> List String -> List Group -> Result String a)


map : (a -> b) -> Decoder a -> Decoder b
map fn (Decoder decoderFn) =
    Decoder
        (\\vertexData filters elements ->
            Result.map fn (decoderFn vertexData filters elements)
        )""" |> scale 0.7 |> position 100 320
    ]


miscApi : List Content
miscApi =
    [ title "elm-obj-fileのその他のAPI" |> position 100 50
    , code """-- プリミティブのデコーダー
polylines : Decoder (List (Polyline3d Meters ObjCoordinates))
objectNames : Decoder (List String)

-- 高度なデコーダー
oneOf : List (Decoder a) -> Decoder a
succeed : a -> Decoder a
fail : String -> Decoder a
andThen : (a -> Decoder b) -> Decoder a -> Decoder b
combine : List (Decoder a) -> Decoder (List a)""" |> scale 0.7 |> position 100 230
    ]


jeepIntro : List Content
jeepIntro =
    List.concat <|
        [ title "ジープの3Dモデル" |> position 380 50
        , text "車輪の位置と向きは線で定義される" |> width 550 |> position 380 220
        , image 250 250 "obj-all.png" |> position 100 110
        ]
            :: List.indexedMap
                (\i ( url, txt ) ->
                    [ image 250 250 (url ++ ".png") |> position (100 + i * 270) (650 - 260)
                    , footnote txt |> position (100 + i * 270) 650
                    ]
                )
                [ ( "obj-body", "車体" )
                , ( "obj-wheel", "車輪1つだけ" )
                , ( "obj-collider", "衝突判定形状" )
                , ( "obj-axes", "車輪の位置と向き" )
                ]


jeepDemo : List Content
jeepDemo =
    [ Custom.jeep { width = 1280, height = 720 }
    ]


poolIntro : List Content
poolIntro =
    [ cover (1280 // 2) 720 (Just 30) "pool-collider.png" |> position 0 0
    , cover (1280 // 2) 720 (Just 30) "pool-mesh.png" |> position (1280 // 2) 0
    , title "ビリヤード台の3Dモデル" |> color "white" |> position 100 50
    , footnote "衝突判定形状 elm-physics"
        |> color "white"
        |> position 100 650
    , footnote "視覚的な形状 elm-3d-scene"
        |> color "white"
        |> position 700 650
    ]


poolDemo : List Content
poolDemo =
    [ cover 1280 720 (Just 100) "pool-demo.png" |> color "white" |> position 0 0
    , title "elm-pool" |> color "white" |> position 100 50
    , link "https://unsoundscapes.itch.io/pool" (footnote "https://unsoundscapes.itch.io/pool" |> color "white")
        |> position 850 650
    ]


links : List Content
links =
    [ title "ありがとうございました！" |> position 100 50
    , bullets
        [ bulletLink "w0rm/elm-obj-file" "https://package.elm-lang.org/packages/w0rm/elm-obj-file/latest"
        , bulletLink "elm/jsonについて日本語で" "https://guide.elm-lang.jp/effects/json.html#jsonデコーダー"
        , bulletLink "BrianHicks/elm-csv" "https://package.elm-lang.org/packages/BrianHicks/elm-csv/latest"
        , bulletLink "ymtszw/elm-xml-decode" "https://package.elm-lang.org/packages/ymtszw/elm-xml-decode/latest"
        ]
        |> position 100 180
    , Custom.tangram { width = 500, height = 500 } |> position 980 370
    ]


addMobileNavigationButtons : List Content -> List Content
addMobileNavigationButtons contents =
    contents
        ++ [ prevButton ( 100, 720 ) |> position 0 0
           , nextButton ( 100, 720 ) |> position (1280 - 100) 0
           ]
