module MeshGradient.Shaders exposing (Uniforms, fragment, uniforms, vertex)

import Color exposing (Color)
import Common.Palette as Palette
import Common.Types exposing (Point)
import Formatting exposing (width)
import Math.Vector2 as Vec2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3, vec3)
import MeshGradient.BezierPoint exposing (BezierPoint, Vector)
import MeshGradient.Grid as Grid exposing (Grid)
import WebGL exposing (Shader)


type alias Uniforms =
    { uResolution : Vec2 -- width, height (in pixels)
    , uSettings : Vec2 -- wireframe (1 on, 2 off), noise intencity (0 to 1)
    , uPoint1 : Vec2
    , uPoint2 : Vec2
    , uPoint3 : Vec2
    , uPoint4 : Vec2
    , uPoint5 : Vec2
    , uPoint6 : Vec2
    , uPoint7 : Vec2
    , uPoint8 : Vec2
    , uPoint9 : Vec2
    , uPoint10 : Vec2
    , uPoint11 : Vec2
    , uPoint12 : Vec2
    , uPoint13 : Vec2
    , uPoint14 : Vec2
    , uPoint15 : Vec2
    , uPoint16 : Vec2
    , uColor1 : Vec3
    , uColor4 : Vec3
    , uColor13 : Vec3
    , uColor16 : Vec3
    }


uniforms : { width : Float, height : Float } -> Grid BezierPoint -> List (Bool -> Uniforms)
uniforms screen grid =
    Grid.fold (\i j acc -> cellUniforms screen grid i j :: acc)
        []
        (grid.width - 1)
        (grid.height - 1)


{-| Autogenerate intermediate control points, based on the 4 corner bezier points.
Totalling in 16 points:

          1  2  3  4
          5  6  7  8
          9  10 11 12
          13 14 15 16

-}
cellUniforms : { width : Float, height : Float } -> Grid BezierPoint -> Int -> Int -> Bool -> Uniforms
cellUniforms screen grid i j wireframe =
    let
        point1 =
            Grid.get grid i j

        point4 =
            Grid.get grid (i + 1) j

        point13 =
            Grid.get grid i (j + 1)

        point16 =
            Grid.get grid (i + 1) (j + 1)

        color1 =
            Grid.getColor grid i j

        color4 =
            Grid.getColor grid (i + 1) j

        color13 =
            Grid.getColor grid i (j + 1)

        color16 =
            Grid.getColor grid (i + 1) (j + 1)

        point2 =
            offsetBy point1.trailing point1.position

        point5 =
            offsetBy point1.bottom point1.position

        point3 =
            offsetBy point4.leading point4.position

        point8 =
            offsetBy point4.bottom point4.position

        point14 =
            offsetBy point13.trailing point13.position

        point9 =
            offsetBy point13.top point13.position

        point15 =
            offsetBy point16.leading point16.position

        point12 =
            offsetBy point16.top point16.position

        -- Calculate the intermediate points via a simple interpolation
        -- TODO: maybe do that in the shader?
        point6 =
            Point ((point14.x + 2 * point2.x) / 3) ((point8.y + 2 * point5.y) / 3)

        point7 =
            Point ((point15.x + 2 * point3.x) / 3) ((point5.y + 2 * point8.y) / 3)

        point10 =
            Point ((point2.x + 2 * point14.x) / 3) ((point12.y + 2 * point9.y) / 3)

        point11 =
            Point ((point3.x + 2 * point15.x) / 3) ((point9.y + 2 * point12.y) / 3)

        uWireframe =
            if wireframe then
                1

            else
                0
    in
    { uResolution = vec2 screen.width screen.height
    , uSettings = vec2 uWireframe 0.1
    , uPoint1 = Vec2.fromRecord point1.position
    , uPoint2 = Vec2.fromRecord point2
    , uPoint3 = Vec2.fromRecord point3
    , uPoint4 = Vec2.fromRecord point4.position
    , uPoint5 = Vec2.fromRecord point5
    , uPoint6 = Vec2.fromRecord point6
    , uPoint7 = Vec2.fromRecord point7
    , uPoint8 = Vec2.fromRecord point8
    , uPoint9 = Vec2.fromRecord point9
    , uPoint10 = Vec2.fromRecord point10
    , uPoint11 = Vec2.fromRecord point11
    , uPoint12 = Vec2.fromRecord point12
    , uPoint13 = Vec2.fromRecord point13.position
    , uPoint14 = Vec2.fromRecord point14
    , uPoint15 = Vec2.fromRecord point15
    , uPoint16 = Vec2.fromRecord point16.position
    , uColor1 = Palette.toVec3 color1
    , uColor4 = Palette.toVec3 color4
    , uColor13 = Palette.toVec3 color13
    , uColor16 = Palette.toVec3 color16
    }


offsetBy : Vector -> Point -> Point
offsetBy { dx, dy } { x, y } =
    Point (x + dx) (y + dy)


vertex : Shader { uv : Vec2 } Uniforms { vFragCoord : Vec2, vFragColor : Vec3 }
vertex =
    [glsl|
        precision mediump float;

        uniform vec2 uResolution; // viewport resolution (in pixels)
        uniform vec2 uSettings; // wireframe (1 on, 0 off), noise (0 to 1)
        uniform vec2 uPoint1;
        uniform vec2 uPoint2;
        uniform vec2 uPoint3;
        uniform vec2 uPoint4;
        uniform vec2 uPoint5;
        uniform vec2 uPoint6;
        uniform vec2 uPoint7;
        uniform vec2 uPoint8;
        uniform vec2 uPoint9;
        uniform vec2 uPoint10;
        uniform vec2 uPoint11;
        uniform vec2 uPoint12;
        uniform vec2 uPoint13;
        uniform vec2 uPoint14;
        uniform vec2 uPoint15;
        uniform vec2 uPoint16;
        uniform vec3 uColor1;
        uniform vec3 uColor4;
        uniform vec3 uColor13;
        uniform vec3 uColor16;

        attribute vec2 uv;

        varying vec2 vFragCoord;
        varying vec3 vFragColor;

        vec2 getPoint (float i, float j) {
            float n = 4.0 * j + i;
            if (n < 1.0) { return uPoint1; }
            else if (n < 2.0) { return uPoint2; }
            else if (n < 3.0) { return uPoint3; }
            else if (n < 4.0) { return uPoint4; }
            else if (n < 5.0) { return uPoint5; }
            else if (n < 6.0) { return uPoint6; }
            else if (n < 7.0) { return uPoint7; }
            else if (n < 8.0) { return uPoint8; }
            else if (n < 9.0) { return uPoint9; }
            else if (n < 10.0) { return uPoint10; }
            else if (n < 11.0) { return uPoint11; }
            else if (n < 12.0) { return uPoint12; }
            else if (n < 13.0) { return uPoint13; }
            else if (n < 14.0) { return uPoint14; }
            else if (n < 15.0) { return uPoint15; }
            else if (n < 16.0) { return uPoint16; }
            // should never happen
            else { return vec2(0.0); }
        }

        vec3 srgbToLinear (vec3 srgb) {
            return pow(srgb, vec3(2.2));
        }

        float bernsteinPolynomial (float k, float n, float x) {
            float coefficient = 1.0;
            float minimum = min(k, n - k);
            for (float i = 0.0; i < 4.0; i++) {
                if (i >= minimum) { break; }
                coefficient *= (n - i) / (i + 1.0);
            }
            float result = coefficient * pow(x, k) * pow(1.0 - x, n - k);
            if (k == 0.0 && x == 0.0 || k == n && x == 1.0) {
              // anchor points are always 1.0
              return 1.0;
            } else {
              return result;
            }
        }

        float cubicEasing(float t) {
            return t * t * (3.0 - 2.0 * t);
        }

        void main () {
            vec2 position = vec2(0.0);
            for (float i = 0.0; i < 4.0; i++) {
                float scalarX = bernsteinPolynomial(i, 3.0, uv.x);
                for (float j = 0.0; j < 4.0; j++) {
                    float scalarY = bernsteinPolynomial(j, 3.0, uv.y);
                    position += scalarX * scalarY * getPoint(i, j);
                }
            }

            vec3 color = mix(
              mix(srgbToLinear(uColor1), srgbToLinear(uColor4), cubicEasing(uv.x)),
              mix(srgbToLinear(uColor13), srgbToLinear(uColor16), cubicEasing(uv.x)),
              cubicEasing(uv.y)
            );

            vFragCoord = position * uResolution;
            if (uSettings.x > 0.5) {
                vFragColor = vec3(1.0);
            } else {
                vFragColor = color;
            }

            float uvDepth = -length(uv - vec2(0.5, 0.5)) * 0.25 - uSettings.x * 0.25;

            gl_Position = vec4((position * 2.0 - vec2(1.0, 1.0)) * vec2(1.0, -1.0), uvDepth, 1.0);
        }

    |]


fragment : Shader {} Uniforms { vFragCoord : Vec2, vFragColor : Vec3 }
fragment =
    [glsl|
        precision mediump float;

        uniform vec2 uResolution; // viewport resolution (in pixels)
        uniform vec2 uSettings; // wireframe (1 on, 0 off), noise intencity (0 to 1)

        varying vec2 vFragCoord;
        varying vec3 vFragColor;

        vec3 linearToSrgb(vec3 rgb) {
            return pow(rgb, vec3(1.0 / 2.2));
        }

        float noise(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float complexNoise(vec2 st) {
            float n1 = noise(st * 1.6);
            float n2 = noise(st * 3.2);
            float n3 = noise(st * 6.4);
            float n4 = noise(st * 12.8);
            float totalNoise = n1 * 0.5 + n2 * 0.25 + n3 * 0.125 + n4 * 0.0625;
            return totalNoise / (0.5 + 0.25 + 0.125 + 0.0625);
        }

        void main () {
            float n = complexNoise(vFragCoord * 0.1);
            vec3 color = mix(vFragColor, vFragColor * n, uSettings.y * -1.0);
            gl_FragColor = vec4(linearToSrgb(color), 1.0);
        }
    |]
