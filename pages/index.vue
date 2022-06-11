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
    <BlurbCard />
    <SocialLinks />
    <c-box w="100%" mb="5" mt="5" d="flex" flex-dir="column">
      <c-heading
        my="3"
        as="h3"
        size="lg"
        w="max-content"
        border-bottom-width="2px"
        :border-bottom-color="mainStyles[colorMode].color"
      >
        {{ $t('index.about.heading') }}
      </c-heading>
      <c-text text-align="justify" class="indent">{{
        $t('index.about.text')
      }}</c-text>
    </c-box>
    <c-box mt="3" mb="5">
      <c-button
        right-icon="arrow-right"
        variant-color="orange"
        as="nuxt-link"
        :to="localePath('projects')"
        rounded="lg"
        >{{ $t('index.buttonText') }}</c-button
      >
    </c-box>

    <c-box w="100%" mb="5" d="flex" flex-dir="column">
      <c-heading
        my="3"
        as="h3"
        size="lg"
        w="max-content"
        border-bottom-width="2px"
        :border-bottom-color="mainStyles[colorMode].color"
      >
        Bio
      </c-heading>
      <table class="bio">
        <tbody>
          <tr>
            <td>1999</td>
            <td>{{ $t('index.bio.n1') }}</td>
          </tr>
          <tr>
            <td>2005</td>
            <td>{{ $t('index.bio.n2') }}</td>
          </tr>
          <tr>
            <td>2011</td>
            <td>{{ $t('index.bio.n3') }}</td>
          </tr>
          <tr>
            <td>2017</td>
            <td>
              {{ $t('index.bio.n4') }}
            </td>
          </tr>
          <tr>
            <td>2019</td>
            <td>
              {{ $t('index.bio.n5') }}
            </td>
          </tr>
          <tr>
            <td>2019 onwards</td>
            <td>{{ $t('index.bio.n6') }}</td>
          </tr>
        </tbody>
      </table>
    </c-box>

    <c-box w="100%" mb="5" d="flex" flex-dir="column">
      <c-heading
        my="3"
        as="h3"
        size="lg"
        w="max-content"
        border-bottom-width="2px"
        :border-bottom-color="mainStyles[colorMode].color"
      >
        {{ $t('index.hobby.heading') }}
      </c-heading>
      <c-text text-align="justify" class="indent">{{
        $t('index.hobby.text')
      }}</c-text>
    </c-box>
  </c-box>
</template>

<script lang="js">
import colourMode from '@/mixins/colourmode.js';

export default {
  name: 'App',
  components: {
    BlurbCard: () => import('../components/blurb-card.vue'),
    SocialLinks: () => import('../components/social-links.vue'),
  },
  mixins: [colourMode],
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
  },
  head() {
      return {
        title: this.$t('index.headTitle')
      }
    }
}
</script>

<style lang="css" scoped>
td {
  vertical-align: top;
}

td:first-child {
  font-weight: bold;
  font-family: RalewayVariable, sans-serif;
}
</style>
