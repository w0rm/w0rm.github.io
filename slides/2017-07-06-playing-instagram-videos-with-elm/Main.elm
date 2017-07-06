module Main exposing (main)

import SliceShow
import SliceShow.Slide as Slide
import SliceShow.Content as Content
import Html exposing (h1, text)
import Html.Attributes exposing (style)
import Formatting exposing (..)


type alias Content =
    Content.Content () ()


type alias Slide =
    Slide.Slide () ()


intro : List Content
intro =
    [ Content.item
        (h1
            [ style
                [ ( "font", "90px/1.2 FiraSans-Light, sans-serif" )
                , ( "letter-spacing", "-2px" )
                , ( "margin", "30px 0 150px" )
                ]
            ]
            [ text "Playing Instagram Videos with Elm" ]
        )
    , image ( 160, 160 ) "assets/mogee.png"
    , position ( 320, 435 )
        [ richtext """Andrey Kuzmin

Twitter: [@unsoundscapes](https://twitter.com/unsoundscapes)

GitHub: [@w0rm](https://github.com/w0rm)"""
        ]
    ]


idea : List Content
idea =
    [ [ image ( 400, 400 ) "assets/unsoundscapes.gif"
      , richtext "[unsoundscapes.com](http://unsoundscapes.com)"
      ]
        |> position ( 150, 120 )
    , [ image ( 400, 400 ) "assets/instagram.jpg"
      , richtext "100+ videos from concerts"
      ]
        |> position ( 700, 120 )
    ]


challenges : List Content
challenges =
    [ title "Challenges"
    , bullets
        [ bullet "Getting the data"
        , bullet "Playing the video"
        , bullet "Laying out the text"
          -- slug, set initial state to keep while video is loading, random video
        , bullet "Keeping location in sync"
          -- bash scripts, jq, fetching from Instagram limitation, using Elm reactor with custom index.html
        , bullet "Setting up Travis CI"
        ]
    ]


gettingTheData : List Content
gettingTheData =
    [ title "Getting the Data"
    , bullets
        [ bullet "Limitation of the Instagram API"
        , bulletLink "Writing decoders" "https://github.com/w0rm/elm-gigs/blob/master/Video.elm#L10"
        ]
    ]


playingTheVideo : List Content
playingTheVideo =
    [ title "Playing the Video"
    , bullets
        [ bulletLink "Using the video element" "https://github.com/w0rm/elm-gigs/blob/master/View.elm#L77"
        , bullet "Playing the video twice"
        , bullet "Errors in Safari and iOS"
        ]
    ]


layingOutTheText : List Content
layingOutTheText =
    [ title "Laying Out the Text"
    , bullets
        [ bulletLink "Rendering svg mask element" "https://github.com/w0rm/elm-gigs/blob/master/View.elm#L93"
        , bulletLink "Measuring the text" "https://github.com/w0rm/elm-gigs/blob/master/Clip.elm#L38"
        , bulletLink "Using ports" "https://github.com/w0rm/elm-gigs/blob/master/index.html#L25"
        ]
    ]


keepingLocationInSync : List Content
keepingLocationInSync =
    [ title "Keeping Location in Sync"
    , bullets
        [ bulletLink "Storing the initial slug" "https://github.com/w0rm/elm-gigs/blob/master/Model.elm#L9"
        , bulletLink "Playing the random video" "https://github.com/w0rm/elm-gigs/blob/master/Main.elm#L123"
        ]
    ]


settingUpTravisCI : List Content
settingUpTravisCI =
    [ title "Setting up Travis CI"
    , bullets
        [ bulletLink "Script to download new videos" "https://github.com/w0rm/elm-gigs/blob/master/download.sh"
        , bulletLink "Script to publish to GitHub pages" "https://github.com/w0rm/elm-gigs/blob/master/gh-pages.sh"
        , bulletLink "Epic build time improvement" "https://github.com/w0rm/elm-gigs/blob/master/.travis.yml#L13"
        ]
    ]


conclusion : List Content
conclusion =
    [ title "Conclusion"
    , bullets
        [ bullet "Elm is great"
        , bullet "Elm is not enough"
        , bullet "Learn useful things by doing useless projects"
        ]
    ]


main : Program Never (SliceShow.Model () ()) (SliceShow.Message ())
main =
    [ [ padded intro ]
    , [ shout "Idea" ]
    , [ padded idea ]
    , [ shout "Demo time!"
      , position ( 450, 500 ) [ richtext "[gigs.unsoundscapes.com](http://gigs.unsoundscapes.com#arcade-fire)" ]
      ]
    , [ padded challenges ]
    , [ padded gettingTheData ]
    , [ padded playingTheVideo ]
    , [ padded layingOutTheText ]
    , [ padded keepingLocationInSync ]
    , [ padded settingUpTravisCI ]
    , [ shout "Questions?" ]
    ]
        |> List.map (Slide.slide >> Slide.setDimensions ( 1280, 720 ))
        |> SliceShow.init
        |> SliceShow.show
