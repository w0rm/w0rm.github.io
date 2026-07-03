module Custom.Jeep exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| A static turntable render of the Jeep model (the raycast-car demo's mesh),
on a transparent background so it can be stamped on top of another slide.

The jeep mesh is loaded once via RaycastCar.Jeep; no physics, just a slowly
orbiting camera.

-}

import Angle
import Axis3d exposing (Axis3d)
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Cone3d
import Cylinder3d
import Direction3d
import Frame3d
import Html exposing (Html)
import Html.Attributes
import Length exposing (Meters)
import Physics exposing (BodyCoordinates, WorldCoordinates)
import Pixels exposing (Pixels)
import Plane3d
import Point3d
import Quantity exposing (Quantity)
import RaycastCar.Jeep as Jeep exposing (Jeep)
import Scene3d
import Scene3d.Material
import Task


type alias Options =
    { width : Int, height : Int }


type alias Model =
    { jeep : Maybe Jeep
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , azimuth : Float
    , elapsed : Float
    , started : Bool
    }


type Msg
    = Loaded (Result String Jeep)
    | Tick Float


initial : Options -> Model
initial { width, height } =
    { jeep = Nothing
    , dimensions = ( Pixels.int width, Pixels.int height )
    , azimuth = 35
    , elapsed = 0
    , started = False
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Loaded (Ok jeep) ->
            ( { model | jeep = Just jeep }, Cmd.none )

        Loaded (Err _) ->
            ( model, Cmd.none )

        Tick dt ->
            ( { model | azimuth = model.azimuth + dt * 0.012, elapsed = model.elapsed + dt, started = True }
            , if model.started then
                Cmd.none

              else
                Jeep.loadWith 0.5 { texture = "Jeep.png", mesh = "Jeep.obj.txt" }
                    |> Task.attempt Loaded
            )


camera : Float -> Camera3d Meters WorldCoordinates
camera azimuth =
    Camera3d.orbitZ
        { focalPoint = Point3d.meters 0 0 0.35
        , azimuth = Angle.degrees azimuth
        , elevation = Angle.degrees 20
        , distance = Length.meters 11
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 30)
        }


wheelEntity : Jeep -> Axis3d Meters BodyCoordinates -> Scene3d.Entity BodyCoordinates
wheelEntity jeep axis =
    let
        mirror =
            if Quantity.greaterThan Quantity.zero (Direction3d.angleFrom Direction3d.negativeX (Axis3d.direction axis)) then
                identity

            else
                Frame3d.mirrorAcross Plane3d.yz

        frame =
            Frame3d.atOrigin
                |> mirror
                |> Frame3d.moveTo (Axis3d.originPoint axis)
    in
    Scene3d.mesh jeep.material jeep.wheel
        |> Scene3d.placeIn frame


view : Model -> Html Msg
view model =
    Html.div
        [ Html.Attributes.style "position" "absolute"
        , Html.Attributes.style "left" "0"
        , Html.Attributes.style "top" "0"
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.positiveZ
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -55)
            , shadows = False
            , camera = camera model.azimuth
            , dimensions = model.dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities =
                case model.jeep of
                    Just jeep ->
                        [ Scene3d.placeIn Frame3d.atOrigin
                            (Scene3d.group
                                (if showCollider model.elapsed then
                                    colliderEntities jeep

                                 else
                                    meshEntities jeep
                                )
                            )
                        ]

                    Nothing ->
                        []
            }
        ]


{-| Alternate between the textured mesh and the collision hulls.
-}
showCollider : Float -> Bool
showCollider elapsed =
    (floor (elapsed / 2500) |> modBy 2) == 1


meshEntities : Jeep -> List (Scene3d.Entity BodyCoordinates)
meshEntities jeep =
    Scene3d.mesh jeep.material jeep.chassis
        :: List.map (wheelEntity jeep) jeep.wheelAxes


colliderMaterial : Scene3d.Material.Material coordinates { a | normals : () }
colliderMaterial =
    Scene3d.Material.nonmetal { baseColor = Color.rgb255 70 200 120, roughness = 0.5 }


colliderEntities : Jeep -> List (Scene3d.Entity BodyCoordinates)
colliderEntities jeep =
    Scene3d.mesh colliderMaterial jeep.colliderMesh
        :: List.map (arrowEntity jeep.wheelRadius) jeep.wheelAxes


arrowMaterial : Scene3d.Material.Material coordinates { a | normals : () }
arrowMaterial =
    Scene3d.Material.nonmetal { baseColor = Color.rgb255 47 111 237, roughness = 0.4 }


{-| A cylinder shaft topped with a cone — an arrow pointing straight down from
each wheel, showing the suspension raycast direction.
-}
arrowEntity : Length.Length -> Axis3d Meters BodyCoordinates -> Scene3d.Entity BodyCoordinates
arrowEntity wheelRadius axis =
    let
        start =
            Axis3d.originPoint axis

        dir =
            Direction3d.negativeZ

        shaftLength =
            Quantity.multiplyBy 0.65 wheelRadius

        shaftEnd =
            start |> Point3d.translateIn dir shaftLength
    in
    Scene3d.group
        [ Scene3d.cylinder arrowMaterial
            (Cylinder3d.startingAt start dir { radius = Quantity.multiplyBy 0.07 wheelRadius, length = shaftLength })
        , Scene3d.cone arrowMaterial
            (Cone3d.startingAt shaftEnd dir { radius = Quantity.multiplyBy 0.18 wheelRadius, length = Quantity.multiplyBy 0.35 wheelRadius })
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Browser.Events.onAnimationFrameDelta Tick
