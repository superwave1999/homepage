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
    <c-box
      d="flex"
      w="100%"
      flex-dir="column"
      justify-content="center"
      align-items="center"
      my="3"
    >
      <c-flex
        w="100%"
        wrap="wrap"
        justify-content="space-between"
        align-items="flex-end"
      >
        <c-heading
          mr="2"
          as="h3"
          size="lg"
          w="max-content"
          display="inline-block"
          border-bottom-width="2px"
          :border-bottom-color="mainStyles[colorMode].color"
        >
          {{ $t('projects.heading') }}
        </c-heading>
        <c-input-group :w="['60%', '50%']">
          <c-input
            v-model="search"
            variant="flushed"
            :placeholder="$t('projects.search')"
            :border-color="mainStyles[colorMode].color"
            focus-border-color="orange.500"
          />
          <c-input-right-element>
            <c-icon-button
              :aria-label="$t('projects.search')"
              icon="search"
              variant="solid"
              variant-color="orange"
              rounded="full"
              size="sm"
              mb="1"
              @click="getPosts(false)"
            />
          </c-input-right-element>
        </c-input-group>
      </c-flex>

      <c-flex
        w="100%"
        direction="row"
        wrap="wrap"
        align="flex-start"
        justify="space-evenly"
      >
        <c-text v-if="posts && posts.length === 0" my="12">{{
          $t('projects.notFound')
        }}</c-text>

        <c-box
          v-for="post in posts"
          :key="post.slug"
          my="3"
          rounded="lg"
          class="post"
          :w="['100%', '50%']"
          :p="[2, 3]"
          @click="
            nuxtLink(
              localePath({ name: 'projects-slug', params: { slug: post.slug } })
            )
          "
        >
          <c-aspect-ratio-box
            v-if="post.previewImage"
            class="img-div"
            w="100%"
            :ratio="21 / 9"
          >
            <c-image
              class="shaded"
              :class="'colour-' + colorMode"
              :src="post.previewImage"
              rounded="lg"
              object-fit="cover"
              :alt="$t('projects.postImgAlt')"
            />
          </c-aspect-ratio-box>
          <c-heading my="2" as="h5" size="sm">
            {{ post.title }}
          </c-heading>
          <c-text font-size="0.9em">{{ post.description }}</c-text>
        </c-box>
      </c-flex>
      <separator />
      <c-box my="3">
        <c-button
          :disabled="!showMoreButton"
          variant="ghost"
          :variant-color="showMoreButton ? 'orange' : 'red'"
          size="sm"
          rounded="lg"
          @click="getPosts(true)"
        >
          {{ $t('projects.load') }}
        </c-button>
      </c-box>
    </c-box>
  </c-box>
</template>

<script lang="js">
import routing from '@/mixins/routing.js';

export default {
  name: 'Projects',
  nuxtI18n: {
    paths: {
      en: '/projects',
      es: '/proyectos'
    }
  },
  mixins: [routing],
  inject: ['$chakraColorMode'],
  data () {
    return {
      section: '',
      fields: ['title', 'description', 'slug', 'previewImage'],
      posts: null,
      perPage: 6,
      loadMore: true,
      extraPages: 0,
      search: '',
      mainStyles: {
        dark: {
          color: 'darkText.400'
        },
        light: {
          color: 'lightText.700'
        }
      },
    }
  },
  head() {
      return {
        title: this.$t('projects.headTitle')
      }
    },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    showMoreButton () {
      return this.posts && this.posts && (this.posts.length >= this.perPage) && this.loadMore
    }
  },
  async mounted() {
    await this.$i18n.finalizePendingLocaleChange();
    this.getPosts();
  },
  methods: {
    async getPosts(more = false) {
      const section = 'projects-' + this.$i18n.locale;
      let limit, skip;
      if (more) {
        this.extraPages++;
        limit = this.perPage;
        skip = (this.posts) ? this.posts.length : 0;
      } else {
        limit = (this.posts) ? this.posts.length : this.perPage;
        this.extraPages = 0;
        skip = 0;
      }
      const query = this.$content(section)
        .only(this.fields)
        .sortBy('endDate', 'desc')
        .sortBy('startDate', 'desc')
        .sortBy('createdAt', 'desc')
        .limit(limit)
        .skip(skip);
      if (this.search) {
        query.search(this.search);
      }
      const newPosts = await query.fetch();
      this.loadMore = newPosts.length;
      if (more) {
        this.posts.push(...newPosts);
      } else {
        this.posts = newPosts;
      }
    }
  }
}
</script>

<style lang="css" scoped>
div.post:hover {
  cursor: pointer;
}

div.post > .img-div {
  transition: transform 0.2s;
}

div.post:hover > .img-div {
  transform: scale(1.01);
}

div.post:hover > h5 {
  text-decoration: underline;
}
</style>