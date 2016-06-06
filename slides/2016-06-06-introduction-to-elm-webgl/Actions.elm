module Actions exposing (Action(..))

import Sphere
import Triangle

type Action
  = Sphere Sphere.Action
  | Triangle Triangle.Action
