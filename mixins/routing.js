export default {
  methods: {
    nuxtLink(ln) {
      this.$nuxt.$router.push(ln)
    },
    linkActive(name) {
      const localizedRouteNameSeparator = '___'
      let currRouteName = this.$route.name
      if (currRouteName.includes(localizedRouteNameSeparator)) {
        currRouteName = currRouteName.substring(
          0,
          currRouteName.indexOf(localizedRouteNameSeparator)
        )
      }
      return currRouteName === name
    },
  },
}
