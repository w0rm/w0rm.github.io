module Main exposing (main)

import Formatting exposing (bullet, bulletLink, bullets, code, image, link, position, text, title)
import Schema
import SliceShow exposing (Message, Model)
import SliceShow.Content exposing (Content, hide, item)
import SliceShow.Slide exposing (setDimensions, slide)


main : Program () (Model model msg) (Message msg)
main =
    [ intro
    , why
    , topics
    , packages1
    , packages2
    , ikea
    , blueprint
    , modelling1
    , modelling2
    , modelling3
    , modelling4
    , lack
    , rendering1
    , rendering2
    , rendering3
    , rendering4
    , simulation1
    , simulation2
    , interaction 1
    , interaction 2
    , interaction 3
    , interaction 4
    , interaction 5
    , interaction 6
    , interaction1
    , interaction2
    , interaction3
    , demo
    , links
    ]
        |> List.map (slide >> setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.show


intro : List (Content model msg)
intro =
    [ image (600 // 2) (977 // 2) "assets/game.jpg" |> position 900 100
    , title "Elm で「ちゃぶ台返し」する方法" |> position 100 100
    , image 50 50 "assets/twitter.png" |> position 100 250
    , text "アンドレイ" |> position 170 240
    ]


why : List (Content model msg)
why =
    [ title "どうして「ちゃぶ台返し」？" |> position 100 50
    , bullets
        [ bullet "ストレス解消" |> hide
        , bullet "新しい機能" |> hide
        , bullet "elm-3d-sceneと使う例" |> hide
        ]
        |> position 100 180
    , image 400 311 "assets/meme.jpg" |> position 760 110
    ]


topics : List (Content model msg)
topics =
    [ bullets
        [ bullet "必要なパッケージ"
        , bullet "3D モデリング"
        , bullet "レンダリングの設定"
        , bullet "シミュレーション"
        , bullet "ユーザーインタラクション"
        ]
        |> position 100 50
    , image 400 311 "assets/meme.jpg" |> position 760 110
    ]


packages1 : List (Content model msg)
packages1 =
    [ title "使うパッケージ" |> position 100 50
    , bullets
        [ bullet "w0rm/elm-physics 物理シミュレーション"
        , bullet "ianmackenzie/elm-geometry 3D 計算"
        , bullet "ianmackenzie/elm-units 型安全な単位"
        ]
        |> position 100 180
    ]


packages2 : List (Content model msg)
packages2 =
    [ title "使うパッケージ" |> position 100 50
    , bullets
        [ bullet "ianmackenzie/elm-3d-scene レンダリング"
        , bullet "ianmackenzie/elm-3d-camera"
        , bullet "avh4/elm-color"
        ]
        |> position 100 180
    ]


ikea : List (Content model msg)
ikea =
    [ image (2022 // 2) (1307 // 2) "assets/ikea.jpg" |> position 110 50
    ]


lack : List (Content model msg)
lack =
    [ image 1280 720 "assets/lack.jpg" |> position 0 0
    ]


blueprint : List (Content model msg)
blueprint =
    [ image (2560 // 3) (1600 // 3) "assets/blueprint.jpg" |> position 210 20
    , text "設計図" |> position 208 595
    , link "https://www.thingiverse.com/thing:2839405/" (text "thingiverse.com/thing:2839405")
        |> position 410 600
    ]


modelling1 : List (Content model msg)
modelling1 =
    [ code """blocks =
    [ Block3d.from
        (Point3d.millimeters
            222
            222
            0
        )
        (Point3d.millimeters
            272
            272
            400
        )
    ...""" |> position 100 50
    , image (780 // 4) (2242 // 4) "assets/dimensions.png"
        |> position 960 50
    ]


modelling2 : List (Content model msg)
modelling2 =
    [ code """shapes =
    blocks
        |> List.map Shape.block

drawables =
    blocks
        |> List.map
            (\\block ->
                ...
""" |> position 100 50
    ]


modelling3 : List (Content model msg)
modelling3 =
    [ code """type Id = Mouse | Floor | Table

type alias Data =
  { drawable : Drawable BodyCoordinates
  , id : Id
  }

table : Body Data
table =
  Body.compound shapes
    { id = Table
    , drawable = Drawable.group drawables
    }
    |> Body.setBehavior
      (Body.dynamic (kilograms 3.58))
""" |> position 100 50
    ]


modelling4 : List (Content model msg)
modelling4 =
    [ code """initialWorld : World Data
initialWorld =
  World.empty
    |> World.setGravity
      (Acceleration.metersPerSecondSquared 9.80665)
      Direction3d.negativeZ
    |> World.add table
    |> World.add floor
""" |> position 100 50
    ]


rendering1 : List (Content model msg)
rendering1 =
    [ title "レンダリング・カメラ" |> position 100 50
    , code """camera =
  Camera3d.perspective
    { viewpoint =
        Viewpoint3d.lookAt
          { eyePoint = Point3d.meters 3 4 2
          , focalPoint = Point3d.meters -0.5 -0.5 0
          , upDirection = Direction3d.positiveZ
          }
    , clipDepth = meters 0.1
    , verticalFieldOfView = Angle.degrees 24
    }
""" |> position 100 180
    ]


rendering2 : List (Content model msg)
rendering2 =
    [ title "レンダリング・光" |> position 100 50
    , code """sunlight = Light.directional Chromaticity.daylight
    (Illuminance.lux 10000)
    (Direction3d.xyZ
      (Angle.degrees 135)
      (Angle.degrees -60)
    )
ambientLighting = Light.overcast
    { zenithDirection = Direction3d.z
    , chromaticity = Chromaticity.daylight
    , zenithLuminance = Luminance.nits 5000
    }
""" |> position 100 180
    ]


rendering3 : List (Content model msg)
rendering3 =
    [ title "レンダリング・座標系変換" |> position 100 50
    , code """drawables =
    List.map
        (\\body ->
            Drawable.placeIn
                (Body.getFrame3d body)
                (Body.getData body).drawable
        )
        (World.getBodies world)
""" |> position 100 180
    ]


rendering4 : List (Content model msg)
rendering4 =
    [ code """Scene3d.render []
  { width = width
  , height = height
  , camera = camera
  , lights = Scene3d.oneLight sunlight
      { castsShadows = True }
  , ambientLighting = Just ambientLighting
  , exposure = Exposure.fromMaxLuminance
      (Luminance.nits 10000)
  , whiteBalance = Chromaticity.daylight
  }
  drawables
""" |> position 100 50
    ]


simulation1 : List (Content model msg)
simulation1 =
    [ title "シミュレーション・AnimationFrame" |> position 100 50
    , code """update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AnimationFrame ->
            ( { model
              | world = World.simulate
                  (seconds (1 / 60))
                  model.world
              }
            , Cmd.none
            )
""" |> position 100 180
    ]


simulation2 : List (Content model msg)
simulation2 =
    [ code """type Msg
  = AnimationFrame
  | Resize
      (Quantity Float Pixels)
      (Quantity Float Pixels)
  | MouseDown
      (Axis3d Meters WorldCoordinates)
  | MouseMove
      (Axis3d Meters WorldCoordinates)
  | MouseUp
""" |> position 100 50
    ]


interaction : Int -> List (Content model msg)
interaction step =
    [ item (Schema.view step) |> position 0 0
    ]


interaction1 : List (Content model msg)
interaction1 =
    [ title "インタラクション・MouseDown" |> position 100 50
    , code """maybeRaycastResult =
    model.world
    |> World.keepIf
        (\\body ->
          (Body.getData body).id == Table
        )
    |> World.raycast mouseRay
""" |> position 100 180
    ]


interaction2 : List (Content model msg)
interaction2 =
    [ code """model.world
  |> World.add (Body.moveTo worldPoint mouse)
  |> World.constrain
    (\\b1 b2 ->
        if
          ((Body.getData b1).id == Mouse)
          && ((Body.getData b2).id == selectedId)
        then
          [ Constraint.pointToPoint
              Point3d.origin
              point
          ]
        else
          []
    )
""" |> position 100 50
    ]


interaction3 : List (Content model msg)
interaction3 =
    [ title "インタラクション・MouseMove" |> position 100 50
    , code """World.update
  (\\body ->
    if (Body.getData body).id == Mouse then
      case intersectionWithPlane plane mouseRay of
        Just intersection ->
          Body.moveTo intersection body
        Nothing -> body
    else
      body
  )
  model.world
""" |> position 100 180
    ]


demo : List (Content model msg)
demo =
    [ title "「ちゃぶ台返し」しましょう！"
        |> link "https://unsoundscapes.com/slides/2019-12-07-how-to-flip-a-table-with-elm/lack.html"
        |> position 300 300
    ]


links : List (Content model msg)
links =
    [ bullets
        [ bulletLink "「ちゃぶ台返し」のコード" "https://github.com/ianmackenzie/elm-3d-scene/blob/master/examples/Lack.elm"
        , bulletLink "elm-physicsについて" "https://discourse.elm-lang.org/search?q=%223D%20Physics%20Engine%22"
        , bulletLink "新しいelm-geometryについて" "https://discourse.elm-lang.org/t/elm-geometry-3-now-with-units-and-coordinate-systems/4780"
        , bulletLink "elm-3d-sceneの発表" "https://www.youtube.com/watch?v=Htqc64s5qYU"
        , bulletLink "影のレンダリング" "https://discourse.elm-lang.org/t/rendering-real-time-shadows-in-webgl-using-shadow-volumes/4029"
        ]
        |> position 100 50
    ]
