<template>
  <c-flex
    v-bind="mainStyles[colorMode]"
    justify-content="space-around"
    flex-wrap="wrap"
    align="center"
    w="100%"
  >
    <c-box
      v-if="links && links.length"
      d="flex"
      flex-dir="column"
      align-items="flex-start"
      flex="1 0 50%"
      my="5"
    >
      <c-button
        v-for="link in links"
        :key="link.href"
        as="a"
        target="_blank"
        :href="link.href"
        size="lg"
        :left-icon="link.icon"
        variant="link"
        mx="2"
        my="1"
        :variant-color="link.colour"
        >{{ link.text }}</c-button
      >
    </c-box>
    <c-box
      my="5"
      d="flex"
      flex-dir="column"
      align-items="center"
      flex="1 0 50%"
    >
      <c-text size="sm">{{ $t('c.links.employer') }}</c-text>
      <c-button
        as="a"
        target="_blank"
        href="https://www.comerline.es/"
        size="lg"
        left-icon="company"
        variant="link"
        mx="2"
        my="2"
        :variant-color="colorMode + 'Company'"
        >Comerline</c-button
      >
    </c-box>
  </c-flex>
</template>

<script lang="js">
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'Links',
  mixins: [colourMode],
  data () {
    return {
      links: [],
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