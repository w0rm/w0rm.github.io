module Slides exposing (slides)

import Model exposing (Model, Message)
import Formatting exposing (..)
import SliceShow.Slide exposing (..)
import SliceShow.Content exposing (Content, hide, custom)
import Html exposing (img, div)
import Html.Attributes exposing (width, height, src, style)
import Time exposing (Time)


intro : List (Content Model Message)
intro =
    [ position ( 794, 25 ) [ image ( 80, 80 ) "assets/elm.png" ]
    , position ( 894, 25 ) [ image ( 80, 80 ) "assets/zalando.jpg" ]
    , linkBox ( 300, 560 ) ( 380, 60 ) "https://twitter.com/unsoundscapes"
    , linkBox ( 720, 560 ) ( 200, 60 ) "https://twitter.com/01k"
    ]


game : List (Content Model Message)
game =
    [ demo "http://zalando.github.io/elm-street-404/"
    , position ( 60, 550 ) [ richtext "[prev slide](#14)" ]
    , position ( 860, 550 ) [ richtext "[next slide](#16)" ]
    ]


program : List (Content Model Message)
program =
    [ title "Html.App.program"
    , code "elm"
        """myInit : (Model, Cmd Msg)
myUpdate : Msg -> Model -> (Model, Cmd Msg)
mySubscriptions : Model -> Sub Msg
myView : Model -> Html Msg"""
    , code "elm"
        """
main : Program Never
main = Html.App.program
  { init = myInit
  , update = myUpdate
  , subscriptions = mySubscriptions
  , view = myView
  }"""
        |> hide
    ]


modelExamples : Content Model Message
modelExamples =
    split
        [ icon "house"
        , char " ["
        , icon "category1"
        , char "], ["
        , icon "category2-return"
        , char "]"
        , spacing 10
        , icon "warehouse"
        , char " ["
        , icon "category2"
        , char ", "
        , icon "category3"
        , char "]"
        , spacing 10
        , icon "delivery"
        , char " ["
        , icon "category3"
        , char ", "
        , icon "category1"
        , char "]"
        , spacing 40
        , bullets [ bullet "pickup an article", bullet "spawn a new request" ]
        ]
        [ group
            [ char "[ "
            , icon "category1"
            , char "@"
            , icon "house"
            , char ", "
            , icon "category2-return"
            , char "@"
            , icon "house"
            , spacing 10
            , char ", "
            , icon "category2"
            , char "@"
            , icon "warehouse"
            , char ", "
            , icon "category3"
            , char "@"
            , icon "warehouse"
            , spacing 10
            , char ", "
            , icon "category3"
            , char "@"
            , icon "delivery"
            , char ", "
            , icon "category1"
            , char "@"
            , icon "delivery"
            , char " ]"
            , spacing 30
            , code "elm" """type State
  = InStock Warehouse
  | AwaitingReturn House
  | Delivered House
  | Picked"""
            ]
            |> hide
        ]


refactoring : List (Content Model Message)
refactoring =
    [ split
        [ char "["
        , icon "warehouse"
        , char "] "
        , char "["
        , icon "house"
        , char "] "
        , char "["
        , icon "fountain"
        , char ", "
        , icon "tree"
        , char "]"
        ]
        [ code "elm" "{ a | position : (Float, Float)\n    , size : (Float, Float)\n    }"
        ]
    , group
        [ split
            [ char "["
            , icon "warehouse"
            , char ", "
            , icon "house"
            , char ", "
            , icon "fountain"
            , char ", "
            , icon "tree"
            , char "]"
            ]
            [ code "elm" "{ position : (Float, Float)\n, size : (Float, Float)\n, category : MapObjectCategory\n}"
            ]
        , code "elm" """type MapObjectCategory = HouseCategory Int
                       | WarehouseCategory Int
                       | FountainCategory Fountain
                       | TreeCategory"""
        ]
        |> hide
    ]


animation : List (Content Model Message)
animation =
    [ title "Animation"
    , code "elm" """type Msg = Tick Time


subscriptions : Model -> Sub Msg
subscriptions model =
  AnimationFrame.diffs Tick


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Tick elapsed ->
      (animationLoop elapsed model, Cmd.none)
"""
    ]


animationExample : List (Content Model Message)
animationExample =
    [ title "Animation: example"
    , code
        "elm"
        """animationLoop : Time -> Model -> Model
animationLoop elapsed model =
  let
    timeout = model.timeout + elapsed
  in
    if timeout >= 1000 then
      { model
      | timeout = timeout - 1000
      , frame = (model.frame + 1) % 4
      }
    else
      { model
      | timeout = timeout
      }"""
    , [ custom Model.fountain ] |> position ( 700, 260 ) |> hide
    ]


gameLoop : Content Model Message
gameLoop =
    code
        "elm"
        """animationLoop : Time -> Model -> Model
animationLoop elapsed model =
  { model
  | deliveryPerson =
      DeliveryPerson.animate
        elapsed
        model.deliveryPerson

  , customers =
      List.map
        (Customer.animate elapsed)
        model.customers
  }"""


transitionToWebGL : Content Model Message
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
            ]
            |> hide
        ]
        [ group
            [ title "elm-webgl"
            , bullets
                [ bullet "render happens in update and view"
                , bullet "game objects become clickable and textured boxes"
                , bullet "boxes are sorted by layer and y-coordinate"
                , bullet "clickable boxes are used in click action"
                , bullet "textured boxes are rendered with WebGL"
                ]
            ]
            |> hide
        ]


futurePlans : List (Content Model Message)
futurePlans =
    [ title "Plans for the future"
    , bullets
        [ crossedBullet "Make the game responsive"
        , crossedBullet "Complete the visuals"
        , crossedBullet "Go live on the 404 page"
        , bullet "Improve the gameplay"
        , bullet "Improve the performance"
        , bullet "Add sound effects"
        , bullet "Get more contributors!"
        ]
    , spacing 68
    , [ richtext "## [https://github.com/zalando/elm-street-404](https://github.com/zalando/elm-street-404)" ] |> align Center
    ]


animatedBackground : Time -> String -> List Int -> Content Model Message
animatedBackground time imageName frames =
    frames
        |> List.map (\n -> "assets/" ++ imageName ++ toString n ++ ".jpg")
        |> Model.animatedImage time ( 1024, 640 )
        |> custom
        |> (\a -> position ( 0, 0 ) [ a ])


diagram : Content Model Message
diagram =
    Model.animatedHtml
        1000
        (\t ->
            img
                [ src "assets/the-elm-architecture2.jpg"
                , width 1024
                , height 640
                , style
                    [ ( "opacity", toString (1 - t / 1000) )
                    , ( "position", "absolute" )
                    , ( "left", "0" )
                    , ( "top", "0" )
                    ]
                ]
                []
        )
        |> custom


fullDiagram : Content Model Message
fullDiagram =
    Model.animatedHtml
        1200
        (\t ->
            let
                resize original =
                    toString ((0.7 + 0.3 * t / 1200) * original) ++ "px"

                move original =
                    toString (original - (1 - t / 1200) * original) ++ "px"
            in
                div
                    [ style
                        [ ( "position", "absolute" )
                        , ( "left", "0" )
                        , ( "top", "0" )
                        , ( "width", "100%" )
                        , ( "height", "100%" )
                        , ( "background-image", "url(assets/the-elm-architecture3.jpg)" )
                        , ( "background-position", move -311 )
                        , ( "background-repeat", "no-repeat" )
                        , ( "background-size", resize 1335 ++ " " ++ resize 1261 )
                        ]
                    ]
                    []
        )
        |> custom


slides : List (Slide Model Message)
slides =
    [ [ background "assets/intro.jpg" intro ]
    , [ background "assets/elm-in-production.jpg" [ spacing 470, [ richtext "## [https://zalando.nl/404](https://zalando.nl/404)" ] |> align Center ] ]
    , [ background "assets/team.jpg" [] ]
    , [ shout "Put yourself into your customers’ shoes" ]
    , [ shout "Let’s put our customers into our shoes for a change" ]
    , [ padded [ title "What are people using Elm for?", spacing 40, image ( 750, 315 ) "assets/survey.png" ] ]
    , [ background "assets/delivery-person-all-directions1.jpg" [] ]
    , [ animatedBackground 100 "delivery-person-all-directions" [ 1, 2, 3 ] ]
    , [ background "assets/customer-slide1.jpg" [] ]
    , [ animatedBackground 500 "customer-slide" [ 1, 1, 2, 3, 4, 4, 3, 2 ] ]
    , [ animatedBackground 500 "angry-david" [ 1, 2 ] ]
    , [ padded [ title "Algorithms: pathfinder", custom Model.pathfinder ] ]
    , [ padded [ title "Algorithms: randomize", custom Model.randomize ] ]
    , [ background "assets/delivery-person-waiting.jpg" [] ]
    , game
    , [ background "assets/the-elm-architecture1.jpg" [] ]
    , [ background "assets/the-elm-architecture1.jpg" [ diagram ] ]
    , [ fullDiagram ]
    , [ padded program ]
    , [ shout "Model the data to reduce complexity" ]
    , [ padded [ title "Model: articles", modelExamples ] ]
    , [ shout "Model fast, refactor later" ]
    , [ padded (title "Model: refactoring" :: refactoring) ]
    , [ background "assets/refactor.png" [] ]
    , [ shout "AnimationFrame is a ready-to-use animation loop" ]
    , [ padded animation ]
    , [ padded animationExample ]
    , [ padded [ title "Animation: composition", gameLoop ] ]
    , [ shout "elm-html is a fast rendering engine" ]
    , [ shout "elm-webgl is a fast rendering engine for games", Model.sphere |> custom ]
    , [ padded [ transitionToWebGL ] ]
    , [ background "assets/timeline-before.png" [ spacing 400, [ title "Before: elm-html" ] |> align Right ] ]
    , [ background "assets/timeline-after.png" [ spacing 400, [ title "After: elm-webgl" ] |> align Right ] ]
    , [ padded futurePlans ]
    , [ animatedBackground 500 "end-game" [ 1, 2 ] ]
    ]
        |> List.map ((::) orangeLine)
        |> List.map slide
