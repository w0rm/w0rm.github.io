module Common.Events exposing
    ( measureSize
    , onAnimationFrameDelta
    , onMouseDown
    , onMouseMove
    , onMouseUp
    , onResize
    )

{-| Helpers for some common events,
subscriptions and commands
-}

import Browser.Dom as Dom
import Browser.Events as Events
import Common.Camera as Camera exposing (Camera)
import Html exposing (Attribute)
import Html.Events as Events
import Json.Decode as Decode exposing (Decoder)
import Task


measureSize : (Float -> Float -> msg) -> Cmd msg
measureSize fn =
    Task.perform
        (\{ viewport } -> fn viewport.width viewport.height)
        Dom.getViewport


onResize : (Float -> Float -> msg) -> Sub msg
onResize fn =
    Events.onResize (\w h -> fn (toFloat w) (toFloat h))


onAnimationFrameDelta : (Float -> msg) -> Sub msg
onAnimationFrameDelta =
    Events.onAnimationFrameDelta


onMouseDown : ({ x : Float, y : Float } -> { x : Float, y : Float }) -> Camera -> ({ x : Float, y : Float, z : Float } -> msg) -> Attribute msg
onMouseDown offset camera fn =
    Events.on "mousedown" (coordinates offset camera fn)


onMouseMove : ({ x : Float, y : Float } -> { x : Float, y : Float }) -> Camera -> ({ x : Float, y : Float, z : Float } -> msg) -> Attribute msg
onMouseMove offset camera fn =
    Events.on "mousemove" (coordinates offset camera fn)


onMouseUp : ({ x : Float, y : Float } -> { x : Float, y : Float }) -> Camera -> ({ x : Float, y : Float, z : Float } -> msg) -> Attribute msg
onMouseUp offset camera fn =
    Events.on "mouseup" (coordinates offset camera fn)


coordinates : ({ x : Float, y : Float } -> { x : Float, y : Float }) -> Camera -> ({ x : Float, y : Float, z : Float } -> msg) -> Decoder msg
coordinates offset camera fn =
    Decode.map2
        (\x y ->
            let
                p =
                    offset { x = x, y = y }
            in
            fn (Camera.mouseDirection camera p.x p.y)
        )
        (Decode.field "pageX" Decode.float)
        (Decode.field "pageY" Decode.float)
