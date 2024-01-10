#show link: underline

#set text(size: 10pt, font: "Helvetica Neue")
#show heading: set text(size: 18pt, weight: "regular")
#set page(margin: (left: 7cm, right: 2cm, y: 1.5cm))

#let caps(body) = [#v(7pt)#text(weight: "bold", tracking: 0.5pt)[#upper[#body]]]

#set list(indent: -9pt)

#place(
  top + left,
  dx: -6cm,
  block(
    width: 6cm
  )[
    = Andrey Kuzmin

    he/him

    #v(39pt)

    #caps[Contact]

    Berlin, Germany
    #linebreak()

    #link("https://unsoundscapes.com")[unsoundscapes.com]\
    #link("https://github.com/w0rm")[github.com/w0rm]\
    #link("https://twitter.com/unsoundscapes")[twitter.com/unsoundscapes]\
    #link("https://linkedin.com/in/unsoundscapes/")[linkedin.com/in/unsoundscapes]
    #linebreak()

    #link("mailto:hi\@unsoundscapes.com")[hi\@unsoundscapes.com]
  ],
)

#v(7pt)
I am a Software Engineer with 18 years of experience in web technologies and distributed systems. I bridge gaps across frontend, backend, and infrastructure to deliver impactful products. I use my diverse experience and skillset to mentor junior engineers, design scalable systems, and troubleshoot complex issues.

#caps[Work Experience]

#let titleline(role, company, time) = [
  #v(7pt)
  *#role*
  #h(1fr)
  *#company*
  #h(5pt)•#h(5pt)
  #set text(gray);
  #time
]

#titleline([Staff Software Engineer], [Arrival], [May 2022--Present])
- Led integration of web apps into a company-wide suite of tools to facilitate discovery and adoption
- Coordinated authentication upgrade across multiple teams and systems to enable single sign on and address security risks
- Mentored 4 software and computational engineers in Elm, Rust and Python
- Saved \$2k per month on AWS and reduced maintenance costs by simplifying computational infrastructure
- Managed stakeholders and led 3 engineers to expose the estimated costs for EV parts through GraphQL API in Rust
- Reduced CI time by 5 minutes on average for pipelines that rely on Nix

#titleline([Senior Software Engineer], [Arrival], [Feb 2021--Apr 2022])
- Developed a tool for designers to estimate manufacturing cost of EV parts
- Developed browser UI with interactive 3D visualisation for the tool
- Designed a secure method to share computation result files
- Reduced CI time from 20 to 5 minutes by simplifying the build and deploy process of the UI monorepo

#titleline([Senior Software Engineer], [SoundCloud],
[Apr 2018--Jan 2021])
- Ensured confident deployments with end-to-end tests of payment flows
- Halved develpoment time of marketing campaigns and new payment features by unifying the UI codebase across web, mobile web and Android
- Served in on call rotations for payment services and web frontend
- Led 3 engineers to implement new payment flow for Mastering, upgrade legacy paymend SDK and enable new payment methods
- Mentored 2 junior engineers in TypeScript and React.js
- Conducted interviews with frontend and backend engineers and designers, reviewed coding challenges

#titleline([Software Engineer], [SoundCloud], [Oct 2016--May 2018])
- Developed Play queue on web, also called "Next up"
- Developed SoundCloud app on Xbox and Windows
- Led development of the new home page on web, powered by recommendation systems
- Led development of the GDPR settings page on web
- Set up dashboards for web platform KPIs

#titleline([Senior Frontend Engineer], [Zalando], [Sep 2014--Sep 2016])
- Enabled teams develop and deploy their fragments of the Zalando website independently of each other, invented and implemented a #link("https://www.oreilly.com/content/better-streaming-layouts-for-frontend-microservices-with-tailor/")[service for frontend microservices]
- Led 4 engineers in the checkout team to move their product to the new frontend architecture and implement the new checkout UI in React and backend in Node.js
- Contributed to frontend team growth by interviewing candidates
- #link("https://engineering.zalando.com/authors/andrey-kuzmin.html")[Wrote articles] for the company engineering blog

#pagebreak()

#caps[Education]

*Novgorod State University*
#h(1fr)#text(gray)[Sep 2002--Jun 2007] \
Engineer’s degree, Software Engineering#h(1fr)Veliky Novgorod, Russia

#caps[Skills]

Frontend • Backend • Rust • Python • TypeScript • Elm • Ruby • Scala • Nix • Distributed Systems • Continuous Delivery • Functional Programming • SQL • Node.js • React.js • AWS • K8s • WebGL

#caps[Projects]

*Prometheus Alertmanager*#h(1fr)#link("https://github.com/prometheus/alertmanager")[github.com/prometheus/alertmanager] \
Manages alerts sent from Prometheus. I designed and developed the UI and reviewed the changes from other contributors.

*Browser Games*#h(1fr)#link("https://unsoundscapes.itch.io")[unsoundscapes.itch.io] \
Various browser games that I created at game jams and hackathons. I also organized several Elm game jams. The games are open source and can be found on my github page.

*Elm Physics*#h(1fr)#link("https://github.com/w0rm/elm-physics")[github.com/w0rm/elm-physics] \
3D Physics engine inspired by Cannon.js, implemented in Elm. You can read more about it on #link("https://discourse.elm-lang.org/search?q=%40unsoundscapes%20in%3Afirst%20order%3Alatest_topic")[Elm Discourse].

*Elm OBJ File*#h(1fr)#link("https://github.com/w0rm/elm-obj-file")[github.com/w0rm/elm-obj-file] \
A neat way to load and transform 3D geometry from the OBJ file format in one go with composable decoders.

#caps[Outreach and Public Speaking]

In 2017--2020, I organized the Elm Berlin meetup and ElmBridge, \
a bimonthly workshop dedicated to teaching Elm to folks from underrepresented groups in tech. Additionally, I presented at functional programming conferences, most notably Curry On, Elm Conf (Strange Loop preconf), and Lambda Days.

#caps[Hobbies]

My hobbies include yoga, going to concerts and learning 日本語.
