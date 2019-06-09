module Model
    exposing
        ( Model
        , Message
        , animation2d
        , sphere
        , tangram
        , triangle
        , shadertoy
        , snake
        , subscriptions
        , update
        , view
        )

import Triangle.Main as Triangle
import Tangram.Main as Tangram
import Sphere.Main as Sphere
import Shadertoy.Main as Shadertoy
import Animation2D.Main as Animation2D
import Snake.Main as Snake
import Html exposing (Html)


type Model
    = TriangleModel Triangle.Model
    | TangramModel Tangram.Model
    | SphereModel Sphere.Model
    | ShadertoyModel Shadertoy.Model
    | Animation2DModel Animation2D.Model
    | SnakeModel Snake.Model


type Message
    = TriangleMessage Triangle.Message
    | TangramMessage Tangram.Message
    | SphereMessage Sphere.Message
    | ShadertoyMessage Shadertoy.Message
    | Animation2DMessage Animation2D.Message
    | SnakeMessage Snake.Message


triangle : Model
triangle =
    TriangleModel Triangle.initial


tangram : Model
tangram =
    TangramModel Tangram.initial


sphere : Int -> Int -> Int -> Model
sphere width height iterations =
    SphereModel (Sphere.initial width height iterations)


shadertoy : Model
shadertoy =
    ShadertoyModel Shadertoy.initial


snake : Int -> Int -> Model
snake width height =
    SnakeModel (Snake.initial width height)


animation2d : String -> Model
animation2d path =
    Animation2DModel (Animation2D.initial path)


subscriptions : Model -> Sub Message
subscriptions model =
    case model of
        TriangleModel triangle ->
            Sub.map TriangleMessage (Triangle.subscriptions triangle)

        TangramModel tangram ->
            Sub.map TangramMessage (Tangram.subscriptions tangram)

        SphereModel sphere ->
            Sub.map SphereMessage (Sphere.subscriptions sphere)

        ShadertoyModel shadertoy ->
            Sub.map ShadertoyMessage (Shadertoy.subscriptions shadertoy)

        Animation2DModel animation2d ->
            Sub.map Animation2DMessage (Animation2D.subscriptions animation2d)

        SnakeModel snake ->
            Sub.map SnakeMessage (Snake.subscriptions snake)


update : Message -> Model -> ( Model, Cmd Message )
update action model =
    case ( action, model ) of
        ( TriangleMessage a, TriangleModel m ) ->
            let
                ( newModel, newCmd ) =
                    Triangle.update a m
            in
                ( TriangleModel newModel, Cmd.map TriangleMessage newCmd )

        ( TangramMessage a, TangramModel m ) ->
            let
                ( newModel, newCmd ) =
                    Tangram.update a m
            in
                ( TangramModel newModel, Cmd.map TangramMessage newCmd )

        ( SphereMessage a, SphereModel m ) ->
            let
                ( newModel, newCmd ) =
                    Sphere.update a m
            in
                ( SphereModel newModel, Cmd.map SphereMessage newCmd )

        ( ShadertoyMessage a, ShadertoyModel m ) ->
            let
                ( newModel, newCmd ) =
                    Shadertoy.update a m
            in
                ( ShadertoyModel newModel, Cmd.map ShadertoyMessage newCmd )

        ( Animation2DMessage a, Animation2DModel m ) ->
            let
                ( newModel, newCmd ) =
                    Animation2D.update a m
            in
                ( Animation2DModel newModel, Cmd.map Animation2DMessage newCmd )

        ( SnakeMessage a, SnakeModel m ) ->
            let
                ( newModel, newCmd ) =
                    Snake.update a m
            in
                ( SnakeModel newModel, Cmd.map SnakeMessage newCmd )

        _ ->
            ( model, Cmd.none )


view : Model -> Html Message
view model =
    case model of
        TriangleModel triangle ->
            Html.map TriangleMessage (Triangle.view triangle)

        TangramModel tangram ->
            Html.map TangramMessage (Tangram.view tangram)

        SphereModel sphere ->
            Html.map SphereMessage (Sphere.view sphere)

        ShadertoyModel shadertoy ->
            Html.map ShadertoyMessage (Shadertoy.view shadertoy)

        Animation2DModel animation2d ->
            Html.map Animation2DMessage (Animation2D.view animation2d)

        SnakeModel snake ->
            Html.map SnakeMessage (Snake.view snake)
