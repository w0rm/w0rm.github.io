module Custom.CraneClaw exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| Crane claw arcade game.

Use left/right arrows to move the claw,
press Space to lower and grab!

The entire claw (hub + fingers) is a single kinematic body — its position
is set to the current anchor and its velocity is set so the engine
integrates it to the next anchor over one simulation step. Ducks gripped
between the fingers feel that velocity at the contact and ride along
through friction.

-}

import Angle
import Array
import Axis3d
import Block3d exposing (Block3d)
import BoundingBox3d
import Browser.Events
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Cylinder3d
import Direction3d
import Formatting exposing (font)
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Html.Events.Extra.Pointer as PointerEvents
import Http
import Json.Decode
import Length exposing (Meters)
import Mass
import Obj.Decode
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Material
import Physics.Shape as Shape exposing (Shape)
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import RaycastCar.Jeep as Jeep exposing (Jeep)
import Scene3d
import Scene3d.Material exposing (Texture)
import Scene3d.Mesh exposing (Shadow, Textured)
import Speed
import Sphere3d
import Task
import TriangularMesh
import Vector3d exposing (Vector3d)
import WebGL.Texture



-- CONSTANTS


armLength : Length.Length
armLength =
    Length.meters 2.0


anchorRestZ : Length.Length
anchorRestZ =
    Length.meters 7.0


anchorGrabZ : Length.Length
anchorGrabZ =
    Length.meters 2.0


moveSpeed : Length.Length
moveSpeed =
    Length.meters 0.08


dropSpeed : Length.Length
dropSpeed =
    Length.meters 0.04


boxWidth : Length.Length
boxWidth =
    Length.meters 5.0


boxDepth : Length.Length
boxDepth =
    Length.meters 5.0


boxHeight : Length.Length
boxHeight =
    Length.meters 3.0


wallThickness : Length.Length
wallThickness =
    Length.meters 0.5


fingerUpperHalfH : Length.Length
fingerUpperHalfH =
    Length.meters 0.6


fingerLowerHalfH : Length.Length
fingerLowerHalfH =
    Length.meters 0.5


fingerThickness : Length.Length
fingerThickness =
    Length.meters 0.3


hubSize : Length.Length
hubSize =
    Length.meters 0.5


hubHalfH : Length.Length
hubHalfH =
    Length.meters 0.2


fingerR : Length.Length
fingerR =
    Quantity.half hubSize |> Quantity.plus fingerThickness


outerWidth : Length.Length
outerWidth =
    boxWidth |> Quantity.plus (Quantity.twice wallThickness)


outerDepth : Length.Length
outerDepth =
    boxDepth |> Quantity.plus (Quantity.twice wallThickness)


halfWall : Length.Length
halfWall =
    Quantity.half wallThickness


wallZ : Length.Length
wallZ =
    Quantity.half boxHeight |> Quantity.plus wallThickness



-- BOX GEOMETRY


type BoxPart
    = BoxBottom
    | BoxSideWall
    | BoxBackWall
    | BoxFrontWall


{-| Physics blocks for the box (full wall thickness for collision).
Body origin is at the center of the box on the floor.
-}
boxShapes : List (Block3d Meters BodyCoordinates)
boxShapes =
    let
        bottom =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.along Axis3d.z halfWall))
                ( outerWidth, outerDepth, wallThickness )

        sideWall x =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.xyz x Quantity.zero wallZ))
                ( wallThickness, outerDepth, boxHeight )

        sideWallX =
            Quantity.half boxWidth |> Quantity.plus halfWall

        backWall =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.xyz Quantity.zero (Quantity.half boxDepth |> Quantity.plus halfWall) wallZ))
                ( outerWidth, wallThickness, boxHeight )

        frontWall =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.xyz Quantity.zero (Quantity.negate (Quantity.half boxDepth |> Quantity.plus halfWall)) wallZ))
                ( outerWidth, wallThickness, boxHeight )
    in
    [ bottom
    , sideWall (Quantity.negate sideWallX)
    , sideWall sideWallX
    , backWall
    , frontWall
    ]


{-| Thinner rendering blocks for the box walls (outer half only).
-}
boxRenderParts : List ( BoxPart, Block3d Meters BodyCoordinates )
boxRenderParts =
    let
        wallOffset =
            wallThickness |> Quantity.divideBy 4

        bottom =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.along Axis3d.z halfWall))
                ( outerWidth, outerDepth, wallThickness )

        sideWall x =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.xyz x Quantity.zero wallZ))
                ( halfWall, outerDepth, boxHeight )

        backWall y =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.xyz Quantity.zero y wallZ))
                ( outerWidth, halfWall, boxHeight )

        frontWall y =
            Block3d.centeredOn
                (Frame3d.atPoint (Point3d.xyz Quantity.zero y wallZ))
                ( boxWidth |> Quantity.plus wallThickness, halfWall, boxHeight )

        halfBox w =
            Quantity.half w |> Quantity.plus halfWall
    in
    [ ( BoxBottom, bottom )
    , ( BoxSideWall, sideWall (Quantity.negate (halfBox boxWidth |> Quantity.plus wallOffset)) )
    , ( BoxSideWall, sideWall (halfBox boxWidth |> Quantity.plus wallOffset) )
    , ( BoxBackWall, backWall (halfBox boxDepth |> Quantity.plus wallOffset) )
    , ( BoxFrontWall, frontWall (Quantity.negate (halfBox boxDepth |> Quantity.plus wallOffset)) )
    ]



-- CLAW GEOMETRY


type ClawPart
    = HubPart
    | UpperPart
    | LowerPart


hubBlock : Block3d Meters BodyCoordinates
hubBlock =
    Block3d.centeredOn Frame3d.atOrigin
        ( hubSize
        , hubSize
        , Quantity.twice hubHalfH
        )


{-| Blocks for a single finger pair at the given angle.
The finger extends radially outward from the hub center.
-}
fingerParts : Angle.Angle -> Float -> List ( ClawPart, Block3d Meters BodyCoordinates )
fingerParts fingerAngle openness =
    let
        radialDir =
            Direction3d.xy fingerAngle

        -- Upper finger tilt: interpolate between closed (0.3) and open (0.8)
        upperTilt =
            0.3 + openness * 0.5

        hingePoint =
            Point3d.origin
                |> Point3d.translateIn radialDir fingerR
                |> Point3d.translateIn Direction3d.negativeZ hubHalfH

        upperDirVec =
            Vector3d.plus
                (Direction3d.toVector radialDir |> Vector3d.scaleBy upperTilt)
                (Direction3d.toVector Direction3d.negativeZ)

        upperDir =
            Vector3d.direction upperDirVec
                |> Maybe.withDefault Direction3d.negativeZ

        upperCenter =
            hingePoint |> Point3d.translateIn upperDir fingerUpperHalfH

        upperBlock =
            Block3d.centeredOn
                (Frame3d.withZDirection upperDir upperCenter)
                ( fingerThickness, fingerThickness, Quantity.twice fingerUpperHalfH )

        upperTip =
            hingePoint |> Point3d.translateIn upperDir (Quantity.twice fingerUpperHalfH)

        -- Extra inward tilt when closing: 0 when open, -1.5 when closed
        extraTilt =
            (1 - openness) * -1.5

        lowerDirVec =
            Vector3d.plus
                (Direction3d.toVector upperDir)
                (Direction3d.toVector radialDir |> Vector3d.scaleBy extraTilt)

        lowerDir =
            Vector3d.direction lowerDirVec
                |> Maybe.withDefault Direction3d.negativeZ

        lowerCenter =
            upperTip |> Point3d.translateIn lowerDir fingerLowerHalfH

        lowerBlock =
            Block3d.centeredOn
                (Frame3d.withZDirection lowerDir lowerCenter)
                ( fingerThickness, fingerThickness, Quantity.twice fingerLowerHalfH )
    in
    [ ( UpperPart, upperBlock ), ( LowerPart, lowerBlock ) ]


{-| All claw blocks: hub + 3 finger pairs at 120° intervals.
Blocks are in body coordinates centered on the hub.
-}
clawParts : Float -> List ( ClawPart, Block3d Meters BodyCoordinates )
clawParts openness =
    ( HubPart, hubBlock )
        :: fingerParts (Angle.degrees 0) openness
        ++ fingerParts (Angle.degrees 120) openness
        ++ fingerParts (Angle.degrees 240) openness


{-| Bounding box of the claw sampled at fully open and fully closed,
used to compute movement limits.
-}
clawBounds : BoundingBox3d.BoundingBox3d Meters BodyCoordinates
clawBounds =
    BoundingBox3d.aggregateOf Block3d.boundingBox
        hubBlock
        (List.map Tuple.second (clawParts 0 ++ clawParts 1))


{-| Clamp the anchor XY so the claw stays within the box render walls.
The thin walls' inner face is at boxHalf + wallThickness/2.
-}
clampAnchor : Point3d Meters WorldCoordinates -> Point3d Meters WorldCoordinates
clampAnchor point =
    let
        boxInnerX =
            Quantity.half boxWidth |> Quantity.plus (Quantity.half wallThickness)

        boxInnerY =
            Quantity.half boxDepth |> Quantity.plus (Quantity.half wallThickness)

        clampX =
            Point3d.xCoordinate point
                |> Quantity.clamp
                    (Quantity.negate (boxInnerX |> Quantity.plus (BoundingBox3d.minX clawBounds)))
                    (boxInnerX |> Quantity.minus (BoundingBox3d.maxX clawBounds))

        clampY =
            Point3d.yCoordinate point
                |> Quantity.clamp
                    (Quantity.negate (boxInnerY |> Quantity.plus (BoundingBox3d.minY clawBounds)))
                    (boxInnerY |> Quantity.minus (BoundingBox3d.maxY clawBounds))
    in
    Point3d.xyz clampX clampY (Point3d.zCoordinate point)



-- TYPES


type Id
    = Floor
    | Box
    | Duck
    | Cactus
    | JeepCar
    | Claw


type Phase
    = Idle
    | Descending
    | Gripping


type alias Model =
    { bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , duckMesh : Maybe { mesh : Textured BodyCoordinates, shadow : Shadow BodyCoordinates }
    , duckMaterial : Maybe (Scene3d.Material.Textured BodyCoordinates)
    , duckShape : Maybe Shape
    , cactusMesh : Maybe { mesh : Textured BodyCoordinates, shadow : Shadow BodyCoordinates }
    , cactusMaterial : Maybe (Scene3d.Material.Textured BodyCoordinates)
    , cactusShapes : Maybe (List Shape)
    , jeep : Maybe Jeep
    , spawned : Bool
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , anchor : Point3d Meters WorldCoordinates
    , movingLeft : Bool
    , movingRight : Bool
    , movingForward : Bool
    , movingBack : Bool
    , phase : Phase
    , clawOpenness : Float -- 1 = fully open, 0 = fully closed
    , firstTick : Bool
    }


type Msg
    = Tick
    | Resize Int Int
    | KeyDown Command
    | KeyUp Command
    | LoadedTexture (Result WebGL.Texture.Error (Texture Color))
    | LoadedMesh (Result Http.Error ( Textured BodyCoordinates, Shape ))
    | LoadedCactusTexture (Result WebGL.Texture.Error (Texture Color))
    | LoadedCactus (Result Http.Error ( Textured BodyCoordinates, List Shape ))
    | JeepLoaded (Result String Jeep)


type Command
    = MoveLeft
    | MoveRight
    | MoveForward
    | MoveBack
    | Grab



-- MAIN


type alias Options =
    { width : Int
    , height : Int
    }


initial : Options -> Model
initial { width, height } =
    { bodies = initialBodies
    , contacts = Physics.emptyContacts
    , duckMesh = Nothing
    , duckMaterial = Nothing
    , duckShape = Nothing
    , cactusMesh = Nothing
    , cactusMaterial = Nothing
    , cactusShapes = Nothing
    , jeep = Nothing
    , spawned = False
    , dimensions = ( Pixels.int width, Pixels.int height )
    , anchor = Point3d.along Axis3d.z anchorRestZ
    , movingLeft = False
    , movingRight = False
    , movingForward = False
    , movingBack = False
    , phase = Idle
    , clawOpenness = 1
    , firstTick = True
    }


loadAssets : Cmd Msg
loadAssets =
    Cmd.batch
        [ Scene3d.Material.load "Duck.jpg"
            |> Task.attempt LoadedTexture
        , Http.get
            { url = "Duck.obj.txt"
            , expect = Obj.Decode.expectObj LoadedMesh (\l -> Length.meters (l / 2)) meshAndShape
            }
        , Scene3d.Material.loadWith cactusTextureOptions "Cactus.png"
            |> Task.attempt LoadedCactusTexture
        , Http.get
            { url = "Cactus.obj.txt"
            , expect = Obj.Decode.expectObj LoadedCactus (\l -> Length.meters (l / 2)) cactusMeshAndShapes
            }
        , Jeep.loadWith 0.2 { texture = "Jeep.png", mesh = "Jeep.obj.txt" }
            |> Task.attempt JeepLoaded
        ]


meshAndShape : Obj.Decode.Decoder ( Textured BodyCoordinates, Shape )
meshAndShape =
    Obj.Decode.map2
        (\mesh collider ->
            ( Scene3d.Mesh.texturedFaces mesh
            , Shape.unsafeConvex collider
            )
        )
        (Obj.Decode.group "Duck" (Obj.Decode.texturedFacesIn Frame3d.atOrigin))
        (Obj.Decode.group "Convex" (Obj.Decode.trianglesIn Frame3d.atOrigin))


{-| Cactus.png is 100×100 (non-power-of-two), so it must use clamp-to-edge
wrapping and a non-mipmapped filter — the default `load` (repeat wrap) fails
to upload it and the texture silently never arrives.
-}
cactusTextureOptions : WebGL.Texture.Options
cactusTextureOptions =
    { minify = WebGL.Texture.linear
    , magnify = WebGL.Texture.linear
    , horizontalWrap = WebGL.Texture.clampToEdge
    , verticalWrap = WebGL.Texture.clampToEdge
    , flipY = True
    }


{-| Decode the whole cactus as one textured mesh plus a compound collider:
a cylinder for the pot, a capsule for the stem, and a sphere per branch.
-}
cactusMeshAndShapes : Obj.Decode.Decoder ( Textured BodyCoordinates, List Shape )
cactusMeshAndShapes =
    Obj.Decode.map5
        (\mesh stem ( potShape, potTop ) top bottom ->
            ( Scene3d.Mesh.texturedFaces mesh
            , [ stemCapsule potTop stem, potShape, branchSphere top, branchSphere bottom ]
            )
        )
        (Obj.Decode.texturedFacesIn Frame3d.atOrigin)
        (objectBounds "Stem")
        potCollider
        (objectBounds "TopBranch")
        (objectBounds "BottomBranch")


{-| Bounding box of a named object's mesh vertices, in body coordinates.
-}
objectBounds : String -> Obj.Decode.Decoder (BoundingBox3d.BoundingBox3d Meters BodyCoordinates)
objectBounds name =
    Obj.Decode.object name (Obj.Decode.trianglesIn Frame3d.atOrigin)
        |> Obj.Decode.andThen
            (\mesh ->
                case BoundingBox3d.hullN (Array.toList (TriangularMesh.vertices mesh)) of
                    Just box ->
                        Obj.Decode.succeed box

                    Nothing ->
                        Obj.Decode.fail (name ++ " has no vertices")
            )


{-| A sphere snugly enclosing a branch blob.
-}
branchSphere : BoundingBox3d.BoundingBox3d Meters BodyCoordinates -> Shape
branchSphere box =
    let
        ( dx, dy, dz ) =
            BoundingBox3d.dimensions box
    in
    Shape.sphere
        (Sphere3d.withRadius
            (Quantity.half (Quantity.max dx (Quantity.max dy dz)))
            (BoundingBox3d.centerPoint box)
        )


{-| The pot is a tapered flower-pot, so a single cylinder radius is a
compromise. Decode its vertices and use the mean of the wide top-rim radius and
the narrow base radius (split at the pot's mid height) instead of the
bounding-box radius, which would only ever match the widest rim.
-}
potCollider : Obj.Decode.Decoder ( Shape, Quantity Float Meters )
potCollider =
    Obj.Decode.object "Pot" (Obj.Decode.trianglesIn Frame3d.atOrigin)
        |> Obj.Decode.andThen
            (\mesh ->
                let
                    vertices =
                        Array.toList (TriangularMesh.vertices mesh)
                in
                case BoundingBox3d.hullN vertices of
                    Just box ->
                        Obj.Decode.succeed ( potCylinder box vertices, BoundingBox3d.maxZ box )

                    Nothing ->
                        Obj.Decode.fail "Pot has no vertices"
            )


potCylinder : BoundingBox3d.BoundingBox3d Meters BodyCoordinates -> List (Point3d Meters BodyCoordinates) -> Shape
potCylinder box vertices =
    let
        center =
            BoundingBox3d.centerPoint box

        ( _, _, height ) =
            BoundingBox3d.dimensions box

        -- horizontal distance of a vertex from the pot's vertical axis
        axialRadius point =
            Point3d.distanceFrom
                (Point3d.xyz (Point3d.xCoordinate center) (Point3d.yCoordinate center) (Point3d.zCoordinate point))
                point

        ( lower, upper ) =
            List.partition (\p -> Point3d.zCoordinate p |> Quantity.lessThan (Point3d.zCoordinate center)) vertices

        maxRadius points =
            List.foldl (axialRadius >> Quantity.max) Quantity.zero points
    in
    Shape.cylinder 12
        (Cylinder3d.centeredOn center
            Direction3d.positiveZ
            { radius = Quantity.half (Quantity.plus (maxRadius lower) (maxRadius upper))
            , length = height
            }
        )


{-| A vertical capsule for the stem. The radius matches the stem's narrower
ends rather than its fat middle, so the caps aren't over-rounded; the cylinder
starts at the top of the pot (the bottom cap is free to overlap the pot below),
and a small overhang lets the top cap poke just past the tapered tip.
-}
stemCapsule : Quantity Float Meters -> BoundingBox3d.BoundingBox3d Meters BodyCoordinates -> Shape
stemCapsule potTopZ box =
    let
        ( dx, dy, dz ) =
            BoundingBox3d.dimensions box

        center =
            BoundingBox3d.centerPoint box

        radius =
            Quantity.multiplyBy 0.92 (Quantity.half (Quantity.max dx dy))

        overhang =
            Quantity.multiplyBy 0.06 dz

        startPoint =
            Point3d.xyz (Point3d.xCoordinate center) (Point3d.yCoordinate center) potTopZ

        -- top cap center sits a radius below where the cap apex should reach
        topCapCenterZ =
            BoundingBox3d.maxZ box |> Quantity.plus overhang |> Quantity.minus radius
    in
    Shape.capsule
        (Cylinder3d.startingAt startPoint
            Direction3d.positiveZ
            { radius = radius
            , length = topCapCenterZ |> Quantity.minus potTopZ |> Quantity.max Quantity.zero
            }
        )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick ->
            ( stepModel msg (spawnWhenReady model)
            , if model.firstTick then
                loadAssets

              else
                Cmd.none
            )

        _ ->
            ( stepModel msg model, Cmd.none )


{-| Everything downloads first, then all the contents drop in together —
adding bodies one by one as each asset arrived made them pop in
mid-simulation, disturbing the ones already settled.
-}
spawnWhenReady : Model -> Model
spawnWhenReady model =
    if model.spawned then
        model

    else
        case ( ( model.duckMaterial, model.duckShape ), ( model.cactusMaterial, model.cactusShapes ), model.jeep ) of
            ( ( Just _, Just duckShape ), ( Just _, Just cactusShapes ), Just jeep ) ->
                { model
                    | spawned = True
                    , bodies =
                        model.bodies
                            ++ duckBodies duckShape
                            ++ cactusBodies cactusShapes
                            ++ jeepBodies jeep
                }

            _ ->
                model


stepModel : Msg -> Model -> Model
stepModel msg model =
    case msg of
        LoadedTexture (Ok texture) ->
            { model | duckMaterial = Just (Scene3d.Material.texturedMatte texture) }

        LoadedTexture (Err _) ->
            model

        LoadedMesh (Ok ( mesh, shape )) ->
            { model
                | duckMesh = Just { mesh = mesh, shadow = Scene3d.Mesh.shadow mesh }
                , duckShape = Just shape
            }

        LoadedMesh (Err _) ->
            model

        LoadedCactusTexture (Ok texture) ->
            { model | cactusMaterial = Just (Scene3d.Material.texturedMatte texture) }

        LoadedCactusTexture (Err _) ->
            model

        LoadedCactus (Ok ( mesh, shapes )) ->
            { model
                | cactusMesh = Just { mesh = mesh, shadow = Scene3d.Mesh.shadow mesh }
                , cactusShapes = Just shapes
            }

        LoadedCactus (Err _) ->
            model

        JeepLoaded (Ok jeep) ->
            { model | jeep = Just jeep }

        JeepLoaded (Err _) ->
            model

        Tick ->
            let
                az =
                    Point3d.zCoordinate model.anchor

                newPhase =
                    case model.phase of
                        Idle ->
                            Idle

                        Descending ->
                            if az |> Quantity.lessThanOrEqualTo (anchorGrabZ |> Quantity.plus (Length.meters 0.1)) then
                                Gripping

                            else
                                Descending

                        Gripping ->
                            if az |> Quantity.greaterThanOrEqualTo (anchorRestZ |> Quantity.minus (Length.meters 0.1)) then
                                Idle

                            else
                                Gripping

                goingDown =
                    newPhase == Descending

                -- Start closing fingers while still descending
                closing =
                    newPhase
                        == Gripping
                        || (newPhase == Descending && (az |> Quantity.lessThanOrEqualTo (anchorGrabZ |> Quantity.plus (Length.meters 1.0))))

                dx =
                    (if model.movingRight then
                        moveSpeed

                     else
                        Quantity.zero
                    )
                        |> Quantity.minus
                            (if model.movingLeft then
                                moveSpeed

                             else
                                Quantity.zero
                            )

                dy =
                    (if model.movingBack then
                        moveSpeed

                     else
                        Quantity.zero
                    )
                        |> Quantity.minus
                            (if model.movingForward then
                                moveSpeed

                             else
                                Quantity.zero
                            )

                targetZ =
                    if goingDown then
                        anchorGrabZ

                    else
                        anchorRestZ

                dz =
                    (targetZ |> Quantity.minus az)
                        |> Quantity.clamp (Quantity.negate dropSpeed) dropSpeed

                newAnchor =
                    model.anchor
                        |> Point3d.translateBy (Vector3d.xyz dx dy dz)
                        |> clampAnchor

                -- Smoothly interpolate claw openness
                targetOpenness =
                    if closing then
                        0

                    else
                        1

                newOpenness =
                    model.clawOpenness + (targetOpenness - model.clawOpenness) * 0.1

                -- Remove old claw body, keep scene + ducks
                baseBodies =
                    List.filter (\( id, _ ) -> id /= Claw) model.bodies

                -- Velocity needed to carry the claw from model.anchor to
                -- newAnchor in one simulation step. Ducks gripped by the
                -- fingers see this velocity at the contact and ride along.
                clawVelocity =
                    Vector3d.from model.anchor newAnchor
                        |> Vector3d.per onEarth.duration

                clawBody =
                    createClawBody newOpenness model.anchor clawVelocity

                ( newBodies, newContacts ) =
                    Physics.simulate
                        { onEarth
                            | contacts = model.contacts
                            , collide = \_ _ -> True
                            , solverIterations = 40
                        }
                        (baseBodies ++ [ clawBody ])
            in
            { model
                | bodies = newBodies
                , contacts = newContacts
                , anchor = newAnchor
                , phase = newPhase
                , clawOpenness = newOpenness
                , firstTick = False
            }

        Resize w h ->
            { model | dimensions = ( Pixels.int w, Pixels.int h ) }

        KeyDown MoveLeft ->
            { model | movingLeft = True }

        KeyDown MoveRight ->
            { model | movingRight = True }

        KeyDown MoveForward ->
            { model | movingForward = True }

        KeyDown MoveBack ->
            { model | movingBack = True }

        KeyDown Grab ->
            if model.phase == Idle then
                { model | phase = Descending }

            else
                model

        KeyUp MoveLeft ->
            { model | movingLeft = False }

        KeyUp MoveRight ->
            { model | movingRight = False }

        KeyUp MoveForward ->
            { model | movingForward = False }

        KeyUp MoveBack ->
            { model | movingBack = False }

        KeyUp Grab ->
            model



-- CLAW BODY


createClawBody :
    Float
    -> Point3d Meters WorldCoordinates
    -> Vector3d Speed.MetersPerSecond WorldCoordinates
    -> ( Id, Body )
createClawBody openness startAnchor velocity =
    let
        shapes =
            clawParts openness
                |> List.map (\( _, block ) -> ( Shape.block block, Physics.Material.rubber ))
    in
    ( Claw
    , Physics.kinematic shapes
        |> Physics.moveTo startAnchor
        |> Physics.setVelocityTo velocity
    )



-- INITIAL BODIES


initialBodies : List ( Id, Body )
initialBodies =
    [ ( Floor, Physics.plane Plane3d.xy Physics.Material.wood )
    , ( Box
      , Physics.static
            (List.map (\block -> ( Shape.block block, Physics.Material.wood )) boxShapes)
      )
    ]


duckBodies : Shape -> List ( Id, Body )
duckBodies shape =
    [ duckAt shape 0 0 (Angle.degrees 0)
    , duckAt shape 0.8 0.6 (Angle.degrees 45)
    , duckAt shape -0.7 -0.4 (Angle.degrees 130)
    , duckAt shape -0.3 0.8 (Angle.degrees 220)
    , duckAt shape 0.5 -0.7 (Angle.degrees 300)
    , duckAt shape -0.9 0.2 (Angle.degrees 80)
    ]


duckAt : Shape -> Float -> Float -> Angle.Angle -> ( Id, Body )
duckAt shape x y angle =
    ( Duck
    , Physics.dynamic [ ( shape, Physics.Material.rubber ) ]
        |> Physics.rotateAround Axis3d.z angle
        |> Physics.moveTo (Point3d.meters x y 1)
    )


{-| Cacti stand in the four corners of the box, clear of the central duck pile.
-}
cactusBodies : List Shape -> List ( Id, Body )
cactusBodies shapes =
    [ cactusAt shapes 1.6 1.4 (Angle.degrees 30)
    , cactusAt shapes -1.7 1.3 (Angle.degrees 150)
    , cactusAt shapes -1.5 -1.4 (Angle.degrees 250)
    , cactusAt shapes 1.5 -1.5 (Angle.degrees 330)
    ]


{-| Cactus body origin sits at the bottom centre of the pot; lift it slightly
so it drops in instead of starting interpenetrating the floor.
-}
cactusAt : List Shape -> Float -> Float -> Angle.Angle -> ( Id, Body )
cactusAt shapes x y angle =
    ( Cactus
    , Physics.dynamic (List.map (\shape -> ( shape, Physics.Material.rubber )) shapes)
        |> Physics.rotateAround Axis3d.z angle
        |> Physics.moveTo (Point3d.meters x y 0.2)
    )


{-| Two jeeps parked along the front and back mid-edges, clear of the central
duck pile and the corner cacti so nothing spawns interpenetrating.
-}
jeepBodies : Jeep -> List ( Id, Body )
jeepBodies jeep =
    [ jeepAt jeep 0 -1.9 (Angle.degrees 90)
    , jeepAt jeep 0 1.9 (Angle.degrees 270)
    ]


{-| The jeep's collider is its chassis hulls plus a rubber cylinder per wheel,
sized from the loaded wheel radius/width and placed on each wheel axis.
-}
jeepAt : Jeep -> Float -> Float -> Angle.Angle -> ( Id, Body )
jeepAt jeep x y angle =
    let
        wheelShapes =
            jeep.wheelAxes
                |> List.map
                    (\axis ->
                        ( Shape.cylinder 12
                            (Cylinder3d.centeredOn (Axis3d.originPoint axis)
                                (Axis3d.direction axis)
                                { radius = jeep.wheelRadius, length = jeep.wheelWidth }
                            )
                        , Physics.Material.rubber
                        )
                    )
    in
    ( JeepCar
    , Physics.dynamic (jeep.collider ++ wheelShapes)
        -- Light enough that the claw's friction grip can lift it.
        |> Physics.scaleMassTo (Mass.kilograms 500)
        |> Physics.rotateAround Axis3d.z angle
        |> Physics.moveTo (Point3d.meters x y 0.3)
    )



-- VIEW


{-| The eye and focal points are shifted by the same offset from the machine
at the origin — a pure pan that puts the machine center-left and raised,
clear of the title, with the bottom-right corner free for the buttons.
-}
camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters -12.1 -20.2 13.65
        , focalPoint = Point3d.meters -1.1 -0.2 2.65
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 30)
        }


view : Model -> Html Msg
view model =
    let
        -- Visual-only arm (chain of small spheres)
        numLinks =
            12

        armEntities =
            List.range 0 numLinks
                |> List.map
                    (\i ->
                        let
                            t =
                                toFloat i / toFloat numLinks
                        in
                        Scene3d.sphere
                            (Scene3d.Material.matte Color.darkGray)
                            (Sphere3d.withRadius (Length.meters 0.05)
                                (model.anchor
                                    |> Point3d.translateIn Direction3d.positiveZ
                                        (Quantity.twice armLength |> Quantity.multiplyBy (1 - t))
                                )
                            )
                    )
    in
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        , Html.Attributes.style "user-select" "none"
        , Html.Attributes.style "-webkit-user-select" "none"
        , Html.Attributes.style "-webkit-touch-callout" "none"
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 65) (Angle.degrees -45)
            , shadows = True
            , camera = camera
            , dimensions = model.dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                List.concatMap (bodyToEntities model) model.bodies
                    ++ armEntities
            }
        , controls model
        ]


controls : Model -> Html Msg
controls model =
    Html.div
        [ Html.Attributes.style "position" "absolute"

        -- 100px slide margin minus the buttons' own 5px margin, so the
        -- button borders align with the 1180/675 content edges
        , Html.Attributes.style "right" "95px"
        , Html.Attributes.style "bottom" "40px"
        , Html.Attributes.style "text-align" "center"
        , Html.Attributes.style "width" "210px"
        ]
        [ Html.div [] [ controlButton 60 model.movingBack "W" (KeyDown MoveBack) (KeyUp MoveBack) ]
        , Html.div []
            [ controlButton 60 model.movingLeft "A" (KeyDown MoveLeft) (KeyUp MoveLeft)
            , controlButton 60 model.movingForward "S" (KeyDown MoveForward) (KeyUp MoveForward)
            , controlButton 60 model.movingRight "D" (KeyDown MoveRight) (KeyUp MoveRight)
            ]
        , Html.div [] [ controlButton 200 (model.phase /= Idle) "Space" (KeyDown Grab) (KeyUp Grab) ]
        ]


controlButton : Int -> Bool -> String -> Msg -> Msg -> Html Msg
controlButton buttonWidth active label msg1 msg2 =
    Html.button
        [ Html.Attributes.style "display" "inline-block"
        , Html.Attributes.style "margin" "5px"
        , Html.Attributes.style "border" "2px solid rgba(0, 0, 0, 0.35)"
        , Html.Attributes.style "border-radius" "4px"
        , Html.Attributes.style "text-align" "center"
        , Html.Attributes.style "cursor" "pointer"
        , Html.Attributes.style "width" (String.fromInt buttonWidth ++ "px")
        , Html.Attributes.style "height" "60px"
        , Html.Attributes.style "line-height" "60px"
        , Html.Attributes.style "user-select" "none"
        , Html.Attributes.style "-webkit-user-select" "none"
        , Html.Attributes.style "-webkit-touch-callout" "none"
        , Html.Attributes.style "touch-action" "manipulation"
        , Html.Attributes.style "background"
            (if active then
                "rgba(0, 0, 0, 0.35)"

             else
                "transparent"
            )
        , Html.Attributes.style "padding" "0"
        , Html.Attributes.style "color"
            (if active then
                "white"

             else
                "rgba(0, 0, 0, 0.35)"
            )
        , font False 32
        , PointerEvents.onDown (\_ -> msg1)
        , PointerEvents.onUp (\_ -> msg2)
        ]
        [ Html.text label ]


bodyToEntities : Model -> ( Id, Body ) -> List (Scene3d.Entity WorldCoordinates)
bodyToEntities model ( id, body ) =
    let
        bodyFrame =
            Physics.frame body
    in
    case id of
        Floor ->
            [ Scene3d.placeIn bodyFrame <|
                Scene3d.quad (Scene3d.Material.matte Color.white)
                    (Point3d.meters -50 -50 0)
                    (Point3d.meters -50 50 0)
                    (Point3d.meters 50 50 0)
                    (Point3d.meters 50 -50 0)
            ]

        Box ->
            let
                wallMaterial =
                    Scene3d.Material.nonmetal
                        { baseColor = Color.lightBlue
                        , roughness = 0.8
                        }

                frontMaterial =
                    Scene3d.Material.nonmetal
                        { baseColor = Color.fromRgba { red = 0.7, green = 0.85, blue = 1, alpha = 0.45 }
                        , roughness = 0.1
                        }
            in
            boxRenderParts
                |> List.map
                    (\( part, block ) ->
                        Scene3d.placeIn bodyFrame <|
                            case part of
                                BoxFrontWall ->
                                    Scene3d.block frontMaterial block

                                _ ->
                                    Scene3d.blockWithShadow wallMaterial block
                    )

        Duck ->
            [ Scene3d.placeIn bodyFrame <|
                case ( model.duckMaterial, model.duckMesh ) of
                    ( Just material, Just { mesh, shadow } ) ->
                        Scene3d.meshWithShadow material mesh shadow

                    _ ->
                        Scene3d.nothing
            ]

        Cactus ->
            [ Scene3d.placeIn bodyFrame <|
                case ( model.cactusMaterial, model.cactusMesh ) of
                    ( Just material, Just { mesh, shadow } ) ->
                        Scene3d.meshWithShadow material mesh shadow

                    _ ->
                        Scene3d.nothing
            ]

        JeepCar ->
            case model.jeep of
                Just jeep ->
                    [ Scene3d.placeIn bodyFrame
                        (Scene3d.group
                            (Scene3d.meshWithShadow jeep.material jeep.chassis jeep.chassisShadow
                                :: List.map (jeepWheelEntity jeep) jeep.wheelAxes
                            )
                        )
                    ]

                Nothing ->
                    []

        Claw ->
            clawParts model.clawOpenness
                |> List.map
                    (\( part, block ) ->
                        Scene3d.placeIn bodyFrame <|
                            Scene3d.blockWithShadow
                                (case part of
                                    HubPart ->
                                        Scene3d.Material.nonmetal
                                            { baseColor = Color.darkGray
                                            , roughness = 0.5
                                            }

                                    UpperPart ->
                                        Scene3d.Material.nonmetal
                                            { baseColor = Color.gray
                                            , roughness = 0.4
                                            }

                                    LowerPart ->
                                        Scene3d.Material.nonmetal
                                            { baseColor = Color.lightGray
                                            , roughness = 0.4
                                            }
                                )
                                block
                    )


{-| A single wheel mesh placed on its axis, in body coordinates. Wheels on one
side are mirrored so their outer face points outward.
-}
jeepWheelEntity : Jeep -> Axis3d.Axis3d Meters BodyCoordinates -> Scene3d.Entity BodyCoordinates
jeepWheelEntity jeep axis =
    let
        applyMirror =
            if Quantity.greaterThan Quantity.zero (Direction3d.angleFrom Direction3d.negativeX (Axis3d.direction axis)) then
                identity

            else
                Frame3d.mirrorAcross Plane3d.yz

        wheelFrame =
            Frame3d.atOrigin
                |> applyMirror
                |> Frame3d.moveTo (Axis3d.originPoint axis)
    in
    Scene3d.meshWithShadow jeep.material jeep.wheel jeep.wheelShadow
        |> Scene3d.placeIn wheelFrame



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrame (\_ -> Tick)
        , Browser.Events.onKeyDown (keyDecoder KeyDown)
        , Browser.Events.onKeyUp (keyDecoder KeyUp)
        ]


keyDecoder : (Command -> Msg) -> Json.Decode.Decoder Msg
keyDecoder toMsg =
    Json.Decode.andThen
        (\key ->
            case key of
                "a" ->
                    Json.Decode.succeed (toMsg MoveLeft)

                "d" ->
                    Json.Decode.succeed (toMsg MoveRight)

                "w" ->
                    Json.Decode.succeed (toMsg MoveBack)

                "s" ->
                    Json.Decode.succeed (toMsg MoveForward)

                " " ->
                    Json.Decode.succeed (toMsg Grab)

                _ ->
                    Json.Decode.fail ("Unrecognized key: " ++ key)
        )
        (Json.Decode.field "key" Json.Decode.string)
