module Custom.BoxStack exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| The comparison scene, live: 5×5×5 = 125 one-meter wood boxes resting on a
plane — the exact setup measured against cannon-es in
`elm-physics-extra/comparison/`. Shown next to cannon's 60-second screenshot:
this side is not a screenshot, it's the engine running on the slide.

Same visual style as the comparison renders (light blue sky, dark floor) so
the live panel and the cannon photo read as the same scene. Steps at the
measured dt of 1/60.

-}

import Angle
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Direction3d
import Duration exposing (Duration)
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Mass
import Physics exposing (Body, WorldCoordinates, onEarth)
import Physics.Material as Material
import Pixels exposing (Pixels)
import Plane3d
import Point3d
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as SceneMaterial
import Timestep exposing (Timestep)


boxesPerDimension : number
boxesPerDimension =
    5


type alias Model =
    { prevBodies : List ( Int, Body )
    , bodies : List ( Int, Body )
    , contacts : Physics.Contacts Int
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
    { prevBodies = initialBodies
    , bodies = initialBodies
    , contacts = Physics.emptyContacts
    , dimensions = ( Pixels.int width, Pixels.int height )
    , timestep = Timestep.init { duration = Duration.seconds (1 / 60), maxSteps = 1 }
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update (Tick dt) model =
    ( Timestep.advance simulateStep dt model, Cmd.none )


simulateStep : Model -> Model
simulateStep model =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth | duration = Timestep.duration model.timestep, contacts = model.contacts }
                model.bodies
    in
    { model | prevBodies = model.bodies, bodies = newBodies, contacts = newContacts }


block3d : Block3d Meters coordinates
block3d =
    Block3d.centeredOn Frame3d.atOrigin
        ( Length.meters 1, Length.meters 1, Length.meters 1 )


initialBodies : List ( Int, Body )
initialBodies =
    let
        floorBody =
            Physics.plane Plane3d.xy Material.wood

        dimensions =
            List.map toFloat (List.range 0 (boxesPerDimension - 1))

        boxBody =
            Physics.block block3d Material.wood
                |> Physics.scaleMassTo (Mass.kilograms 5)

        boxes =
            List.indexedMap
                (\idx ( x, y, z ) ->
                    ( idx + 1
                    , boxBody
                        |> Physics.moveTo
                            (Point3d.meters
                                (x - (boxesPerDimension - 1) / 2)
                                (y - (boxesPerDimension - 1) / 2)
                                (z + 0.5)
                            )
                    )
                )
                (List.concatMap
                    (\x ->
                        List.concatMap
                            (\y -> List.map (\z -> ( x, y, z )) dimensions)
                            dimensions
                    )
                    dimensions
                )
    in
    ( 0, floorBody ) :: boxes


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 14 14 9
        , focalPoint = Point3d.meters 0 0 1.5
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 30)
        }


view : Model -> Html Msg
view { prevBodies, bodies, dimensions, timestep } =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -60)
            , shadows = True
            , camera = camera
            , dimensions = dimensions
            , background = Scene3d.backgroundColor Color.lightBlue
            , clipDepth = Length.meters 0.1
            , entities =
                floorEntity
                    :: List.map2 (boxEntity (Timestep.progress timestep)) prevBodies bodies
            }
        ]


boxEntity : Float -> ( Int, Body ) -> ( Int, Body ) -> Entity WorldCoordinates
boxEntity progress ( _, prev ) ( id, curr ) =
    if id == 0 then
        Scene3d.nothing

    else
        Scene3d.placeIn (Physics.interpolatedFrame progress prev curr) <|
            Scene3d.blockWithShadow
                (SceneMaterial.nonmetal { baseColor = Color.orange, roughness = 0.4 })
                block3d


floorEntity : Entity WorldCoordinates
floorEntity =
    Scene3d.quad (SceneMaterial.matte Color.darkCharcoal)
        (Point3d.meters -25 -25 0)
        (Point3d.meters -25 25 0)
        (Point3d.meters 25 25 0)
        (Point3d.meters 25 -25 0)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
