module Font.Glyph
    exposing
        ( Glyph
        , decode
        , empty
        )

import Json.Decode as Decode


type alias Glyph =
    { path : String -- Path in SVG path format (only supports M,C,L & Z)
    , advanceWidth : Float -- The distance between two successive pen positions
    , leftSideBearing : Float -- The horizontal distance from the current pen position to the glyph's left bbox edge
    }


empty : Glyph
empty =
    { path = ""
    , advanceWidth = 0
    , leftSideBearing = 0
    }


decode : Decode.Decoder Glyph
decode =
    Decode.map3 Glyph
        (Decode.field "path" Decode.string)
        (Decode.field "advanceWidth" Decode.float)
        (Decode.field "leftSideBearing" Decode.float)
