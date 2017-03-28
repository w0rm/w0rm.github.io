module Messages exposing (Message(..))

import Sphere
import Triangle


type Message
    = Sphere Sphere.Message
    | Triangle Triangle.Message
