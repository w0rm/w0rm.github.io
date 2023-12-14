#show heading: set text(font: "Helvetica Neue")
#show link: underline

#set text(size: 12pt, font: "Times")
#set page(margin: (x: 2cm, y: 2cm))

= Andrey Kuzmin #h(1fr) #text(size: 12pt, weight: "regular", font: "Times")[Berlin, Germany]

he/him
#h(2pt)•#h(2pt)
#link("mailto:hi\@unsoundscapes.com")[hi\@unsoundscapes.com]
#h(2pt)•#h(2pt)
#link("https://unsoundscapes.com")[unsoundscapes.com]
#h(2pt)•#h(2pt)
#link("https://github.com/w0rm")[github.com/w0rm]

#v(3pt)

I am a Software Engineer with 18 years of experience in web technologies and distributed systems.

With a hands-on approach, I'm committed to delivering impactful products by bridging gaps across frontend,
backend, and infrastructure. I code in multiple languages, mentor junior engineers, enhance developer experience, design scalable solutions and troubleshoot complex issues.

== Work Experience

#let titleline(role, company, time) = [
  #box(width: 140pt)[*#role*]
  #h(1fr)
  *#company*
  #h(1fr)
  #box(width: 150pt)[#set align(right);#time]
]

#titleline([Staff Software Engineer], [Arrival], [May 2022--Present])
- Led the integration of Web UI into a company-wide suite of tools to facilitate the adoption
- Led the authentication upgrade across multiple systems to address security risks
- Mentored junior software engineers in Elm and Rust
- Simplified infrastructure to reduce AWS spendings (roughly 2k a month) and maintenance costs
- Designed the GraphQL API for exposing computation results and led the implementation in Rust
- Sped up CI pipelines using Nix (saved 5 minutes on average)

#titleline([Senior Software Engineer], [Arrival], [Feb 2021--Apr 2022])
- Developed software for automated cost and manufacturability estimation
- Developed a browser UI with interactive 3D visualisation
- Evolved the in-house computation platform to deliver user facing product
- Designed a secure method to share computation result files
- Sped up the CI pipeline for the UI monorepo from 20 to 5 minutes

#titleline([Senior Software Engineer], [SoundCloud],
[Apr 2018--Jan 2021])
- Introduced end-to-end tests for the major checkout flows, ensuring confident deployments
- Unified the checkout UI across web, mobile web and Android webview
- Participated in on call rotation for the payments services and the web frontend
- Led the implementation of the new checkout flow for Mastering
- Led the effort to upgrade the legacy SDK to enable new payment methods
- Guided junior software engineers in TypeScript and React.js
- Conducted interviews with engineers and designers, reviewed coding challenges

#titleline([Software Engineer], [SoundCloud], [Oct 2016--May 2018])
- Developed the Play queue feature on web, also called "Next up"
- Developed the SoundCloud app on Xbox and Windows
- Led the development of the new home page on web, powered by recommendation systems
- Led the development of the GDPR settings page on web
- Set up dashboards for web platform KPIs

#titleline([Senior Frontend Engineer], [Zalando], [Sep 2014--Sep 2016])
- Designed and implemented a #link("https://www.oreilly.com/content/better-streaming-layouts-for-frontend-microservices-with-tailor/")[service for frontend microservices], that allowed teams develop and deploy their fragments of the Zalando website independently of each other
- Collaborated with the checkout team to move their product to the new frontend architecture and implement the new checkout UI in React and backend in Node.js
- Contributed to frontend team growth by interviewing candidates
- #link("https://engineering.zalando.com/authors/andrey-kuzmin.html")[Wrote articles] for the company engineering blog

#block(width: 100%)[
  #set align(center);
  #set text(gray);
  continues on next page
]

== Education

*Novgorod State University named after Yaroslav-the-Wise*
#h(1fr)Sep 2002--Jun 2007 \
Engineer’s degree, Computer Software Engineering#h(1fr)Veliky Novgorod, Russia

== Skills

Frontend • Backend • Rust • Python • TypeScript • Elm • Ruby • Scala • Nix • Distributed Systems • Continuous Delivery • Functional Programming • SQL • Node.js • React.js • AWS • K8s • WebGL

== Projects

*Prometheus Alertmanager*#h(1fr)#link("https://github.com/prometheus/alertmanager")[github.com/prometheus/alertmanager] \
Manages alerts sent from Prometheus. I designed and developed the UI and reviewed the changes from other contributors.

*Browser Games*#h(1fr)#link("https://unsoundscapes.itch.io")[unsoundscapes.itch.io] \
Various browser games that I created at game jams and hackathons. I also organized several Elm game jams. The games are open source and can be found on my github page.

*Elm Physics*#h(1fr)#link("https://github.com/w0rm/elm-physics")[github.com/w0rm/elm-physics] \
3D Physics engine inspired by Cannon.js, implemented in Elm. You can read more about it on #link("https://discourse.elm-lang.org/search?q=%40unsoundscapes%20in%3Afirst%20order%3Alatest_topic")[Elm Discourse].

*Elm OBJ File*#h(1fr)#link("https://github.com/w0rm/elm-obj-file")[github.com/w0rm/elm-obj-file] \
A neat way to load and transform 3D geometry from the OBJ file format in one go with composable decoders.

== Outreach and Public Speaking

In 2018--2021, I organized the Elm Berlin meetup and ElmBridge, a bimonthly workshop dedicated to teaching Elm to folks from underrepresented groups in tech. Additionally, I presented at functional programming conferences, most notably Curry On, Elm Conf (Strange Loop preconf), and Lambda Days.

== Hobbies

My hobbies include yoga, going to concerts and learning 日本語.
