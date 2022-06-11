<template>
  <c-box
    as="section"
    v-bind="mainStyles[colorMode]"
    d="flex"
    w="100%"
    flex-dir="column"
    justify-content="center"
    align-items="center"
  >
    <c-text my="8" font-size="lg" text-align="center">{{
      $t('e404.top')
    }}</c-text>
    <c-button
      my="8"
      left-icon="arrow-left"
      variant-color="orange"
      as="nuxt-link"
      :to="localePath('index')"
      rounded="lg"
      >{{ $t('e404.button') }}</c-button
    >
  </c-box>
</template>

<script lang="js">
import routing from '@/mixins/routing.js';
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'ErrorNotFound',
  mixins: [routing, colourMode],
  data () {
    return {
      mainStyles: {
        dark: {
          color: 'darkText.400'
        },
        light: {
          color: 'lightText.700'
        }
      }
    }
  }
}
</script>
