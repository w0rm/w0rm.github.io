module Custom.Lack exposing (Model, Msg, Options, initial, subscriptions, update, view)

{-| This demo allows dragging objects with mouse, try flipping the table!

1.  Uses `World.raycast` on mouse down to pick a body
2.  Creates a temporary body at the mouse position
3.  Connects the temporary body with the selected body using a point to point constraint
4.  Moves the temporary body on mouse move
5.  Removes the temporary body on mouse up

-}

import Acceleration
import Angle
import Axis3d exposing (Axis3d)
import Block3d exposing (Block3d, dimensions)
import Browser
import Browser.Dom
import Browser.Events
import Camera3d exposing (Camera3d)
import Color
import Direction3d
import Duration exposing (seconds)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode exposing (Decoder)
import Length exposing (Meters, millimeters)
import Mass exposing (kilograms)
import Physics.Body as Body exposing (Body)
import Physics.Constraint as Constraint
import Physics.Coordinates exposing (BodyCoordinates, WorldCoordinates)
import Physics.Shape
import Physics.World as World exposing (RaycastResult, World)
import Pixels exposing (Pixels)
import Plane3d
import Point2d exposing (Point2d)
import Point3d
import Quantity exposing (Quantity)
import Rectangle2d
import Scene3d exposing (Entity)
import Scene3d.Material as Material
import Sphere3d
import Task
import Viewpoint3d


type Id
    = Mouse
    | Floor
    | Table


type alias Options =
    { width : Int
    , height : Int
    }


type alias Model =
    { world : World Id
    , dimensions : ( Quantity Int Pixels, Quantity Int Pixels )
    , size : Maybe ( Quantity Float Pixels, Quantity Float Pixels )
    , maybeRaycastResult : Maybe (RaycastResult Id)
    }


type Msg
    = AnimationFrame
    | Resize Int Int
    | MouseDown (Axis3d Meters WorldCoordinates)
    | MouseMove (Axis3d Meters WorldCoordinates)
    | MouseUp


initial : Options -> Model
initial options =
    { world = initialWorld
    , dimensions = ( Pixels.int options.width, Pixels.int options.height )
    , size = Nothing
    , maybeRaycastResult = Nothing
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onResize Resize
        , Browser.Events.onAnimationFrame (\_ -> AnimationFrame)
        ]


initialWorld : World Id
initialWorld =
    World.empty
        |> World.withGravity (Acceleration.gees 1) Direction3d.negativeZ
        |> World.add table
        |> World.add (Body.plane Floor)


tableBlocks : List (Block3d Meters BodyCoordinates)
tableBlocks =
    [ Block3d.from
        (Point3d.millimeters 222 222 0)
        (Point3d.millimeters 272 272 400)
    , Block3d.from
        (Point3d.millimeters -272 222 0)
        (Point3d.millimeters -222 272 400)
    , Block3d.from
        (Point3d.millimeters -272 -272 0)
        (Point3d.millimeters -222 -222 400)
    , Block3d.from
        (Point3d.millimeters 222 -272 0)
        (Point3d.millimeters 272 -222 400)
    , Block3d.from
        (Point3d.millimeters -275 -275 400)
        (Point3d.millimeters 275 275 450)
    ]


table : Body Id
table =
    Body.compound (List.map Physics.Shape.block tableBlocks) Table
        |> Body.withBehavior (Body.dynamic (kilograms 3.58))


camera : Camera3d Meters WorldCoordinates
camera =
    Camera3d.perspective
        { viewpoint =
            Viewpoint3d.lookAt
                { eyePoint = Point3d.meters 3.5 2.5 2.5
                , focalPoint = Point3d.meters 0.3 -1 0.3
                , upDirection = Direction3d.positiveZ
                }
        , verticalFieldOfView = Angle.degrees 24
        }


view : Model -> Html Msg
view { world, dimensions, size } =
    let
        width =
            dimensions |> Tuple.first |> Quantity.toFloatQuantity

        height =
            dimensions |> Tuple.second |> Quantity.toFloatQuantity

        convert =
            case size of
                Just ( w, h ) ->
                    let
                        -- Reposition the mouse, because elm-slice-show scales and centers the slide
                        ratio =
                            if Quantity.product w height |> Quantity.lessThan (Quantity.product width h) then
                                Quantity.ratio width w

                            else
                                Quantity.ratio height h
                    in
                    \p ->
                        let
                            x =
                                Point2d.xCoordinate p

                            y =
                                Point2d.yCoordinate p
                        in
                        Point2d.xy
                            (Quantity.multiplyBy ratio x |> Quantity.minus (Quantity.half (Quantity.multiplyBy ratio w |> Quantity.minus width)))
                            (Quantity.multiplyBy ratio y |> Quantity.minus (Quantity.half (Quantity.multiplyBy ratio h |> Quantity.minus height)))

                Nothing ->
                    identity
    in
    Html.div
        [ Html.Events.on "mousedown" (decodeMouseRay camera ( width, height ) convert MouseDown)
        , Html.Events.on "mousemove" (decodeMouseRay camera ( width, height ) convert MouseMove)
        , Html.Events.onMouseUp MouseUp
        ]
        [ Scene3d.sunny
            { upDirection = Direction3d.z
            , sunlightDirection = Direction3d.xyZ (Angle.degrees 135) (Angle.degrees -60)
            , shadows = True
            , camera = camera
            , dimensions = dimensions
            , background = Scene3d.transparentBackground
            , clipDepth = Length.meters 0.1
            , entities = List.map bodyToEntity (World.bodies world)
            }
        ]


bodyToEntity : Body Id -> Entity WorldCoordinates
bodyToEntity body =
    let
        frame =
            Body.frame body

        id =
            Body.data body
    in
    Scene3d.placeIn frame <|
        case id of
            Mouse ->
                Scene3d.sphere (Material.matte Color.orange)
                    (Sphere3d.atOrigin (millimeters 20))

            Table ->
                tableBlocks
                    |> List.map
                        (Scene3d.blockWithShadow
                            (Material.nonmetal
                                { baseColor = Color.lightGray
                                , roughness = 0.25
                                }
                            )
                        )
                    |> Scene3d.group

            Floor ->
                Scene3d.quad (Material.matte Color.white)
                    (Point3d.meters -15 -15 0)
                    (Point3d.meters -15 15 0)
                    (Point3d.meters 15 15 0)
                    (Point3d.meters 15 -15 0)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AnimationFrame ->
            ( { model | world = World.simulate (seconds (1 / 60)) model.world }
            , case model.size of
                Nothing ->
                    Task.perform
                        (\{ viewport } -> Resize (round viewport.width) (round viewport.height))
                        Browser.Dom.getViewport

                _ ->
                    Cmd.none
            )

        Resize width height ->
            ( { model
                | size = Just ( Pixels.float (toFloat width), Pixels.float (toFloat height) )
              }
            , Cmd.none
            )

        MouseDown mouseRay ->
            case World.raycast mouseRay model.world of
                Just raycastResult ->
                    case Body.data raycastResult.body of
                        Table ->
                            let
                                worldPoint =
                                    Point3d.placeIn
                                        (Body.frame raycastResult.body)
                                        raycastResult.point

                                mouse =
                                    Body.compound [] Mouse
                                        |> Body.moveTo worldPoint
                            in
                            ( { model
                                | maybeRaycastResult = Just raycastResult
                                , world =
                                    model.world
                                        |> World.add mouse
                                        |> World.constrain
                                            (\b1 b2 ->
                                                case ( Body.data b1, Body.data b2 ) of
                                                    ( Mouse, Table ) ->
                                                        [ Constraint.pointToPoint
                                                            Point3d.origin
                                                            raycastResult.point
                                                        ]

                                                    _ ->
                                                        []
                                            )
                              }
                            , Cmd.none
                            )

                        _ ->
                            ( model, Cmd.none )

                Nothing ->
                    ( model, Cmd.none )

        MouseMove mouseRay ->
            case model.maybeRaycastResult of
                Just raycastResult ->
                    let
                        worldPoint =
                            Point3d.placeIn
                                (Body.frame raycastResult.body)
                                raycastResult.point

                        plane =
                            Plane3d.through
                                worldPoint
                                (Viewpoint3d.viewDirection (Camera3d.viewpoint camera))
                    in
                    ( { model
                        | world =
                            World.update
                                (\body ->
                                    if Body.data body == Mouse then
                                        case Axis3d.intersectionWithPlane plane mouseRay of
                                            Just intersection ->
                                                Body.moveTo intersection body

                                            Nothing ->
                                                body

                                    else
                                        body
                                )
                                model.world
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( model, Cmd.none )

        MouseUp ->
            ( { model
                | maybeRaycastResult = Nothing
                , world =
                    World.keepIf
                        (\body -> Body.data body /= Mouse)
                        model.world
              }
            , Cmd.none
            )


decodeMouseRay :
    Camera3d Meters WorldCoordinates
    -> ( Quantity Float Pixels, Quantity Float Pixels )
    -> (Point2d Pixels a -> Point2d Pixels a)
    -> (Axis3d Meters WorldCoordinates -> msg)
    -> Decoder msg
decodeMouseRay camera3d ( width, height ) convert rayToMsg =
    Json.Decode.map2
        (\x y ->
            rayToMsg
                (Camera3d.ray
                    camera3d
                    (Rectangle2d.with
                        { x1 = Pixels.float 0
                        , y1 = height
                        , x2 = width
                        , y2 = Pixels.float 0
                        }
                    )
                    (convert (Point2d.pixels x y))
                )
        )
        (Json.Decode.field "pageX" Json.Decode.float)
        (Json.Decode.field "pageY" Json.Decode.float)
