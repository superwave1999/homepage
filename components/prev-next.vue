<template>
  <c-box
    w="100%"
    d="flex"
    flex-dir="row"
    flex-wrap="wrap"
    justify-content="space-between"
    align-items="center"
  >
    <c-button
      v-if="prev"
      my="2"
      mr="auto"
      white-space="wrap"
      left-icon="arrow-left"
      variant="link"
      variant-color="orange"
      as="nuxt-link"
      :to="localePath({ name: 'projects-slug', params: { slug: prev.slug } })"
      >{{ prev.title }}</c-button
    >
    <c-button
      v-if="next"
      my="2"
      ml="auto"
      white-space="wrap"
      right-icon="arrow-right"
      variant="link"
      variant-color="orange"
      as="nuxt-link"
      :to="localePath({ name: 'projects-slug', params: { slug: next.slug } })"
      >{{ next.title }}</c-button
    >
  </c-box>
</template>

<script lang="js">
  export default {
    props: {
      prev: {
        type: Object,
        default: () => null
      },
      next: {
        type: Object,
        default: () => null
      }
    }
  }
</script>
