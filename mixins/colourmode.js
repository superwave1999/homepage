export default {
  inject: ['$chakraColorMode'],
  computed: {
    colorMode() {
      return this.$chakraColorMode()
    },
  },
}
