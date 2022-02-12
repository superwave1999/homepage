import * as fs from 'fs';
import feather from 'feather-icons';
import customTheme from './custom-theme.js'

const icons = {};
Object.entries(feather.icons).forEach(([key, ico]) => {
  icons[key] = { path: ico.toSvg() }
});
icons.company = {
  path: fs.readFileSync('./static/company.svg', 'utf8'),
  viewBox: '0 0 500 414.123'
};

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'homesite',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global',
    'simplebar/dist/simplebar.min.css',
    '@fontsource/raleway/variable.css',
    '@fontsource/archivo/variable.css',
    '@fontsource/archivo/variable-italic.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/router'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],

  // Chakra-ui config
  chakra: {
    icons: {
      extend: {
        ...icons
      }
    },
    extendTheme: customTheme
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    fullTextSearchFields: ['title', 'description', 'startDate', 'endDate', 'infoPlatform', 'infoStack'],
    remarkExternalLinks: {
      target: '_blank',
      rel: 'nofollow'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Translation module configuration: https://i18n.nuxtjs.org/options-reference
  i18n: {
    vueI18n: {
      fallbackLocale: 'en',
    },
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en.js'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.js'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '~/lang/',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: false, // Avoid EU GDPR hassle.
      redirectOn: 'root'
    },
    differentDomains: false,
    skipSettingLocaleOnNavigate: true
  },

  layoutTransition: {
    name: 'trans',
    mode: 'out-in'
  },

  pageTransition: {
    name: 'trans',
    mode: 'out-in'
  },

  loading: false,

  router: {
    prefetchPayloads: false,
    prefetchLinks: false,
    extendRoutes(routes, resolve) {
      routes.push({
        name: '404',
        path: '/*',
        component: resolve(__dirname, 'errors/err404.vue')
      })
    }
  }
}
