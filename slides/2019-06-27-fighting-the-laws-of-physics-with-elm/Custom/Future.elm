module Custom.Future exposing
    ( Model
    , Msg
    , Options
    , initial
    , subscriptions
    , update
    , view
    )

{-| This shows how hinge constrains can be used to assemble a car.
-}

import Common.Camera as Camera exposing (Camera)
import Common.Events as Events
import Common.Meshes as Meshes exposing (Meshes)
import Common.Scene as Scene
import Common.Settings as Settings exposing (settings)
import Html exposing (Html)
import Html.Events exposing (onClick)
import Physics.Body as Body exposing (Body)
import Physics.Constraint as Constraint exposing (Constraint)
import Physics.World as World exposing (World)


type alias Options =
    { width : Float
    , height : Float
    }


{-| Give a name to each body, so that we can configure constraints
-}
type alias Data =
    { meshes : Meshes
    , name : String
    }


type alias Model =
    { world : World Data
    , camera : Camera
    }


type Msg
    = Tick Float
    | Restart


initial : Options -> Model
initial { width, height } =
    { world = initialWorld
    , camera =
        Camera.camera
            { from = { x = 15, y = 30, z = 20 }
            , to = { x = 5, y = -10, z = 0 }
            }
            |> Camera.resize width height
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick _ ->
            ( { model
                | world =
                    model.world
                        |> World.constrain constrainCar
                        |> World.simulate (1000 / 60)
              }
            , Cmd.none
            )

        Restart ->
            ( { model | world = initialWorld }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Events.onAnimationFrameDelta Tick


view : Model -> Html Msg
view { world, camera } =
    Html.div [ onClick Restart ]
        [ Scene.view
            { settings = settings
            , world = world
            , camera = camera
            , meshes = .meshes
            , raycastResult = Nothing
            , lightDirection = { x = -0.5, y = -1, z = -1 }
            , floorOffset = Just floorOffset
            }
        ]


initialWorld : World Data
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> World.add slope
        |> addCar { x = 0, y = 0, z = 5 }


addCar : { x : Float, y : Float, z : Float } -> World Data -> World Data
addCar offset world =
    world
        |> World.add (Body.moveBy offset base)
        |> World.add
            (wheel "wheel1"
                |> Body.moveBy { x = 3, y = 3, z = 0 }
                |> Body.moveBy offset
            )
        |> World.add
            (wheel "wheel2"
                |> Body.moveBy { x = -3, y = 3, z = 0 }
                |> Body.moveBy offset
            )
        |> World.add
            (wheel "wheel3"
                |> Body.moveBy { x = -3, y = -3, z = 0 }
                |> Body.moveBy offset
                |> Body.setMass 1
            )
        |> World.add
            (wheel "wheel4"
                |> Body.moveBy { x = 3, y = -3, z = 0 }
                |> Body.moveBy offset
                |> Body.setMass 1
            )


constrainCar : Body Data -> Body Data -> List Constraint
constrainCar b1 b2 =
    let
        -- TODO: implement steering
        steeringAngle =
            0

        dx =
            cos steeringAngle

        dy =
            sin steeringAngle

        hinge1 =
            Constraint.hinge
                { pivot1 = { x = 3, y = 3, z = 0 }
                , pivot2 = { x = 0, y = 0, z = 0 }
                , axis1 = { x = dx, y = dy, z = 0 }
                , axis2 = { x = -1, y = 0, z = 0 }
                }

        hinge2 =
            Constraint.hinge
                { pivot1 = { x = -3, y = 3, z = 0 }
                , pivot2 = { x = 0, y = 0, z = 0 }
                , axis1 = { x = -dx, y = -dy, z = 0 }
                , axis2 = { x = 1, y = 0, z = 0 }
                }

        hinge3 =
            Constraint.hinge
                { pivot1 = { x = -3, y = -3, z = 0 }
                , pivot2 = { x = 0, y = 0, z = 0 }
                , axis1 = { x = -1, y = 0, z = 0 }
                , axis2 = { x = 1, y = 0, z = 0 }
                }

        hinge4 =
            Constraint.hinge
                { pivot1 = { x = 3, y = -3, z = 0 }
                , pivot2 = { x = 0, y = 0, z = 0 }
                , axis1 = { x = 1, y = 0, z = 0 }
                , axis2 = { x = -1, y = 0, z = 0 }
                }
    in
    case ( (Body.getData b1).name, (Body.getData b2).name ) of
        ( "base", "wheel1" ) ->
            [ hinge1 ]

        ( "base", "wheel2" ) ->
            [ hinge2 ]

        ( "base", "wheel3" ) ->
            [ hinge3 ]

        ( "base", "wheel4" ) ->
            [ hinge4 ]

        _ ->
            []


{-| Shift the floor a little bit down
-}
floorOffset : { x : Float, y : Float, z : Float }
floorOffset =
    { x = 0, y = 0, z = -1 }


{-| Floor has an empty mesh, because it is not rendered
-}
floor : Body Data
floor =
    Body.plane { name = "floor", meshes = Meshes.fromTriangles [] }
        |> Body.setMass 0
        |> Body.setPosition floorOffset


{-| A slope to give a car the initial push.
-}
slope : Body Data
slope =
    let
        size =
            { x = 10, y = 12, z = 0.5 }

        meshes =
            Meshes.fromTriangles (Meshes.box size)
    in
    { name = "slope", meshes = meshes }
        |> Body.box size
        |> Body.moveBy { x = 0, y = -2, z = 0.5 }
        |> Body.rotateBy (pi / 16) { x = 1, y = 0, z = 0 }


base : Body Data
base =
    let
        size =
            { x = 3, y = 6, z = 1 }

        meshes =
            Meshes.fromTriangles (Meshes.box size)
    in
    { name = "base", meshes = meshes }
        |> Body.box size
        |> Body.setMass 1


wheel : String -> Body Data
wheel name =
    let
        radius =
            1.2

        meshes =
            Meshes.fromTriangles (Meshes.sphere 2 radius)
    in
    { name = name, meshes = meshes }
        |> Body.sphere radius
        |> Body.setMass 1
