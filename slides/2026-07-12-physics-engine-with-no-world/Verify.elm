port module Verify exposing (main)

{-| Scratch headless verification of the Act II demo physics (headless
Chrome screenshots can't drive `onAnimationFrameDelta`). Runs the actual
demo scenes for a fixed number of steps and prints the outcomes:

    elm make Verify.elm --output=/tmp/verify.js
    node -e "require('/tmp/verify.js').Elm.Verify.init().ports.emit.subscribe(s => console.log(s))"

-}

import Custom.Rewind as Rewind
import Custom.Seesaw as Seesaw
import Custom.ShapeLab as ShapeLab
import Custom.Xray as Xray
import Duration
import Mass
import Physics exposing (onEarth)
import Point3d


port emit : String -> Cmd msg


main : Program () () ()
main =
    Platform.worker
        { init = \_ -> ( (), emit report )
        , update = \_ _ -> ( (), Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


dt : Duration.Duration
dt =
    Duration.seconds (1 / 120)


steps : Int -> Physics.Config id -> List ( id, Physics.Body ) -> List ( id, Physics.Body )
steps n config bodies =
    List.foldl
        (\_ ( bs, contacts ) ->
            Physics.simulate { config | contacts = contacts } bs
        )
        ( bodies, Physics.emptyContacts )
        (List.range 1 n)
        |> Tuple.first


position : id -> List ( id, Physics.Body ) -> { x : Float, y : Float, z : Float }
position target bodies =
    bodies
        |> List.filterMap
            (\( i, b ) ->
                if i == target then
                    Just (Point3d.toMeters (Physics.originPoint b))

                else
                    Nothing
            )
        |> List.head
        |> Maybe.withDefault { x = 0 / 0, y = 0 / 0, z = 0 / 0 }


f2 : Float -> String
f2 v =
    String.fromFloat (toFloat (round (v * 100)) / 100)


xyz : { x : Float, y : Float, z : Float } -> String
xyz p =
    "(" ++ f2 p.x ++ ", " ++ f2 p.y ++ ", " ++ f2 p.z ++ ")"


report : String
report =
    String.join "\n" (seesawReport ++ shapeLabReport ++ rewindReport)


seesawReport : List String
seesawReport =
    let
        final =
            steps 720 { onEarth | duration = dt, constrain = Seesaw.constrain } Seesaw.scene

        massOf body =
            Physics.mass body
                |> Maybe.map (Mass.inKilograms >> f2)
                |> Maybe.withDefault "?"

        ellipsoidRatio =
            sqrt (Xray.maxInvInertia Seesaw.hollowCrate / Xray.maxInvInertia Seesaw.solidCrate)
    in
    [ "== Seesaw after 6 s =="
    , "solid crate:  mass " ++ massOf Seesaw.solidCrate ++ " kg, pos " ++ xyz (position Seesaw.SolidCrate final)
    , "hollow crate: mass " ++ massOf Seesaw.hollowCrate ++ " kg, pos " ++ xyz (position Seesaw.HollowCrate final)
    , "hollow/solid ellipsoid size ratio: " ++ f2 ellipsoidRatio
    ]


shapeLabReport : List String
shapeLabReport =
    let
        final =
            steps 500 { onEarth | duration = dt } ShapeLab.dropScene
    in
    [ "== ShapeLab drop after 4.2 s =="
    , "snowman: " ++ xyz (position ShapeLab.Snowman final)
    , "crate:   " ++ xyz (position ShapeLab.Crate final)
    ]


rewindReport : List String
rewindReport =
    let
        config =
            { onEarth
                | duration = dt
                , constrain = Rewind.constrain
                , collide = Rewind.collide
            }

        mid =
            steps 150 config Rewind.scene

        final =
            steps 520 config Rewind.scene

        crates bodies =
            List.filterMap
                (\( i, b ) ->
                    case i of
                        Rewind.Crate _ ->
                            Just (Point3d.toMeters (Physics.originPoint b))

                        _ ->
                            Nothing
                )
                bodies

        initialCrates =
            crates Rewind.scene

        finalCrates =
            crates final

        displaced =
            List.map2 (\a b -> sqrt ((a.x - b.x) ^ 2 + (a.y - b.y) ^ 2 + (a.z - b.z) ^ 2))
                initialCrates
                finalCrates
                |> List.filter (\d -> d > 0.2)
                |> List.length

        maxX =
            List.maximum (List.map .x finalCrates) |> Maybe.withDefault (0 / 0)

        minX =
            List.minimum (List.map .x finalCrates) |> Maybe.withDefault (0 / 0)

        maxZ =
            List.maximum (List.map .z finalCrates) |> Maybe.withDefault (0 / 0)
    in
    [ "== Rewind (wrecking ball) =="
    , "ball at 1.25 s: " ++ xyz (position Rewind.Ball mid)
    , "ball at 4.33 s: " ++ xyz (position Rewind.Ball final)
    , "crates displaced > 0.2 m: " ++ String.fromInt displaced ++ " of " ++ String.fromInt (List.length finalCrates)
    , "crate x range: " ++ f2 minX ++ " .. " ++ f2 maxX ++ ", max z: " ++ f2 maxZ
    ]
