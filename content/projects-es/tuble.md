---
title: Tuble
description: "Juego de navegador inspirado por el minijuego de hackear de Bioshock"
startDate: '2022'
endDate: '2022'
previewImage: '/content/projects/tuble-cmp.jpg'
infoPlatform: 'Web'
infoStack: 'Go, Vue'
links:
    - title: 'Sitio web (Inactivo)'
      href: 'https://tuble.iromera.com'
    - title: 'Código fuente API'
      href: 'https://github.com/superwave1999/tuble-server'
    - title: 'Código fuente frontend'
      href: 'https://github.com/superwave1999/tuble-front'
---
!["Vista principal"](/content/projects/tuble.jpg)

Nota: Proyecto cerrado. Hay demasiadas pocas visitas a la web para incorporar anuncios. Además, mi intención era mostrar un anuncio debajo del modal de "success", pero los proveedores que tenía en mente no permiten esto.

Tuble es un juego de navegador inspirado por el minijuego de hackear de Bioshock.

Desarrollé el juego rápidamente para lucrarme del hype del Wordle a principios de 2022.

Se realizaron ciertas modificaciones al formato como contar los movimientos de los jugadores y el tiempo que tardan en completar el mapa.

En vez de salir electrocutado por robots, como en el minijuego original, se han introducido penalizaciones de tiempo.

El proyecto consiste en una API ligera escrita en Go para generar los mapas diariamente y para servir y verificar estos mediante una API.

También hay un frontend escrito en Vue usando Nuxt. Guarda el progreso del jugador en el dispositivo local, soporta modo oscuro e interactúa con la API.

<video controls loop width="100%">
  <source src="/content/projects/tuble-vid.mp4" type="video/mp4">
</video>