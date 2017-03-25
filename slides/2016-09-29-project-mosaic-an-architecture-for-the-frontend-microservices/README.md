# Project Mosaic — an Architecture for the Front-end Microservices

[Allegro Tech Talks Poznan #1](https://www.meetup.com/allegrotech/events/233789258/)

## Abstract

Microservices allow multiple teams to work independently from each other, choose their own technology stacks and establish their own release cycles. Yet, the front-end development hasn’t fully capitalized on these benefits and the common practice for building websites remains “the monolith”: a single frontend codebase that consumes multiple APIs.

We will present how Zalando applied the idea of microservices to the front-end and solved arising challenges, including performance, maintainability, SEO and consistent UI. What is more, we will also talk in depth about two integral parts of Zalando’s architecture: Skipper — a routing solution, and Tailor — a layout composition service.

## Bio (Andrey Kuzmin)

[@unsoundscapes](https://twitter.com/unsoundscapes)

Andrey Kuzmin is a senior frontend engineer at Zalando. He has contributed to frontend tooling, most notably with his gulp-svgstore and gulp-postcss open source projects. Recently Andrey has been learning a functional reactive programming in Elm. Apart from work, he enjoys live music in Berlin and is a yoga newbie.

## Bio (Arpad Ryszka)

[@arpad_ryszka](https://twitter.com/arpad_ryszka)

Arpad Ryszka is a senior front-end engineer at Zalando and the main contributor to the Skipper open source project.

## Building the slides

`elm make Main.elm --output assets/elm.js --yes && open index.html`
