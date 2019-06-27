module Custom.Snapshots exposing
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
import Physics.Body as Body exposing (Body)
import Physics.Material as Material exposing (Material)
import Physics.World as World exposing (World)


type Id
    = Slope
    | Floor
    | Ball
    | Snapshot Int (World ( Id, Meshes ))


type alias Options =
    { width : Float
    , height : Float
    }


type alias Model =
    { world : World ( Id, Meshes )
    , camera : Camera
    , snapshots : World ( Id, Meshes )
    , lastSnapshot : Maybe ( Int, { x : Float, y : Float, z : Float } )
    , size : Maybe { width : Float, height : Float }
    }


type Msg
    = Tick Float
    | Resize Float Float
    | MouseDown { x : Float, y : Float, z : Float }


initial : Options -> Model
initial { width, height } =
    { world = initialWorld
    , snapshots = World.empty
    , camera =
        Camera.camera
            { from = { x = 0, y = -30, z = 20 }
            , to = { x = 0, y = 2, z = 5 }
            }
            |> Camera.resize width height
    , lastSnapshot = Nothing
    , size = Nothing
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MouseDown direction ->
            case
                World.raycast
                    { from = model.camera.from
                    , direction = direction
                    }
                    model.snapshots
            of
                Just { body } ->
                    ( case Body.getData body of
                        ( Snapshot n w, _ ) ->
                            { model
                                | world = w
                                , lastSnapshot = Just ( n, Body.getPosition body )
                                , snapshots =
                                    World.keepIf
                                        (\b ->
                                            case Body.getData b of
                                                ( Snapshot m _, _ ) ->
                                                    m <= n

                                                _ ->
                                                    True
                                        )
                                        model.snapshots
                            }

                        _ ->
                            model
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        Resize width height ->
            ( { model | size = Just { width = width, height = height } }
            , Cmd.none
            )

        Tick _ ->
            let
                dt =
                    1000 / 60

                maybeBall =
                    World.getBodies model.world
                        |> List.filter (\b -> Tuple.first (Body.getData b) == Ball)
                        |> List.head

                ( lastSnapshot, snapshots ) =
                    case ( maybeBall, model.lastSnapshot ) of
                        ( Just b, Just ( n, { x, y, z } ) ) ->
                            let
                                p =
                                    Body.getPosition b

                                distance =
                                    (p.x - x) ^ 2 + (p.y - y) ^ 2 + (p.z - z) ^ 2
                            in
                            if distance > 2 then
                                ( Just ( n + 1, Body.getPosition b )
                                , World.add (snapshot (n + 1) b model.world) model.snapshots
                                )

                            else
                                ( model.lastSnapshot, model.snapshots )

                        ( Just b, Nothing ) ->
                            ( Just ( 1, Body.getPosition b )
                            , World.add (snapshot 1 b model.world) model.snapshots
                            )

                        _ ->
                            ( model.lastSnapshot, model.snapshots )
            in
            ( { model
                | world =
                    case maybeBall of
                        Just b ->
                            if (Body.getPosition b).x < 15 then
                                World.simulate dt model.world

                            else
                                model.world

                        Nothing ->
                            model.world
                , snapshots = snapshots
                , lastSnapshot = lastSnapshot
              }
            , case model.size of
                Just _ ->
                    Cmd.none

                Nothing ->
                    Events.measureSize Resize
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Events.onAnimationFrameDelta Tick


view : Model -> Html Msg
view { world, camera, size, snapshots } =
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
    Html.div [ Events.onMouseDown convert camera MouseDown ]
        [ Scene.view
            { settings = settings

            -- render both snapshots and the current world
            , world = List.foldl World.add world (World.getBodies snapshots)
            , camera = camera
            , meshes = Tuple.second
            , raycastResult = Nothing
            , floorOffset = Just floorOffset
            , lightDirection = { x = -1, y = 1, z = -1 }
            }
        ]


initialWorld : World ( Id, Meshes )
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> World.add
            (slope
                |> Body.moveBy { x = -10, y = 0, z = 8 }
                |> Body.rotateBy (pi / 6) { x = 0, y = 1, z = 0 }
            )
        |> World.add (Body.moveBy { x = -11, y = 0, z = 10 } ball)


{-| Shift the floor a little bit down
-}
floorOffset : { x : Float, y : Float, z : Float }
floorOffset =
    { x = 0, y = 0, z = -1 }


{-| Floor has an empty mesh, because it is not rendered
-}
floor : Body ( Id, Meshes )
floor =
    Body.plane ( Floor, Meshes.fromTriangles [] )
        |> Body.setMass 0
        |> Body.setPosition floorOffset
        |> Body.setMaterial bouncy


bouncy : Material
bouncy =
    Material.custom
        { bounciness = 0.9
        , friction = 0
        }


slope : Body ( Id, Meshes )
slope =
    let
        dimensions =
            { x = 3, y = 1, z = 0.15 }
    in
    Meshes.box dimensions
        |> Meshes.fromTriangles
        |> Tuple.pair Slope
        |> Body.box dimensions


snapshot : Int -> Body ( Id, Meshes ) -> World ( Id, Meshes ) -> Body ( Id, Meshes )
snapshot n b world =
    let
        radius =
            0.5
    in
    Meshes.sphere 2 radius
        |> Meshes.fromTriangles
        |> Tuple.pair (Snapshot n world)
        |> Body.sphere radius
        |> Body.setPosition (Body.getPosition b)
        |> Body.setOrientation (Body.getOrientation b)


ball : Body ( Id, Meshes )
ball =
    let
        radius =
            0.5
    in
    Meshes.sphere 2 radius
        |> Meshes.fromTriangles
        |> Tuple.pair Ball
        |> Body.sphere radius
        |> Body.setMaterial bouncy
        |> Body.setMass 5
