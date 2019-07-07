module Slides exposing (slides)

import Custom exposing (Content, Slide)
import Font.Feature as Feature
import Formatting exposing (..)
import Html exposing (h1, text)
import Html.Attributes exposing (style)
import Math.Vector3 as Vec3 exposing (vec3)
import SliceShow.Content as Content
import SliceShow.Slide as Slide


intro : List Content
intro =
    [ Content.item
        (h1
            [ style
                [ ( "font", "130px/1.2 FiraSans-Light, sans-serif" )
                , ( "letter-spacing", "-3px" )
                , ( "margin", "30px 0 150px" )
                ]
            ]
            [ text "Rendering Text with WebGL" ]
        )
    , position ( 120, 500 ) [ image ( 110, 110 ) "assets/mogee.png" ]
    , position ( 250, 490 )
        [ scale 0.75
            [ richtext """Andrey Kuzmin

Twitter: [@unsoundscapes](https://twitter.com/unsoundscapes)

GitHub: [@w0rm](https://github.com/w0rm)"""
            ]
        ]
    , position ( 840, 500 ) [ image ( round (460 / 290 * 110), 110 ) "assets/soundcloud.png" ]
    ]


cssProperties : List Content
cssProperties =
    [ Content.item
        (Html.code
            [ style
                [ ( "font", "37px/1.3 FiraMono, monospace" )
                , ( "margin", "0 5px" )
                , ( "display", "block" )
                ]
            ]
            [ text "color direction font font-display font-family font-feature-settings font-kerning font-language-override font-size font-size-adjust font-smoothing font-stretch font-style font-synthesis font-variant font-variant-alternates font-variant-caps font-variant-east-asian font-variant-ligatures font-variant-numeric font-variant-position font-variation-settings font-weight hanging-punctuation hyphens letter-spacing line-break line-height line-height-step overflow-wrap tab-size text-align text-align-last text-combine-upright text-decoration text-decoration-color text-decoration-line text-decoration-style text-indent text-justify text-orientation text-rendering text-shadow text-size-adjust text-transform text-underline-position unicode-bidi white-space width word-break word-spacing word-wrap writing-mode" ]
        )
    ]


solvedProblem : List Content
solvedProblem =
    [ Content.item
        (Html.div
            [ style
                [ ( "font", "37px/1.3 FiraMono, monospace" )
                , ( "margin", "0 5px" )
                , ( "display", "block" )
                , ( "color", "#ccc" )
                ]
            ]
            [ text "color direction font font-display font-family font-feature-settings font-kerning font-language-override font-size font-size-adjust font-smoothing font-stretch font-style font-synthesis font-variant font-variant-alternates font-variant-caps font-variant-east-asian font-variant-ligatures font-variant-numeric font-variant-position font-variation-settings font-weight hanging-punctuation hyphens letter-spacing line-break line-height line-height-step overflow-wrap tab-size text-align text-align-last text-combine-upright text-decoration text-decoration-color text-decoration-line text-decoration-style text-indent text-justify text-orientation text-rendering text-shadow text-size-adjust text-transform text-underline-position unicode-bidi white-space width word-break word-spacing word-wrap writing-mode" ]
        )
    , position
        ( 250, 145 )
        [ imageLink ( 802, 430 ) "assets/solved-problems.png" "https://twitter.com/AbletonDev/status/902486487664615428" ]
    ]


fontAsCode : List Content
fontAsCode =
    [ position ( 105, 345 )
        [ Custom.pixelfont
            { text = "Font as Code"
            , color = vec3 1 1 1
            , pixelSize = 20
            , width = 1100
            , height = 200
            }
        ]
    ]


mogeeFont : List Content
mogeeFont =
    [ title "MogeeFont"
    , spacing 20
    , code "elm" """-- Prints the text
text :
  (Letter -> List a) -- print a glyph
  -> String          -- text to print
  -> List a          -- printed result


-- Base64 data: URI
spriteSrc : String
"""
    , position ( 920, 20 )
        [ Custom.pixelfont
            { text = "ABCDEFGH\nIJKLMNOP\nQRSTUVW\nXYZabcde\nfghijklmnop\nqrstuvwxy\nz0123456"
            , pixelSize = 9
            , color = vec3 0.7 0.7 0.7
            , width = 350
            , height = 700
            }
        ]
    ]


iverniFont : List Content
iverniFont =
    [ title "Iverni Typeface"
    , spacing 20
    , bullets
        [ bullet "Save in OpenType format"
        , bullet "Convert to JSON using opentype.js"
        , bullet "Decode into Elm"
        , bullet "Render with WebGL"
        ]
    , position ( 850, 15 )
        [ Custom.ivernifont
            { features = []
            , fontSize = 115
            , text = "ABCDEFGHIJ KLMNOPQR STUVWXYZab cdefghijklmno pqrstuvwxyz 0123456789"
            , lineHeight = 1
            , width = 430
            , height = 705
            , color = vec3 0.5 0.5 0.5
            }
        ]
    ]


mogeeFontUsage : List Content
mogeeFontUsage =
    [ position ( 0, 0 )
        [ Custom.pixelglyph
            { pixelSize = 52
            , width = 1280
            , height = 720
            }
        ]
    ]


mogeeFontUsage3d : List Content
mogeeFontUsage3d =
    [ position ( 0, 0 )
        [ Custom.cubicglyph
            { pixelSize = 52
            , width = 1280
            , height = 720
            }
        ]
    ]


outlineStep : Int -> List Content
outlineStep n =
    [ Custom.outlines { width = 1280, height = 720, step = n }
    , [ "Parse SVG path with elm/parser"
      , "Convert Bézier curves to line segments using ianmackenzie/elm-geometry"
      , "Find outlines and holes based on winding"
      , "Triangulate outlines with holes using ianmackenzie/elm-geometry"
      ]
        |> List.take (n - 1)
        |> List.map bullet
        |> Content.container
            (Html.ol
                [ style
                    [ ( "position", "absolute" )
                    , ( "left", "50%" )
                    , ( "top", "100px" )
                    , ( "margin", "0" )
                    , ( "right", "100px" )
                    ]
                ]
            )
    ]


gsub : List Content
gsub =
    [ title "OpenType Features: GSUB"
    , spacing 20
    , scale 0.9
        [ bullets
            [ bullet "Single"
            , bullet "Multiple"
            , bullet "Alternate"
            , bulletRed "Ligature"
            , bullet "Context"
            , bullet "Chaining Context"
            , bullet "Extension Substitution"
            , bullet "Reverse chaining context single"
            ]
        , richtext "[See OpenType specification](https://docs.microsoft.com/en-us/typography/opentype/spec/gsub#gsub-header)"
        ]
    , position ( 850, 450 ) [ richtext "Ligatures" ]
    , position ( 750, 250 )
        [ Custom.ivernifont
            { features = []
            , fontSize = 200
            , text = "tt ="
            , lineHeight = 1
            , width = 430
            , height = 200
            , color = vec3 0.7 0.7 0.7
            }
        ]
    , position ( 995, 250 )
        [ Custom.ivernifont
            { features = [ Feature.Liga ]
            , fontSize = 200
            , text = "tt"
            , lineHeight = 1
            , width = 100
            , height = 200
            , color = vec3 1 0 0
            }
        ]
    ]


gpos : List Content
gpos =
    [ title "OpenType Features: GPOS"
    , spacing 20
    , scale 0.9
        [ bullets
            [ bullet "Single adjustment"
            , bulletRed "Pair adjustment"
            , bullet "Cursive attachment"
            , bullet "MarkToBase attachment"
            , bullet "MarkToLigature attachment"
            , bullet "MarkToMark attachment"
            , bullet "Context positioning"
            , bullet "Chained Context positioning"
            , bullet "Extension positioning"
            ]
        , richtext "[See OpenType specification](https://docs.microsoft.com/en-us/typography/opentype/spec/gpos#gpos-header)"
        ]
    , position ( 870, 500 ) [ richtext "Kerning" ]
    , position ( 750, 250 )
        [ Custom.ivernifont
            { features = []
            , fontSize = 200
            , text = "Ty ="
            , lineHeight = 1
            , width = 430
            , height = 200
            , color = vec3 0.7 0.7 0.7
            }
        ]
    , Content.item
        (Html.div
            [ style
                [ ( "height", "260px" )
                , ( "border-right", "2px black dashed" )
                , ( "position", "absolute" )
                , ( "left", "810px" )
                , ( "top", "220px" )
                ]
            ]
            []
        )
    , position ( 992, 250 )
        [ Custom.ivernifont
            { features = [ Feature.Kern ]
            , fontSize = 200
            , text = "Ty"
            , lineHeight = 1
            , width = 150
            , height = 200
            , color = vec3 1 0 0
            }
        ]
    , Content.item
        (Html.div
            [ style
                [ ( "height", "260px" )
                , ( "border-right", "2px black dashed" )
                , ( "position", "absolute" )
                , ( "left", "1052px" )
                , ( "top", "220px" )
                ]
            ]
            []
        )
    ]


lineBreaking : List Content
lineBreaking =
    [ position ( 0, 0 )
        [ Custom.typewriter
            { width = 1280
            , height = 720
            , fontSize = 150
            , start = 11
            , text = "Line breaking is the process of breaking a section of text into lines such that it will fit in the available display area."
            }
        ]
    ]


wordWrapping : List Content
wordWrapping =
    [ title "Word Wrapping"
    , code "elm" """style :
    { font : Font
    , fontSize : Float
    , lineHeight : Float
    , width : Float
    , features : List Feature
    } -> Style glyph

text :
    (Glyph -> glyph)  -- evaluates a glyph
    -> Style glyph    -- styles the text
    -> String         -- text to print
    -> ( List (GlyphInfo glyph), Style glyph )"""
    ]


wordwappingStep : Int -> Content
wordwappingStep step =
    Custom.wordwapping
        { step = step
        , width = 1280
        , height = 720
        , lineWidth = 500
        , fontSize = 200
        , text = "Word wrapping"
        }


conclusions : List Content
conclusions =
    [ title "Conclusions"
    , bullets
        [ bullet "Elm is a great research tool" |> Content.hide
        , bullet "Text rendering is super complex" |> Content.hide
        , bullet "Typographic experiments are fun" |> Content.hide
        ]
    ]


thankYou : List Content
thankYou =
    [ position ( 0, 0 )
        [ Custom.zoom
            { width = 1280
            , height = 720
            , text = "That’s all. Thank you!"
            , fontSize = 195
            }
        ]
    ]


slides : List Slide
slides =
    [ [ padded intro ]
    , [ background "assets/nadya-kuzmina.jpg"
            [ position ( 160, 50 )
                [ Content.item (Html.h1 [ style [ ( "width", "100px" ) ] ] [ text "Nadya Kuzmina" ])
                , richtext """type design

[@nadyakzmn](https://twitter.com/nadyakzmn)"""
                ]
            ]
      ]
    , cssProperties
    , solvedProblem
    , [ dark fontAsCode ]
    , [ dark mogeeFont ]
    , [ dark mogeeFontUsage ]
    , [ dark mogeeFontUsage3d ]
    , [ Custom.outline { width = 1280, height = 720, fontSize = 220, left = 100, top = 330, text = "Font as Data" } ]
    , [ padded iverniFont ]
    , [ Custom.metrics { width = 1280, height = 720, fontSize = 500 } ]
    , [ background "assets/letterpress.jpg"
            [ position ( 990, 600 )
                [ imageLink ( 216, 68 )
                    "assets/miat.png"
                    "http://www.miat.gent.be/"
                ]
            ]
      ]
    , [ Custom.sort { width = 1280, height = 720 } ]
    , outlineStep 1
    , outlineStep 2
    , outlineStep 3
    , outlineStep 4
    , outlineStep 5
    , [ padded gsub ]
    , [ padded gpos ]
    , lineBreaking
    , [ padded wordWrapping ]
    , [ wordwappingStep 3 ]
    , [ wordwappingStep 4 ]
    , [ wordwappingStep 5 ]
    , [ wordwappingStep 6 ]
    , [ wordwappingStep 7 ]
    , [ wordwappingStep 8 ]
    , [ wordwappingStep 9 ]
    , [ wordwappingStep 16 ]
    , [ padded conclusions ]
    , thankYou
    ]
        -- make 16:9 slides
        |> List.map (Slide.slide >> Slide.setDimensions ( 1280, 720 ))
