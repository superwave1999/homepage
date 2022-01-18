<template>
  <c-theme-provider>
    <c-color-mode-provider ref="color">
      <c-box
        id="main"
        ref="body"
        font-family="body"
        as="main"
        w="100vw"
        :bg="
          componentsLoaded
            ? $refs.body.$parent.colorMode + 'Bg.400'
            : 'lightBg.400'
        "
      >
        <c-reset />
        <Navigation />
        <simplebar
          style="height: 100vh"
          class="custom-scroll"
          data-simplebar-auto-hide="false"
        >
          <nuxt />
          <Footer />
        </simplebar>
      </c-box>
    </c-color-mode-provider>
  </c-theme-provider>
</template>

<script lang="js">
import simplebar from 'simplebar-vue';

export default {
  components: {
    Navigation: () => import('../components/navigation.vue'),
    Footer: () => import('../components/footer.vue'),
    simplebar
  },
  data() {
    return {
      componentsLoaded: false
    }
  },
  mounted() {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      this.$refs.color.toggleColorMode();
    }
    this.componentsLoaded = true;
  }
}
</script>

<style lang="css">
main {
  min-height: 100vh;
  transition: background-color 250ms;
}

main section {
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 4rem;
  width: 100vw;
  max-width: 60ch;
  margin-top: 0;
}

main section p.indent {
  text-indent: 1.5em;
}

@media screen and (min-width: 480px) {
  main section {
    padding-top: 6rem;
  }
}

div.custom-scroll div.simplebar-track {
  z-index: 100;
}

div.custom-scroll div.simplebar-track.simplebar-vertical {
  width: 0.4em;
}

div.custom-scroll div.simplebar-track.simplebar-horizontal {
  height: 0.4em;
}

div.custom-scroll div.simplebar-scrollbar::before {
  background-color: #777;
  width: 0.15em;
}

@media screen and (min-width: 768px) {
  main section {
    padding-top: 8rem;
  }

  div.custom-scroll div.simplebar-track.simplebar-vertical {
    width: 0.6em;
  }

  div.custom-scroll div.simplebar-track.simplebar-horizontal {
    height: 0.6em;
  }

  div.custom-scroll div.simplebar-scrollbar::before {
    width: 0.2em;
  }
}
</style>