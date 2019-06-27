module Common.Settings exposing
    ( Settings
    , SettingsMsg
    , settings
    , update
    , view
    )

{-| This module is used to render the settings panel.
More controls can be injected with view’s extraContent.
-}

import Html exposing (Html)
import Html.Attributes exposing (checked, style, type_)
import Html.Events exposing (onCheck, onClick)


type alias Settings =
    { debugContacts : Bool -- Set to True to see collision points
    , debugNormals : Bool -- Set to True to see normal spikes
    , debugEdges : Bool -- Set to True to see edge markers
    , debugWireframes : Bool -- Set to True to see wireframes
    , showFpsMeter : Bool
    , showSettings : Bool
    }


type SettingsMsg
    = ToggleContacts Bool
    | ToggleNormals Bool
    | ToggleEdges Bool
    | ToggleWireframes Bool
    | ToggleFpsMeter Bool
    | ToggleSettings


settings : Settings
settings =
    { debugContacts = False
    , debugNormals = False
    , debugEdges = False
    , debugWireframes = False
    , showSettings = False
    , showFpsMeter = False
    }


update : SettingsMsg -> Settings -> Settings
update msg model =
    case msg of
        ToggleSettings ->
            { model | showSettings = not model.showSettings }

        ToggleContacts debugContacts ->
            { model | debugContacts = debugContacts }

        ToggleNormals debugNormals ->
            { model | debugNormals = debugNormals }

        ToggleEdges debugEdges ->
            { model | debugEdges = debugEdges }

        ToggleWireframes debugWireframes ->
            { model | debugWireframes = debugWireframes }

        ToggleFpsMeter showFpsMeter ->
            { model | showFpsMeter = showFpsMeter }


view : (SettingsMsg -> msg) -> Settings -> List (Html msg) -> Html msg
view msg { showSettings, debugContacts, debugNormals, debugEdges, debugWireframes, showFpsMeter } extraContent =
    Html.div
        [ style "position" "fixed"
        , style "right" "6px"
        , style "top" "0"
        , style "font" "24px monospace"
        , style "color" "white"
        ]
        (if showSettings then
            [ button (msg ToggleSettings) "Hide Settings"
            , Html.div
                [ style "padding" "5px 15px 10px"
                , style "box-sizing" "border-box"
                , style "background" "rgb(70, 70, 70)"
                , style "border-radius" "0 0 4px 4px"
                , style "min-width" "17ch"
                ]
                ([ checkbox (ToggleContacts >> msg) debugContacts "contacts"
                 , checkbox (ToggleNormals >> msg) debugNormals "normals"
                 , checkbox (ToggleEdges >> msg) debugEdges "unique edges"
                 , checkbox (ToggleWireframes >> msg) debugWireframes "wireframes"
                 , checkbox (ToggleFpsMeter >> msg) showFpsMeter "fps meter"
                 ]
                    ++ List.map wrapWithMargin extraContent
                )
            ]

         else
            [ button (msg ToggleSettings) "Show Settings" ]
        )


wrapWithMargin : Html msg -> Html msg
wrapWithMargin el =
    Html.div [ style "margin" "15px 0 5px" ] [ el ]


button : msg -> String -> Html msg
button msg text =
    Html.button
        [ style "padding" "6px"
        , style "box-sizing" "content-box"
        , style "min-width" "17ch"
        , style "color" "inherit"
        , style "border" "none"
        , style "font" "inherit"
        , style "outline" "0"
        , style "text-align" "center"
        , style "margin" "0"
        , style "display" "block"
        , style "background" "rgb(61, 61, 61)"
        , onClick msg
        ]
        [ Html.text text ]


checkbox : (Bool -> msg) -> Bool -> String -> Html msg
checkbox msg value label =
    wrapWithMargin <|
        Html.button
            [ onClick (msg (not value))
            , style "display" "block"
            , style "border" "0"
            , style "font" "inherit"
            , style "color" "inherit"
            , style "width" "100%"
            , style "background" "transparent"
            , style "padding" "0"
            , style "margin" "10px 0 5px"
            , style "text-align" "left"
            , style "outline" "0"
            ]
            [ Html.span
                [ style "width" "30px"
                , style "display" "inline-block"
                , style "margin-right" "10px"
                , style "text-align" "center"
                ]
                [ if value then
                    Html.text "✓︎"

                  else
                    Html.text ""
                ]
            , Html.text label
            ]
