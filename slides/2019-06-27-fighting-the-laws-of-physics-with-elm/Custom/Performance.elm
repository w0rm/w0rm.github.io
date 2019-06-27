module Custom.Performance exposing
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
import Common.Fps as Fps
import Common.Meshes as Meshes exposing (Meshes)
import Common.Scene as Scene
import Common.Settings as Settings exposing (Settings, settings)
import Html exposing (Html, div)
import Html.Attributes as Attributes exposing (style)
import Html.Events exposing (onClick)
import Physics.Body as Body exposing (Body)
import Physics.World as World exposing (World)


type alias Options =
    { width : Float
    , height : Float
    }


type alias Model =
    { world : World Meshes
    , fps : List Float
    , camera : Camera
    }


type Msg
    = Tick Float
    | Reset


initial : Options -> Model
initial { width, height } =
    { world = initialWorld
    , fps = [ 1000 / 60 ]
    , camera =
        Camera.camera
            { from = { x = 0, y = 20, z = 20 }
            , to = { x = 0, y = 0, z = 0 }
            }
            |> Camera.resize width height
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick dt ->
            ( { model
                | fps = Fps.update dt model.fps
                , world = World.simulate (1000 / 60) model.world
              }
            , Cmd.none
            )

        Reset ->
            ( { model | world = initialWorld }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Events.onAnimationFrameDelta Tick


view : Model -> Html Msg
view { world, camera, fps } =
    div [ onClick Reset ]
        [ Scene.view
            { settings = settings
            , world = world
            , camera = camera
            , meshes = identity
            , raycastResult = Nothing
            , floorOffset = Just floorOffset
            , lightDirection = { x = -1, y = -1, z = -1 }
            }
        , div
            [ style "position" "absolute"
            , style "right" "150px"
            , style "top" "98px"
            ]
            [ Fps.view fps (List.length (World.getBodies world)) ]
        ]


initialWorld : World Meshes
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> addBoxes


boxesPerDimension =
    4


addBoxes : World Meshes -> World Meshes
addBoxes world =
    let
        dimensions =
            List.map toFloat (List.range 0 (boxesPerDimension - 1))

        distance =
            1
    in
    List.foldl
        (\x world1 ->
            List.foldl
                (\y world2 ->
                    List.foldl
                        (\z ->
                            box
                                |> Body.moveBy
                                    { x = (x - (boxesPerDimension - 1) / 2) * distance
                                    , y = (y - (boxesPerDimension - 1) / 2) * distance
                                    , z = (z + (2 * boxesPerDimension + 1) / 2) * distance
                                    }
                                |> World.add
                        )
                        world2
                        dimensions
                )
                world1
                dimensions
        )
        world
        dimensions


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


box : Body Meshes
box =
    let
        size =
            { x = 1, y = 1, z = 1 }
    in
    Meshes.box size
        |> Meshes.fromTriangles
        |> Body.box size
        |> Body.setMass 5
