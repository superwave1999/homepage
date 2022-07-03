---
title: Tuble
description: "Browser-based game inspired by Bioshock's hacking minigame"
startDate: '2022'
endDate: '2022'
previewImage: '/content/projects/tuble-cmp.jpg'
infoPlatform: 'Web'
infoStack: 'Go, Vue'
links:
    - title: 'Website (Defunct)'
      href: 'https://tuble.iromera.com'
    - title: 'API source code'
      href: 'https://github.com/superwave1999/tuble-server'
    - title: 'Frontend source code'
      href: 'https://github.com/superwave1999/tuble-front'
---
!["Main view"](/content/projects/tuble.jpg)

Note: Project discontinued. Too small number of website visits to introduce ads. Also, my intention was to show an ad below the "success" modal, but the providers I had in mind do not allow this.

Tuble is a browser-based game inspired by Bioshock's hacking mini-game.

I quickly developed this game to ride Wordle's hype wave in early 2022.

Certain modifications were made to the format, such as counting the players' movements made and the time taken.

Instead of being zapped by bots as per the original mini-game, time penalties have been introduced.

This project consists of a lightweight API written in Go to generate the daily maps and to serve and validate these via an API.

There's also a frontend written in Vue using Nuxt. It stores player progress locally, supports dark mode, and interacts with the API.

<video controls loop width="100%">
  <source src="/content/projects/tuble-vid.mp4" type="video/mp4">
</video>