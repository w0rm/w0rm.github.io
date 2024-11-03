module Common.Palette exposing
    ( blue
    , cyan
    , fromCss
    , green
    , indigo
    , mint
    , orange
    , purple
    , red
    , toVec3
    , white
    , yellow
    )

import Color exposing (Color)
import Hex
import Math.Vector3 exposing (Vec3, vec3)


blue : Color
blue =
    Color.rgb255 12 120 255


red : Color
red =
    Color.rgb255 251 69 67


yellow : Color
yellow =
    Color.rgb255 252 208 3


orange : Color
orange =
    Color.rgb255 246 165 13


indigo : Color
indigo =
    Color.rgb255 101 95 220


mint : Color
mint =
    Color.rgb255 0 207 192


green : Color
green =
    Color.rgb255 50 206 112


cyan : Color
cyan =
    Color.rgb255 44 181 238


purple : Color
purple =
    Color.rgb255 184 89 217


white : Color
white =
    Color.rgb255 255 255 255


toVec3 : Color -> Vec3
toVec3 color =
    let
        c =
            Color.toRgba color
    in
    vec3 c.red c.green c.blue


fromCss : String -> Maybe Color
fromCss css =
    if String.startsWith "rgb(" css then
        let
            parts =
                String.split "," (String.dropLeft 4 css)
        in
        case parts of
            [ r, g, b ] ->
                Maybe.map3 Color.rgb255 (String.toInt r) (String.toInt g) (String.toInt b)

            _ ->
                Nothing

    else if String.startsWith "#" css then
        case String.toList (String.dropLeft 1 css) of
            [ r1, g1, b1 ] ->
                Result.map3 Color.rgb255
                    (Hex.fromString (String.fromList [ r1, r1 ]))
                    (Hex.fromString (String.fromList [ g1, g1 ]))
                    (Hex.fromString (String.fromList [ b1, b1 ]))
                    |> Result.toMaybe

            [ r1, r2, g1, g2, b1, b2 ] ->
                Result.map3 Color.rgb255
                    (Hex.fromString (String.fromList [ r1, r2 ]))
                    (Hex.fromString (String.fromList [ g1, g2 ]))
                    (Hex.fromString (String.fromList [ b1, b2 ]))
                    |> Result.toMaybe

            _ ->
                Nothing

    else
        case css of
            "aliceblue" ->
                Just (Color.rgb255 240 248 255)

            "antiquewhite" ->
                Just (Color.rgb255 250 235 215)

            "aqua" ->
                Just (Color.rgb255 0 255 255)

            "aquamarine" ->
                Just (Color.rgb255 127 255 212)

            "azure" ->
                Just (Color.rgb255 240 255 255)

            "beige" ->
                Just (Color.rgb255 245 245 220)

            "bisque" ->
                Just (Color.rgb255 255 228 196)

            "black" ->
                Just (Color.rgb255 0 0 0)

            "blanchedalmond" ->
                Just (Color.rgb255 255 235 205)

            "blue" ->
                Just (Color.rgb255 0 0 255)

            "blueviolet" ->
                Just (Color.rgb255 138 43 226)

            "brown" ->
                Just (Color.rgb255 165 42 42)

            "burlywood" ->
                Just (Color.rgb255 222 184 135)

            "cadetblue" ->
                Just (Color.rgb255 95 158 160)

            "chartreuse" ->
                Just (Color.rgb255 127 255 0)

            "chocolate" ->
                Just (Color.rgb255 210 105 30)

            "coral" ->
                Just (Color.rgb255 255 127 80)

            "cornflowerblue" ->
                Just (Color.rgb255 100 149 237)

            "cornsilk" ->
                Just (Color.rgb255 255 248 220)

            "crimson" ->
                Just (Color.rgb255 220 20 60)

            "cyan" ->
                Just (Color.rgb255 0 255 255)

            "darkblue" ->
                Just (Color.rgb255 0 0 139)

            "darkcyan" ->
                Just (Color.rgb255 0 139 139)

            "darkgoldenrod" ->
                Just (Color.rgb255 184 134 11)

            "darkgray" ->
                Just (Color.rgb255 169 169 169)

            "darkgreen" ->
                Just (Color.rgb255 0 100 0)

            "darkgrey" ->
                Just (Color.rgb255 169 169 169)

            "darkkhaki" ->
                Just (Color.rgb255 189 183 107)

            "darkmagenta" ->
                Just (Color.rgb255 139 0 139)

            "darkolivegreen" ->
                Just (Color.rgb255 85 107 47)

            "darkorange" ->
                Just (Color.rgb255 255 140 0)

            "darkorchid" ->
                Just (Color.rgb255 153 50 204)

            "darkred" ->
                Just (Color.rgb255 139 0 0)

            "darksalmon" ->
                Just (Color.rgb255 233 150 122)

            "darkseagreen" ->
                Just (Color.rgb255 143 188 143)

            "darkslateblue" ->
                Just (Color.rgb255 72 61 139)

            "darkslategray" ->
                Just (Color.rgb255 47 79 79)

            "darkslategrey" ->
                Just (Color.rgb255 47 79 79)

            "darkturquoise" ->
                Just (Color.rgb255 0 206 209)

            "darkviolet" ->
                Just (Color.rgb255 148 0 211)

            "deeppink" ->
                Just (Color.rgb255 255 20 147)

            "deepskyblue" ->
                Just (Color.rgb255 0 191 255)

            "dimgray" ->
                Just (Color.rgb255 105 105 105)

            "dimgrey" ->
                Just (Color.rgb255 105 105 105)

            "dodgerblue" ->
                Just (Color.rgb255 30 144 255)

            "firebrick" ->
                Just (Color.rgb255 178 34 34)

            "floralwhite" ->
                Just (Color.rgb255 255 250 240)

            "forestgreen" ->
                Just (Color.rgb255 34 139 34)

            "fuchsia" ->
                Just (Color.rgb255 255 0 255)

            "gainsboro" ->
                Just (Color.rgb255 220 220 220)

            "ghostwhite" ->
                Just (Color.rgb255 248 248 255)

            "gold" ->
                Just (Color.rgb255 255 215 0)

            "goldenrod" ->
                Just (Color.rgb255 218 165 32)

            "gray" ->
                Just (Color.rgb255 128 128 128)

            "green" ->
                Just (Color.rgb255 0 128 0)

            "greenyellow" ->
                Just (Color.rgb255 173 255 47)

            "grey" ->
                Just (Color.rgb255 128 128 128)

            "honeydew" ->
                Just (Color.rgb255 240 255 240)

            "hotpink" ->
                Just (Color.rgb255 255 105 180)

            "indianred" ->
                Just (Color.rgb255 205 92 92)

            "indigo" ->
                Just (Color.rgb255 75 0 130)

            "ivory" ->
                Just (Color.rgb255 255 255 240)

            "khaki" ->
                Just (Color.rgb255 240 230 140)

            "lavender" ->
                Just (Color.rgb255 230 230 250)

            "lavenderblush" ->
                Just (Color.rgb255 255 240 245)

            "lawngreen" ->
                Just (Color.rgb255 124 252 0)

            "lemonchiffon" ->
                Just (Color.rgb255 255 250 205)

            "lightblue" ->
                Just (Color.rgb255 173 216 230)

            "lightcoral" ->
                Just (Color.rgb255 240 128 128)

            "lightcyan" ->
                Just (Color.rgb255 224 255 255)

            "lightgoldenrodyellow" ->
                Just (Color.rgb255 250 250 210)

            "lightgray" ->
                Just (Color.rgb255 211 211 211)

            "lightgreen" ->
                Just (Color.rgb255 144 238 144)

            "lightgrey" ->
                Just (Color.rgb255 211 211 211)

            "lightpink" ->
                Just (Color.rgb255 255 182 193)

            "lightsalmon" ->
                Just (Color.rgb255 255 160 122)

            "lightseagreen" ->
                Just (Color.rgb255 32 178 170)

            "lightskyblue" ->
                Just (Color.rgb255 135 206 250)

            "lightslategray" ->
                Just (Color.rgb255 119 136 153)

            "lightslategrey" ->
                Just (Color.rgb255 119 136 153)

            "lightsteelblue" ->
                Just (Color.rgb255 176 196 222)

            "lightyellow" ->
                Just (Color.rgb255 255 255 224)

            "lime" ->
                Just (Color.rgb255 0 255 0)

            "limegreen" ->
                Just (Color.rgb255 50 205 50)

            "linen" ->
                Just (Color.rgb255 250 240 230)

            "magenta" ->
                Just (Color.rgb255 255 0 255)

            "maroon" ->
                Just (Color.rgb255 128 0 0)

            "mediumaquamarine" ->
                Just (Color.rgb255 102 205 170)

            "mediumblue" ->
                Just (Color.rgb255 0 0 205)

            "mediumorchid" ->
                Just (Color.rgb255 186 85 211)

            "mediumpurple" ->
                Just (Color.rgb255 147 112 219)

            "mediumseagreen" ->
                Just (Color.rgb255 60 179 113)

            "mediumslateblue" ->
                Just (Color.rgb255 123 104 238)

            "mediumspringgreen" ->
                Just (Color.rgb255 0 250 154)

            "mediumturquoise" ->
                Just (Color.rgb255 72 209 204)

            "mediumvioletred" ->
                Just (Color.rgb255 199 21 133)

            "midnightblue" ->
                Just (Color.rgb255 25 25 112)

            "mintcream" ->
                Just (Color.rgb255 245 255 250)

            "mistyrose" ->
                Just (Color.rgb255 255 228 225)

            "moccasin" ->
                Just (Color.rgb255 255 228 181)

            "navajowhite" ->
                Just (Color.rgb255 255 222 173)

            "navy" ->
                Just (Color.rgb255 0 0 128)

            "oldlace" ->
                Just (Color.rgb255 253 245 230)

            "olive" ->
                Just (Color.rgb255 128 128 0)

            "olivedrab" ->
                Just (Color.rgb255 107 142 35)

            "orange" ->
                Just (Color.rgb255 255 165 0)

            "orangered" ->
                Just (Color.rgb255 255 69 0)

            "orchid" ->
                Just (Color.rgb255 218 112 214)

            "palegoldenrod" ->
                Just (Color.rgb255 238 232 170)

            "palegreen" ->
                Just (Color.rgb255 152 251 152)

            "paleturquoise" ->
                Just (Color.rgb255 175 238 238)

            "palevioletred" ->
                Just (Color.rgb255 219 112 147)

            "papayawhip" ->
                Just (Color.rgb255 255 239 213)

            "peachpuff" ->
                Just (Color.rgb255 255 218 185)

            "peru" ->
                Just (Color.rgb255 205 133 63)

            "pink" ->
                Just (Color.rgb255 255 192 203)

            "plum" ->
                Just (Color.rgb255 221 160 221)

            "powderblue" ->
                Just (Color.rgb255 176 224 230)

            "purple" ->
                Just (Color.rgb255 128 0 128)

            "rebeccapurple" ->
                Just (Color.rgb255 102 51 153)

            "red" ->
                Just (Color.rgb255 255 0 0)

            "rosybrown" ->
                Just (Color.rgb255 188 143 143)

            "royalblue" ->
                Just (Color.rgb255 65 105 225)

            "saddlebrown" ->
                Just (Color.rgb255 139 69 19)

            "salmon" ->
                Just (Color.rgb255 250 128 114)

            "sandybrown" ->
                Just (Color.rgb255 244 164 96)

            "seagreen" ->
                Just (Color.rgb255 46 139 87)

            "seashell" ->
                Just (Color.rgb255 255 245 238)

            "sienna" ->
                Just (Color.rgb255 160 82 45)

            "silver" ->
                Just (Color.rgb255 192 192 192)

            "skyblue" ->
                Just (Color.rgb255 135 206 235)

            "slateblue" ->
                Just (Color.rgb255 106 90 205)

            "slategray" ->
                Just (Color.rgb255 112 128 144)

            "slategrey" ->
                Just (Color.rgb255 112 128 144)

            "snow" ->
                Just (Color.rgb255 255 250 250)

            "springgreen" ->
                Just (Color.rgb255 0 255 127)

            "steelblue" ->
                Just (Color.rgb255 70 130 180)

            "tan" ->
                Just (Color.rgb255 210 180 140)

            "teal" ->
                Just (Color.rgb255 0 128 128)

            "thistle" ->
                Just (Color.rgb255 216 191 216)

            "tomato" ->
                Just (Color.rgb255 255 99 71)

            "turquoise" ->
                Just (Color.rgb255 64 224 208)

            "violet" ->
                Just (Color.rgb255 238 130 238)

            "wheat" ->
                Just (Color.rgb255 245 222 179)

            "white" ->
                Just (Color.rgb255 255 255 255)

            "whitesmoke" ->
                Just (Color.rgb255 245 245 245)

            "yellow" ->
                Just (Color.rgb255 255 255 0)

            "yellowgreen" ->
                Just (Color.rgb255 154 205 50)

            _ ->
                Nothing
