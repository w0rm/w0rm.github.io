module Font.Feature exposing (Feature(..), FeatureTable, decode, empty, get)

import Array.Hamt as Array exposing (Array)
import Json.Decode as Decode


type Feature
    = Liga
    | Kern


type alias FeatureInfo =
    { tag : Feature
    , lookupIndices : List Int
    }


type alias FeatureTable lookup =
    { features : List FeatureInfo
    , lookups : Array lookup
    }


empty : FeatureTable lookup
empty =
    { features = []
    , lookups = Array.empty
    }


get : List Feature -> (lookup -> Maybe a) -> FeatureTable lookup -> Maybe a
get tags getLookup { features, lookups } =
    features
        |> lookupIndex tags
        |> List.filterMap (\i -> Array.get i lookups)
        |> findInLookups getLookup


findInLookups : (lookup -> Maybe a) -> List lookup -> Maybe a
findInLookups getLookup lookups =
    case lookups of
        [] ->
            Nothing

        lookup :: rest ->
            case getLookup lookup of
                Just value ->
                    Just value

                Nothing ->
                    findInLookups getLookup rest


lookupIndex : List Feature -> List FeatureInfo -> List Int
lookupIndex tags list =
    case list of
        [] ->
            []

        { tag, lookupIndices } :: rest ->
            if List.member tag tags then
                lookupIndices

            else
                lookupIndex tags rest



-- DECODING


decode : Decode.Decoder lookup -> Decode.Decoder (FeatureTable lookup)
decode lookupDecoder =
    Decode.map2
        (\features lookups ->
            FeatureTable features (Array.fromList lookups)
        )
        (Decode.field "features" (Decode.list decodeFeatureInfo))
        (Decode.field "lookups" (Decode.list lookupDecoder))


decodeFeatureInfo : Decode.Decoder FeatureInfo
decodeFeatureInfo =
    Decode.map2 FeatureInfo
        (Decode.field "tag" decodeFeature)
        (Decode.field "lookupIndices" (Decode.list Decode.int))


decodeFeature : Decode.Decoder Feature
decodeFeature =
    Decode.andThen
        (\feature ->
            case feature of
                "liga" ->
                    Decode.succeed Liga

                "kern" ->
                    Decode.succeed Kern

                feature ->
                    Decode.fail ("Unsupported feature " ++ feature)
        )
        Decode.string
