<template>
  <c-box
    as="div"
    class="divider"
    my="5"
    mx="auto"
    h="2px"
    w="12%"
    :background-color="mainStyles[colorMode].color"
  />
</template>

<script lang="js">
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'CustomSeparator',
  mixins: [colourMode],
  data() {
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
