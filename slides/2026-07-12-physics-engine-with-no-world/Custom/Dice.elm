module Custom.Dice exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| Two dice tumbling into a funnel. They drop once on load; click to re-roll.

A port of the original 2018 `elm-dice` demo (w0rm/elm-physics 3 + raw WebGL) to
the current List-based elm-physics API and elm-3d-scene. The funnel is five
slanted planes (floor + four inward-tilted walls) that gather the dice toward the
middle; the walls are colliders only, not drawn — just the dice on a transparent
background. The cube is a textured mesh whose six faces each map to one column of
the `dice.png` strip (4096x512 = eight 512-px columns), so a face maps to
`(n + u) / 8`.

-}

import Angle
import Axis3d
import Block3d exposing (Block3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Density
import Direction3d exposing (Direction3d)
import Duration exposing (Duration)
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Length exposing (Meters)
import Mass
import Physics exposing (Body, BodyCoordinates, WorldCoordinates, onEarth)
import Physics.Material
import Pixels exposing (Pixels)
import Plane3d
import Point3d exposing (Point3d)
import Quantity exposing (Quantity)
import Random
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Scene3d.Mesh as Mesh
import Task
import Timestep exposing (Timestep)
import TriangularMesh
import WebGL.Texture


type Id
    = Wall Int
    | Die Int


type alias Model =
    { prevBodies : List ( Id, Body )
    , bodies : List ( Id, Body )
    , contacts : Physics.Contacts Id
    , texture : Maybe (Material.Texture Color)
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , timestep : Timestep
    , started : Bool
    }


type Msg
    = Tick Duration
    | TextureLoaded (Result WebGL.Texture.Error (Material.Texture Color))
    | NewDice (List ( Id, Body ))
    | Roll


type alias Options =
    { width : Int, height : Int }


initial : Options -> Model
initial { width, height } =
    { prevBodies = funnel ++ initialDice
    , bodies = funnel ++ initialDice
    , contacts = Physics.emptyContacts
    , texture = Nothing
    , dimensions = ( Pixels.int width, Pixels.int height )
    , timestep = Timestep.init { duration = Duration.seconds (1 / 120), maxSteps = 2 }
    , started = False
    }



-- BODIES


diceSurface : Physics.Material.Material Physics.Material.Surface
diceSurface =
    Physics.Material.surface { friction = 0.1, bounciness = 0.5 }


diceMaterial : Physics.Material.Material Physics.Material.Dense
diceMaterial =
    Physics.Material.dense
        { density = Density.gramsPerCubicCentimeter 0.6
        , friction = 0.1
        , bounciness = 0.5
        }


wallPlane : Point3d Meters BodyCoordinates -> Direction3d BodyCoordinates -> Body
wallPlane point normal =
    Physics.plane (Plane3d.through point normal) diceSurface


{-| Floor plus four inward-tilted walls that gather the dice toward the middle.
Colliders only — not drawn.
-}
funnel : List ( Id, Body )
funnel =
    [ ( Wall 0, wallPlane (Point3d.meters 0 0 -3) Direction3d.positiveZ )
    , ( Wall 1, wallPlane (Point3d.meters 5 0 0) (Direction3d.xyZ (Angle.degrees 180) (Angle.degrees 30)) )
    , ( Wall 2, wallPlane (Point3d.meters -5 0 0) (Direction3d.xyZ (Angle.degrees 0) (Angle.degrees 30)) )
    , ( Wall 3, wallPlane (Point3d.meters 0 5 0) (Direction3d.xyZ (Angle.degrees 270) (Angle.degrees 30)) )
    , ( Wall 4, wallPlane (Point3d.meters 0 -5 0) (Direction3d.xyZ (Angle.degrees 90) (Angle.degrees 30)) )
    ]


dieBlock : Block3d Meters BodyCoordinates
dieBlock =
    Block3d.centeredOn Frame3d.atOrigin
        ( Length.meters 2, Length.meters 2, Length.meters 2 )


placeDie : Float -> Float -> Float -> Float -> Float -> Float -> Body
placeDie x y z az el ang =
    Physics.block dieBlock diceMaterial
        |> Physics.scaleMassTo (Mass.kilograms 5)
        |> Physics.rotateAround
            (Axis3d.through Point3d.origin
                (Direction3d.xyZ (Angle.degrees az) (Angle.degrees el))
            )
            (Angle.degrees ang)
        |> Physics.moveTo (Point3d.meters x y z)


initialDice : List ( Id, Body )
initialDice =
    [ ( Die 0, placeDie -0.7 0.2 9 35 20 40 )
    , ( Die 1, placeDie 0.7 -0.3 12 200 -30 110 )
    ]


randomDie : Float -> Random.Generator Body
randomDie height =
    Random.map5 (\x y az el ang -> placeDie x y height az el ang)
        (Random.float -1.5 1.5)
        (Random.float -1.5 1.5)
        (Random.float 0 360)
        (Random.float -90 90)
        (Random.float 0 360)


randomDice : Random.Generator (List ( Id, Body ))
randomDice =
    Random.map2
        (\a b -> funnel ++ [ ( Die 0, a ), ( Die 1, b ) ])
        (randomDie 9)
        (randomDie 12)



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick dt ->
            let
                stepped =
                    Timestep.advance simulateStep dt model
            in
            if not model.started then
                ( { stepped | started = True }
                , Material.load "dice.png" |> Task.attempt TextureLoaded
                )

            else
                ( stepped, Cmd.none )

        Roll ->
            ( model, Random.generate NewDice randomDice )

        TextureLoaded (Ok texture) ->
            ( { model | texture = Just texture }, Cmd.none )

        TextureLoaded (Err _) ->
            ( model, Cmd.none )

        NewDice bodies ->
            ( { model
                | prevBodies = bodies
                , bodies = bodies
                , contacts = Physics.emptyContacts
              }
            , Cmd.none
            )


simulateStep : Model -> Model
simulateStep model =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | duration = Timestep.duration model.timestep
                    , contacts = model.contacts
                }
                model.bodies
    in
    { model | prevBodies = model.bodies, bodies = newBodies, contacts = newContacts }



-- VIEW


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 0 -20 14
        , focalPoint = Point3d.meters 0 0 0
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 30)
        }


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        , Html.Events.onClick Roll
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -60)
            , shadows = False
            , camera = camera
            , dimensions = model.dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.5
            , entities =
                List.map2 (bodyEntity model.timestep model.texture)
                    model.prevBodies
                    model.bodies
            }
        ]


bodyEntity : Timestep -> Maybe (Material.Texture Color) -> ( Id, Body ) -> ( Id, Body ) -> Entity WorldCoordinates
bodyEntity timestep maybeTexture ( _, prev ) ( id, curr ) =
    case id of
        Die _ ->
            (case maybeTexture of
                Just texture ->
                    Scene3d.mesh (Material.texturedMatte texture) diceMesh

                Nothing ->
                    Scene3d.mesh (Material.matte (Color.rgb255 235 235 235)) diceMesh
            )
                |> Scene3d.placeIn (Physics.interpolatedFrame (Timestep.progress timestep) prev curr)

        Wall _ ->
            Scene3d.nothing



-- MESH: a cube whose six faces map to columns 0..5 of the 8-column strip


type alias Vertex =
    { position : Point3d Meters BodyCoordinates, uv : ( Float, Float ) }


type alias Face =
    { a : Point3d Meters BodyCoordinates
    , b : Point3d Meters BodyCoordinates
    , c : Point3d Meters BodyCoordinates
    , d : Point3d Meters BodyCoordinates
    , n : Int
    }


diceMesh : Mesh.Textured BodyCoordinates
diceMesh =
    let
        v0 = Point3d.meters -1 -1 -1
        v1 = Point3d.meters 1 -1 -1
        v2 = Point3d.meters 1 1 -1
        v3 = Point3d.meters -1 1 -1
        v4 = Point3d.meters -1 -1 1
        v5 = Point3d.meters 1 -1 1
        v6 = Point3d.meters 1 1 1
        v7 = Point3d.meters -1 1 1
    in
    [ Face v3 v2 v1 v0 0
    , Face v4 v5 v6 v7 1
    , Face v5 v4 v0 v1 2
    , Face v2 v3 v7 v6 3
    , Face v0 v4 v7 v3 4
    , Face v1 v2 v6 v5 5
    ]
        |> List.concatMap quad
        |> TriangularMesh.triangles
        |> Mesh.texturedFacets


quad : Face -> List ( Vertex, Vertex, Vertex )
quad { a, b, c, d, n } =
    [ ( vertex a n 0 0, vertex b n 1 0, vertex c n 1 1 )
    , ( vertex c n 1 1, vertex d n 0 1, vertex a n 0 0 )
    ]


vertex : Point3d Meters BodyCoordinates -> Int -> Float -> Float -> Vertex
vertex position n u v =
    { position = position, uv = ( (toFloat n + u) / 8, v ) }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta (Duration.milliseconds >> Tick)
