<template>
  <c-box
    v-bind="mainStyles[colorMode]"
    as="footer"
    mx="auto"
    mt="auto"
    opacity="0.4"
    text-align="center"
    p="5"
    w="100vw"
  >
    {{ $t('c.footer.copy', { year }) }}
  </c-box>
</template>

<script lang="js">
import { toRoman } from 'roman-numerals';
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'FooterText',
  mixins: [colourMode],
  data () {
    return {
      year: toRoman(new Date().getFullYear()),
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
