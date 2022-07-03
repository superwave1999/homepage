<template>
  <c-box v-bind="mainStyles[colorMode]" position="fixed" as="nav" w="100vw">
    <c-flex class="nav-container" align="center" justify="space-between">
      <c-box :p="[1, 2, 4, 4]" class="flex">
        <c-box class="mobile-menu">
          <c-menu style="display: inline">
            <c-menu-button mx="1" p="0" variant-color="green" rounded="lg">
              <c-icon name="menu" />
            </c-menu-button>
            <c-menu-list>
              <c-menu-item
                v-for="link in routes"
                :key="link.text"
                :as="link.route ? 'nuxt-link' : 'a'"
                :to="link.route ? localePath(link.route) : '#'"
                :href="link.href ? link.href : '#'"
                :target="link.route ? '' : '_blank'"
                class="add-pointer"
                :class="{ underline: linkActive(link.route) }"
                >{{ $t(link.text) }}</c-menu-item
              >
              <c-menu-item as="a" target="_blank" :href="source">{{
                $t('nav.textSource')
              }}</c-menu-item>
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
          as="nuxt-link"
          :to="localePath('index')"
        >
          home@web:~$&nbsp;<span class="flash">_</span>
        </c-button>
        <c-button
          v-for="link in routes"
          :key="link.text"
          :as="link.route ? 'nuxt-link' : 'a'"
          :variant="linkActive(link.route) ? 'solid' : 'outline'"
          class="desktop-menu"
          mx="1"
          :variant-color="link.colour || 'green'"
          rounded="lg"
          :to="link.route ? localePath(link.route) : ''"
          :href="link.href ? link.href : '#'"
          :target="link.route ? '' : '_blank'"
        >
          {{ $t(link.text) }}
        </c-button>
      </c-box>
      <c-box :p="[1, 2, 4, 4]">
        <c-icon-button
          icon="github"
          variant="solid"
          variant-color="gray"
          mx="1"
          rounded="lg"
          as="a"
          target="_blank"
          :aria-label="$t('nav.textSourceLong')"
          :display="['none', 'none', 'inline-flex']"
          :href="source"
        />
        <c-icon-button
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          :variant-color="colorMode === 'light' ? 'indigo' : 'yellow'"
          :aria-label="
            $t(colorMode === 'light' ? 'nav.setDarkMode' : 'nav.setLightMode')
          "
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
  name: 'MainNavigation',
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
        {text: 'nav.projects', route: 'projects', colour: 'orange'}
      ],
      source: 'https://github.com/superwave1999/homepage'
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
@keyframes terminal-flash {
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

.add-pointer {
  cursor: pointer;
}

span.flash {
  animation: terminal-flash 1s infinite;
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
    display: inline-flex !important;
  }
}

.underline {
  text-decoration: underline;
  font-weight: 700;
}
</style>
