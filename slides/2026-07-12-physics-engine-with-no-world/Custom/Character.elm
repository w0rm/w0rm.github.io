module Custom.Character exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| A character controller, modelled on cannon-es's PointerLockControlsCannon:
a capsule body (axis +Z) with mild friction and additive velocity from input.
Rotation is locked with [Physics.lock](Physics#lock) so the capsule stays
upright and slides instead of toppling.

Walk around with the arrow keys, jump with space, climb the stairs and bump
into the boxes.

-}

import Angle
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Cylinder3d exposing (Cylinder3d)
import Density
import Direction3d
import Duration exposing (Duration)
import Force exposing (Force)
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Json.Decode exposing (Decoder)
import Length exposing (Length, Meters)
import Mass exposing (Mass)
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Lock as Lock
import Physics.Material as Material exposing (Material)
import Physics.Shape as Shape
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity, Rate)
import Scene3d exposing (Entity)
import Scene3d.Material as Scene3dMaterial
import Speed exposing (Speed)
import Sphere3d
import Timestep exposing (Timestep)
import Vector3d


type Id
    = Floor
    | Player
    | Stairs
    | Box Int


type alias Model =
    { prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , timestep : Timestep
    , forwardInput : Float
    , rightInput : Float
    , grounded : Bool
    , jumpRequested : Bool
    }


type Key
    = KeyForward
    | KeyBack
    | KeyLeft
    | KeyRight
    | KeyJump


type Msg
    = Tick Duration
    | Resize Int Int
    | KeyDown Key
    | KeyUp Key


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
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    , forwardInput = 0
    , rightInput = 0
    , grounded = False
    , jumpRequested = False
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( stepModel msg model, Cmd.none )


stepModel : Msg -> Model -> Model
stepModel msg model =
    case msg of
        Tick dt ->
            Timestep.advance simulateStep dt model

        Resize width height ->
            { model | dimensions = ( Pixels.int width, Pixels.int height ) }

        KeyDown KeyForward ->
            { model | forwardInput = 1 }

        KeyDown KeyBack ->
            { model | forwardInput = -1 }

        KeyDown KeyLeft ->
            { model | rightInput = -1 }

        KeyDown KeyRight ->
            { model | rightInput = 1 }

        KeyDown KeyJump ->
            { model | jumpRequested = True }

        KeyUp KeyForward ->
            { model | forwardInput = release 1 model.forwardInput }

        KeyUp KeyBack ->
            { model | forwardInput = release -1 model.forwardInput }

        KeyUp KeyLeft ->
            { model | rightInput = release -1 model.rightInput }

        KeyUp KeyRight ->
            { model | rightInput = release 1 model.rightInput }

        KeyUp KeyJump ->
            model


{-| Zero an axis only when the released key is the one currently holding it,
so releasing the opposite key doesn't cancel an active direction.
-}
release : Float -> Float -> Float
release direction current =
    if current == direction then
        0

    else
        current


simulateStep : Model -> Model
simulateStep model =
    let
        wantJump =
            model.jumpRequested && model.grounded

        duration =
            Timestep.duration model.timestep

        drivenBodies =
            if model.grounded || wantJump then
                List.map
                    (\( id, body ) ->
                        if id == Player then
                            let
                                driven =
                                    if model.grounded then
                                        drivePlayer duration model.rightInput model.forwardInput body

                                    else
                                        body
                            in
                            if wantJump then
                                ( id, jumpPlayer driven )

                            else
                                ( id, driven )

                        else
                            ( id, body )
                    )
                    model.bodies

            else
                model.bodies

        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth | duration = duration, contacts = model.contacts }
                drivenBodies
    in
    { model
        | prevBodies = model.bodies
        , bodies = newBodies
        , contacts = newContacts
        , jumpRequested = False
        , grounded =
            if wantJump then
                False

            else
                playerGrounded newBodies newContacts
    }


drivePlayer : Duration -> Float -> Float -> Body -> Body
drivePlayer duration right forward body =
    let
        vel =
            Physics.velocity body

        rawForceX =
            Quantity.at driveGain (Quantity.minus (Vector3d.xComponent vel) (Quantity.multiplyBy right walkSpeed))

        rawForceY =
            Quantity.at driveGain (Quantity.minus (Vector3d.yComponent vel) (Quantity.multiplyBy forward walkSpeed))

        magnitude =
            Quantity.sqrt (Quantity.plus (Quantity.squared rawForceX) (Quantity.squared rawForceY))

        scale =
            if Quantity.greaterThan maxDriveForce magnitude then
                Quantity.ratio maxDriveForce magnitude

            else
                1

        impulse =
            Vector3d.xyz
                (Quantity.times duration (Quantity.multiplyBy scale rawForceX))
                (Quantity.times duration (Quantity.multiplyBy scale rawForceY))
                Quantity.zero
    in
    Physics.applyImpulse impulse (Physics.originPoint body) body


jumpPlayer : Body -> Body
jumpPlayer body =
    let
        duration =
            Duration.seconds 1

        jumpForce =
            Quantity.times (Quantity.per duration jumpSpeed) playerMass

        impulse =
            Vector3d.withLength (Quantity.times duration jumpForce) Direction3d.z
    in
    Physics.applyImpulse impulse (Physics.originPoint body) body


playerGrounded : List ( Id, Body ) -> Physics.Contacts Id -> Bool
playerGrounded bodies contacts =
    case List.filter (\( id, _ ) -> id == Player) bodies of
        [] ->
            False

        ( _, player ) :: _ ->
            let
                threshold =
                    Point3d.zCoordinate (Physics.originPoint player)
                        |> Quantity.minus playerCylinderHalfLength
                        |> Quantity.minus (Length.meters 0.1)
            in
            Physics.contactPoints (\a _ -> a == Player) contacts
                |> List.concatMap (\( _, _, pts ) -> pts)
                |> List.any
                    (\pt -> Point3d.zCoordinate pt |> Quantity.lessThan threshold)



-- BODIES


playerMass : Mass
playerMass =
    Mass.kilograms 5


walkSpeed : Speed
walkSpeed =
    Speed.metersPerSecond 4


maxDriveForce : Force
maxDriveForce =
    Force.newtons 250


driveGain : Quantity Float (Rate Force.Newtons Speed.MetersPerSecond)
driveGain =
    Quantity.rate (Force.newtons 50) (Speed.metersPerSecond 1)


jumpSpeed : Speed
jumpSpeed =
    Speed.metersPerSecond 4


playerRadius : Length
playerRadius =
    Length.meters 0.3


playerCylinderHalfLength : Length
playerCylinderHalfLength =
    Length.meters 0.4


playerCapsule : Cylinder3d Meters BodyCoordinates
playerCapsule =
    Cylinder3d.centeredOn Point3d.origin
        Direction3d.z
        { radius = playerRadius
        , length = Quantity.twice playerCylinderHalfLength
        }


playerMaterial : Material Material.Dense
playerMaterial =
    Material.dense
        { density = Density.kilogramsPerCubicMeter 700
        , friction = 0.2
        , bounciness = 0
        }


stairMaterial : Material Material.Dense
stairMaterial =
    Material.dense
        { density = Density.kilogramsPerCubicMeter 700
        , friction = 0.02
        , bounciness = 0
        }


boxMaterial : Material Material.Dense
boxMaterial =
    Material.dense
        { density = Density.kilogramsPerCubicMeter 700
        , friction = 0.4
        , bounciness = 0
        }


boxBlock : Block3d Meters BodyCoordinates
boxBlock =
    Block3d.centeredOn Frame3d.atOrigin
        ( Length.meters 0.5, Length.meters 0.5, Length.meters 0.8 )


stairBlocks : List (Block3d Meters BodyCoordinates)
stairBlocks =
    let
        stepHeight =
            Length.meters 0.2

        stepDepth =
            Length.meters 0.5

        width =
            Length.meters 1.5

        topPlatformDepth =
            Length.meters 1.2

        numSteps =
            4

        halfWidth =
            Quantity.half width
    in
    List.map
        (\level ->
            let
                yMin =
                    Quantity.multiplyBy (toFloat level) stepDepth

                yMax =
                    Quantity.plus yMin
                        (if level == numSteps then
                            topPlatformDepth

                         else
                            stepDepth
                        )

                zMax =
                    Quantity.multiplyBy (toFloat (level + 1)) stepHeight
            in
            Block3d.from
                (Point3d.xyz (Quantity.negate halfWidth) yMin Quantity.zero)
                (Point3d.xyz halfWidth yMax zMax)
        )
        (List.range 0 numSteps)


boxPositions : List ( Float, Float )
boxPositions =
    [ ( -3, -2 )
    , ( -3, 0 )
    , ( -3, 2 )
    , ( -4, 1 )
    , ( 3, -2 )
    , ( 3, 0 )
    , ( 3, 2 )
    , ( 4, 1 )
    ]


initialBodies : List ( Id, Body )
initialBodies =
    let
        floorBody =
            Physics.plane Plane3d.xy Material.wood

        player =
            Physics.capsule playerCapsule playerMaterial
                |> Physics.scaleMassTo playerMass
                |> Physics.moveTo
                    (Point3d.xyz Quantity.zero
                        (Length.meters -4)
                        (Quantity.plus playerCylinderHalfLength playerRadius)
                    )
                |> Physics.lock Lock.allRotation

        stairsBody =
            Physics.static
                (List.map (\b -> ( Shape.block b, stairMaterial )) stairBlocks)
                |> Physics.moveTo (Point3d.meters 0 1 0)

        boxAt ( x, y ) =
            Physics.block boxBlock boxMaterial
                |> Physics.scaleMassTo (Mass.kilograms 5)
                |> Physics.moveTo (Point3d.meters x y 0.4)

        boxes =
            List.indexedMap (\idx pos -> ( Box idx, boxAt pos )) boxPositions
    in
    ( Floor, floorBody )
        :: ( Player, player )
        :: ( Stairs, stairsBody )
        :: boxes



-- VIEW


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
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                List.map2 (bodyEntity timestep) prevBodies bodies
            }
        ]


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 0 -12 8
        , focalPoint = Point3d.meters 0 0 0.7
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 30)
        }


bodyEntity : Timestep -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity timestep ( _, prev ) ( id, curr ) =
    Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr) <|
        case id of
            Floor ->
                Scene3d.quad (Scene3dMaterial.matte Color.darkCharcoal)
                    (Point3d.meters -15 -15 0)
                    (Point3d.meters -15 15 0)
                    (Point3d.meters 15 15 0)
                    (Point3d.meters 15 -15 0)

            Player ->
                let
                    body =
                        Scene3dMaterial.nonmetal
                            { baseColor = Color.lightBlue, roughness = 0.4 }
                in
                Scene3d.group
                    [ Scene3d.cylinderWithShadow body playerCapsule
                    , Scene3d.sphereWithShadow body
                        (Sphere3d.atPoint
                            (Point3d.xyz Quantity.zero Quantity.zero playerCylinderHalfLength)
                            playerRadius
                        )
                    , Scene3d.sphereWithShadow body
                        (Sphere3d.atPoint
                            (Point3d.xyz Quantity.zero Quantity.zero (Quantity.negate playerCylinderHalfLength))
                            playerRadius
                        )
                    ]

            Stairs ->
                Scene3d.group
                    (List.map
                        (Scene3d.blockWithShadow
                            (Scene3dMaterial.nonmetal { baseColor = Color.lightGrey, roughness = 0.6 })
                        )
                        stairBlocks
                    )

            Box _ ->
                Scene3d.blockWithShadow
                    (Scene3dMaterial.nonmetal { baseColor = Color.orange, roughness = 0.25 })
                    boxBlock



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
        , Browser.Events.onKeyDown (keyDecoder KeyDown)
        , Browser.Events.onKeyUp (keyDecoder KeyUp)
        ]


keyDecoder : (Key -> Msg) -> Decoder Msg
keyDecoder toMsg =
    Json.Decode.field "key" Json.Decode.string
        |> Json.Decode.andThen
            (\key ->
                case String.toLower key of
                    "w" ->
                        Json.Decode.succeed (toMsg KeyForward)

                    "s" ->
                        Json.Decode.succeed (toMsg KeyBack)

                    "a" ->
                        Json.Decode.succeed (toMsg KeyLeft)

                    "d" ->
                        Json.Decode.succeed (toMsg KeyRight)

                    " " ->
                        Json.Decode.succeed (toMsg KeyJump)

                    _ ->
                        Json.Decode.fail "ignored key"
            )
