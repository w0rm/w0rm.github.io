module Model (Model(..), fountain, pathfinder) where

import Fountain
import Pathfinder

type Model
  = FountainModel Fountain.Model
  | PathfinderModel Pathfinder.Model


fountain : Model
fountain =
  FountainModel Fountain.initial


pathfinder : Model
pathfinder =
  PathfinderModel Pathfinder.initial
