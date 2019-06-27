module Custom.Troubleshooting exposing
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
import Common.Settings as Settings exposing (Settings, SettingsMsg, settings)
import Html exposing (Html)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Physics.Body as Body exposing (Body)
import Physics.Shape as Shape exposing (Shape)
import Physics.World as World exposing (World)
import Random


type alias Options =
    { width : Float
    , height : Float
    }


type alias Model =
    { world : World Meshes
    , fps : List Float
    , settings : Settings
    , camera : Camera
    }


type Msg
    = ForSettings SettingsMsg
    | Tick Float
    | Restart
    | Random
    | AddRandom (Body Meshes)


initial : Options -> Model
initial { width, height } =
    { world = initialWorld
    , fps = []
    , settings = settings
    , camera =
        Camera.camera
            { from = { x = 0, y = 20, z = 10 }
            , to = { x = 0, y = -2, z = 0 }
            }
            |> Camera.resize width height
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ForSettings settingsMsg ->
            ( { model
                | settings = Settings.update settingsMsg model.settings
              }
            , Cmd.none
            )

        Tick dt ->
            ( { model
                | fps = Fps.update dt model.fps
                , world = World.simulate (1000 / 60) model.world
              }
            , Cmd.none
            )

        Restart ->
            ( { model | world = initialWorld }, Cmd.none )

        Random ->
            ( model, Random.generate AddRandom randomBody )

        AddRandom body ->
            ( { model | world = World.add body model.world }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Events.onAnimationFrameDelta Tick


view : Model -> Html Msg
view { settings, fps, world, camera } =
    Html.div []
        [ Scene.view
            { settings = settings
            , world = world
            , camera = camera
            , meshes = identity
            , raycastResult = Nothing
            , floorOffset = Just floorOffset
            , lightDirection = { x = -1, y = -1, z = -1 }
            }
        , Settings.view ForSettings
            settings
            [ Html.button [ onClick Random, style "font" "inherit", style "width" "100%" ]
                [ Html.text "Drop random" ]
            , Html.button [ onClick Restart, style "font" "inherit", style "width" "100%" ]
                [ Html.text "Restart" ]
            ]
        , if settings.showFpsMeter then
            Html.div
                [ style "position" "absolute"
                , style "right" "20px"
                , style "top"
                    (if settings.showSettings then
                        "380px"

                     else
                        "50px"
                    )
                ]
                [ Fps.view fps (List.length (World.getBodies world))
                ]

          else
            Html.text ""
        ]


initialWorld : World Meshes
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> World.add
            (box
                |> Body.moveBy { x = 0, y = 0, z = 2 }
                |> Body.rotateBy (-pi / 5) { x = 0, y = 1, z = 0 }
            )
        |> World.add
            (sphere
                |> Body.moveBy { x = 0.5, y = 0, z = 8 }
            )
        |> World.add
            (compound
                |> Body.moveBy { x = -1.2, y = 0, z = 5 }
                |> Body.rotateBy (pi / 5) { x = 1, y = 1, z = 0 }
            )


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
            { x = 2, y = 2, z = 2 }
    in
    Meshes.box size
        |> Meshes.fromTriangles
        |> Body.box size
        |> Body.setMass 5


sphere : Body Meshes
sphere =
    let
        radius =
            1.2
    in
    Meshes.sphere 2 radius
        |> Meshes.fromTriangles
        |> Body.sphere radius
        |> Body.setMass 5


{-| A compound body made of three boxes
-}
compound : Body Meshes
compound =
    let
        boxDimensions =
            { x = 1, y = 1, z = 1 }

        boxTriangles =
            Meshes.box boxDimensions

        boxShape =
            Shape.box boxDimensions
    in
    [ Meshes.moveBy { x = -0.5, y = 0, z = -0.5 } boxTriangles
    , Meshes.moveBy { x = -0.5, y = 0, z = 0.5 } boxTriangles
    , Meshes.moveBy { x = 0.5, y = 0, z = 0.5 } boxTriangles
    ]
        |> List.concat
        |> Meshes.fromTriangles
        |> Body.compound
            [ Shape.moveBy { x = -0.5, y = 0, z = -0.5 } boxShape
            , Shape.moveBy { x = -0.5, y = 0, z = 0.5 } boxShape
            , Shape.moveBy { x = 0.5, y = 0, z = 0.5 } boxShape
            ]
        |> Body.setMass 5


{-| A random body raised above the plane, shifted or rotated to a random 3d angle
-}
randomBody : Random.Generator (Body Meshes)
randomBody =
    Random.map5
        (\angle x y z body ->
            case body of
                0 ->
                    box
                        |> Body.moveBy { x = 0, y = 0, z = 10 }
                        |> Body.rotateBy angle { x = x, y = y, z = z }

                1 ->
                    sphere
                        |> Body.moveBy { x = x, y = y, z = z + 10 }

                _ ->
                    compound
                        |> Body.moveBy { x = 0, y = 0, z = 10 }
                        |> Body.rotateBy angle { x = x, y = y, z = z }
        )
        (Random.float (-pi / 2) (pi / 2))
        (Random.float -1 1)
        (Random.float -1 1)
        (Random.float -1 1)
        (Random.int 0 2)
