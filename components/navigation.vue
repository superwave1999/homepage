<template>
  <c-box v-bind="mainStyles[colorMode]" position="fixed" as="nav" w="100vw">
    <c-flex class="nav-container" align="center" justify="space-between">
      <c-box :p="[1, 2, 4, 4]">
        <c-box class="mobile-menu">
          <c-menu style="display: inline">
            <c-menu-button mx="1" p="0" variant-color="green" rounded="lg">
              <c-icon name="menu" />
            </c-menu-button>
            <c-menu-list>
              <c-menu-item
                v-for="link in routes"
                :key="link.text"
                as="nuxt-link"
                :to="localePath(link.route)"
                :class="{ underline: linkActive(link.route) }"
                >{{ $t(link.text) }}</c-menu-item
              >
            </c-menu-list>
          </c-menu>
        </c-box>
        <c-button
          :variant="linkActive('index') ? 'solid' : 'outline'"
          variant-color="green"
          :pl="[2, 4]"
          :pr="[2, 4]"
          mx="1"
          rounded="lg"
          @click="nuxtLink(localePath('index'))"
        >
          home@web:~$&nbsp;<span class="flash">_</span>
        </c-button>
        <c-button
          v-for="link in routes"
          :key="link.text"
          :variant="linkActive(link.route) ? 'solid' : 'outline'"
          class="desktop-menu"
          mx="1"
          variant-color="green"
          rounded="lg"
          @click="nuxtLink(localePath(link.route))"
        >
          {{ $t(link.text) }}
        </c-button>
      </c-box>
      <c-box :p="[1, 2, 4, 4]">
        <c-icon-button
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          :variant-color="colorMode === 'light' ? 'indigo' : 'yellow'"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          mx="1"
          rounded="lg"
          @click="toggleColorMode"
        />
        <c-menu v-if="availableLocales" style="display: inline">
          <c-menu-button mx="1" p="0" variant-color="cyan" rounded="lg">
            <c-icon name="globe" />
          </c-menu-button>
          <c-menu-list>
            <c-menu-item
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="changeLanguage(locale.code)"
              >{{ locale.name }}</c-menu-item
            >
          </c-menu-list>
        </c-menu>
      </c-box>
    </c-flex>
  </c-box>
</template>

<script lang="js">
import routing from '@/mixins/routing.js';
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'Navigation',
  mixins: [routing, colourMode],
  inject: ['$toggleColorMode'],
  data () {
    return {
      mainStyles: {
        dark: {
          color: 'darkText.400',
          bg: 'darkBgAlpha.700'
        },
        light: {
          color: 'lightText.700',
          bg: 'lightBgAlpha.400'
        }
      },
      routes: [
        {text: 'nav.projects', route: 'projects'}
      ]
    }
  },
  computed: {
    toggleColorMode () {
      return this.$toggleColorMode
    },
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    changeLanguage (code) {
      const urlConverted = this.switchLocalePath(code); // Current page locale.
      this.nuxtLink(urlConverted);
    }
  }
}
</script>

<style lang="css" scoped>
@keyframes terminalFlash {
  0% {
    color: inherit;
  }
  49% {
    color: inherit;
  }
  60% {
    color: transparent;
  }
  99% {
    color: transparent;
  }
  100% {
    color: inherit;
  }
}

span.flash {
  animation: terminalFlash 1s infinite;
}

nav {
  z-index: 99;
  backdrop-filter: blur(10px);
}

nav > .nav-container {
  margin: 0 auto;
  width: 100%;
  max-width: 92ch;
}

.mobile-menu {
  display: initial !important;
}

.desktop-menu {
  display: none !important;
  transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
}

@media only screen and (min-width: 768px) {
  .mobile-menu {
    display: none !important;
  }

  .desktop-menu {
    display: initial !important;
  }
}

.underline {
  text-decoration: underline;
  font-weight: 700;
}
</style>
