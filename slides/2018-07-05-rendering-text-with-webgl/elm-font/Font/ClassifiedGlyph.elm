module Font.ClassifiedGlyph
    exposing
        ( Class(..)
        , ClassifiedGlyph
        , fromString
        )

import Char
import Dict exposing (Dict)


type Class
    = Space
    | Newline
    | Other


type alias ClassifiedGlyph =
    { class : Class
    , index : Int
    }


fromString : Dict Int Int -> String -> List ClassifiedGlyph
fromString cmap string =
    List.map
        (\char ->
            Dict.get (Char.toCode char) cmap
                |> Maybe.withDefault 0
                -- TODO: use "glyph not found" glyph but not for new line?
                |> ClassifiedGlyph (classify char)
        )
        (String.toList string)


classify : Char -> Class
classify char =
    case char of
        ' ' ->
            Space

        '\t' ->
            Space

        '\n' ->
            Newline

        _ ->
            Other
