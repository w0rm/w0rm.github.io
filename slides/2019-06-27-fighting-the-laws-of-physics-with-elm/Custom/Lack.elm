module Custom.Lack exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

import Common.Camera as Camera exposing (Camera)
import Common.Events as Events
import Common.Meshes as Meshes exposing (Meshes)
import Common.Scene as Scene
import Common.Settings as Settings exposing (Settings, settings)
import Html exposing (Html)
import Math.Matrix4 as Mat4 exposing (Mat4)
import Math.Vector3 as Vec3 exposing (Vec3)
import Physics.Body as Body exposing (Body)
import Physics.Constraint as Constraint
import Physics.Shape as Shape exposing (Shape)
import Physics.World as World exposing (RaycastResult, World)


type alias Options =
    { width : Float
    , height : Float
    }


{-| Each body should have a unique id,
so that we can later tell which one was selected!
-}
type Id
    = Mouse
    | Floor
    | Box Int


type alias Data =
    { meshes : Meshes
    , id : Id
    }


type alias Model =
    { world : World Data
    , camera : Camera
    , selection : Maybe Selection
    , size : Maybe { width : Float, height : Float }
    }


type alias Selection =
    { raycastResult : RaycastResult Data
    , direction : { x : Float, y : Float, z : Float }
    }


type Msg
    = Tick Float
    | Resize Float Float
    | MouseDown { x : Float, y : Float, z : Float }
    | MouseMove { x : Float, y : Float, z : Float }
    | MouseUp { x : Float, y : Float, z : Float }


initial : Options -> Model
initial { width, height } =
    { world = initialWorld
    , camera =
        Camera.camera
            { from = { x = 15, y = 25, z = 15 }
            , to = { x = 1, y = -6, z = 0 }
            }
            |> Camera.resize width height
    , selection = Nothing
    , size = Nothing
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick _ ->
            ( { model | world = World.simulate (1000 / 60) model.world }
            , case model.size of
                Just _ ->
                    Cmd.none

                Nothing ->
                    Events.measureSize Resize
            )

        Resize width height ->
            ( { model | size = Just { width = width, height = height } }
            , Cmd.none
            )

        MouseDown direction ->
            case
                World.raycast
                    { from = model.camera.from
                    , direction = direction
                    }
                    model.world
            of
                Just raycastResult ->
                    -- create temporary body and constrain it
                    -- with selected body
                    let
                        worldPosition =
                            raycastResult.point
                                |> Vec3.fromRecord
                                |> Mat4.transform (Mat4.fromRecord (Body.getTransformation raycastResult.body))
                                |> Vec3.toRecord
                    in
                    ( { model
                        | selection =
                            Just
                                { raycastResult = raycastResult
                                , direction = direction
                                }
                        , world =
                            model.world
                                |> World.add (Body.setPosition worldPosition mouse)
                                |> World.constrain
                                    (\b1 b2 ->
                                        if (Body.getData b1).id == Mouse && (Body.getData b2).id == (Body.getData raycastResult.body).id then
                                            [ Constraint.pointToPoint
                                                { pivot1 = { x = 0, y = 0, z = 0 }
                                                , pivot2 = raycastResult.point
                                                }
                                            ]

                                        else
                                            []
                                    )
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        MouseMove newDirection ->
            case model.selection of
                -- move the mouse
                Just { raycastResult, direction } ->
                    let
                        -- the new position is an intersection
                        -- of the newDirection from the camera and a plane,
                        -- that is defined by a normal = previous mouse direction
                        -- and a point from the raycastResult
                        -- https://samsymons.com/blog/math-notes-ray-plane-intersection/
                        r0 =
                            model.camera.from

                        p0 =
                            -- Transform local point on body into world coordinates
                            Mat4.transform
                                (Mat4.fromRecord (Body.getTransformation raycastResult.body))
                                (Vec3.fromRecord raycastResult.point)
                                |> Vec3.toRecord

                        n =
                            direction

                        t =
                            ((n.x * (p0.x - r0.x)) + (n.y * (p0.y - r0.y)) + (n.z * (p0.z - r0.z)))
                                / ((n.x * newDirection.x) + (n.y * newDirection.y) + (n.z * newDirection.z))

                        intersection =
                            { x = r0.x + newDirection.x * t
                            , y = r0.y + newDirection.y * t
                            , z = r0.z + newDirection.z * t
                            }
                    in
                    ( { model
                        | world =
                            World.update
                                (\b ->
                                    if (Body.getData b).id == Mouse then
                                        Body.setPosition intersection b

                                    else
                                        b
                                )
                                model.world
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        MouseUp _ ->
            -- remove temporary body on mouse up
            ( { model
                | selection = Nothing
                , world =
                    World.keepIf
                        (Body.getData >> .id >> (/=) Mouse)
                        model.world
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Events.onResize Resize
        , Events.onAnimationFrameDelta Tick
        ]


view : Model -> Html Msg
view { world, camera, selection, size } =
    let
        convert =
            case size of
                Just { width, height } ->
                    let
                        -- Reposition the mouse, because elm-slice-show scales and centers the slide
                        ratio =
                            if width * camera.height < camera.width * height then
                                camera.width / width

                            else
                                camera.height / height
                    in
                    \{ x, y } ->
                        { x = x * ratio - (width * ratio - camera.width) / 2
                        , y = y * ratio - (height * ratio - camera.height) / 2
                        }

                Nothing ->
                    identity
    in
    Html.div
        [ Events.onMouseDown convert camera MouseDown
        , Events.onMouseMove convert camera MouseMove
        , Events.onMouseUp convert camera MouseUp
        ]
        [ Scene.view
            { settings = settings
            , world = world
            , camera = camera
            , meshes = .meshes
            , raycastResult = Maybe.map .raycastResult selection
            , floorOffset = Just floorOffset
            , lightDirection = { x = -1, y = 1, z = -1 }
            }
        ]


initialWorld : World Data
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> World.add
            (box 1
                |> Body.moveBy { x = 0.5, y = -0.125, z = 4 }
                |> Body.rotateBy (pi / 8) { x = 0, y = 0, z = 1 }
            )
        |> World.add
            (box 2
                |> Body.moveBy { x = 0, y = 1, z = 4 }
                |> Body.rotateBy (pi / 8) { x = 0, y = 0, z = 1 }
            )
        |> World.add
            (box 3
                |> Body.moveBy { x = 0.25, y = 0.45, z = 5 }
                |> Body.rotateBy (pi / 8) { x = 0, y = 0, z = 1 }
            )
        |> World.add
            (compound 4
                |> Body.moveBy { x = 0, y = 0, z = 1.25 }
                |> Body.rotateBy (pi / 8) { x = 0, y = 0, z = 1 }
            )


{-| Shift the floor a little bit down
-}
floorOffset : { x : Float, y : Float, z : Float }
floorOffset =
    { x = 0, y = 0, z = -1 }


{-| Floor has an empty mesh, because it is not rendered
-}
floor : Body Data
floor =
    { id = Floor, meshes = Meshes.fromTriangles [] }
        |> Body.plane
        |> Body.setPosition floorOffset


{-| One of the boxes on the scene
-}
box : Int -> Body Data
box id =
    let
        size =
            { x = 1, y = 1, z = 1 }

        meshes =
            Meshes.fromTriangles (Meshes.box size)
    in
    { id = Box id, meshes = meshes }
        |> Body.box size
        |> Body.setMass 2


{-| A compound body made of three boxes
-}
compound : Int -> Body Data
compound id =
    let
        legDimensions =
            { x = 0.5, y = 0.5, z = 4 }

        topDimensions =
            { x = 5.5, y = 5.5, z = 0.5 }

        d =
            (5.5 / 2) - 0.03 - 0.25

        legTriangles =
            Meshes.box legDimensions

        legShape =
            Shape.box legDimensions

        topTriangles =
            Meshes.box topDimensions

        topShape =
            Shape.box topDimensions

        meshes =
            [ Meshes.moveBy { x = d, y = d, z = -0.25 } legTriangles
            , Meshes.moveBy { x = -d, y = d, z = -0.25 } legTriangles
            , Meshes.moveBy { x = -d, y = -d, z = -0.25 } legTriangles
            , Meshes.moveBy { x = d, y = -d, z = -0.25 } legTriangles
            , Meshes.moveBy { x = 0, y = 0, z = 2 } topTriangles
            ]
                |> List.concat
                |> Meshes.fromTriangles
    in
    Body.compound
        [ Shape.moveBy { x = d, y = d, z = -0.25 } legShape
        , Shape.moveBy { x = -d, y = d, z = -0.25 } legShape
        , Shape.moveBy { x = -d, y = -d, z = -0.25 } legShape
        , Shape.moveBy { x = d, y = -d, z = -0.25 } legShape
        , Shape.moveBy { x = 0, y = 0, z = 2 } topShape
        ]
        { id = Box id, meshes = meshes }
        |> Body.setMass 5


{-| An empty body with zero mass, rendered as a sphere.
This is a temporary body used to drag selected bodies.
-}
mouse : Body Data
mouse =
    let
        radius =
            0.2

        meshes =
            Meshes.fromTriangles (Meshes.sphere 2 radius)
    in
    { id = Mouse, meshes = meshes }
        |> Body.compound []
