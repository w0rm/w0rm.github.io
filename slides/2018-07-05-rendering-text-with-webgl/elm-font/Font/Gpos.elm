module Font.Gpos
    exposing
        ( Gpos
        , decode
        , empty
        , get
        )

import Array.Hamt as Array exposing (Array)
import Font.ClassifiedGlyph exposing (ClassifiedGlyph)
import Font.Feature as Feature exposing (Feature, FeatureTable)
import Json.Decode as Decode


empty : Gpos
empty =
    Feature.empty


type alias Gpos =
    FeatureTable GposLookup


type GposLookup
    = PairAdjustment (List PairAdjustmentSubtable) -- 2 Adjust position of a pair of glyphs. Kerning is an example of pair adjustment.
      -- 1   SingleAdjustment  -- Adjust position of a single glyph
      -- 3   CursiveAttachment  -- Attach cursive glyphs
      -- 4   MarkToBaseAttachment  -- Attach a combining mark to a base glyph
      -- 5   MarkToLigatureAttachment  -- Attach a combining mark to a ligature
      -- 6   MarkToMarkAttachment  -- Attach a combining mark to another mark
      -- 7   ContextPositioning  -- Position one or more glyphs in context
      -- 8   ChainedContextPositioning  -- Position one or more glyphs in chained context
      -- 9   ExtensionPositioning  -- Extension mechanism for other positionings
      -- 10+ Reserved  -- For future use (set to zero)
    | Unsupported


type PairAdjustmentSubtable
    = PairPosFormat1
        { coverage : Coverage
        , pairSets : Array (List PairPosFormat1Pair)
        }
    | PairPosFormat2
        { coverage : Coverage
        , classDef1 : ClassDef
        , classDef2 : ClassDef
        , classRecords : Array (Array Float)
        }


type alias PairPosFormat1Pair =
    { secondGlyph : Int
    , xAdvance : Float
    }


type ClassDef
    = ClassDefFormat1 { startGlyph : Int, classes : Array Int }
    | ClassDefFormat2 (List ClassDefRange)


type alias ClassDefRange =
    { start : Int
    , end : Int
    , classId : Int
    }


{-| get x offset for two indices,
currently only supports horizontal kerning
-}
get : List Feature -> Gpos -> ClassifiedGlyph -> ClassifiedGlyph -> Maybe Float
get features gpos left right =
    Feature.get
        features
        (getGpos left.index right.index)
        gpos


getGpos : Int -> Int -> GposLookup -> Maybe Float
getGpos leftIndex rightIndex gposLookup =
    case gposLookup of
        PairAdjustment pairAdjustmentSubtables ->
            getPairAdjustment
                pairAdjustmentSubtables
                leftIndex
                rightIndex

        Unsupported ->
            Nothing


getPairAdjustment : List PairAdjustmentSubtable -> Int -> Int -> Maybe Float
getPairAdjustment pairAdjustmentSubtables leftIndex rightIndex =
    case pairAdjustmentSubtables of
        (PairPosFormat1 { coverage, pairSets }) :: rest ->
            case
                getCoverageIndex coverage leftIndex
                    |> Maybe.andThen (\covIndex -> Array.get covIndex pairSets)
                    |> Maybe.andThen (\pairsPositions -> findInPairsPositions pairsPositions rightIndex)
            of
                Just xAdvance ->
                    Just xAdvance

                Nothing ->
                    getPairAdjustment rest leftIndex rightIndex

        (PairPosFormat2 { coverage, classDef1, classDef2, classRecords }) :: rest ->
            if getCoverageIndex coverage leftIndex == Nothing then
                getPairAdjustment rest leftIndex rightIndex

            else
                let
                    leftClass =
                        getGlyphClass classDef1 leftIndex

                    rightClass =
                        getGlyphClass classDef2 rightIndex

                    classRecords_ =
                        Maybe.map Array.toList (Array.get leftClass classRecords)
                            |> Maybe.withDefault []
                in
                classRecords
                    |> Array.get leftClass
                    |> Maybe.andThen (Array.get rightClass)

        [] ->
            Nothing


findInPairsPositions : List { secondGlyph : Int, xAdvance : Float } -> Int -> Maybe Float
findInPairsPositions pairsPositions rightIndex =
    case pairsPositions of
        { secondGlyph, xAdvance } :: morePairs ->
            if secondGlyph == rightIndex then
                Just xAdvance

            else
                findInPairsPositions morePairs rightIndex

        [] ->
            Nothing


type Coverage
    = CoverageList (List Int) -- 1 a list of individual glyph indices in the glyph set.
    | CoverageRanges (List CoverageRangeRecord) -- 2 ranges of consecutive indices


type alias CoverageRangeRecord =
    { start : Int --first glyph ID in the range
    , end : Int -- last glyph ID in the range
    , index : Int -- coverage Index of first glyph ID in range
    }


getGlyphClass : ClassDef -> Int -> Int
getGlyphClass classDef glyphIndex =
    case classDef of
        ClassDefFormat1 { startGlyph, classes } ->
            Array.get (glyphIndex - startGlyph) classes
                |> Maybe.withDefault 0

        ClassDefFormat2 classDefRanges ->
            searchClassDefRangeHelp classDefRanges glyphIndex
                |> Maybe.withDefault 0


searchClassDefRangeHelp : List ClassDefRange -> Int -> Maybe Int
searchClassDefRangeHelp list glyphIndex =
    case list of
        [] ->
            Nothing

        range :: rest ->
            if range.start <= glyphIndex && range.end >= glyphIndex then
                Just range.classId

            else
                searchClassDefRangeHelp rest glyphIndex


getCoverageIndex : Coverage -> Int -> Maybe Int
getCoverageIndex coverage glyphIndex =
    case coverage of
        CoverageList list ->
            searchIndexHelp list glyphIndex 0

        CoverageRanges ranges ->
            searchRangeHelp ranges glyphIndex 0


searchIndexHelp : List Int -> Int -> Int -> Maybe Int
searchIndexHelp list glyphIndex currentIndex =
    case list of
        [] ->
            Nothing

        el :: rest ->
            if el == glyphIndex then
                Just currentIndex

            else
                searchIndexHelp rest glyphIndex (currentIndex + 1)


searchRangeHelp : List CoverageRangeRecord -> Int -> Int -> Maybe Int
searchRangeHelp list glyphIndex currentIndex =
    case list of
        [] ->
            Nothing

        range :: rest ->
            if range.start >= glyphIndex && range.end <= glyphIndex then
                Just (range.index + glyphIndex - range.start)

            else
                searchRangeHelp rest glyphIndex (currentIndex + 1)



-- DECODING


decode : Decode.Decoder Gpos
decode =
    Feature.decode decodeGposLookup


decodeGposLookup : Decode.Decoder GposLookup
decodeGposLookup =
    Decode.andThen
        (\lookupType ->
            case lookupType of
                2 ->
                    Decode.map
                        PairAdjustment
                        (Decode.field
                            "subtables"
                            (Decode.list
                                decodePairAdjustmentSubtable
                            )
                        )

                _ ->
                    Decode.succeed Unsupported
        )
        (Decode.field "lookupType" Decode.int)


decodePairAdjustmentSubtable : Decode.Decoder PairAdjustmentSubtable
decodePairAdjustmentSubtable =
    Decode.oneOf
        [ decodePairPosFormat2
        , decodePairPosFormat1
        ]


decodePairPosFormat1 : Decode.Decoder PairAdjustmentSubtable
decodePairPosFormat1 =
    Decode.map PairPosFormat1
        (Decode.map2
            (\coverage pairSets ->
                { coverage = coverage
                , pairSets = Array.fromList pairSets
                }
            )
            (Decode.field "coverage" decodeCoverage)
            (Decode.field "pairSets" (Decode.list (Decode.list decodePairPosFormat1Pair)))
        )


decodePairPosFormat2 : Decode.Decoder PairAdjustmentSubtable
decodePairPosFormat2 =
    Decode.map4
        (\coverage classDef1 classDef2 classRecords ->
            PairPosFormat2
                { coverage = coverage
                , classDef1 = classDef1
                , classDef2 = classDef2
                , classRecords = Array.fromList classRecords
                }
        )
        (Decode.field "coverage" decodeCoverage)
        (Decode.field "classDef1" decodeClassDef)
        (Decode.field "classDef2" decodeClassDef)
        (Decode.field "classRecords" (Decode.list (Decode.map Array.fromList (Decode.list decodeXAdvance))))


decodeXAdvance : Decode.Decoder Float
decodeXAdvance =
    Decode.at [ "value1", "xAdvance" ] Decode.float


decodeClassDef : Decode.Decoder ClassDef
decodeClassDef =
    Decode.oneOf
        [ Decode.map2
            (\startGlyph classes ->
                ClassDefFormat1
                    { startGlyph = startGlyph
                    , classes = Array.fromList classes
                    }
            )
            (Decode.field "startGlyph" Decode.int)
            (Decode.field "classes" (Decode.list Decode.int))
        , Decode.map ClassDefFormat2
            (Decode.field "ranges" (Decode.list decodeClassDefRange))
        ]


decodeClassDefRange : Decode.Decoder ClassDefRange
decodeClassDefRange =
    Decode.map3 ClassDefRange
        (Decode.field "start" Decode.int)
        (Decode.field "end" Decode.int)
        (Decode.field "classId" Decode.int)


decodeCoverage : Decode.Decoder Coverage
decodeCoverage =
    Decode.oneOf
        [ Decode.map CoverageList
            (Decode.field "glyphs" (Decode.list Decode.int))
        , Decode.map CoverageRanges
            (Decode.field "ranges" (Decode.list decodeCoverageRangeRecord))
        ]


decodeCoverageRangeRecord : Decode.Decoder CoverageRangeRecord
decodeCoverageRangeRecord =
    Decode.map3 CoverageRangeRecord
        (Decode.field "start" Decode.int)
        (Decode.field "end" Decode.int)
        (Decode.field "index" Decode.int)


decodePairPosFormat1Pair : Decode.Decoder PairPosFormat1Pair
decodePairPosFormat1Pair =
    Decode.map2 PairPosFormat1Pair
        (Decode.field "secondGlyph" Decode.int)
        decodeXAdvance
