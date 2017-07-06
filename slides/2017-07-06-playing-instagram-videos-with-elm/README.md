# Playing Instagram Videos with Elm

Slides from the [Elm Remote Meetup #9](https://www.bigmarker.com/remote-meetup/Elm-Remote-Meetup-9).

[elm-gigs](https://github.com/w0rm/elm-gigs) is a project that plays random concert videos from my Instagram. From this talk you will learn how I built this and how I overcame the challenges:

- using the HTML5 `<video>` element;
- laying out the text in the SVG `<mask>`;
- updating the location to represent the currently played video;
- setting up the Travis CI to deploy to GitHub pages.

# Running

`elm make Main.elm --yes --output assets/elm.js && open index.html`
