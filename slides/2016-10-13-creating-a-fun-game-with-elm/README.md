# Creating a Fun Game With Elm

## ReactNL

[http://reactnl.org](http://reactnl.org)

Slides:
[http://unsoundscapes.com/slides/2016-10-13-creating-a-fun-game-with-elm](http://unsoundscapes.com/slides/2016-07-18-creating-a-fun-game-with-elm)


## Curry On

[http://www.curry-on.org/2016/sessions/creating-a-fun-game-with-elm.html](http://www.curry-on.org/2016/sessions/creating-a-fun-game-with-elm.html)

Video: [https://www.youtube.com/watch?v=En2BKs8unnQ](https://www.youtube.com/watch?v=En2BKs8unnQ)

Slides: [http://unsoundscapes.com/slides/2016-07-18-creating-a-fun-game-with-elm](http://unsoundscapes.com/slides/2016-07-18-creating-a-fun-game-with-elm)


## Abstract

You are Joe, the courier. It is your job, to deliver all the fashion to all the customers. Sometimes, you have to pick up stuff and return it to the warehouse. However, customers keep ordering more and more — and your bicycle only has room for so many boxes… In this talk we want to tell you how the Elm Architecture empowered us to put the “Elm Street 404” game together. We will give you some insight into the algorithms at play and how we applied functional concepts to the domain of game programming. Some of the challenges we were facing include: implementing a path-finding solution, the random generation of the map and game objects, improving the performance and rendering with WebGL.

## Bio (Andrey Kuzmin)

[@unsoundscapes](https://twitter.com/unsoundscapes)

Andrey Kuzmin is a frontend engineer. He has contributed to frontend tooling, most notably with his gulp-svgstore and gulp-postcss open source projects. Recently Andrey has been learning a functional reactive programming in Elm. Apart from work, he enjoys live music in Berlin and is a yoga newbie.

## Bio (Kolja Wilcke)

[@01k](https://twitter.com/01k)

Kolja Wilcke has worked alternatingly as an illustrator and as a frontend developer, currently with Zalando STUPS. Of late, he took an interest in functional programming and ClojureScript. He also enjoys learning languages outside of the realm of programming.


## Building the slides

`elm make Main.elm --output assets/elm.js --yes && open index.html`
