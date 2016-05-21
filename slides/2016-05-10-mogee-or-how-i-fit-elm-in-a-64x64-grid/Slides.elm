module Slides (slides) where

import Model exposing (Model)
import Formatting exposing (..)
import SliceShow.Slide exposing (..)
import SliceShow.Content exposing (Content, hide, custom)

intro : List (Content Model)
intro =
  [ title "Mogee or How I Fit Elm in a 64×64 Grid"
  , [custom Model.mogee] |> position (850, 440)
  , richtext "Andrey Kuzmin [@unsoundscapes](https://twitter.com/unsoundscapes)"
  , spacing 260
  , richtext """elm—([unsoundscapes](https://github.com/w0rm/elm-unsoundscapes),
[flatris](https://github.com/w0rm/elm-flatris),
[street-404](https://github.com/zalando/elm-street-404),
[slice-show](https://github.com/w0rm/elm-slice-show),
[mogee](https://github.com/w0rm/elm-mogee))""" |> hide
  ]


lowresjam : List (Content Model)
lowresjam =
  [ title "#LOWRESJAM"
  , richtext """Make a game with a resolution of 64×64 pixels using whatever programming platform you'd like, with as few or as many colors as you'd like, with any fidelity of sound you'd like, and 2D or 3D graphics!"""
  , richtext """[itch.io/jam/lowrezjam2016](https://itch.io/jam/lowrezjam2016)"""
  ]


goals : List (Content Model)
goals =
  [ title "Goals"
  , bullets
      [ bullet "Code the game engine from scratch"
      , bullet "Use Signals instead of StartApp"
      , bullet "Submit a playable MVP in 3 days"
      ]
  ]


game : List (Content Model)
game =
  [ position (224, 32) [demo "576px" "576px" "http://unsoundscapes.com/elm-mogee.html"]
  , position (60, 550) [richtext "[prev slide](#3)"]
  , position (860, 550) [richtext "[next slide](#5)"]
  ]


signalGraph : List (Content Model)
signalGraph =
  [ title "Signal Graph"

  , group
      [ node (450, 110) "fps60"
      , node (550, 110) "Keyboard.arrows"
      , node (780, 110) "Keyboard.enter"
      ]
    |> hide

  , group
      [ arrow (480, 150) (550, 200)
      , arrow (630, 150) (630, 200)
      , arrow (850, 150) (750, 200)
      , node (550, 220) "Signal.map3 (,,)"
      ]
    |> hide

  , group
      [ arrow (630, 270) (630, 300)
      , node (520, 320) "Signal.sampleOn fps60"
      ]
    |> hide

  , group
      [ arrow (630, 370) (630, 400)
      , node (470, 420) "Signal.foldp Model.update Model.model"
      ]
    |> hide

  , group
      [ arrow (630, 470) (500, 500)
      , node (100, 320) "Window.dimensions"
      , arrow (180, 370) (350, 500)
      , node (330, 320) "texture"
      , arrow (370, 370) (420, 500)
      , node (340, 520) "Signal.map3 view"
      ]
    |> hide
  ]


model : List (Content Model)
model =
  [ title "Model"
  , split
      [ code
          "elm"
          """type alias Model =
  { objects : List Object
  , direction : Direction
  , seed : Random.Seed
  , state : GameState
  , lives : Int
  , score : Int
  , currentScore : Int
  , screens : Int
  }"""
      ]
      [ code
          "elm"
          """type alias Object =
  { number : Int
  , category : Category
  , velocity : (Float, Float)
  , size : (Float, Float)
  , position : (Float, Float)
  }""" |> hide
      , code
          "elm"
          """type Category
  = WallCategory
  | MogeeCategory Mogee
  | ScreenCategory Direction""" |> hide
      ]
  ]


update : List (Content Model)
update =
  [ title "Update"
  , [ code
        "elm"
        """update : (Time, Keys, Bool) -> Model -> Model
update (elapsed, keys, enter) m =
  case m.state of
    Paused ->
      if enter then
        { model | state = Playing, lives = m.lives
                , seed = m.seed, score = m.score }
      else
        m
    Stopped ->
      if enter then
        { m | state = Playing, score = 0 }
      else
        m
    Playing ->
      m
        |> updateObjects elapsed keys
        |> addScreen
        |> checkLives"""
    ] |> scale 0.8
  ]


view : List (Content Model)
view =
  [ title "View: WebGL"
  , [ code
        "elm"
        """view : Maybe GL.Texture -> Int -> Model -> Element
view maybeTexture size model =
  GL.webglWithConfig
    [ GL.Enable GL.Blend
    , GL.BlendFunc (GL.One, GL.OneMinusSrcAlpha)
    ]
    (size, size)
    ( case maybeTexture of
        Nothing ->
          []
        Just texture ->
          render texture model -- List (Int, GL.Renderable)
          |> List.sortBy fst
          |> List.map snd
    )"""
    ] |> scale 0.9
  ]


discoveries : List (Content Model)
discoveries =
  [ title "Update: Discoveries"
  , bullets
      [ bullet "List.foldl is a good way to update the list of game objects" |> hide
      , bullet "List.foldl is helpful when one object has to interact with multiple objects" |> hide
      , bullet "The order of execution matters, because objects interact with old copies" |> hide
      ]
  , richtext "Check the article [\"Immutability is not enough\"](https://codewords.recurse.com/issues/six/immutability-is-not-enough) by Patrick Dubroy"
    |> hide
  ]


sprite : List (Content Model)
sprite =
  [ title "View: Sprite"
  , bullets
      [ bullet "64×64px"
      , bullet "transparent png"
      , bullet "base64 data uri"
      ]
  , [image (448, 448) "assets/texture.png"] |> position (480, 100)
  ]


viewDiscoveries : List (Content Model)
viewDiscoveries =
  [ title "View: Discoveries"
  , bullets
      [ bullet "WebGL is not made for pixel art" |> hide
      , bullet "WebGL is not made for pixel art" |> hide
      , bullet "List.foldl is good to convert game objects into renderables" |> hide
      ]
  ]


futurePlans : List (Content Model)
futurePlans =
  [ title "Future Plans"
  , bullets
      [ bullet "Improve the graphics"
      , bullet "Add 8bit sound effects"
      , bullet "Migrate to Elm 0.17"
      ]
  ]


questions : List (Content Model)
questions =
  [ title "Questions?"
  , [custom Model.mogee] |> position (850, 440)
  ]


slides : List (Slide Model)
slides =
  [ [padded intro]
  , [padded lowresjam]
  , [padded goals]
  , [background "" game]
  , [padded signalGraph]
  , [shout "Using signals instead of StartApp simplifies the game"]
  , [padded model]
  , [padded update]
  , [padded discoveries]
  , [padded view]
  , [padded sprite]
  , [padded viewDiscoveries]
  , [padded futurePlans]
  , [padded questions]
  ]
  |> List.map slide
