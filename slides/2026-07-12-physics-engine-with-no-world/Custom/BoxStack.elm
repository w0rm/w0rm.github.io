module Custom.BoxStack exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| The comparison scene as a static schematic: 5×5×5 = 125 one-meter boxes
in their initial lattice — the exact setup measured against cannon-es in
`elm-physics-extra/comparison/`, shown on the benchmark-setup slide.

Grey wireframe on the bare slide background, no simulation: the slide
explains the setup and the benchmark measures the engine alone (描画なし).

-}

import Block3d exposing (Block3d)
import Camera3d exposing (Camera3d)
import Color
import Direction3d
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Mass
import Physics exposing (Body, WorldCoordinates)
import Physics.Material as Material
import Pixels exposing (Pixels)
import Plane3d
import Point3d
import Quantity exposing (Quantity)
import Scene3d exposing (Entity)
import Scene3d.Material as SceneMaterial
import Scene3d.Mesh


boxesPerDimension : number
boxesPerDimension =
    5


type alias Model =
    { dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    }


type Msg
    = NoOp


type alias Options =
    { width : Int
    , height : Int
    }


initial : Options -> Model
initial { width, height } =
    { dimensions = ( Pixels.int width, Pixels.int height )
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update NoOp model =
    ( model, Cmd.none )


block3d : Block3d Meters coordinates
block3d =
    Block3d.centeredOn Frame3d.atOrigin
        ( Length.meters 1, Length.meters 1, Length.meters 1 )


initialBodies : List ( Int, Body )
initialBodies =
    let
        floorBody =
            Physics.plane Plane3d.xy Material.wood

        dimensions =
            List.map toFloat (List.range 0 (boxesPerDimension - 1))

        boxBody =
            Physics.block block3d Material.wood
                |> Physics.scaleMassTo (Mass.kilograms 5)

        boxes =
            List.indexedMap
                (\idx ( x, y, z ) ->
                    ( idx + 1
                    , boxBody
                        |> Physics.moveTo
                            (Point3d.meters
                                (x - (boxesPerDimension - 1) / 2)
                                (y - (boxesPerDimension - 1) / 2)
                                (z + 0.5)
                            )
                    )
                )
                (List.concatMap
                    (\x ->
                        List.concatMap
                            (\y -> List.map (\z -> ( x, y, z )) dimensions)
                            dimensions
                    )
                    dimensions
                )
    in
    ( 0, floorBody ) :: boxes


{-| Orthographic, so the lattice reads as a clean diagram. The focal point
is panned so the stack's left silhouette sits at the canvas' left edge,
which the slide aligns with the text margin.
-}
camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 11.5 11.5 7.5
        , focalPoint = Point3d.meters -0.9 0.9 2.5
        , upDirection = Direction3d.positiveZ
        , projection = Camera3d.Orthographic
        , fov = Camera3d.height (Length.meters 8)
        }


view : Model -> Html Msg
view { dimensions } =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        [ Scene3d.unlit
            { camera = camera
            , dimensions = dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities = List.map boxEntity initialBodies
            }
        ]


boxWireframe : Scene3d.Mesh.Plain coordinates
boxWireframe =
    Scene3d.Mesh.lineSegments (Block3d.edges block3d)


boxEntity : ( Int, Body ) -> Entity WorldCoordinates
boxEntity ( id, body ) =
    if id == 0 then
        Scene3d.nothing

    else
        Scene3d.placeIn (Physics.frame body) <|
            Scene3d.mesh (SceneMaterial.color (Color.rgb255 110 110 115)) boxWireframe


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
