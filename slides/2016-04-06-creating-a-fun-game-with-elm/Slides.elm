module Slides (slides) where

import Model exposing (Model)
import Formatting exposing (..)
import SliceShow.Slide exposing (..)
import SliceShow.Content exposing (Content, hide, custom)


intro : List (Content Model)
intro =
  [ title "Creating a Fun Game With Elm"
  , spacing 60
  , image (100, 137) "assets/delivery-person.png"
  , char "       "
  , image (100, 100) "assets/elm.png"
  , char "      "
  , image (130, 130) "assets/zalando.jpg"
  , spacing 60
  , richtext "Andrey Kuzmin [@unsoundscapes](https://twitter.com/unsoundscapes)"
  , richtext """elm—([unsoundscapes](https://github.com/w0rm/elm-unsoundscapes),
[flatris](https://github.com/w0rm/elm-flatris),
[street-404](https://github.com/zalando/elm-street-404),
[slice-show](https://github.com/w0rm/elm-slice-show))""" |> hide
  ]


game : List (Content Model)
game =
  [ demo "http://zalando.github.io/elm-street-404/"
  , position (60, 550) [richtext "[prev slide](#2)"]
  , position (860, 550) [richtext "[next slide](#4)"]
  ]


modelExamples : Content Model
modelExamples =
  split
    [ icon "house", char " [", icon "category1", char "], [", icon "category2-return", char "]"
    , spacing 10
    , icon "warehouse", char " [", icon "category2", char ", ", icon "category3", char "]"
    , spacing 10
    , icon "delivery", char " [", icon "category3", char ", ", icon "category1", char "]"
    , spacing 40
    , List.map bullet ["click an article", "pickup an article", "spawn a new article"]
      |> bullets
    ]
    [ group
        [ char "[ ", icon "category1", char "@", icon "house"
        , char ", ", icon "category2-return", char "@", icon "house"
        , spacing 10
        , char ", ", icon "category2", char "@", icon "warehouse"
        , char ", ", icon "category3", char "@", icon "warehouse"
        , spacing 10
        , char ", ", icon "category3", char "@", icon "delivery"
        , char ", ", icon "category1", char "@", icon "delivery"
        , char " ]"
        , spacing 30
        , code "elm" """type State
  = InStock Warehouse
  | AwaitingReturn House
  | Delivered House
  | Picked"""
      ] |> hide
    ]


refactoring : List (Content Model)
refactoring =
  [ split
      [ char "[", icon "warehouse", char "] "
      , char "[", icon "house", char "] "
      , char "[(", icon "fountain", icon "tree", char ")]"
      ]
      [ code "elm" "{ a | position : (Float, Float)
    , size : (Float, Float)
    }"
      ]
  , split
      [ char "[(", icon "warehouse", icon "house",  icon "fountain", icon "tree", char ")]"
      ]
      [ code "elm" "{ position : (Float, Float)
, size : (Float, Float)
, category : MapObjectCategory
}"
      ]
    |> hide
  , code "elm" """type MapObjectCategory = HouseCategory Int
                       | WarehouseCategory Int
                       | FountainCategory Fountain
                       | TreeCategory"""
    |> hide
  ]


animation : List (Content Model)
animation =
  [ title "Animation"
  , code "elm" """update action model =
  case action of
    Tick time ->
      if model.state == Playing then
        (animate time model, Effects.tick Tick)
      else
        ({model | prevTime = Nothing}, Effects.none)

animate time model =
  case model.prevTime of
    Nothing -> {model | prevTime = Just time}
    Just prevTime -> animationLoop
      (min (time - prevTime) 25)
      {model | prevTime = Just time}"""
  ]


animationExample : List (Content Model)
animationExample =
  [ title "Animation: example"
  , [ code
      "elm"
      """animationLoop elapsed model =
  let
    elapsed' = model.elapsed + elapsed
  in
    if elapsed' >= model.timeout then
      { model
      | elapsed = elapsed' - model.timeout
      , frame = (model.frame + 1) % 4
      }
    else
      { model
      | elapsed = elapsed'
      }"""
    ] |> scale 0.9
  , [custom Model.fountain] |> position (500, 400) |> hide
  ]


gameLoop : Content Model
gameLoop =
  [ code
      "elm"
      """animationLoop : Time -> Model -> Model
animationLoop elapsed model =
  { model
  | mapObjects = List.map (MapObject.animate elapsed) model.mapObjects
  , deliveryPerson = DeliveryPerson.animate elapsed model.deliveryPerson
  , requests = List.map (Request.animate elapsed) model.requests
  , customers = List.map (Customer.animate elapsed) model.customers
  , dispatcher = animateDispatcher elapsed model.dispatcher
  }
  |> dispatch
  |> timeoutRequests
  |> updateGameState
  |> cleanup
  |> render"""
 ] |> scale 0.8


transitionToWebGL : Content Model
transitionToWebGL =
  split
    [ title "elm-html"
    , bullets
        [ bullet "render happens in view"
        , bullet "game objects become boxes"
        , bullet "some boxes have onClick event"
        , bullet "boxes are sorted by y-coordinate"
        , bullet "boxes become div tags with z-index for layer"
        ]
    , spacing 40
    , bullets
        [ bullet "slow diff of virtual dom"
        , bullet "slow updates of the real dom"
        , bullet "pass Signal.Address around"
        ]
      |> hide
    ]
    [ group
        [ title "elm-webgl"
        , bullets
            [ bullet "render happens in update"
            , bullet "game objects become clickable and textured boxes"
            , bullet "boxes are sorted by layer and y-coordinate"
            , bullet "clickable boxes are used in action from the touch input signal"
            , bullet "textured boxes are rendered with WebGL"
            ]
        ]
      |> hide
    ]


futurePlans : Content Model
futurePlans =
  List.map
    bullet
    [ "Fix touch support"
    , "Complete the visuals"
    , "Add sound effects"
    , "Improve the gameplay"
    ]
  |> bullets


slides : List (Slide Model)
slides =
  [ [padded intro]
  , [background "assets/team.jpg" [[title "Idea"] |> align Right ] ]
  , game
  , [shout "Model the data to reduce coplexity"]
  , [padded [title "Model: articles", modelExamples]]
  , [shout "Model fast, refactor later"]
  , [padded (title "Model: refactor map objects" :: refactoring)]
  , [background "assets/refactor.png" []]
  , [shout "Effects.tick is a ready-to-use animation loop"]
  , [padded animation]
  , [padded animationExample]
  , [padded [title "Animation: game loop", gameLoop]]
  , [shout "elm-html is a fast rendering engine"]
  , [shout "elm-webgl is a fast rendering engine for games"]
  , [padded [transitionToWebGL]]
  , [background "assets/timeline.png" []]

  , [padded [title "Algorithms: pathfinder", custom Model.pathfinder]]

  , [padded [title "Future Plans", futurePlans]]
  , [background "assets/stickers.jpg" [title "Questions?"]]
  ]
  |> List.map slide
