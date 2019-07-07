module Font.Font
    exposing
        ( Font
        , decode
        , empty
        , getGlyph
        )

import Array.Hamt as Array exposing (Array)
import Char
import Dict exposing (Dict)
import Font.Glyph as Glyph exposing (Glyph)
import Font.Gpos as Gpos exposing (Gpos)
import Font.Ligatures as Ligatures exposing (Ligature)
import Json.Decode as Decode


type alias Font =
    { glyphs : Array Glyph -- an array of glyphs
    , cmap : Dict Int Int -- a mapping of character codes to a glyph index
    , ligatures : List Ligature
    , gpos : Gpos
    , ascender : Float
    , descender : Float
    , unitsPerEm : Float
    }


getGlyph : Font -> Char -> Maybe Glyph
getGlyph { glyphs, cmap } char =
    Dict.get (Char.toCode char) cmap
        |> Maybe.andThen (\index -> Array.get index glyphs)


empty : Font
empty =
    { glyphs = Array.empty
    , cmap = Dict.empty
    , ligatures = []
    , gpos = Gpos.empty
    , ascender = 0
    , descender = 0
    , unitsPerEm = 0
    }


decode : Decode.Decoder Font
decode =
    Decode.map7 Font
        (Decode.map Array.fromList (Decode.field "glyphs" (Decode.list Glyph.decode)))
        (Decode.map (List.filterMap (\( a, index ) -> Maybe.map (\code -> ( code, index )) (String.toInt a |> Result.toMaybe)) >> Dict.fromList) (Decode.field "cmap" (Decode.keyValuePairs Decode.int)))
        (Decode.field "ligatures" (Decode.list Ligatures.decode))
        (Decode.field "gpos" Gpos.decode)
        (Decode.field "ascender" Decode.float)
        (Decode.field "descender" Decode.float)
        (Decode.field "unitsPerEm" Decode.float)
