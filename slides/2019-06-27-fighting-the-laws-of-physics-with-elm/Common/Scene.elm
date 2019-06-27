module Common.Scene exposing (view)

import Common.Camera as Camera exposing (Camera)
import Common.Math as Math
import Common.Meshes as Meshes exposing (Attributes, Meshes)
import Common.Settings exposing (Settings)
import Common.Shaders as Shaders
import Html exposing (Html)
import Html.Attributes as Attributes
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3)
import Physics.Body as Body exposing (Body)
import Physics.Debug as Debug
import Physics.World as World exposing (RaycastResult, World)
import WebGL exposing (Entity)


type alias Params a =
    { settings : Settings
    , lightDirection : { x : Float, y : Float, z : Float }
    , world : World a
    , camera : Camera
    , meshes : a -> Meshes
    , raycastResult : Maybe (RaycastResult a)
    , floorOffset : Maybe { x : Float, y : Float, z : Float }
    }


view : Params a -> Html msg
view { lightDirection, settings, world, floorOffset, camera, raycastResult, meshes } =
    let
        lightDirection_ =
            Vec3.normalize (Vec3.fromRecord lightDirection)

        sceneParams =
            { lightDirection = lightDirection_
            , camera = camera
            , debugWireframes = settings.debugWireframes
            , debugNormals = settings.debugNormals
            , debugEdges = settings.debugEdges
            , raycastResult = raycastResult
            , meshes = meshes
            , shadow =
                Maybe.map
                    (\offset ->
                        Math.makeShadow
                            (Vec3.fromRecord offset)
                            Vec3.k
                            lightDirection_
                    )
                    floorOffset
            }
    in
    WebGL.toHtmlWith
        [ WebGL.depth 1
        , WebGL.alpha True
        , WebGL.antialias
        , WebGL.clearColor 0.2 0.2 0.2 1
        ]
        [ Attributes.width (round camera.width)
        , Attributes.height (round camera.height)
        , Attributes.style "display" "block"
        ]
        ([ ( True
           , \entities -> List.foldl (addBodyEntities sceneParams) entities (World.getBodies world)
           )
         , ( settings.debugContacts
           , \entities -> List.foldl (addContactIndicator sceneParams) entities (Debug.getContacts world)
           )
         ]
            |> List.filter Tuple.first
            |> List.map Tuple.second
            |> List.foldl (<|) []
        )


type alias SceneParams a =
    { lightDirection : Vec3
    , camera : Camera
    , debugWireframes : Bool
    , debugNormals : Bool
    , debugEdges : Bool
    , shadow : Maybe Mat4
    , raycastResult : Maybe (RaycastResult a)
    , meshes : a -> Meshes
    }


addBodyEntities : SceneParams a -> Body a -> List Entity -> List Entity
addBodyEntities ({ meshes, lightDirection, shadow, camera, debugWireframes, debugEdges, debugNormals, raycastResult } as sceneParams) body entities =
    let
        transform =
            Mat4.fromRecord (Body.getTransformation body)

        addEdges acc =
            if debugEdges then
                List.foldl (addEdgeIndicator sceneParams transform)
                    acc
                    (Debug.getUniqueEdges body)

            else
                acc

        color =
            Vec3.vec3 0.9 0.9 0.9

        normals =
            case raycastResult of
                Just res ->
                    if Body.getData res.body == Body.getData body then
                        [ { normal = res.normal, point = res.point } ]

                    else
                        []

                Nothing ->
                    []

        addNormals acc =
            if debugNormals then
                List.foldl (addNormalIndicator sceneParams transform)
                    acc
                    (normals ++ Debug.getFaceNormals body)

            else
                acc

        { mesh, wireframe } =
            meshes (Body.getData body)
    in
    entities
        |> addEdges
        |> addNormals
        |> (if debugWireframes then
                (::)
                    (WebGL.entity
                        Shaders.vertex
                        Shaders.wireframeFragment
                        wireframe
                        { camera = camera.cameraTransform
                        , perspective = camera.perspectiveTransform
                        , color = color
                        , lightDirection = lightDirection
                        , transform = transform
                        }
                    )

            else
                (::)
                    (WebGL.entity
                        Shaders.vertex
                        Shaders.fragment
                        mesh
                        { camera = camera.cameraTransform
                        , perspective = camera.perspectiveTransform
                        , color = color
                        , lightDirection = lightDirection
                        , transform = transform
                        }
                    )
           )
        |> (case ( shadow, debugWireframes ) of
                ( Just shadowTransform, False ) ->
                    (::)
                        (WebGL.entity
                            Shaders.vertex
                            Shaders.shadowFragment
                            mesh
                            { camera = camera.cameraTransform
                            , perspective = camera.perspectiveTransform
                            , color = Vec3.vec3 0.15 0.15 0.15
                            , lightDirection = lightDirection
                            , transform = Mat4.mul shadowTransform transform
                            }
                        )

                _ ->
                    identity
           )


{-| Render collision point for the purpose of debugging
-}
addContactIndicator : SceneParams a -> { x : Float, y : Float, z : Float } -> List Entity -> List Entity
addContactIndicator { lightDirection, camera } { x, y, z } tail =
    WebGL.entity
        Shaders.vertex
        Shaders.fragment
        Meshes.contact
        { camera = camera.cameraTransform
        , perspective = camera.perspectiveTransform
        , color = Vec3.vec3 1 1 1
        , lightDirection = lightDirection
        , transform = Mat4.makeTranslate3 x y z
        }
        :: tail


{-| Render shape face normals for the purpose of debugging
-}
addNormalIndicator : SceneParams a -> Mat4 -> { normal : { x : Float, y : Float, z : Float }, point : { x : Float, y : Float, z : Float } } -> List Entity -> List Entity
addNormalIndicator { lightDirection, camera } transform { normal, point } tail =
    WebGL.entity
        Shaders.vertex
        Shaders.fragment
        Meshes.normal
        { camera = camera.cameraTransform
        , perspective = camera.perspectiveTransform
        , lightDirection = lightDirection
        , color = Vec3.vec3 1 1 1
        , transform =
            Math.makeRotateKTo (Vec3.fromRecord normal)
                |> Mat4.mul
                    (Vec3.fromRecord point
                        |> Mat4.makeTranslate
                        |> Mat4.mul transform
                    )
        }
        :: tail


{-| Render shapes' unique edge for the purpose of debugging
-}
addEdgeIndicator : SceneParams a -> Mat4 -> { direction : { x : Float, y : Float, z : Float }, point : { x : Float, y : Float, z : Float } } -> List Entity -> List Entity
addEdgeIndicator { lightDirection, camera } transform { direction, point } tail =
    WebGL.entity
        Shaders.vertex
        Shaders.fragment
        Meshes.edge
        { camera = camera.cameraTransform
        , perspective = camera.perspectiveTransform
        , lightDirection = lightDirection
        , color = Vec3.vec3 1 1 1
        , transform =
            Math.makeRotateKTo (Vec3.fromRecord direction)
                |> Mat4.mul
                    (Vec3.fromRecord point
                        |> Mat4.makeTranslate
                        |> Mat4.mul transform
                    )
        }
        :: tail
