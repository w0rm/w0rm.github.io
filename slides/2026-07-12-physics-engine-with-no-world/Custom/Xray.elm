module Custom.Xray exposing
    ( blockWireframe
    , comColor
    , comDot
    , ellipsoidColor
    , inertiaEllipsoid
    , maxInvInertia
    , outlineColor
    , sphereWireframe
    , voidColor
    )

{-| The "engine's view" of a body, shared by the Act II demos:
wireframe outlines, the derived center of mass, and the Poinsot inertia
ellipsoid (radius ∝ √(inverse inertia) along each principal axis — the
bigger the ellipsoid, the easier the body spins).

The ellipsoid and the center of mass are built in body coordinates from
the engine's own derived data (`centerOfMassTransform3d`, `invInertia`),
so an entity can be placed with the same interpolated frame as the body
it belongs to.

-}

import Block3d exposing (Block3d)
import Color exposing (Color)
import Internal.Transform3d
import Length exposing (Meters)
import LineSegment3d exposing (LineSegment3d)
import Physics exposing (BodyCoordinates)
import Physics.Types
import Point3d exposing (Point3d)
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Scene3d.Mesh
import Sphere3d exposing (Sphere3d)


outlineColor : Color
outlineColor =
    Color.rgb255 110 110 115


voidColor : Color
voidColor =
    Color.rgb255 158 200 239


ellipsoidColor : Color
ellipsoidColor =
    Color.rgb255 47 111 237


comColor : Color
comColor =
    Color.rgb255 216 27 27


{-| The largest inverse-inertia component of a body — pass the same value
to `inertiaEllipsoid` for every body in a scene to draw all ellipsoids at
a shared scale, so "easier to spin" reads as "bigger".
-}
maxInvInertia : Physics.Body -> Float
maxInvInertia (Physics.Types.Body internal) =
    max internal.invInertia.x (max internal.invInertia.y internal.invInertia.z)


{-| A dot at the derived center of mass, in body coordinates.
-}
comDot : Float -> Physics.Body -> Entity BodyCoordinates
comDot radius (Physics.Types.Body internal) =
    let
        com =
            Internal.Transform3d.originPoint internal.centerOfMassTransform3d
    in
    Scene3d.sphere
        (Material.color comColor)
        (Sphere3d.atPoint (Point3d.meters com.x com.y com.z) (Length.meters radius))


{-| Three cross-section loops of the Poinsot inertia ellipsoid in the
principal planes, in body coordinates. `radius` is the loop radius that
corresponds to `normInv` (the shared normalization constant).
-}
inertiaEllipsoid : { radius : Float, normInv : Float } -> Physics.Body -> Entity BodyCoordinates
inertiaEllipsoid { radius, normInv } (Physics.Types.Body internal) =
    let
        com =
            Internal.Transform3d.originPoint internal.centerOfMassTransform3d

        m =
            Internal.Transform3d.orientation internal.centerOfMassTransform3d

        -- principal axes of inertia, in body coordinates
        ( ax, ay, az ) =
            ( { x = m.m11, y = m.m21, z = m.m31 }
            , { x = m.m12, y = m.m22, z = m.m32 }
            , { x = m.m13, y = m.m23, z = m.m33 }
            )

        -- Poinsot radius along each principal axis
        ( rx, ry, rz ) =
            ( radius * sqrt (internal.invInertia.x / normInv)
            , radius * sqrt (internal.invInertia.y / normInv)
            , radius * sqrt (internal.invInertia.z / normInv)
            )

        at r1 axis1 r2 axis2 angle =
            Point3d.meters
                (com.x + r1 * cos angle * axis1.x + r2 * sin angle * axis2.x)
                (com.y + r1 * cos angle * axis1.y + r2 * sin angle * axis2.y)
                (com.z + r1 * cos angle * axis1.z + r2 * sin angle * axis2.z)
    in
    Scene3d.mesh
        (Material.color ellipsoidColor)
        (Scene3d.Mesh.lineSegments
            (loop (at rx ax ry ay) ++ loop (at rx ax rz az) ++ loop (at ry ay rz az))
        )


{-| The 12 edges of an axis-aligned block.
-}
blockWireframe : Color -> Block3d Meters BodyCoordinates -> Entity BodyCoordinates
blockWireframe color block =
    let
        ( sx, sy, sz ) =
            Block3d.dimensions block

        c =
            Point3d.toMeters (Block3d.centerPoint block)

        ( hx, hy, hz ) =
            ( Length.inMeters sx / 2, Length.inMeters sy / 2, Length.inMeters sz / 2 )

        corner x y z =
            Point3d.meters (c.x + x * hx) (c.y + y * hy) (c.z + z * hz)

        edge ( x1, y1, z1 ) ( x2, y2, z2 ) =
            LineSegment3d.from (corner x1 y1 z1) (corner x2 y2 z2)
    in
    Scene3d.mesh
        (Material.color color)
        (Scene3d.Mesh.lineSegments
            [ edge ( -1, -1, -1 ) ( 1, -1, -1 )
            , edge ( -1, 1, -1 ) ( 1, 1, -1 )
            , edge ( -1, -1, 1 ) ( 1, -1, 1 )
            , edge ( -1, 1, 1 ) ( 1, 1, 1 )
            , edge ( -1, -1, -1 ) ( -1, 1, -1 )
            , edge ( 1, -1, -1 ) ( 1, 1, -1 )
            , edge ( -1, -1, 1 ) ( -1, 1, 1 )
            , edge ( 1, -1, 1 ) ( 1, 1, 1 )
            , edge ( -1, -1, -1 ) ( -1, -1, 1 )
            , edge ( 1, -1, -1 ) ( 1, -1, 1 )
            , edge ( -1, 1, -1 ) ( -1, 1, 1 )
            , edge ( 1, 1, -1 ) ( 1, 1, 1 )
            ]
        )


{-| Three orthogonal circles through a sphere's center.
-}
sphereWireframe : Color -> Sphere3d Meters BodyCoordinates -> Entity BodyCoordinates
sphereWireframe color sphere =
    let
        c =
            Point3d.toMeters (Sphere3d.centerPoint sphere)

        r =
            Length.inMeters (Sphere3d.radius sphere)
    in
    Scene3d.mesh
        (Material.color color)
        (Scene3d.Mesh.lineSegments
            (loop (\a -> Point3d.meters (c.x + r * cos a) (c.y + r * sin a) c.z)
                ++ loop (\a -> Point3d.meters (c.x + r * cos a) c.y (c.z + r * sin a))
                ++ loop (\a -> Point3d.meters c.x (c.y + r * cos a) (c.z + r * sin a))
            )
        )


{-| A closed loop of 48 line segments through the parametrized points.
-}
loop : (Float -> Point3d Meters BodyCoordinates) -> List (LineSegment3d Meters BodyCoordinates)
loop toPoint =
    List.map
        (\i ->
            LineSegment3d.from
                (toPoint (2 * pi * toFloat i / 48))
                (toPoint (2 * pi * toFloat (i + 1) / 48))
        )
        (List.range 0 47)
