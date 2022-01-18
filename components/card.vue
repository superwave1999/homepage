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
    class="shaded glassimg-relative"
    :class="'colour-' + colorMode"
    rounded="lg"
  >
    <c-box pr="5" my="3" flex="1 0 75%">
      <c-heading as="h1" size="xl" color="darkText.700">{{
        $t('c.card.name')
      }}</c-heading>
      <c-heading
        as="h5"
        size="sm"
        :mr="[5, 24]"
        color="darkText.400"
        font-weight="400"
        >{{ $t('c.card.short') }}</c-heading
      >
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
      />
    </c-aspect-ratio-box>
    <c-box
      class="glassimg"
      rounded="lg"
      :background-image="'url(\'' + img + '\')'"
    />
  </c-flex>
</template>

<script lang="js">
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'Card',
  mixins: [colourMode],
  data () {
    return {
      img: '/profile/main.jpg'
    }
  }
}
</script>

<style lang="css" scoped>
header > * {
  z-index: 2;
}

.glassimg {
  transition: filter 0.2s;
  background-size: 200%;
  background-position: center left;
  filter: blur(20px) grayscale(0.15) contrast(0.7) saturate(0.8) brightness(1.2);
}

header.colour-dark .glassimg {
  filter: blur(20px) grayscale(0.15) contrast(0.9) saturate(0.6);
}
</style>