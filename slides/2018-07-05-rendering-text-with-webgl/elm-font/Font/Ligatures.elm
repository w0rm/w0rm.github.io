{- TODO: use GSUB table directly instead -}


module Font.Ligatures
    exposing
        ( Ligature
        , decode
        , substitute
        )

import Font.ClassifiedGlyph exposing (Class(..), ClassifiedGlyph)
import Json.Decode as Decode


type alias Ligature =
    { sub : List Int
    , by : Int
    }


substitute : List Ligature -> List ClassifiedGlyph -> List ClassifiedGlyph
substitute ligatures text =
    substituteHelp ligatures text []


substituteHelp : List Ligature -> List ClassifiedGlyph -> List ClassifiedGlyph -> List ClassifiedGlyph
substituteHelp ligatures text result =
    case text of
        [] ->
            List.reverse result

        glyph :: rest ->
            case findLigature ligatures text of
                Just ligature ->
                    substituteHelp ligatures
                        (List.drop (List.length ligature.sub) text)
                        ({ index = ligature.by, class = Other } :: result)

                Nothing ->
                    substituteHelp ligatures rest (glyph :: result)


findLigature : List Ligature -> List ClassifiedGlyph -> Maybe Ligature
findLigature ligatures text =
    case ligatures of
        ligature :: rest ->
            let
                ligatureSize =
                    List.length ligature.sub

                takeFromText =
                    List.take ligatureSize text
            in
            if List.map .index takeFromText == ligature.sub then
                Just ligature

            else
                findLigature rest text

        [] ->
            Nothing


decode : Decode.Decoder Ligature
decode =
    Decode.map2 Ligature
        (Decode.field "sub" (Decode.list Decode.int))
        (Decode.field "by" Decode.int)
