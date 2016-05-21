module Model (Model(..), mogee) where

import Mogee

type Model
  = MogeeModel Mogee.Model

mogee : Model
mogee =
  MogeeModel Mogee.initial
