# Bringing the Fun to Graphics Programming

Slides from the [Elm Europe 2017](https://elmeurope.org).
Updated for [Lambda Days 2018](http://www.lambdadays.org/lambdadays2018).

## Abstract

Graphics programming is hard. That’s definitely the case when you try to use WebGL in plain JavaScript. Elm can make graphics programming on the web easy and robust in the same way as it made building UI’s easy.

The WebGL library got a new home in the Elm Community organization. Version 2.0 came with lots of new features and improvements to the API. It’s now much more friendly for newcomers.

I’ll show you cool graphics demos as well as explain some of the basics. My hope is that you leave feeling inspired to start some of your own WebGL projects using our new library.

## Bio (Andrey Kuzmin)

[@unsoundscapes](https://twitter.com/unsoundscapes)

**Andrey** is a frontend engineer at SoundCloud. His journey into Elm was through programming games, most notably elm-flatris and elm-street-404. The latter got him interested in WebGL and then he became a maintainer of the library. Apart from work, he enjoys live music in Berlin and is a yoga newbie.

## Building the slides

```sh
elm make Main.elm --output assets/elm.js --yes && open index.html
```

To make the texture load (on one of the slides) you need to serve this from a webserver, e.g. `python -m SimpleHTTPServer 8000`
