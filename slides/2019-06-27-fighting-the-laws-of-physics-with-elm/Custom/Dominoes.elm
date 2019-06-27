module Custom.Dominoes exposing
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
import Path
import Physics.Body as Body exposing (Body)
import Physics.Material as Material exposing (Material)
import Physics.World as World exposing (World)
import SubPath exposing (SubPath)


type alias Options =
    { width : Float
    , height : Float
    , paths : List String
    }


type alias Model =
    { world : World Meshes
    , camera : Camera
    , time : Float
    , paths : List String
    }


type Msg
    = Tick Float
    | Restart


initial : Options -> Model
initial { width, height, paths } =
    { world = initialWorld paths
    , paths = paths
    , time = 0
    , camera =
        Camera.camera
            { from = { x = -16, y = 20, z = 45 }
            , to = { x = -16, y = 9, z = 0 }
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
            ( { model
                | world = model.world |> World.simulate dt
              }
            , Cmd.none
            )

        Restart ->
            ( { model | world = initialWorld model.paths }, Cmd.none )


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
            , floorOffset = Just visualFloorOffset
            , lightDirection = { x = 1.4, y = 0.5, z = -2 }
            }
        ]


initialWorld : List String -> World Meshes
initialWorld paths =
    let
        addDominoes world =
            List.map (Path.parse >> Result.withDefault []) paths
                |> List.concat
                |> List.map pathToCoordinates
                |> List.concat
                |> List.foldl World.add world

        pathToCoordinates path =
            path
                |> SubPath.arcLengthParameterized 1
                |> (\parametrized ->
                        let
                            length =
                                SubPath.arcLength parametrized
                        in
                        parametrized
                            |> SubPath.evenlySpaced (round (length / 20))
                            |> List.indexedMap
                                (\n point ->
                                    Maybe.map2
                                        (\( pointX, pointY ) ( tangentX, tangentY ) ->
                                            domino
                                                |> Body.setPosition { x = -pointX / 30 - 2, y = pointY / 30, z = 0 }
                                                |> Body.setOrientation (orientation -tangentX tangentY)
                                                |> (\b ->
                                                        if n == 0 then
                                                            Body.rotateBy (pi / 32) { x = -tangentY, y = -tangentX, z = 0 } b

                                                        else
                                                            b
                                                   )
                                        )
                                        (SubPath.pointAlong parametrized point)
                                        (SubPath.tangentAlong parametrized point)
                                )
                            |> List.filterMap identity
                   )
    in
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> addDominoes


orientation : Float -> Float -> { x : Float, y : Float, z : Float, w : Float }
orientation x y =
    let
        theta =
            atan2 y x / 2.0

        c =
            cos theta

        s =
            sin theta
    in
    { x = 0, y = 0, z = s, w = c }


{-| Shift the floor a little bit down
-}
floorOffset : { x : Float, y : Float, z : Float }
floorOffset =
    { x = 0, y = 0, z = -0.5 }


{-| Shift the floor a little bit more down, so the shadow is never drawn on top of domino
-}
visualFloorOffset : { x : Float, y : Float, z : Float }
visualFloorOffset =
    { x = 0, y = 0, z = -0.6 }


{-| Floor has an empty mesh, because it is not rendered
-}
floor : Body Meshes
floor =
    Body.plane (Meshes.fromTriangles [])
        |> Body.setMass 0
        |> Body.setPosition floorOffset


{-| A domino piece
-}
domino : Body Meshes
domino =
    let
        size =
            { x = 0.07, y = 0.5, z = 1 }
    in
    Meshes.box size
        |> Meshes.fromTriangles
        |> Body.box size
        |> Body.setMass 5
        |> Body.setMaterial slippy


slippy : Material
slippy =
    Material.custom
        { bounciness = 0
        , friction = 0.001
        }
