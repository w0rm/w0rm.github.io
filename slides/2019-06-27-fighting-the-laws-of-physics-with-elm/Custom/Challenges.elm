module Custom.Challenges exposing
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
import Common.Settings as Settings exposing (Settings, SettingsMsg, settings)
import Html exposing (Html)
import Html.Events exposing (onClick)
import Physics.Body as Body exposing (Body)
import Physics.Material as Material exposing (Material)
import Physics.World as World exposing (World)


type alias Options =
    { width : Float
    , height : Float
    }


type alias Model =
    { world : World Meshes
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
            { from = { x = 20, y = 20, z = 25 }
            , to = { x = 0, y = -5, z = 0 }
            }
            |> Camera.resize width height
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick _ ->
            let
                dt =
                    1000 / 60
            in
            ( { model | world = World.simulate dt model.world }
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
            , meshes = identity
            , raycastResult = Nothing
            , floorOffset = Just floorOffset
            , lightDirection = { x = -0.4, y = 0.5, z = -2 }
            }
        ]


initialWorld : World Meshes
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> addWalls


addWalls : World Meshes -> World Meshes
addWalls world =
    List.foldl
        (toFloat >> wall >> World.add)
        world
        (List.range 0 9)


{-| Shift the floor a little bit down
-}
floorOffset : { x : Float, y : Float, z : Float }
floorOffset =
    { x = 0, y = 0, z = -1 }


{-| Floor has an empty mesh, because it is not rendered
-}
floor : Body Meshes
floor =
    Body.plane (Meshes.fromTriangles [])
        |> Body.setMass 0
        |> Body.setPosition floorOffset


wall : Float -> Body Meshes
wall i =
    let
        size =
            { x = 0.1
            , y = 1 + i * 0.5
            , z = 2 + i * 0.5
            }
    in
    Meshes.box size
        |> Meshes.fromTriangles
        |> Body.box size
        |> Body.setMass 5
        |> Body.setMaterial slippy
        |> Body.moveBy
            { x = 5 - i * 1.2
            , y = 0
            , z = i / 4
            }
        |> (\d ->
                if i == 0 then
                    d
                        |> Body.rotateBy (-pi / 8) { x = 0, y = 1, z = 0 }

                else
                    d
           )


slippy : Material
slippy =
    Material.custom
        { bounciness = 0
        , friction = 0.001
        }
