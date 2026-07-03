module Custom.RaycastCar exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| A drivable raycast-vehicle demo for the slide.

Drive with WASD (W/S accelerate, A/D steer), Space to brake. The rendering
toggles every ~2.5 s between the textured jeep mesh and its green convex
collision hull. The ground is not drawn; a few wireframe crates sit in front of
the car as see-through obstacles. The camera is fixed — the car drives across
the screen.

Built on the current List-based elm-physics API: `RaycastCar.Car.simulate` +
`RaycastCar.Jeep` (the same modules as the `examples/src/RaycastCar.elm` demo).

-}

import Angle
import Axis3d
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Cone3d
import Cylinder3d
import Direction3d
import Duration exposing (Duration)
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Json.Decode
import Length exposing (Meters)
import Mass
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Material
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import RaycastCar.Car as Car exposing (CarSettings, Wheel)
import RaycastCar.Jeep as Jeep exposing (Jeep)
import Scene3d exposing (Entity)
import Scene3d.Material
import Scene3d.Mesh
import Task
import Timestep exposing (Timestep)
import Vector3d


type Id
    = Crate
    | Floor
    | Car (List (Wheel Id))


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , jeep : Maybe Jeep
    , speeding : Float
    , steering : Float
    , braking : Bool
    , timestep : Timestep
    , elapsed : Float
    , started : Bool
    }


type Msg
    = Tick Duration
    | KeyDown Command
    | KeyUp Command
    | JeepLoaded (Result String Jeep)


type Command
    = Speed Float
    | Steer Float
    | Brake


type alias Options =
    { width : Int, height : Int }


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.int width, Pixels.int height )
    , prevBodies = initialBodies
    , bodies = initialBodies
    , contacts = Physics.emptyContacts
    , jeep = Nothing
    , speeding = 0
    , steering = 0
    , braking = False
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    , elapsed = 0
    , started = False
    }



-- BODIES


initialBodies : List ( Id, Body )
initialBodies =
    ( Floor, Physics.plane Plane3d.xy Physics.Material.wood )
        :: List.map crate
            [ Point3d.meters 1 -11 0.5
            , Point3d.meters 0 -11 0.5
            , Point3d.meters -1 -11 0.5
            , Point3d.meters 0.5 -11 1.5
            , Point3d.meters -0.5 -11 1.5
            , Point3d.meters 0 -11 2.5
            ]


crateBlock : Block3d Meters BodyCoordinates
crateBlock =
    Block3d.centeredOn Frame3d.atOrigin
        ( Length.meters 1, Length.meters 1, Length.meters 1 )


crate : Point3d Meters WorldCoordinates -> ( Id, Body )
crate position =
    ( Crate
    , Physics.block crateBlock Physics.Material.wood
        |> Physics.scaleMassTo (Mass.kilograms 30)
        |> Physics.moveTo position
    )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick dt ->
            let
                stepped =
                    Timestep.advance simulateStep dt model

                withElapsed =
                    { stepped | elapsed = model.elapsed + Duration.inMilliseconds dt }
            in
            if not model.started then
                ( { withElapsed | started = True }
                , Jeep.load { texture = "Jeep.png", mesh = "Jeep.obj.txt" }
                    |> Task.attempt JeepLoaded
                )

            else
                ( withElapsed, Cmd.none )

        JeepLoaded (Ok jeep) ->
            let
                carEntry =
                    ( Car (Jeep.wheels jeep)
                    , Physics.dynamic jeep.collider
                        |> Physics.scaleMassTo (Mass.kilograms 4000)
                        |> Physics.moveTo (Point3d.meters 0 0 3)
                    )
            in
            ( { model
                | jeep = Just jeep
                , prevBodies = carEntry :: model.prevBodies
                , bodies = carEntry :: model.bodies
              }
            , Cmd.none
            )

        JeepLoaded (Err _) ->
            ( model, Cmd.none )

        KeyDown (Steer k) ->
            ( { model | steering = k }, Cmd.none )

        KeyDown (Speed k) ->
            ( { model | speeding = k }, Cmd.none )

        KeyDown Brake ->
            ( { model | braking = True }, Cmd.none )

        KeyUp (Steer k) ->
            ( { model | steering = release k model.steering }, Cmd.none )

        KeyUp (Speed k) ->
            ( { model | speeding = release k model.speeding }, Cmd.none )

        KeyUp Brake ->
            ( { model | braking = False }, Cmd.none )


release : Float -> Float -> Float
release k current =
    if k == current then
        0

    else
        current


simulateStep : Model -> Model
simulateStep model =
    case model.jeep of
        Just loadedJeep ->
            let
                d =
                    Timestep.duration model.timestep

                ( newBodies, newContacts ) =
                    Physics.simulate
                        { onEarth | duration = d, contacts = model.contacts }
                        (simulateCar model loadedJeep d)
            in
            { model | prevBodies = model.bodies, bodies = newBodies, contacts = newContacts }

        Nothing ->
            model


simulateCar : Model -> Jeep -> Duration -> List ( Id, Body )
simulateCar model jeep duration =
    let
        notACar ( id, _ ) =
            case id of
                Car _ ->
                    False

                _ ->
                    True
    in
    List.map
        (\(( bodyId, body ) as passThrough) ->
            case bodyId of
                Car wheels ->
                    let
                        ( newBody, newWheels ) =
                            Car.simulate
                                { duration = duration
                                , bodiesWithoutCar = List.filter notACar model.bodies
                                , speeding = model.speeding
                                , steering = model.steering
                                , braking = model.braking
                                , carSettings = Jeep.settings jeep
                                }
                                wheels
                                body
                    in
                    ( Car newWheels, newBody )

                _ ->
                    passThrough
        )
        model.bodies



-- VIEW


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters -26 24 20
        , focalPoint = Point3d.meters 0 -6 0
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 18)
        }


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees -15) (Angle.degrees -45)
            , shadows = False
            , camera = camera
            , dimensions = model.dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                case model.jeep of
                    Just jeep ->
                        List.map2 (bodyEntity jeep (showCollider model.elapsed) model.timestep)
                            model.prevBodies
                            model.bodies

                    Nothing ->
                        []
            }
        ]


showCollider : Float -> Bool
showCollider elapsed =
    (floor (elapsed / 2500) |> modBy 2) == 1


crateMesh : Scene3d.Mesh.Plain BodyCoordinates
crateMesh =
    Scene3d.Mesh.lineSegments (Block3d.edges crateBlock)


crateEntity : Entity BodyCoordinates
crateEntity =
    Scene3d.mesh (Scene3d.Material.color (Color.rgb255 120 120 120)) crateMesh


colliderMaterial : Scene3d.Material.Material BodyCoordinates { a | normals : () }
colliderMaterial =
    Scene3d.Material.nonmetal { baseColor = Color.rgb255 70 200 120, roughness = 0.5 }


arrowMaterial : Scene3d.Material.Material BodyCoordinates { a | normals : () }
arrowMaterial =
    Scene3d.Material.nonmetal { baseColor = Color.rgb255 47 111 237, roughness = 0.4 }


wheelArrow : CarSettings -> Length.Length -> Wheel Id -> Entity BodyCoordinates
wheelArrow settings wheelRadius wheel =
    let
        start =
            wheel.chassisConnectionPoint

        dir =
            settings.downDirection

        coneLength =
            Quantity.multiplyBy 0.4 wheelRadius

        shaftLength =
            Quantity.minus coneLength (Quantity.plus wheel.suspensionLength wheelRadius)

        shaftEnd =
            start |> Point3d.translateIn dir shaftLength
    in
    Scene3d.group
        [ Scene3d.cylinder arrowMaterial
            (Cylinder3d.startingAt start dir { radius = Quantity.multiplyBy 0.09 wheelRadius, length = shaftLength })
        , Scene3d.cone arrowMaterial
            (Cone3d.startingAt shaftEnd dir { radius = Quantity.multiplyBy 0.22 wheelRadius, length = coneLength })
        ]


bodyEntity : Jeep -> Bool -> Timestep -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity jeep showColl timestep ( _, prev ) ( id, curr ) =
    Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr) <|
        case id of
            Floor ->
                Scene3d.nothing

            Crate ->
                crateEntity

            Car wheels ->
                if showColl then
                    Scene3d.group
                        (Scene3d.mesh colliderMaterial jeep.colliderMesh
                            :: List.map (wheelArrow (Jeep.settings jeep) jeep.wheelRadius) wheels
                        )

                else
                    Scene3d.group
                        (Scene3d.mesh jeep.material jeep.chassis
                            :: List.map (wheelEntity (Jeep.settings jeep) jeep) wheels
                        )


wheelEntity : CarSettings -> Jeep -> Wheel Id -> Entity BodyCoordinates
wheelEntity settings jeep wheel =
    let
        axisDirection =
            Axis3d.direction wheel.axis

        applyMirror =
            if Quantity.greaterThan Quantity.zero (Direction3d.angleFrom settings.rightDirection axisDirection) then
                identity

            else
                Frame3d.mirrorAcross Plane3d.yz

        wheelPosition =
            wheel.chassisConnectionPoint
                |> Point3d.translateBy (Vector3d.withLength wheel.suspensionLength settings.downDirection)

        wheelFrame =
            Frame3d.atOrigin
                |> applyMirror
                |> Frame3d.rotateAround (Axis3d.through Point3d.origin (Direction3d.reverse settings.rightDirection)) wheel.rotation
                |> Frame3d.rotateAround (Axis3d.through Point3d.origin settings.downDirection) wheel.steering
                |> Frame3d.moveTo wheelPosition
    in
    Scene3d.mesh jeep.material jeep.wheel
        |> Scene3d.placeIn wheelFrame



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
        , Browser.Events.onKeyDown (keyDecoder KeyDown)
        , Browser.Events.onKeyUp (keyDecoder KeyUp)
        ]


keyDecoder : (Command -> Msg) -> Json.Decode.Decoder Msg
keyDecoder toMsg =
    Json.Decode.andThen
        (\key ->
            case String.toLower key of
                "w" ->
                    Json.Decode.succeed (toMsg (Speed 1))

                "s" ->
                    Json.Decode.succeed (toMsg (Speed -1))

                "a" ->
                    Json.Decode.succeed (toMsg (Steer -1))

                "d" ->
                    Json.Decode.succeed (toMsg (Steer 1))

                " " ->
                    Json.Decode.succeed (toMsg Brake)

                _ ->
                    Json.Decode.fail "ignored key"
        )
        (Json.Decode.field "key" Json.Decode.string)
