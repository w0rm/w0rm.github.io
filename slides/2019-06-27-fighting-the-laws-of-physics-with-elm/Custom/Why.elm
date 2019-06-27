module Custom.Why exposing
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
import Physics.Shape as Shape exposing (Shape)
import Physics.World as World exposing (World)
import Random


type alias Options =
    { width : Float
    , height : Float
    }


type alias Model =
    { world : World ( Int, Meshes )
    , camera : Camera
    , countDown : Float
    , n : Int
    , seed : Random.Seed
    }


type Msg
    = Tick Float


initial : Options -> Model
initial { width, height } =
    { world = initialWorld
    , countDown = 1500
    , n = 1
    , seed = Random.initialSeed 0
    , camera =
        Camera.camera
            { from = { x = -10, y = -80, z = 20 }
            , to = { x = -15, y = 0, z = 10 }
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

                ( seed, world, ( countDown, n ) ) =
                    if (model.countDown - dt) <= 0 then
                        let
                            ( body, newSeed ) =
                                Random.step (randomQuestionMark model.n) model.seed
                        in
                        ( newSeed
                        , model.world
                            |> World.add body
                            |> World.keepIf
                                (\b ->
                                    let
                                        i =
                                            Tuple.first (Body.getData b)
                                    in
                                    i < 0 || model.n - i <= 10
                                )
                        , ( 1500, model.n + 1 )
                        )

                    else
                        ( model.seed, model.world, ( model.countDown - dt, model.n ) )
            in
            ( { model
                | world = World.simulate dt world
                , seed = seed
                , countDown = countDown
                , n = n
              }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Events.onAnimationFrameDelta Tick


view : Model -> Html Msg
view { world, camera } =
    Scene.view
        { settings = settings
        , world = world
        , camera = camera
        , meshes = Tuple.second
        , raycastResult = Nothing
        , floorOffset = Just floorOffset
        , lightDirection = { x = -1, y = 1, z = -1 }
        }


initialWorld : World ( Int, Meshes )
initialWorld =
    World.empty
        |> World.setGravity { x = 0, y = 0, z = -10 }
        |> World.add floor
        |> World.add (Body.moveBy { x = 0, y = 0, z = 10 } (questionMark 0))


{-| Shift the floor a little bit down
-}
floorOffset : { x : Float, y : Float, z : Float }
floorOffset =
    { x = 0, y = 0, z = -1 }


{-| Floor has an empty mesh, because it is not rendered
-}
floor : Body ( Int, Meshes )
floor =
    Body.plane ( -1, Meshes.fromTriangles [] )
        |> Body.setMass 0
        |> Body.setPosition floorOffset


{-| A random body raised above the plane, shifted or rotated to a random 3d angle
-}
randomQuestionMark : Int -> Random.Generator (Body ( Int, Meshes ))
randomQuestionMark n =
    Random.map4
        (\angle x y z ->
            questionMark n
                |> Body.moveBy { x = 0, y = 0, z = 35 }
                |> Body.rotateBy angle { x = x, y = y, z = z }
        )
        (Random.float (-pi / 2) (pi / 2))
        (Random.float -1 1)
        (Random.float -1 1)
        (Random.float -1 1)


questionMark : Int -> Body ( Int, Meshes )
questionMark n =
    let
        p1 =
            Meshes.box { x = 1, y = 1, z = 1 }

        s1 =
            Shape.box { x = 1, y = 1, z = 1 }

        p2 =
            Meshes.box { x = 2, y = 1, z = 1 }

        s2 =
            Shape.box { x = 2, y = 1, z = 1 }

        p3 =
            Meshes.box { x = 1, y = 1, z = 2 }

        s3 =
            Shape.box { x = 1, y = 1, z = 2 }
    in
    [ Meshes.moveBy { x = -1, y = 0, z = 2 } p1
    , Meshes.moveBy { x = 0, y = 0, z = -1 } p1
    , Meshes.moveBy { x = 0, y = 0, z = -3 } p1
    , Meshes.moveBy { x = 0.5, y = 0, z = 3 } p2
    , Meshes.moveBy { x = 0.5, y = 0, z = 0 } p2
    , Meshes.moveBy { x = 2, y = 0, z = 1.5 } p3
    ]
        |> List.concat
        |> Meshes.fromTriangles
        |> Tuple.pair n
        |> Body.compound
            [ Shape.moveBy { x = -1, y = 0, z = 2 } s1
            , Shape.moveBy { x = 0, y = 0, z = -1 } s1
            , Shape.moveBy { x = 0, y = 0, z = -3 } s1
            , Shape.moveBy { x = 0.5, y = 0, z = 3 } s2
            , Shape.moveBy { x = 0.5, y = 0, z = 0 } s2
            , Shape.moveBy { x = 2, y = 0, z = 1.5 } s3
            ]
        |> Body.setMass 5
