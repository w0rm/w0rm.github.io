module Custom.Clock exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| A pendulum wall-clock mechanism.

A constant drive torque on the toothed escape wheel (standing in for the falling
weight + going train) is regulated by an anchor escapement into a steady,
stepwise rotation: every swing of the pendulum lets the wheel advance one tooth.

The parts, all hinged about the +Y axis so they turn in the X/Z plane:

  - **escape wheel** — a toothed disc, hinged at its centre, pushed by a constant
    torque.
  - **anchor + pendulum** — two pallets near the pivot that alternately catch and
    release the wheel teeth, fused to a long rod and a heavy bob below. Gravity is
    the restoring force; the wheel kicks the pallets to keep it swinging.
  - **weight on a chain** — the calibration weight, hung from the frame with a
    chain of distance-constrained links. Decorative here: the actual drive is the
    constant torque above.

Only the wheel and the pendulum collide (the escapement contact); everything
else is held by constraints. Click to release the pendulum again.

The geometry is all tunable constants at the top — tweak and recompile to dial
in the escapement.

-}

import Angle
import Array
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Cylinder3d exposing (Cylinder3d)
import Density
import Direction3d
import Duration
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode
import Length exposing (Meters)
import Mass
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Constraint as Constraint exposing (Constraint)
import Physics.Lock as Lock
import Physics.Material as Material
import Physics.Shape as Shape
import Pixels exposing (Pixels)
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as SceneMaterial
import Scene3d.Mesh as Mesh
import Sphere3d
import Timestep exposing (Timestep)
import TriangularMesh exposing (TriangularMesh)
import Vector3d



-- TUNABLES ------------------------------------------------------------------
-- Escape wheel


toothCount : Int
toothCount =
    16


tipRadius : Float
tipRadius =
    0.9


rootRadius : Float
rootRadius =
    0.66


toothHalfWidth : Float
toothHalfWidth =
    0.026


{-| Rake of each tooth — leans the blade so it presents a steep catching edge
on one side and a shallow ramp on the other (a sawtooth, not a symmetric spike).
The sign sets which way the wheel hooks; it must oppose the drive direction.
-}
toothRake : Float
toothRake =
    degrees 30


{-| Half thickness of the wheel/pallets along the +Y axis.
-}
halfThick : Float
halfThick =
    0.12


{-| Heavy, on purpose: the chain delivers jerky torque (the coarse sprocket
engaging tooth by tooth), and a light wheel gets flicked past a tooth by a spike.
The flywheel inertia keeps the advance controlled so the pallet catches each
tooth — it widened the clean torque window from ~9 to past 12 N·m.
-}
wheelMass : Float
wheelMass =
    2.5



-- Anchor + pendulum


{-| Height of the anchor/pendulum pivot above the wheel centre.
-}
pivotHeight : Float
pivotHeight =
    1.16


{-| Angle between the two pallets, seen from the wheel centre — 2.5 tooth-pitches
so the two pallets alternate.
-}
palletSpan : Float
palletSpan =
    2.5 * toothPitch


palletRadialThick : Float
palletRadialThick =
    0.06


palletTangLength : Float
palletTangLength =
    0.11


palletDepthY : Float
palletDepthY =
    0.18


{-| How far the pallet face dips below the tooth-tip radius (the lock).
-}
lockDepth : Float
lockDepth =
    0.02


{-| Tilt of each pallet's working face — the impulse faces.
-}
palletTiltL : Float
palletTiltL =
    degrees 12


palletTiltR : Float
palletTiltR =
    degrees 12


rodLength : Float
rodLength =
    3.49


{-| Where the rod and bob sit along Y — the back-most plane, behind the chain
wheel, so depth reads escape wheel → chain wheel → pendulum.
-}
bobOffsetY : Float
bobOffsetY =
    0.65


bobRadius : Float
bobRadius =
    0.45


pendulumMass : Float
pendulumMass =
    6


{-| Angle the pendulum is released from at the start (and on click).
-}
releaseAngle : Float
releaseAngle =
    degrees 22



-- Weight + chain
-- Chain sprocket — coaxial with the escape wheel, set behind it (-Y), part of
-- the same rigid body. The weighted chain meshes its teeth and drives the lot.


{-| Y of the chain sprocket — the middle plane, behind the escape wheel.
-}
sprocketY : Float
sprocketY =
    0.0


{-| Root drum the links rest on between the teeth — one link-radius below the
ride circle, so a slack link can't sink past it into the wheel. (`sprocketHub`
is built at this radius; it's the floor the chain rides on.)
-}
sprocketRootR : Float
sprocketRootR =
    chainRideR - linkRadius


{-| Teeth reach above the link centres so a link can't ride up and over a tooth
(it would skip the grip); the root drum keeps the links from sinking through
between the teeth.
-}
sprocketTipR : Float
sprocketTipR =
    chainRideR + 0.04


{-| Tangential width of a sprocket tooth (sized so chain links seat between).
-}
sprocketToothWidth : Float
sprocketToothWidth =
    0.1


sprocketHalfThick : Float
sprocketHalfThick =
    0.1


sprocketTeeth : Int
sprocketTeeth =
    8


linkRadius : Float
linkRadius =
    0.1


{-| Radius the chain links ride at — the sprocket's pitch circle. Smaller wheel
⇒ proportionally shorter chain drop (drop = runtime/60 × 2π × chainRideR).
-}
chainRideR : Float
chainRideR =
    0.5


{-| Link spacing = chord of one tooth pitch on the ride circle, so each link
seats in a gap between two teeth.
-}
chainSpacing : Float
chainSpacing =
    2 * chainRideR * sin (pi / toFloat sprocketTeeth)


{-| Links on the loaded (+X) strand, below the sprocket. Short, so the heavy
weight starts high and has a long way to descend.
-}
loadedHang : Int
loadedHang =
    3


{-| Links on the slack (-X) strand, carrying the light counterweight low. As the
wheel turns, the heavy side feeds down and this side rises. This count sets the
run time (and thus the chain length): one link feeds per tooth-step.
-}
slackHang : Int
slackHang =
    40


{-| Drives the train. Scaled up as the sprocket shrank, to keep the drive torque
(∝ chainRideR) in the escapement's window.
-}
weightMass : Float
weightMass =
    1.7


{-| Just enough to keep the slack strand taut so the chain stays meshed — like
the small ring on a cuckoo-clock chain. Must be lighter than the main weight.
-}
counterweightMass : Float
counterweightMass =
    0.3



-- IDS -----------------------------------------------------------------------


type Id
    = Frame
    | Wheel
    | Pendulum
    | Intermediate
    | Minutes
    | Weight
    | Counterweight
    | Link Int



-- GEOMETRY ------------------------------------------------------------------


{-| Y of the escape wheel + pallets — the front-most plane (toward the camera),
so depth reads escape wheel → chain wheel → pendulum.
-}
escapeY : Float
escapeY =
    -0.45


toothPitch : Float
toothPitch =
    2 * pi / toFloat toothCount


{-| A radial tooth, built at the top of the wheel then rotated to angle phi.
-}
toothBlock : Float -> Block3d Meters BodyCoordinates
toothBlock phi =
    let
        midRadius =
            (rootRadius + tipRadius) / 2
    in
    Block3d.centeredOn
        (Frame3d.atPoint (Point3d.meters 0 escapeY midRadius))
        ( Length.meters (2 * toothHalfWidth)
        , Length.meters (2 * halfThick)
        , Length.meters (tipRadius - rootRadius)
        )
        -- Rake the blade about its own centre, then swing it to angle phi.
        |> Block3d.rotateAround
            (Axis3d.through (Point3d.meters 0 0 midRadius) Direction3d.y)
            (Angle.radians toothRake)
        |> Block3d.rotateAround Axis3d.y (Angle.radians (pi / 2 - phi))


wheelTeeth : List (Block3d Meters BodyCoordinates)
wheelTeeth =
    List.range 0 (toothCount - 1)
        |> List.map (\i -> toothBlock (toFloat i * toothPitch))


wheelHub : Cylinder3d Meters BodyCoordinates
wheelHub =
    Cylinder3d.centeredOn (Point3d.meters 0 escapeY 0)
        Direction3d.y
        { radius = Length.meters rootRadius, length = Length.meters (2 * halfThick) }


{-| A pallet slab just outside the rim at angle phi, in pendulum body
coordinates (origin at the pivot). `tilt` inclines the working face.
-}
palletSlab : Float -> Float -> Float -> Float -> Block3d Meters BodyCoordinates
palletSlab phi tilt yCenter yDepth =
    Block3d.centeredOn
        (Frame3d.atPoint
            (Point3d.meters 0 yCenter (tipRadius + palletRadialThick / 2 - lockDepth))
        )
        ( Length.meters palletTangLength
        , Length.meters yDepth
        , Length.meters palletRadialThick
        )
        |> Block3d.rotateAround Axis3d.y (Angle.radians (pi / 2 - phi + tilt))
        |> Block3d.translateBy (Vector3d.meters 0 0 -pivotHeight)


{-| The physics pallet — short, centred on the escapement plane.
-}
palletBlock : Float -> Float -> Block3d Meters BodyCoordinates
palletBlock phi tilt =
    palletSlab phi tilt escapeY palletDepthY


palletPhiL : Float
palletPhiL =
    pi / 2 + palletSpan / 2


palletPhiR : Float
palletPhiR =
    pi / 2 - palletSpan / 2


palletLeft : Block3d Meters BodyCoordinates
palletLeft =
    palletBlock palletPhiL palletTiltL


palletRight : Block3d Meters BodyCoordinates
palletRight =
    palletBlock palletPhiR palletTiltR


{-| Render-only: the same lock blocks prolonged in Y from their working face back
behind the wheel, so they themselves form the anchor arms (no extra elements).
-}
palletRenderDepth : Float
palletRenderDepth =
    -- from the front face (escapeY − palletDepthY/2) back to anchorBackY
    anchorBackY - (escapeY - palletDepthY / 2)


palletRenderCenterY : Float
palletRenderCenterY =
    (escapeY - palletDepthY / 2 + anchorBackY) / 2


palletLeftRender : Block3d Meters BodyCoordinates
palletLeftRender =
    palletSlab palletPhiL palletTiltL palletRenderCenterY palletRenderDepth


palletRightRender : Block3d Meters BodyCoordinates
palletRightRender =
    palletSlab palletPhiR palletTiltR palletRenderCenterY palletRenderDepth


{-| The anchor, render only (physics unchanged). Each lock is first prolonged
_straight back_ in Y (staying at its own radius, outside the teeth) to behind the
wheel, and only then do the connectors run inward to the pivot at that rear depth
— so the connectors never cross the tooth plane. The brass arbor caps the pivot
and runs on back through the rod's top to hide it.
-}
anchorBackY : Float
anchorBackY =
    -- behind the wheel-tooth plane, where the prolonged locks meet the connectors
    0


anchorRod : Point3d Meters BodyCoordinates -> Point3d Meters BodyCoordinates -> Cylinder3d Meters BodyCoordinates
anchorRod a b =
    Cylinder3d.from a b (Length.meters 0.05)
        |> Maybe.withDefault
            (Cylinder3d.centeredOn a Direction3d.y { radius = Length.meters 0.05, length = Length.meters 0.01 })


{-| Rear end of a prolonged lock: straight back from the pallet, behind the wheel.
-}
lockRear : Block3d Meters BodyCoordinates -> Point3d Meters BodyCoordinates
lockRear pallet =
    let
        c =
            Point3d.toMeters (Block3d.centerPoint pallet)
    in
    Point3d.meters c.x anchorBackY c.z


{-| Connector from a prolonged lock's rear inward to the pivot — entirely behind
the wheel, so it never overlaps the teeth.
-}
lockConnector : Block3d Meters BodyCoordinates -> Cylinder3d Meters BodyCoordinates
lockConnector pallet =
    anchorRod (lockRear pallet) (Point3d.meters 0 anchorBackY 0)


anchorArbor : Cylinder3d Meters BodyCoordinates
anchorArbor =
    let
        front =
            anchorBackY - 0.1

        back =
            bobOffsetY + 0.1
    in
    Cylinder3d.centeredOn (Point3d.meters 0 ((front + back) / 2) 0)
        Direction3d.y
        { radius = Length.meters 0.08, length = Length.meters (back - front) }


pendulumRod : Block3d Meters BodyCoordinates
pendulumRod =
    Block3d.centeredOn
        (Frame3d.atPoint (Point3d.meters 0 bobOffsetY -(rodLength / 2)))
        ( Length.meters 0.06, Length.meters 0.06, Length.meters rodLength )


{-| The crutch: bridges the Y gap between the anchor pallets (at escapeY, front)
and the rod (at bobOffsetY, back), so the pendulum reads as one piece.
-}
pendulumCrutch : Block3d Meters BodyCoordinates
pendulumCrutch =
    Block3d.centeredOn
        (Frame3d.atPoint (Point3d.meters 0 ((escapeY + bobOffsetY) / 2) -0.2))
        ( Length.meters 0.05
        , Length.meters (abs (bobOffsetY - escapeY))
        , Length.meters 0.05
        )


pendulumBob : Cylinder3d Meters BodyCoordinates
pendulumBob =
    Cylinder3d.centeredOn (Point3d.meters 0 bobOffsetY -rodLength)
        Direction3d.y
        { radius = Length.meters bobRadius, length = Length.meters 0.2 }


weightCylinder : Cylinder3d Meters BodyCoordinates
weightCylinder =
    Cylinder3d.centeredOn Point3d.origin
        Direction3d.z
        { radius = Length.meters 0.12, length = Length.meters 0.5 }


{-| The counterweight is lighter, so it's visibly smaller than the main weight.
-}
counterweightCylinder : Cylinder3d Meters BodyCoordinates
counterweightCylinder =
    Cylinder3d.centeredOn Point3d.origin
        Direction3d.z
        { radius = Length.meters 0.08, length = Length.meters 0.28 }


{-| A sprocket tooth at angle `phi`, a block in the y = sprocketY plane.
-}
sprocketToothBlock : Float -> Block3d Meters BodyCoordinates
sprocketToothBlock phi =
    Block3d.centeredOn
        (Frame3d.atPoint (Point3d.meters 0 sprocketY ((sprocketRootR + sprocketTipR) / 2)))
        ( Length.meters sprocketToothWidth
        , Length.meters (2 * sprocketHalfThick)
        , Length.meters (sprocketTipR - sprocketRootR)
        )
        |> Block3d.rotateAround Axis3d.y (Angle.radians (pi / 2 - phi))


sprocketTeethBlocks : List (Block3d Meters BodyCoordinates)
sprocketTeethBlocks =
    List.range 0 (sprocketTeeth - 1)
        -- offset half a pitch so each tooth sits in a gap between links
        |> List.map (\i -> sprocketToothBlock ((toFloat i + 0.5) * 2 * pi / toFloat sprocketTeeth))


{-| Root drum the chain rides on between the teeth — links rest their bottoms on
it, so a slack link can't sink past it into the wheel.
-}
sprocketHub : Cylinder3d Meters BodyCoordinates
sprocketHub =
    Cylinder3d.centeredOn (Point3d.meters 0 sprocketY 0)
        Direction3d.y
        { radius = Length.meters sprocketRootR, length = Length.meters (2 * sprocketHalfThick) }


{-| Shaft joining the escape wheel to the chain sprocket.
-}
wheelArbor : Cylinder3d Meters BodyCoordinates
wheelArbor =
    Cylinder3d.centeredOn (Point3d.meters 0 ((escapeY + sprocketY) / 2) 0)
        Direction3d.y
        { radius = Length.meters 0.08, length = Length.meters (abs (sprocketY - escapeY) + 0.1) }


{-| In front of the minute hand (both are on the escape axis).
-}
handY : Float
handY =
    gear2Y - 0.3


{-| The seconds hand, fixed to the escape wheel — a long pointer with a short
counterbalance tail. Decorative (render only); it turns with the wheel.
-}
secondsHand : Block3d Meters BodyCoordinates
secondsHand =
    Block3d.centeredOn
        (Frame3d.atPoint (Point3d.meters 0 handY 0.27))
        ( Length.meters 0.04, Length.meters 0.05, Length.meters 0.95 )


secondsHandHub : Cylinder3d Meters BodyCoordinates
secondsHandHub =
    Cylinder3d.centeredOn (Point3d.meters 0 handY 0)
        Direction3d.y
        { radius = Length.meters 0.1, length = Length.meters 0.06 }



-- MOTION WORK ---------------------------------------------------------------
-- Escape pinion -> intermediate wheel (offset axis, CCW) -> minute wheel (back
-- on the escape axis, CW). Two diamond-tooth meshes give a 4:1 reduction and a
-- minute hand concentric with the seconds hand.


{-| Y plane of mesh A: escape pinion + intermediate big gear.
-}
gear1Y : Float
gear1Y =
    -0.75


{-| Y plane of mesh B: intermediate pinion + minute wheel.
-}
gear2Y : Float
gear2Y =
    -1.0


gearDepthY : Float
gearDepthY =
    0.2


{-| Pitch radius per tooth — sets every gear's size from its tooth count, so
meshing gears share a tooth pitch.
-}
pitchPerTooth : Float
pitchPerTooth =
    0.025


{-| Physics hub sits this far below the pitch circle, leaving gaps for the
meshing teeth to drop into.
-}
gearToothSize : Float
gearToothSize =
    0.06


toothAddendum : Float
toothAddendum =
    -- radial reach of the tip above the pitch circle
    0.045


toothDedendum : Float
toothDedendum =
    -- radial drop of the root below the pitch circle
    0.045


toothBaseHalf : Float
toothBaseHalf =
    -- tangential half-width at the root
    0.04


toothTipHalf : Float
toothTipHalf =
    -- tangential half-width at the (flat) tip
    0.013


{-| True when triangle a-b-c is wound so its normal points away from `center`
(i.e. outward for a convex solid). Used to orient faces without hand-winding.
-}
faceNormalOutward :
    { x : Float, y : Float, z : Float }
    -> { x : Float, y : Float, z : Float }
    -> { x : Float, y : Float, z : Float }
    -> { x : Float, y : Float, z : Float }
    -> Bool
faceNormalOutward center pa pb pc =
    let
        nx =
            (pb.y - pa.y) * (pc.z - pa.z) - (pb.z - pa.z) * (pc.y - pa.y)

        ny =
            (pb.z - pa.z) * (pc.x - pa.x) - (pb.x - pa.x) * (pc.z - pa.z)

        nz =
            (pb.x - pa.x) * (pc.y - pa.y) - (pb.y - pa.y) * (pc.x - pa.x)
    in
    nx * (pa.x - center.x) + ny * (pa.y - center.y) + nz * (pa.z - center.z) >= 0


{-| One proper gear tooth at pitch radius `r` in the y = `gy` plane, swung to
angle `phi`: a tapered-flank trapezoid extruded across the gear, as a closed
8-vertex convex mesh. Each quad is wound so its normal points away from the
tooth centre, giving correct outward normals for both the `unsafeConvex`
collider and flat-shaded rendering. Built once and reused for physics + render.
-}
toothMesh : Float -> Float -> Float -> TriangularMesh (Point3d Meters BodyCoordinates)
toothMesh gy r phi =
    let
        rRoot =
            r - toothDedendum

        rTip =
            r + toothAddendum

        hy =
            gearDepthY / 2

        place x y z =
            Point3d.meters x (gy + y) z
                |> Point3d.rotateAround Axis3d.y (Angle.radians (pi / 2 - phi))

        verts =
            Array.fromList
                [ place -toothBaseHalf -hy rRoot
                , place toothBaseHalf -hy rRoot
                , place toothTipHalf -hy rTip
                , place -toothTipHalf -hy rTip
                , place -toothBaseHalf hy rRoot
                , place toothBaseHalf hy rRoot
                , place toothTipHalf hy rTip
                , place -toothTipHalf hy rTip
                ]

        center =
            Point3d.meters 0 gy r
                |> Point3d.rotateAround Axis3d.y (Angle.radians (pi / 2 - phi))
                |> Point3d.toMeters

        get i =
            Array.get i verts |> Maybe.withDefault Point3d.origin |> Point3d.toMeters

        quad a b c d =
            if faceNormalOutward center (get a) (get b) (get c) then
                [ ( a, b, c ), ( a, c, d ) ]

            else
                [ ( a, c, b ), ( a, d, c ) ]
    in
    TriangularMesh.indexed verts
        (List.concat
            [ quad 0 1 2 3
            , quad 4 5 6 7
            , quad 0 1 5 4
            , quad 3 2 6 7
            , quad 1 2 6 5
            , quad 0 3 7 4
            ]
        )


gearTeeth : Float -> Int -> Float -> List (TriangularMesh (Point3d Meters BodyCoordinates))
gearTeeth gy n phase =
    List.range 0 (n - 1)
        |> List.map (\i -> toothMesh gy (pitchPerTooth * toFloat n) (phase + toFloat i * 2 * pi / toFloat n))


{-| Combine a gear's per-tooth meshes into one flat-shaded render mesh.
-}
gearTeethMesh : List (TriangularMesh (Point3d Meters BodyCoordinates)) -> Mesh.Uniform BodyCoordinates
gearTeethMesh meshes =
    Mesh.indexedFacets (TriangularMesh.combine meshes)


{-| Physics hub — below the tooth roots so meshing teeth can enter the gaps.
-}
gearHub : Float -> Int -> Cylinder3d Meters BodyCoordinates
gearHub gy n =
    Cylinder3d.centeredOn (Point3d.meters 0 gy 0)
        Direction3d.y
        { radius = Length.meters (pitchPerTooth * toFloat n - gearToothSize), length = Length.meters gearDepthY }


{-| Render rim — a disc up to the tooth root circle, so the teeth rise from it
like a real gear. Render only; the physics hub stays small so the mesh isn't
blocked.
-}
gearFaceHub : Float -> Int -> Cylinder3d Meters BodyCoordinates
gearFaceHub gy n =
    Cylinder3d.centeredOn (Point3d.meters 0 gy 0)
        Direction3d.y
        { radius = Length.meters (pitchPerTooth * toFloat n - toothDedendum), length = Length.meters (gearDepthY * 1.02) }



-- Wheel 1: pinion on the escape arbor


pinionTeeth : Int
pinionTeeth =
    8


pinionToothMeshes : List (TriangularMesh (Point3d Meters BodyCoordinates))
pinionToothMeshes =
    gearTeeth gear1Y pinionTeeth 0


pinionMesh : Mesh.Uniform BodyCoordinates
pinionMesh =
    gearTeethMesh pinionToothMeshes


pinionHub : Cylinder3d Meters BodyCoordinates
pinionHub =
    gearHub gear1Y pinionTeeth


pinionArbor : Cylinder3d Meters BodyCoordinates
pinionArbor =
    Cylinder3d.centeredOn (Point3d.meters 0 ((escapeY + gear1Y) / 2) 0)
        Direction3d.y
        { radius = Length.meters 0.07, length = Length.meters (abs (gear1Y - escapeY)) }



-- Wheel 2: intermediate compound gear on an offset axis


interBigTeeth : Int
interBigTeeth =
    62


interPinTeeth : Int
interPinTeeth =
    8


{-| Offset axis: pitch circles of (pinion, interBig) and (interPin, minute) are
both tangent here.
-}
intermediateCenter : Point3d Meters WorldCoordinates
intermediateCenter =
    Point3d.meters (pitchPerTooth * toFloat (pinionTeeth + interBigTeeth)) 0 0


interBigToothMeshes : List (TriangularMesh (Point3d Meters BodyCoordinates))
interBigToothMeshes =
    gearTeeth gear1Y interBigTeeth (pi / toFloat interBigTeeth)


interPinToothMeshes : List (TriangularMesh (Point3d Meters BodyCoordinates))
interPinToothMeshes =
    gearTeeth gear2Y interPinTeeth 0


interBigMesh : Mesh.Uniform BodyCoordinates
interBigMesh =
    gearTeethMesh interBigToothMeshes


interPinMesh : Mesh.Uniform BodyCoordinates
interPinMesh =
    gearTeethMesh interPinToothMeshes


interArbor : Cylinder3d Meters BodyCoordinates
interArbor =
    Cylinder3d.centeredOn (Point3d.meters 0 ((gear1Y + gear2Y) / 2) 0)
        Direction3d.y
        { radius = Length.meters 0.07, length = Length.meters (abs (gear2Y - gear1Y)) }



-- Wheel 3: minute wheel, concentric with the escape wheel


minuteTeeth : Int
minuteTeeth =
    62


minuteToothMeshes : List (TriangularMesh (Point3d Meters BodyCoordinates))
minuteToothMeshes =
    gearTeeth gear2Y minuteTeeth (pi / toFloat minuteTeeth)


minuteMesh : Mesh.Uniform BodyCoordinates
minuteMesh =
    gearTeethMesh minuteToothMeshes


minuteWheelRadius : Float
minuteWheelRadius =
    pitchPerTooth * toFloat minuteTeeth


{-| Spokes for the minute wheel — rendered instead of a solid face so the
escapement shows through its open centre (a 62-tooth wheel is big).
-}
minuteSpokes : List (Block3d Meters BodyCoordinates)
minuteSpokes =
    List.range 0 5
        |> List.map
            (\i ->
                Block3d.centeredOn
                    (Frame3d.atPoint (Point3d.meters 0 gear2Y (minuteWheelRadius / 2)))
                    ( Length.meters 0.05, Length.meters 0.04, Length.meters minuteWheelRadius )
                    |> Block3d.rotateAround Axis3d.y (Angle.radians (toFloat i * pi / 3))
            )


{-| The minute hand, fixed to the minute wheel (render only), in front of the
seconds hand and on the same axis.
-}
minutesHand : Block3d Meters BodyCoordinates
minutesHand =
    Block3d.centeredOn
        (Frame3d.atPoint (Point3d.meters 0 (gear2Y - 0.12) 0.4))
        ( Length.meters 0.06, Length.meters 0.05, Length.meters 1.2 )


minutesHandHub : Cylinder3d Meters BodyCoordinates
minutesHandHub =
    Cylinder3d.centeredOn (Point3d.meters 0 (gear2Y - 0.12) 0)
        Direction3d.y
        { radius = Length.meters 0.13, length = Length.meters 0.06 }


{-| Link-centre positions, in chain order, draped over the sprocket: up the
loaded (+X) side, over the top, down the slack (-X) side. All at y = sprocketY.
-}
chainPositions : List (Point3d Meters WorldCoordinates)
chainPositions =
    let
        loaded =
            List.range 1 loadedHang
                |> List.reverse
                |> List.map (\k -> Point3d.meters chainRideR sprocketY -(toFloat k * chainSpacing))

        wrapCount =
            round (pi * chainRideR / chainSpacing)

        wrap =
            List.range 0 wrapCount
                |> List.map
                    (\k ->
                        let
                            theta =
                                toFloat k / toFloat wrapCount * pi
                        in
                        Point3d.meters (chainRideR * cos theta) sprocketY (chainRideR * sin theta)
                    )

        slack =
            List.range 1 slackHang
                |> List.map (\k -> Point3d.meters -chainRideR sprocketY -(toFloat k * chainSpacing))
    in
    loaded ++ wrap ++ slack


lastLink : Int
lastLink =
    List.length chainPositions - 1


{-| The heavy weight hangs below the bottom link of the loaded (+X) strand.
-}
weightPosition : Point3d Meters WorldCoordinates
weightPosition =
    Point3d.meters chainRideR sprocketY -(toFloat (loadedHang + 1) * chainSpacing)


{-| The counterweight hangs below the bottom link of the slack (-X) strand.
-}
counterweightPosition : Point3d Meters WorldCoordinates
counterweightPosition =
    Point3d.meters -chainRideR sprocketY -(toFloat (slackHang + 1) * chainSpacing)


linkBody : Int -> Point3d Meters WorldCoordinates -> Body
linkBody index position =
    let
        -- Graded mass: heaviest at Link 0 (pinned to the weight), tapering to the
        -- light chain mass within a few links. Bridges the big weight↔link mass
        -- ratio the iterative solver can't resolve (which threw the loaded strand
        -- around). These links stay at the weight, so they don't swing the feed.
        kilograms =
            max 0.015 (0.1 * 0.5 ^ toFloat index)
    in
    -- A sphere, not a point mass: it makes several deep contacts (drum + the
    -- tooth flanks either side), which is what holds the chain against the stiff
    -- distance constraints — a single zero-depth point contact gets dragged through.
    Physics.sphere (Sphere3d.atOrigin (Length.meters linkRadius)) chainMaterial
        |> Physics.scaleMassTo (Mass.kilograms kilograms)
        |> lockToPlane
        |> Physics.moveTo position



-- BODIES --------------------------------------------------------------------


{-| Pin a body to the X/Z plane it starts in: it may only translate in X and Z
and rotate about Y. Keeps the whole mechanism 2D, so the chain can't drift off
the sprocket sideways and blow up.
-}
lockToPlane : Body -> Body
lockToPlane =
    Physics.lock [ Lock.translateY, Lock.rotateX, Lock.rotateZ ]


{-| Like `lockToPlane` for position (stays in the X/Z plane), but leaves rotation
free, so a hung weight can tumble/spin as it swings.
-}
lockWeight : Body -> Body
lockWeight =
    Physics.lock [ Lock.translateY ]


escapeMaterial : Material.Material Material.Dense
escapeMaterial =
    -- Low friction at the escapement faces, so the wheel can't statically
    -- hang on the pallets via friction.
    Material.dense
        { density = Density.kilogramsPerCubicMeter 3000
        , friction = 0.0
        , bounciness = 0.1
        }


{-| Frictionless and non-bouncy: the teeth drive the chain positively, so the
links need no friction — and friction/bounce only add stick-slip jitter.
-}
chainMaterial : Material.Material Material.Dense
chainMaterial =
    Material.dense
        { density = Density.kilogramsPerCubicMeter 7800
        , friction = 0.0
        , bounciness = 0.0
        }


wheelBody : Body
wheelBody =
    Physics.dynamic
        ([ ( Shape.cylinder 16 wheelHub, Material.steel )
         , ( Shape.cylinder 16 sprocketHub, Material.steel )
         , ( Shape.cylinder 8 wheelArbor, Material.steel )
         , ( Shape.cylinder 8 pinionArbor, Material.steel )
         , ( Shape.cylinder 16 pinionHub, Material.steel )
         ]
            ++ List.map (\t -> ( Shape.block t, escapeMaterial )) wheelTeeth
            ++ List.map (\t -> ( Shape.block t, Material.steel )) sprocketTeethBlocks
            ++ List.map (\t -> ( Shape.unsafeConvex t, escapeMaterial )) pinionToothMeshes
        )
        |> Physics.scaleMassTo (Mass.kilograms wheelMass)
        |> lockToPlane


intermediateBody : Body
intermediateBody =
    Physics.dynamic
        (( Shape.cylinder 16 (gearHub gear1Y interBigTeeth), Material.steel )
            :: ( Shape.cylinder 16 (gearHub gear2Y interPinTeeth), Material.steel )
            :: ( Shape.cylinder 8 interArbor, Material.steel )
            :: List.map (\t -> ( Shape.unsafeConvex t, escapeMaterial )) interBigToothMeshes
            ++ List.map (\t -> ( Shape.unsafeConvex t, escapeMaterial )) interPinToothMeshes
        )
        |> Physics.scaleMassTo (Mass.kilograms 0.3)
        |> lockToPlane
        |> Physics.moveTo intermediateCenter


minutesBody : Body
minutesBody =
    Physics.dynamic
        (( Shape.cylinder 16 (gearHub gear2Y minuteTeeth), Material.steel )
            :: List.map (\t -> ( Shape.unsafeConvex t, escapeMaterial )) minuteToothMeshes
        )
        |> Physics.scaleMassTo (Mass.kilograms 0.3)
        |> lockToPlane


pendulumBody : Body
pendulumBody =
    Physics.dynamic
        [ ( Shape.block palletLeft, escapeMaterial )
        , ( Shape.block palletRight, escapeMaterial )
        , ( Shape.block pendulumCrutch, Material.steel )
        , ( Shape.block pendulumRod, Material.steel )
        , ( Shape.cylinder 16 pendulumBob, Material.steel )
        ]
        |> Physics.scaleMassTo (Mass.kilograms pendulumMass)
        |> lockToPlane
        |> Physics.moveTo (Point3d.meters 0 0 pivotHeight)
        |> releasePendulum


releasePendulum : Body -> Body
releasePendulum =
    Physics.rotateAround
        (Axis3d.through (Point3d.meters 0 0 pivotHeight) Direction3d.y)
        (Angle.radians releaseAngle)


weightBody : Cylinder3d Meters BodyCoordinates -> Float -> Point3d Meters WorldCoordinates -> Body
weightBody cylinder kilograms position =
    Physics.dynamic [ ( Shape.cylinder 12 cylinder, Material.steel ) ]
        |> Physics.scaleMassTo (Mass.kilograms kilograms)
        |> lockWeight
        |> Physics.moveTo position


initialBodies : List ( Id, Body )
initialBodies =
    let
        links =
            chainPositions
                |> List.indexedMap (\i position -> ( Link i, linkBody i position ))
    in
    -- Zero damping everywhere except a little on the pendulum. A frictionless
    -- pendulum would accumulate the escapement's per-beat impulse without bound
    -- (amplitude grows until the pallets over-travel and skip a tooth); a small
    -- loss lets it settle at a steady amplitude, which the escapement replaces —
    -- so the clock still doesn't wind down.
    List.map
        (\( id, body ) ->
            case id of
                Pendulum ->
                    ( id, Physics.damp { linear = 0, angular = 0.04 } body )

                Link _ ->
                    -- Models a real chain's link-to-link friction, which our
                    -- frictionless chain lacks: settles the swing/jitter of the
                    -- long loaded strand. Doesn't affect timekeeping (the links
                    -- aren't the oscillator).
                    ( id, Physics.damp { linear = 0.2, angular = 0.2 } body )

                _ ->
                    ( id, Physics.damp { linear = 0, angular = 0 } body )
        )
        (( Frame, Physics.static [] )
            :: ( Wheel, wheelBody )
            :: ( Pendulum, pendulumBody )
            :: ( Intermediate, intermediateBody )
            :: ( Minutes, minutesBody )
            :: ( Weight, weightBody weightCylinder weightMass weightPosition )
            :: ( Counterweight, weightBody counterweightCylinder counterweightMass counterweightPosition )
            :: links
        )



-- CONSTRAINTS / COLLISION ---------------------------------------------------


constrain : Id -> Maybe (Id -> List Constraint)
constrain id1 =
    case id1 of
        Frame ->
            Just
                (\id2 ->
                    case id2 of
                        Wheel ->
                            [ aboutY (Point3d.meters 0 0 0) ]

                        Pendulum ->
                            [ aboutY (Point3d.meters 0 0 pivotHeight) ]

                        Intermediate ->
                            [ aboutY intermediateCenter ]

                        Minutes ->
                            [ aboutY (Point3d.meters 0 0 0) ]

                        _ ->
                            []
                )

        Link i ->
            Just
                (\id2 ->
                    case id2 of
                        Link j ->
                            if j == i + 1 then
                                [ Constraint.distance (Length.meters chainSpacing) ]

                            else
                                []

                        Weight ->
                            -- Link 0 is the bottom of the loaded strand.
                            if i == 0 then
                                [ Constraint.distance (Length.meters chainSpacing) ]

                            else
                                []

                        Counterweight ->
                            -- lastLink is the bottom of the slack strand.
                            if i == lastLink then
                                [ Constraint.distance (Length.meters chainSpacing) ]

                            else
                                []

                        _ ->
                            []
                )

        _ ->
            Nothing


{-| A hinge about the +Y axis through `point` (on the frame) connecting to the
other body's own origin.
-}
aboutY : Point3d Meters WorldCoordinates -> Constraint
aboutY point =
    Constraint.hinge
        (Axis3d.through (pointInFrame point) Direction3d.y)
        (Axis3d.through Point3d.origin Direction3d.y)


pointInFrame : Point3d Meters WorldCoordinates -> Point3d Meters BodyCoordinates
pointInFrame point =
    -- The frame is static at the origin, so world and frame coordinates align.
    Point3d.fromMeters (Point3d.toMeters point)


collide : Id -> Id -> Bool
collide a b =
    -- The escapement contact (wheel teeth vs pallets) and the chain meshing the
    -- sprocket. Links don't fight each other or the weight (constraints hold
    -- those), and nothing else collides.
    let
        isLink id =
            case id of
                Link _ ->
                    True

                _ ->
                    False
    in
    -- escapement + chain on the wheel; the two gear meshes of the motion work.
    (a == Wheel && (b == Pendulum || b == Intermediate || isLink b))
        || (b == Wheel && (a == Pendulum || a == Intermediate || isLink a))
        || (a == Intermediate && b == Minutes)
        || (b == Intermediate && a == Minutes)



-- MODEL ---------------------------------------------------------------------


type alias Model =
    { prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , timestep : Timestep
    , azimuth : Angle.Angle
    , elevation : Angle.Angle
    , orbiting : Bool
    , dragged : Bool
    }


type Msg
    = Tick Duration.Duration
    | Resize Int Int
    | MouseDown
    | MouseMove Float Float
    | MouseUp


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
    , timestep = Timestep.init { duration = Duration.seconds (1 / 60), maxSteps = 2 }
    , azimuth = Angle.degrees -90
    , elevation = Angle.degrees 0
    , orbiting = False
    , dragged = False
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

        MouseDown ->
            { model | orbiting = True, dragged = False }

        MouseMove dx dy ->
            if model.orbiting then
                { model
                    | dragged = True
                    , azimuth = model.azimuth |> Quantity.minus (Angle.degrees (dx * 0.3))
                    , elevation =
                        model.elevation
                            |> Quantity.plus (Angle.degrees (dy * 0.3))
                            |> Quantity.clamp (Angle.degrees -85) (Angle.degrees 85)
                }

            else
                model

        MouseUp ->
            if model.dragged then
                -- finished an orbit drag; leave the sim running
                { model | orbiting = False }

            else
                -- a plain click resets the mechanism to its starting pose
                { model
                    | orbiting = False
                    , prevBodies = initialBodies
                    , bodies = initialBodies
                    , contacts = Physics.emptyContacts
                }


simulateStep : Model -> Model
simulateStep model =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | duration = Timestep.duration model.timestep
                    , constrain = constrain
                    , collide = collide
                    , contacts = model.contacts

                    -- Cover the longest the loaded strand gets, so the wrap
                    -- contacts resolve and the chain doesn't drag through the
                    -- drum once half spent.
                    , solverIterations = loadedHang + slackHang + 12
                }
                model.bodies
    in
    { model
        | prevBodies = model.bodies
        , bodies = newBodies
        , contacts = newContacts
    }



-- VIEW ----------------------------------------------------------------------


{-| Orbiting camera: azimuth/elevation are dragged with the mouse, around a
focal point at the clock's centre. Up is +Z, so it orbits around the vertical.
-}
camera : Model -> Camera3d Meters WorldCoordinates
camera model =
    Camera3d.orbitZ
        { focalPoint = Point3d.meters 0 0 -0.5
        , azimuth = model.azimuth
        , elevation = model.elevation
        , distance = Length.meters 15.3
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 28)
        }


view : Model -> Html Msg
view ({ prevBodies, bodies, dimensions, timestep, orbiting } as model) =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        , Html.Attributes.style "cursor"
            (if orbiting then
                "grabbing"

             else
                "grab"
            )
        , Html.Events.onMouseDown MouseDown
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 70) (Angle.degrees -23)
            , shadows = False
            , camera = camera model
            , dimensions = dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                bracketEntity
                    :: dialEntity
                    :: List.map2 (bodyEntity timestep) prevBodies bodies
            }
        ]


bodyEntity : Timestep -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity timestep ( _, prev ) ( id, curr ) =
    Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr) <|
        case id of
            Frame ->
                -- Static at the origin; drawn directly in world coordinates.
                Scene3d.nothing

            Wheel ->
                Scene3d.group
                    ([ Scene3d.cylinderWithShadow steelMaterial wheelHub
                     , Scene3d.cylinderWithShadow sprocketMaterial sprocketHub
                     , Scene3d.cylinderWithShadow steelMaterial wheelArbor
                     , Scene3d.cylinderWithShadow steelMaterial pinionArbor
                     , Scene3d.cylinderWithShadow gearTintC (gearFaceHub gear1Y pinionTeeth)
                     , Scene3d.blockWithShadow handMaterial secondsHand
                     , Scene3d.cylinderWithShadow handMaterial secondsHandHub
                     ]
                        ++ List.map (Scene3d.blockWithShadow steelMaterial) wheelTeeth
                        ++ List.map (Scene3d.blockWithShadow sprocketMaterial) sprocketTeethBlocks
                        ++ [ Scene3d.mesh gearTintC pinionMesh ]
                    )

            Pendulum ->
                Scene3d.group
                    [ Scene3d.cylinderWithShadow brassMaterial anchorArbor
                    , Scene3d.cylinderWithShadow brassMaterial (lockConnector palletLeft)
                    , Scene3d.cylinderWithShadow brassMaterial (lockConnector palletRight)
                    , Scene3d.blockWithShadow brassMaterial palletLeftRender
                    , Scene3d.blockWithShadow brassMaterial palletRightRender
                    , Scene3d.blockWithShadow brassMaterial pendulumRod
                    , Scene3d.cylinderWithShadow brassMaterial pendulumBob
                    ]

            Intermediate ->
                Scene3d.group
                    [ Scene3d.cylinderWithShadow gearTintA (gearFaceHub gear1Y interBigTeeth)
                    , Scene3d.mesh gearTintA interBigMesh
                    , Scene3d.cylinderWithShadow gearTintD (gearFaceHub gear2Y interPinTeeth)
                    , Scene3d.mesh gearTintD interPinMesh
                    , Scene3d.cylinderWithShadow steelMaterial interArbor
                    ]

            Minutes ->
                Scene3d.group
                    (Scene3d.blockWithShadow darkMaterial minutesHand
                        :: Scene3d.cylinderWithShadow darkMaterial minutesHandHub
                        :: List.map (Scene3d.blockWithShadow gearTintB) minuteSpokes
                        ++ [ Scene3d.mesh gearTintB minuteMesh ]
                    )

            Weight ->
                Scene3d.cylinderWithShadow brassMaterial weightCylinder

            Counterweight ->
                Scene3d.cylinderWithShadow darkMaterial counterweightCylinder

            Link _ ->
                Scene3d.sphereWithShadow brassMaterial
                    (Sphere3d.atOrigin (Length.meters linkRadius))


{-| The frame is static at the origin, so its decorative parts are just drawn
in world coordinates: the pivot bracket and the wheel arbor.
-}
bracketEntity : Entity WorldCoordinates
bracketEntity =
    Scene3d.sphere darkMaterial
        (Sphere3d.atPoint (Point3d.meters 0 0 0) (Length.meters 0.12))


{-| Static clock face: 12 hour ticks the concentric hands sweep over, just in
front of the gear train. Cardinal ticks (12, 3, 6, 9) are longer.
-}
dialEntity : Entity WorldCoordinates
dialEntity =
    Scene3d.group
        (List.range 0 11
            |> List.map
                (\i ->
                    let
                        cardinal =
                            modBy 3 i == 0

                        len =
                            if cardinal then
                                0.24

                            else
                                0.13

                        wid =
                            if cardinal then
                                0.06

                            else
                                0.035
                    in
                    Scene3d.block darkMaterial
                        (Block3d.centeredOn
                            (Frame3d.atPoint (Point3d.meters 0 (gear2Y - 0.05) (1.05 - len / 2)))
                            ( Length.meters wid, Length.meters 0.04, Length.meters len )
                            |> Block3d.rotateAround Axis3d.y (Angle.radians (toFloat i * pi / 6))
                        )
                )
        )


steelMaterial : SceneMaterial.Material coordinates { a | normals : () }
steelMaterial =
    SceneMaterial.metal { baseColor = Color.rgb255 158 168 182, roughness = 0.4 }


brassMaterial : SceneMaterial.Material coordinates { a | normals : () }
brassMaterial =
    SceneMaterial.metal { baseColor = Color.rgb255 214 170 90, roughness = 0.35 }


darkMaterial : SceneMaterial.Material coordinates { a | normals : () }
darkMaterial =
    SceneMaterial.nonmetal { baseColor = Color.rgb255 60 60 66, roughness = 0.6 }


sprocketMaterial : SceneMaterial.Material coordinates { a | normals : () }
sprocketMaterial =
    SceneMaterial.nonmetal { baseColor = Color.rgb255 125 128 135, roughness = 0.55 }


handMaterial : SceneMaterial.Material coordinates { a | normals : () }
handMaterial =
    SceneMaterial.nonmetal { baseColor = Color.rgb255 170 55 45, roughness = 0.5 }


{-| Intermediate gear tint — cool steel.
-}
gearTintA : SceneMaterial.Material coordinates { a | normals : () }
gearTintA =
    SceneMaterial.metal { baseColor = Color.rgb255 126 148 180, roughness = 0.4 }


{-| Minute wheel tint — warm bronze.
-}
gearTintB : SceneMaterial.Material coordinates { a | normals : () }
gearTintB =
    SceneMaterial.metal { baseColor = Color.rgb255 196 158 110, roughness = 0.4 }


{-| Escape pinion tint — verdigris green.
-}
gearTintC : SceneMaterial.Material coordinates { a | normals : () }
gearTintC =
    SceneMaterial.metal { baseColor = Color.rgb255 126 148 180, roughness = 0.4 }


gearTintD : SceneMaterial.Material coordinates { a | normals : () }
gearTintD =
    SceneMaterial.metal { baseColor = Color.rgb255 182 192 206, roughness = 0.4 }


decodeMouseMove : Json.Decode.Decoder Msg
decodeMouseMove =
    Json.Decode.map2 MouseMove
        (Json.Decode.field "movementX" Json.Decode.float)
        (Json.Decode.field "movementY" Json.Decode.float)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
        , if model.orbiting then
            Sub.batch
                [ Browser.Events.onMouseMove decodeMouseMove
                , Browser.Events.onMouseUp (Json.Decode.succeed MouseUp)
                ]

          else
            Sub.none
        ]
