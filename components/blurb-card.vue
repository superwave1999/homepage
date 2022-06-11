<template>
  <c-flex
    justify-content="space-around"
    wrap="wrap"
    as="header"
    align="center"
    w="100%"
    p="4"
    px="8"
    mb="6"
    rounded="lg"
  >
    <c-box pr="5" my="3" flex="1 0 75%">
      <c-heading as="h1" size="xl">{{ $t('c.card.name') }}</c-heading>
      <c-heading as="h5" size="sm" :mr="[5, 24]" font-weight="400">{{
        $t('c.card.short')
      }}</c-heading>
    </c-box>
    <c-aspect-ratio-box
      my="3"
      max-w="25%"
      min-w="100px"
      min-h="100px"
      :ratio="1"
    >
      <c-image
        :src="img"
        rounded="full"
        object-fit="cover"
        border-width="2px"
        border-color="lightBg.700"
        border-style="solid"
        class="shaded"
        :class="{ 'colour-dark': colorMode === 'dark' }"
      />
    </c-aspect-ratio-box>
  </c-flex>
</template>

<script lang="js">
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'BlurbCard',
  mixins: [colourMode],
  data () {
    return {
      img: 'https://avatars.githubusercontent.com/u/37277561'
    }
  }
}
</script>
