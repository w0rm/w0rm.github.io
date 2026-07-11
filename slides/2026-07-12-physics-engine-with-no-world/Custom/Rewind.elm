module Custom.Rewind exposing (Id(..), Model, Msg, Options, collide, constrain, initial, scene, subscriptions, update, view)

{-| Time travel: a wrecking ball on a chain swings into a pyramid of
crates and scatters them — then time reverses and the wreckage un-scatters
back into a pristine pyramid, and the loop repeats.

Every simulated state is pushed onto `history`. Rewinding is not a special
engine feature: it's walking that list backwards (`rewindStep` pops one
state; it runs twice per simulation step, so the rewind plays at 2×).

The chain is held by `constrain` (distance constraints between neighbors)
and excluded from collisions by `collide` — the ball does the smashing.

-}

import Angle
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Direction3d
import Duration exposing (Duration)
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Constraint exposing (Constraint)
import Physics.Material
import Physics.Shape
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Sphere3d
import Timestep exposing (Timestep)
import Vector3d


type Id
    = Floor
    | Backstop
    | Anchor
    | Link Int
    | Ball
    | Crate Int


type Phase
    = Play
    | HoldBeforeRewind Int
    | Rewind
    | HoldBeforePlay Int


type alias Model =
    { prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , history : List (List ( Id, Body ))
    , stepCount : Int
    , phase : Phase
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , timestep : Timestep
    }


type Msg
    = Tick Duration


type alias Options =
    { width : Int
    , height : Int
    }


initial : Options -> Model
initial { width, height } =
    { prevBodies = scene
    , bodies = scene
    , contacts = Physics.emptyContacts
    , history = []
    , stepCount = 0
    , phase = Play
    , dimensions = ( Pixels.int width, Pixels.int height )
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    }



-- BODIES


{-| Low enough that the chain and the pulled-back ball clear the slide
title; the chain length keeps the ball just off the floor at the bottom
of the swing.
-}
anchorPoint : Point3d Meters WorldCoordinates
anchorPoint =
    Point3d.meters 0.6 0 3


{-| Distance between chain neighbors (anchor → 6 links → ball).
-}
spacing : Length.Length
spacing =
    Length.meters 0.35


linkCount : Int
linkCount =
    6


{-| Pull-back angle of the taut chain at the start, from vertical.
-}
pullBack : Float
pullBack =
    degrees 60


{-| A point on the pulled-back chain, `distance` meters from the anchor.
-}
chainPoint : Float -> Point3d Meters WorldCoordinates
chainPoint distance =
    Point3d.translateBy
        (Vector3d.meters
            (-distance * sin pullBack)
            0
            (-distance * cos pullBack)
        )
        anchorPoint


ballRadius : Length.Length
ballRadius =
    Length.meters 0.35


crateSize : Float
crateSize =
    0.34


crateBlock : Block3d Meters BodyCoordinates
crateBlock =
    Block3d.from
        (Point3d.meters (-crateSize / 2) (-crateSize / 2) (-crateSize / 2))
        (Point3d.meters (crateSize / 2) (crateSize / 2) (crateSize / 2))


{-| Pyramid rows: 4, 3, 2, 1 crates, centered on x = 1 m.
-}
pyramid : List ( Id, Body )
pyramid =
    List.concatMap
        (\row ->
            List.map
                (\i ->
                    ( Crate (row * 10 + i)
                    , Physics.block crateBlock Physics.Material.wood
                        |> Physics.moveTo
                            (Point3d.meters
                                (1 + (toFloat i - toFloat (3 - row) / 2) * (crateSize + 0.01))
                                0
                                ((toFloat row + 0.5) * (crateSize + 0.01))
                            )
                    )
                )
                (List.range 0 (3 - row))
        )
        (List.range 0 3)


scene : List ( Id, Body )
scene =
    [ ( Floor, Physics.plane Plane3d.xy Physics.Material.wood )

    -- invisible: keeps scattered crates from flying out of frame
    , ( Backstop
      , Physics.plane
            (Plane3d.through (Point3d.meters 4.3 0 0) Direction3d.negativeX)
            Physics.Material.wood
      )
    , ( Anchor
      , Physics.static
            [ ( Physics.Shape.sphere (Sphere3d.atOrigin (Length.meters 0.09))
              , Physics.Material.steel
              )
            ]
            |> Physics.moveTo anchorPoint
      )
    , ( Ball
      , Physics.sphere (Sphere3d.atOrigin ballRadius) Physics.Material.steel
            |> Physics.moveTo (chainPoint (toFloat (linkCount + 1) * Length.inMeters spacing))
      )
    ]
        ++ List.map
            (\i ->
                ( Link i
                , Physics.sphere (Sphere3d.atOrigin (Length.meters 0.07)) Physics.Material.steel
                    |> Physics.moveTo (chainPoint (toFloat (i + 1) * Length.inMeters spacing))
                )
            )
            (List.range 0 (linkCount - 1))
        ++ pyramid


{-| The chain: each piece is linked to the next at a fixed distance.
-}
constrain : Id -> Maybe (Id -> List Constraint)
constrain id1 =
    case id1 of
        Anchor ->
            Just
                (\id2 ->
                    if id2 == Link 0 then
                        [ Physics.Constraint.distance spacing ]

                    else
                        []
                )

        Link i ->
            Just
                (\id2 ->
                    case id2 of
                        Link j ->
                            if j == i + 1 then
                                [ Physics.Constraint.distance spacing ]

                            else
                                []

                        Ball ->
                            if i == linkCount - 1 then
                                [ Physics.Constraint.distance spacing ]

                            else
                                []

                        _ ->
                            []
                )

        _ ->
            Nothing


{-| Chain links don't collide with anything — the constraints hold them,
and the ball does the smashing.
-}
collide : Id -> Id -> Bool
collide id1 id2 =
    not (isLink id1) && not (isLink id2)


isLink : Id -> Bool
isLink id =
    case id of
        Link _ ->
            True

        _ ->
            False



-- UPDATE


{-| How long the ball plays forward before time turns around: the swing,
the smash, and the crates settling.
-}
forwardSteps : Int
forwardSteps =
    520


holdSteps : Int
holdSteps =
    48


update : Msg -> Model -> ( Model, Cmd Msg )
update (Tick dt) model =
    ( Timestep.advance simulateStep dt model, Cmd.none )


simulateStep : Model -> Model
simulateStep model =
    case model.phase of
        Play ->
            let
                ( next, contacts ) =
                    Physics.simulate
                        { onEarth
                            | duration = Timestep.duration model.timestep
                            , constrain = constrain
                            , collide = collide
                            , contacts = model.contacts
                        }
                        model.bodies

                stepped =
                    { model
                        | prevBodies = model.bodies
                        , bodies = next
                        , contacts = contacts
                        , history = model.bodies :: model.history
                        , stepCount = model.stepCount + 1
                    }
            in
            if stepped.stepCount >= forwardSteps then
                { stepped | phase = HoldBeforeRewind holdSteps }

            else
                stepped

        HoldBeforeRewind n ->
            if n <= 0 then
                { model | phase = Rewind, prevBodies = model.bodies }

            else
                { model | phase = HoldBeforeRewind (n - 1), prevBodies = model.bodies }

        Rewind ->
            -- two steps back per simulation step: rewind at double speed
            rewindStep (rewindStep model)

        HoldBeforePlay n ->
            if n <= 0 then
                { model
                    | phase = Play
                    , prevBodies = model.bodies
                    , contacts = Physics.emptyContacts
                    , stepCount = 0
                    , history = []
                }

            else
                { model | phase = HoldBeforePlay (n - 1), prevBodies = model.bodies }


{-| Time travel, the whole of it: step back by popping the last state.
-}
rewindStep : Model -> Model
rewindStep model =
    case model.history of
        prev :: rest ->
            { model | prevBodies = model.bodies, bodies = prev, history = rest }

        [] ->
            { model | phase = HoldBeforePlay holdSteps, prevBodies = model.bodies }



-- VIEW


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 0.2 -8 2.25
        , focalPoint = Point3d.meters 0.2 0 1.65
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 35)
        }


view : Model -> Html Msg
view { prevBodies, bodies, dimensions, timestep, phase } =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -60)
            , shadows = False
            , camera = camera
            , dimensions = dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                List.map2 (bodyEntity timestep) prevBodies bodies
            }
        , Html.div
            [ Html.Attributes.style "position" "absolute"
            , Html.Attributes.style "right" "40px"

            -- baseline-aligned with the 48px slide title at y=40
            , Html.Attributes.style "top" "52px"
            , Html.Attributes.style "font" "bold 44px \"Helvetica Neue\", Arial, sans-serif"
            , Html.Attributes.style "color" "#2f6fed"
            ]
            [ Html.text (phaseLabel phase) ]
        ]


phaseLabel : Phase -> String
phaseLabel phase =
    case phase of
        Play ->
            "▶ 再生"

        Rewind ->
            "◀◀ 巻き戻し"

        HoldBeforeRewind _ ->
            "⏸"

        HoldBeforePlay _ ->
            "⏸"


woodTones : ( Color, Color )
woodTones =
    ( Color.rgb255 205 170 125, Color.rgb255 184 145 99 )


bodyEntity : Timestep -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity timestep ( _, prev ) ( id, curr ) =
    Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr) <|
        case id of
            Floor ->
                Scene3d.nothing

            Backstop ->
                Scene3d.nothing

            Anchor ->
                Scene3d.sphere
                    (Material.metal { baseColor = Color.rgb255 120 120 125, roughness = 0.4 })
                    (Sphere3d.atOrigin (Length.meters 0.09))

            Link _ ->
                Scene3d.sphere
                    (Material.metal { baseColor = Color.rgb255 233 235 216, roughness = 0.4 })
                    (Sphere3d.atOrigin (Length.meters 0.07))

            Ball ->
                Scene3d.sphere
                    (Material.metal { baseColor = Color.rgb255 150 155 165, roughness = 0.3 })
                    (Sphere3d.atOrigin ballRadius)

            Crate i ->
                Scene3d.block
                    (Material.nonmetal
                        { baseColor =
                            if modBy 2 i == 0 then
                                Tuple.first woodTones

                            else
                                Tuple.second woodTones
                        , roughness = 0.6
                        }
                    )
                    crateBlock


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
