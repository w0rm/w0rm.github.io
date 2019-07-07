module Font.Mesh
    exposing
        ( Attributes2d
        , Attributes3d
        , glyph2d
        , glyph3d
          -- temporary export for the sort demo
        , mesh3d
        )

import Font.Glyph as Glyph exposing (Glyph)
import Font.PathCommand as PathCommand exposing (PathCommand)
import Math.Vector3 as Vec3 exposing (Vec3, vec3)
import Point2d exposing (Point2d)
import WebGL exposing (Mesh)


type alias Attributes3d =
    { position : Vec3
    , normal : Vec3
    }


type alias Attributes2d =
    { position : Vec3
    }


glyph2d : Glyph -> Mesh Attributes2d
glyph2d glyph =
    glyph.path
        |> PathCommand.parse
        |> Maybe.withDefault []
        |> List.map (PathCommand.pathToPolygon 10)
        |> mesh2d


glyph3d : Glyph -> Mesh Attributes3d
glyph3d glyph =
    glyph.path
        |> PathCommand.parse
        |> Maybe.withDefault []
        |> List.map (PathCommand.pathToPolygon 10)
        |> mesh3d


{-| Generate a mesh for 2d text rendering. Y is pointing down.
-}
mesh2d : List (List Point2d) -> Mesh Attributes2d
mesh2d outlines =
    List.foldl
        (\( p1, p2, p3 ) ->
            let
                ( x1, y1 ) =
                    Point2d.coordinates p1

                ( x2, y2 ) =
                    Point2d.coordinates p2

                ( x3, y3 ) =
                    Point2d.coordinates p3
            in
            (::)
                ( { position = vec3 x1 y1 0 }
                , { position = vec3 x2 y2 0 }
                , { position = vec3 x3 y3 0 }
                )
        )
        []
        (PathCommand.triangulate outlines)
        |> WebGL.triangles


mesh3d : List (List Point2d) -> Mesh Attributes3d
mesh3d outlines =
    let
        triangles =
            PathCommand.triangulate outlines

        edges =
            List.foldl
                (\outline ->
                    case outline of
                        first :: second :: third :: rest ->
                            edgesHelp first second third outline

                        _ ->
                            identity
                )
                []
                outlines
    in
    List.foldl
        (\( p1, p2, p3 ) ->
            let
                ( x1, y1 ) =
                    Point2d.coordinates p1

                ( x2, y2 ) =
                    Point2d.coordinates p2

                ( x3, y3 ) =
                    Point2d.coordinates p3
            in
            (++)
                [ ( { position = vec3 x2 y2 -0.5, normal = frontNormal }
                  , { position = vec3 x3 y3 -0.5, normal = frontNormal }
                  , { position = vec3 x1 y1 -0.5, normal = frontNormal }
                  )
                , ( { position = vec3 x1 y1 0.5, normal = backNormal }
                  , { position = vec3 x3 y3 0.5, normal = backNormal }
                  , { position = vec3 x2 y2 0.5, normal = backNormal }
                  )
                ]
        )
        edges
        triangles
        |> WebGL.triangles


frontNormal : Vec3
frontNormal =
    vec3 0 0 -1


backNormal : Vec3
backNormal =
    vec3 0 0 1


edgesHelp :
    Point2d
    -> Point2d
    -> Point2d
    -> List Point2d
    -> List ( Attributes3d, Attributes3d, Attributes3d )
    -> List ( Attributes3d, Attributes3d, Attributes3d )
edgesHelp first second third points result =
    case points of
        p0 :: p1 :: p2 :: p3 :: rest ->
            edgesHelp
                first
                second
                third
                (p1 :: p2 :: p3 :: rest)
                (addEdgeVertices p0 p1 p2 p3 result)

        p0 :: p1 :: p2 :: [] ->
            edgesHelp
                first
                second
                third
                [ p1, p2 ]
                (addEdgeVertices p0 p1 p2 first result)

        p0 :: p1 :: [] ->
            edgesHelp
                first
                second
                third
                [ p1 ]
                (addEdgeVertices p0 p1 first second result)

        p0 :: [] ->
            addEdgeVertices p0 first second third result

        _ ->
            result


addEdgeVertices : Point2d -> Point2d -> Point2d -> Point2d -> List ( Attributes3d, Attributes3d, Attributes3d ) -> List ( Attributes3d, Attributes3d, Attributes3d )
addEdgeVertices p0 p1 p2 p3 =
    let
        ( x1, y1 ) =
            Point2d.coordinates p1

        n1 =
            edgeNormal p0 p1 p2

        ( x2, y2 ) =
            Point2d.coordinates p2

        n2 =
            edgeNormal p1 p2 p3
    in
    (++)
        [ ( { position = vec3 x2 y2 -0.5, normal = n2 }
          , { position = vec3 x1 y1 -0.5, normal = n1 }
          , { position = vec3 x2 y2 0.5, normal = n2 }
          )
        , ( { position = vec3 x2 y2 0.5, normal = n2 }
          , { position = vec3 x1 y1 -0.5, normal = n1 }
          , { position = vec3 x1 y1 0.5, normal = n1 }
          )
        ]


edgeNormal : Point2d -> Point2d -> Point2d -> Vec3
edgeNormal p0 p1 p2 =
    let
        ( x0, y0 ) =
            Point2d.coordinates p0

        ( x1, y1 ) =
            Point2d.coordinates p1

        ( x2, y2 ) =
            Point2d.coordinates p2

        n1 =
            Vec3.normalize (vec3 (y1 - y0) -(x1 - x0) 0)

        n2 =
            Vec3.normalize (vec3 (y2 - y1) -(x2 - x1) 0)
    in
    Vec3.add n1 n2 |> Vec3.scale 0.5
