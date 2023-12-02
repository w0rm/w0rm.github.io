module Main exposing (main)

import Custom exposing (Content, thankYou)
import Formatting exposing (bullet, bulletLink, bullets, code, color, cover, footnote, image, link, nonInteractive, position, text, title, width)
import Length exposing (foot)
import Scene3d exposing (nothing)
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (hide, item)
import SliceShow.Slide exposing (setDimensions, slide)
import Svg.Attributes exposing (scale)


main : Program () (Model Custom.Model Custom.Msg) (Message Custom.Msg)
main =
    [ intro
    , topics
    , elmJapan
    , idea
    , gameJam
    , jared
    , revival
    , size
    , blender
    , demo
    , phantom
    , model
    , update
    , futurePlans
    , links
    , bonus1
    , bonus2
    , thankYou
    ]
        |> List.map (slide >> setDimensions ( 1280, 800 ))
        |> SliceShow.init
        |> SliceShow.setSubscriptions Custom.subscriptions
        |> SliceShow.setUpdate Custom.update
        |> SliceShow.setView Custom.view
        |> SliceShow.show


intro : List Content
intro =
    [ title "Elmで作るビリヤード" |> position 100 50
    , text "アンドレイ" |> position 100 540
    , link "https://twitter.com/unsoundscapes" (footnote "@unsoundscapes") |> position 115 620
    , cover 600 800 Nothing "kyoto.jpg" |> position (1280 - 600) 0
    ]


topics : List Content
topics =
    [ title "Elmで作るビリヤード" |> position 100 50
    , bullets
        [ bullet "プロジェクトの誕生" -- introduce people and timeline
        , bullet "デモンストレーション" -- show the game
        , bullet "コードの仕組み" -- deep dive
        ]
        |> position 100 180
    ]


elmJapan : List Content
elmJapan =
    [ cover 1280 800 Nothing "elm-japan.png" |> position 0 0 ]


idea : List Content
idea =
    [ title "発表のアイデア" |> position 100 50
    , bullets
        [ bullet "難しいことはelm-physicsとelm-3d-sceneに任せる"
        , bullet "ゲームを作るのを楽しめる"
        ]
        |> width 650
        |> position 100 180
    , image 400 400 "talk.png" |> position 800 180
    ]


gameJam : List Content
gameJam =
    [ cover 1280 800 Nothing "elm-game-jam.png" |> position 0 0
    , link "https://itch.io/jam/elm-game-jam-5" (footnote "Elm Game Jam #5")
        |> position 1000 700
    ]


jared : List Content
jared =
    [ cover 637 800 Nothing "jared.jpg" |> position (1280 - 637) 0
    , title "elm-poolの" |> position 100 50
    , title "コラボレーション" |> position 100 110
    , bullets
        [ bullet "８ボールのルール"
        , bullet "インテラクション"
        , bullet "シムレーション"
        ]
        |> position 100 240
    , link "https://jaredmsmith.com/dev/elm-pool-collaboration" (footnote "記事 elm-pool collaboration by Jared M Smith")
        |> position 100 700
    ]


revival : List Content
revival =
    [ title "ビリヤード台のモデル" |> position 100 50
    , bullets
        [ bullet "本物らしく見える"
        , bullet "正しい大きさ"
        ]
        |> position 100 240
    , cover 600 800 Nothing "kolja.jpg" |> position 680 0
    , link "https://twitter.com/01k" (footnote "Kolja Wilcke @01k")
        |> position 100 700
    ]


size : List Content
size =
    [ title "8フィート・ビリヤード台のモデル" |> position 100 50
    , image (round (750 / 1.9)) (round (525 / 1.9)) "table-dimensions.svg" |> position 58 235
    , image (round (1500 / 1.9)) (round (750 / 1.9)) "pockets-dimensions.svg" |> position 450 240
    , link "https://www.dimensions.com/element/8-foot-billiards-pool-table" (footnote "ビリヤード台")
        |> position 100 700
    , link "https://www.dimensions.com/element/billiards-pool-table-pockets" (footnote "ポケット\u{3000}www.dimensions.com")
        |> position 510 700
    ]


blender : List Content
blender =
    [ cover (1280 // 2) 800 (Just 30) "collider.png" |> position 0 0
    , cover (1280 // 2) 800 (Just 30) "mesh.png" |> position (1280 // 2) 0
    , footnote "衝突判定形状 elm-physics"
        |> color "white"
        |> position 100 700
    , footnote "視覚的な形状 elm-3d-scene"
        |> color "white"
        |> position 700 700
    ]


demo : List Content
demo =
    [ cover 1280 800 (Just 100) "demo.png" |> color "white" |> position 0 0
    , title "デモンストレーション" |> color "white" |> position 100 50
    , link "https://unsoundscapes.itch.io/pool" (footnote "https://unsoundscapes.itch.io/pool" |> color "white")
        |> position 100 230
    ]


model : List Content
model =
    [ title "Model" |> position 100 50
    , code """type State
    = PlacingBall BallInHand PoolWithBallInHand
    | Shooting AimingCue Shot (Pool AwaitingPlayerShot)
    | Simulating (List ( Posix, ShotEvent )) (Pool AwaitingPlayerShot)
    | GameOver Player (Pool AwaitingStart)

type BallInHand
    = OnTable CanPlace (Point3d Meters WorldCoordinates)
    | OutsideOfTable

type CanPlace = CanPlace | CannotPlace

type PoolWithBallInHand
    = BehindHeadString (Pool AwaitingPlaceBallBehindHeadstring)
    | Anywhere (Pool AwaitingPlaceBallInHand)
""" |> position 100 240
    ]


phantom : List Content
phantom =
    [ title "ファントム型パラメータ" |> position 100 50
    , code """type Pool state = Pool PoolData

start : Pool AwaitingRack

rack : Time.Posix -> Pool AwaitingRack
    -> Pool AwaitingPlaceBallBehindHeadstring

placeBallBehindHeadstring : Time.Posix -> Pool AwaitingPlaceBallBehindHeadstring
    -> Pool AwaitingPlayerShot

playerShot : List ( Time.Posix, ShotEvent )
    -> Pool AwaitingPlayerShot -> WhatHappened

type WhatHappened
    = IllegalBreak (Pool AwaitingRack)
    | PlayersFault (Pool AwaitingPlaceBallInHand)
    | NextShot (Pool AwaitingPlayerShot)
    | GameOver (Pool AwaitingStart) { winner : Player }
""" |> position 100 240
    ]


update : List Content
update =
    [ title "Update" |> position 100 50
    , code """type Msg
    = MouseDown (Point2d Pixels ScreenCoordinates)
    | MouseMove (Point2d Pixels ScreenCoordinates)
    | MouseUp | ShootPressed | ShootReleased | ...

-- タプルにしてパターンマッチする
case ( model.state, msg ) of
    ( PlacingBall _ pool, MouseMove pos ) -> ...
    ( PlacingBall (OnTable CanPlace pos) pool, MouseDown _ ) -> ...
    ( Shooting (TargetingCueBall _) shot pool, MouseMove pos ) -> ...
    ( Shooting (TargetingCueBall (Just target)) shot pool, MouseDown pos ) -> ...
    ( Shooting (ElevatingCue originalPosition) shot pool, MouseMove pos ) -> ...
    ( Shooting (ElevatingCue _) shot pool, MouseUp ) -> ...
    ( Shooting aimingCue shot pool, ShootPressed ) -> ...
    ( Shooting aimingCue shot pool, ShootReleased ) -> ...
    ...
""" |> position 100 240
    ]


futurePlans : List Content
futurePlans =
    [ title "未来の予定" |> position 100 50
    , bullets
        [ bullet "８ボールのルールを作り終わる"
        , bullet "ショットのリプレイ映像"
        , bullet "遊び方のヒント"
        , bullet "ネットワーク対戦"
        ]
        |> position 100 180
    ]


links : List Content
links =
    [ title "リンク" |> position 100 50
    , bullets
        [ bulletLink "elm-pool" "https://github.com/w0rm/elm-pool"
        , bulletLink "elm-physics" "https://github.com/w0rm/elm-physics"
        , bulletLink "elm-3d-scene" "https://github.com/ianmackenzie/elm-3d-scene"
        , bulletLink "elm-obj-file" "https://github.com/w0rm/elm-obj-file"
        ]
        |> position 100 180
    ]


bonus1 : List Content
bonus1 =
    [ title "PostScriptで生成されたテクスチャ" |> position 100 50
    , code
        """%!PS
<</PageSize [1024 512]>> setpagedevice

% background
0 0 moveto 1024 0 rlineto 0 512 rlineto -1024 0 rlineto 0 -512 rlineto closepath
1 0.843 0 setrgbcolor fill

% circles
256 256 80 0 360 arc
768 256 80 0 360 arc closepath
1 1 1 setrgbcolor fill

% text
/Rubik-Regular.ttf findfont 130 scalefont setfont
0 0 0 setrgbcolor
256 210 moveto
(1) stringwidth pop 2 div neg 0 rmoveto
(1) show
...
        """
        |> position 100 240
    , image 350 175 "1.png" |> position 870 500
    ]


bonus2 : List Content
bonus2 =
    [ title "flake.nixを使った開発環境" |> position 100 50
    , code """{ inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system}; in {
        devShells.default = with pkgs; with elmPackages; mkShell {
          buildInputs = [
            elm
            elm-format
            elm-test
            elm-review
            elm-json
            nodePackages.uglify-js
            butler
            ghostscript # for generating ball textures
            pngquant # for minimizing ball textures
          ];
        };
      });
}""" |> position 100 180
    ]


thankYou : List Content
thankYou =
    [ Custom.thankYou { width = 1280, height = 800 } ]
