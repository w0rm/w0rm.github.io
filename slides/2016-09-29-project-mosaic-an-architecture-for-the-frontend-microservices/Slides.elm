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
    [ title "Project Mosaic — an Architecture for the Frontend Microservices"
    , position ( 800, 480 ) [ image ( 120, 120 ) "assets/zalando.jpg" ]
    , position ( 0, 250 ) [ image ( 1024, 200 ) "assets/mosaic-stripe.jpg" ]
    , position ( 110, 480 )
        [ richtext """Andrey Kuzmin [@unsoundscapes](https://twitter.com/unsoundscapes)"""
        , richtext """Arpad Ryszka [@arpad_ryszka](https://twitter.com/arpad_ryszka)"""
        ]
    ]


bulletslide : String -> List String -> Content Model Message
bulletslide text list =
    [ title text
    , list |> List.map bullet |> bullets
    ]
        |> padded


animatedBackground : Time -> String -> List Int -> Content Model Message
animatedBackground time imageName frames =
    frames
        |> List.map (\n -> "assets/" ++ imageName ++ toString n ++ ".jpg")
        |> Model.animatedImage time ( 1024, 640 )
        |> custom
        |> (\a -> position ( 0, 0 ) [ a ])


jimmy : Content Model Message
jimmy =
    Model.animatedHtml
        1000
        (\t ->
            img
                [ src "assets/jimmy.png"
                , width 147
                , height 319
                , style
                    [ ( "transform", "rotate(" ++ toString (90 * (t / 1000 - 1)) ++ "deg)" )
                    , ( "transform-origin", "100px 195px" )
                    , ( "position", "absolute" )
                    , ( "left", "800px" )
                    , ( "top", "320px" )
                    ]
                ]
                []
        )
        |> custom


pageTemplate : Content Model Message
pageTemplate =
    group
        [ [ image ( 308, 446 ) "assets/cart.png" ] |> position ( 80, 150 )
        , [ [ code "xml" """<html>
<head>
  <fragment src="https://base-assets...">
</head>
<body>
  <fragment src="https://tracking..."
            timeout="200">
  <fragment src="https://header...">
  <fragment src="https://cart..."
            fallback-src="...">
  <fragment src="https://reco..." async>
  <fragment src="https://footer..." async>
</body>
</html>""" ] |> scale 0.8 ] |> position ( 400, 160 )
        ]


progressiveRendering : Content Model Message
progressiveRendering =
    List.range 1 4
        |> List.map (\n -> "assets/progressive-" ++ toString n ++ ".png")
        |> Model.animatedImage 2000 ( 800, 450 )
        |> custom
        |> (\c -> position ( 100, 160 ) [ c ])
        |> hide


codeslide : String -> String -> String -> Content Model Message
codeslide name lang codeText =
    padded
        [ title name
        , code lang codeText
        ]


slides : List (Slide Model Message)
slides =
    [ [ padded intro ]
    , [ bulletslide "The Promise of Team Autonomy"
            ([ "processes"
             , "technology"
             , "deployment and operation"
             ]
                |> List.map (\a -> "teams decide on " ++ a)
            )
      , position ( 800, 480 ) [ image ( 120, 120 ) "assets/zalando.jpg" ]
      ]
    , [ bulletslide "The Reality of the Fashion Store aka Jimmy"
            [ "takes 8 mins to compile, 4 mins to start"
            , "has more than 100 active contributors since 2015"
            , "changes from one team may affect another"
            , "slow release cycle"
            , "legacy frontend technologies"
            ]
      , position ( 800, 320 ) [ image ( 147, 319 ) "assets/jimmy.png" ]
      ]
    , [ bulletslide "The Mission of The Taskforce"
            [ "enable team autonomy in the Fashion Store"
            , "identify the architecture and implement core components"
            , "support the transition"
            ]
      , position ( 800, 320 ) [ image ( 147, 319 ) "assets/jimmy.png" ]
      ]
    , [ bulletslide "The Mission of The Taskforce"
            [ "enable team autonomy in the Fashion Store"
            , "identify the architecture and implement core components"
            , "support the transition"
            , "put Jimmy to REST!"
            ]
      , jimmy
      ]
    , [ shout "What if we could have microservices on the frontend?" ]
    , [ bulletslide "Fragment"
            [ "independent web server"
            , "renders a part of the page"
            , "owns its JavaScript and CSS"
            , "needs to be composed"
            ]
      ]
    , [ bulletslide "Composition Requirements"
            [ "compose pre-rendered markup on the backend for SEO"
            , "ensure a fast time to first byte"
            , "prioritize the content above the fold"
            , "fault tolerance"
            , "enforce the same look and feel"
            ]
      ]
    , [ background "assets/tailor.jpg" [] ]
    , [ bulletslide "Tailor"
            [ "fetches the template, based on the request"
            , "parses the template for fragment placeholders"
            , "asynchronously calls all fragments"
            , "assembles fragment streams into a single output stream"
            , "sets response headers and streams the output"
            ]
      ]
    , [ padded [ title "Page Template", pageTemplate ] ]
    , [ padded [ title "Progressive Rendering", progressiveRendering ] ]
    , [ padded [ title "Time to First Byte", [ image ( 800, 450 ) "assets/ttfb.png" ] |> position ( 100, 160 ) ] ]
    , [ bulletslide "Fragment Attributes"
            [ "id — optional unique identifier"
            , "src — URL of the fragment"
            , "primary — denotes a fragment that sets the response code of the page"
            , "timeout — optional timeout of fragment in milliseconds"
            , "async — postpones the fragment until the end of body tag"
            , "fallback-src — URL of the fallback fragment in case of timeout/error"
            ]
      ]
    , [ codeslide "Frontend Composition: Pipe" "xml" """<script src=".../require-2.1.22.min.js"></script>
<script>
var Pipe=function(e,n){
  ...
}(window.document,window.performance);
_p613 = new Pipe(require);
</script>"""
      ]
    , [ codeslide "Frontend Composition: Fragment" "xml" """<link rel="stylesheet" href=".../client.css">
<script data-pipe>
_p613.start(2, "https://.../client.js")
</script>
...
<script data-pipe>
_p613.end(2, "https://.../client.js", "cart")
</script>"""
      ]
    , [ codeslide "Frontend Composition: Async Fragment" "xml" """<script data-pipe>_p613.placeholder(4)</script>
...
...
<script>_p613.loadCSS(".../client.css")</script>
<script data-pipe>
_p613.start(4, "https://.../client.js")
</script>
...
<script data-pipe>
_p613.end(4, "https://.../client.js", "footer")
</script>"""
      ]
    , [ shout "How to enforce the same look and feel?" ]
    , [ bulletslide "Base Assets Fragment"
            [ "ES6 & fetch polyfills"
            , "Normalize.css and {box-sizing: border-box;}"
            , "Defines AMD modules (React, UI Components, Translation, Event Bus)"
            ]
      ]
    , [ bulletslide "Composition Outcome"
            [ "SEO friendliness preserved by backend composition"
            , "Fast time to first byte"
            , "Ability to prioritize the content above the fold"
            , "Errored fragments will not be rendered"
            , "Look and feel enforced through shared dependencies"
            ]
      ]
    , [ shout "How to transition from the monolith?" ]
      -- Arpad’s Slides (17 in total)
    , [ bulletslide "Transition"
            [ "big bang switch impossible"
            , "step-by-step migration of feature sets"
            , "gradual ramp-up: measuring operation and business"
            ]
      ]
    , [ bulletslide "Other Infrastructure Duties"
            [ "combining old and new solutions"
            , "mapping the public web site to numerous internal services"
            ]
      ]
    , [ bulletslide "Skipper: an HTTP Router"
            [ "identifying routes"
            , "conditioning requests and responses"
            ]
      , position ( 650, 280 ) [ image ( 250, 330 ) "assets/skipper.png" ]
      ]
      -- , [ padded
      --       [ title "Like an MVC router but the controllers are microservices"
      --       , image (840, 303) "assets/postmvc.png"
      --       ]
      --   ]
    , [ shout "How does it work?" ]
    , [ codeslide "Routing Between Old and New" "elm" """/acme-shoes -> https://tailor.zalan.do

*           -> https://jimmy.zalan.do"""
      ]
    , [ codeslide "Gradual Ramp Up of Features" "elm" """30% of /acme-shoes -> https://tailor.zalan.do

*                  -> https://jimmy.zalan.do"""
      ]
    , [ codeslide "Combining Old and New" "elm" """30% of /acme-shoes
-> customer-cookie
-> https://tailor.zalan.do

*
-> customer-cookie
-> https://jimmy.zalan.do"""
      ]
    , [ codeslide "Mapping One to Many" "elm" """30% of /acme-shoes
-> customer-cookie
-> zalando-stuff
-> template-path
-> https://tailor.zalan.do

POST /search
-> zalando-stuff
-> https://search.zalan.do

*
-> customer-cookie
-> https://jimmy.zalan.do"""
      ]
    , [ codeslide "Reasoning About Routing" "elm" """30% of /acme-shoes
-> customer-cookie
-> zalando-stuff
-> template-path
-> https://tailor.zalan.do

POST /search
-> zalando-stuff
-> https://search.zalan.do

*
-> customer-cookie
-> https://jimmy.zalan.do"""
      ]
    , [ codeslide "Reasoning About Routing: eskip" "elm" """mosaicCatalog: Path("/acme-shoes") && Traffic(0.33)
  -> customerCookie()
  -> xalando()
  -> modPath(".*", "/catalog")
  -> "https://tailor.zalan.do";

mosaicApi: Path("/search") && Method("POST")
  -> xalando()
  -> "https://search.zalan.do";

// everything else goes this way
jimmyCatchall: *
  -> customerCookie()
  -> "https://jimmy.zalan.do";"""
      ]
    , [ bulletslide "Reasoning About Routing: eskip"
            [ "\"Skipper is a runtime for eskip\""
            , "self documenting"
            , "reviews"
            , "syntax check"
            ]
      ]
      --   , [ codeslide "Mapping the public web site to numerous internal services" "elm" """mosaicCatalog: Path("/acme-shoes") && Traffic(0.33)
      --   -> customerCookie()
      --   -> xalando()
      --   -> modPath(".*", "/catalog")
      --   -> "https://tailor.zalan.do";
      --
      -- mosaicApi: Path("/search") && Method("POST")
      --   -> xalando()
      --   -> "https://search.zalan.do";
      --
      -- jimmyCatchall: *
      --   -> customerCookie()
      --   -> "https://jimmy.zalan.do";"""
      --     ]
    , [ bulletslide "Scaling The Routing Table"
            [ "custom CMS pages and promotions: ~ 10k - 100k"
            , "teams interacting with the routing configuration: ~ 15 - 200?"
            , "continuously changing settings"
            ]
      ]
    , [ bulletslide "Configuration Without Downtime"
            [ "etcd (https://github.com/coreos/etcd)"
            , "awesome, but etcd doesn't know us"
            , "need to avoid stealing each other's routes"
            ]
      ]
    , [ bulletslide "Support Teamwork: Innkeeper"
            [ "organization specific rules for routing"
            , "OAuth2 based rights management"
            , "Rest API and supplementary tooling"
            ]
      , position ( 650, 280 ) [ image ( 230, 283 ) "assets/innkeeper.png" ]
      ]
    , [ bulletslide "Bonus: Other Skipper Use Cases"
            [ "authentication proxy"
            , "compression proxy"
            , "static file server"
            , "network throttling and diagnostics"
            ]
      ]
    , [ bulletslide "Outcome: a Flexible Router"
            [ "Open for Individual Creativity"
            , "freely composable predicates and filters"
            , "simple but powerful declarative language for route configuration (eskip)"
            , "custom logic through clear extension points (in Go)"
            , "on-the-fly reconfiguration"
            ]
      ]
    , [ shout "The Mosaic Architecture" ]
    , [ background "assets/architecture.png" [] ]
    , [ bulletslide "Recap On Team Autonomy"
            [ "teams decide on processes"
            , "teams decide on technology"
            , "teams decide on deployment and operation"
            ]
      , position ( 800, 480 ) [ image ( 120, 120 ) "assets/zalando.jpg" ]
      ]
    , [ padded
            [ title "Open Source & Links"
            , bullets <|
                List.map (\a -> linkBullet a a)
                    [ "https://www.mosaic9.org"
                    , "https://github.com/zalando/tailor"
                    , "https://github.com/zalando/skipper"
                    , "https://github.com/zalando/innkeeper"
                    , "https://tech.zalando.com"
                    ]
            , position ( 800, 480 ) [ image ( 120, 120 ) "assets/zalando.jpg" ]
            ]
      ]
    ]
        |> List.map ((::) orangeLine)
        |> List.map slide
