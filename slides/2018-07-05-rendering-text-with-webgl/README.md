# Rendering Text with WebGL

[Slides](https://unsoundscapes.com/slides/2018-07-05-rendering-text-with-webgl) from [Elm Europe 2018](https://2018.elmeurope.org).

## Abstract

We get a lot for free from using the web platform. Rendering text is one of such things that browsers do well. But what if we wanted to implement this ourselves from scratch? Then we would not only have to learn typographic terms, but also understand their true behavior.

Having implemented the rendering of a typeface, that my wife designed, I would like to share the challenges of modelling the text flow in Elm. Even though this has a limited practical applicability, my hope is that you would not only get some insights into typeface properties, but also learn to appreciate the tools we have. And of course you will see how good it fits with Elm!

## Bio (Andrey Kuzmin)

[@unsoundscapes](https://twitter.com/unsoundscapes)

**Andrey** is a frontend engineer at SoundCloud. He is a maintainer of WebGL in Elm and an organizer of the Elm Berlin meetup. Apart from work, he enjoys live music in Berlin and is a yoga newbie.

## Building the slides

```sh
elm make Main.elm --output assets/elm.js --yes && open index.html
```
