module Main exposing (..)

import Browser
import Html exposing (Html, text, div, h1, img, button)
import Html.Attributes exposing (src)
import Html.Events exposing (onClick)
import Random

oneToTen : Random.Generator Int
oneToTen =
  Random.int 1 10


newNumber : Cmd Msg
newNumber =
  Random.generate identity oneToTen

---- MODEL ----


type alias Model =
    Int


init : ( Model, Cmd Msg )
init =
    ( 0, newNumber )



---- UPDATE ----


type alias Msg
    = Model


update : Msg -> Model -> ( Model, Cmd Msg )
update newModel oldModel =
    ( newModel, Cmd.none )



---- VIEW ----


view : Model -> Html Model
view model =
    div []
        [ h1 [] [ text (Debug.toString model) ]
        , button [onClick (model - 1)] [text "decrement"]
        , button [onClick (model + 1)] [text "increment"]
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }
