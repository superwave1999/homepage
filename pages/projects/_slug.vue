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
    <c-box v-if="article" w="100%" as="article">
      <c-breadcrumb mb="2" separator="›">
        <c-breadcrumb-item>
          <c-breadcrumb-link as="nuxt-link" :to="localePath('index')">{{
            $t('nav.home')
          }}</c-breadcrumb-link>
        </c-breadcrumb-item>
        <c-breadcrumb-item>
          <c-breadcrumb-link as="nuxt-link" :to="localePath('projects')">{{
            $t('nav.projects')
          }}</c-breadcrumb-link>
        </c-breadcrumb-item>
        <c-heading display="inline-block" as="h3" size="lg">
          {{ article.title }}&nbsp;
          <c-tag
            v-if="article.startDate || article.endDate"
            variant-color="green"
            size="sm"
            vertical-align="middle"
          >
            <c-tag-label line-height="1"
              >{{ article.startDate
              }}{{ article.startDate && article.endDate ? ' - ' : ''
              }}{{ article.endDate }}</c-tag-label
            >
            <c-tag-icon v-if="article.endDate" icon="check" />
          </c-tag>
        </c-heading>
      </c-breadcrumb>
      <nuxt-content
        id="nuxt-content"
        ref="nuxt-content"
        :document="article"
        :class="{ 'colour-dark': colorMode === 'dark' }"
      />
      <custom-separator
        v-if="
          article.infoWebsite ||
          article.infoPlatform ||
          article.infoStack ||
          (article.links && article.links.length)
        "
      />
      <c-stack
        v-if="article.infoWebsite || article.infoPlatform || article.infoStack"
        spacing="2"
        my="4"
        align-items="start"
        class="no-overflow"
      >
        <c-box
          v-if="article.infoWebsite"
          class="web-box"
          :class="{ 'colour-dark': colorMode === 'dark' }"
        >
          <c-tag size="sm" variant-color="green"
            >{{ $t('project.website') }}
          </c-tag>
          <div class="no-overflow">
            <c-button
              as="a"
              target="_blank"
              :href="article.infoWebsite"
              ml="2"
              variant="link"
              variant-color="blue"
              >{{ article.infoWebsite }}</c-button
            >
          </div>
        </c-box>
        <c-box v-if="article.infoPlatform">
          <c-tag size="sm" variant-color="green">{{
            $t('project.platform')
          }}</c-tag>
          <c-text ml="2" display="inline">{{ article.infoPlatform }}</c-text>
        </c-box>
        <c-box v-if="article.infoStack">
          <c-tag size="sm" variant-color="green">{{
            $t('project.stack')
          }}</c-tag>
          <c-text ml="2" display="inline">{{ article.infoStack }}</c-text>
        </c-box>
      </c-stack>
      <c-list v-if="article.links && article.links.length" spacing="2" my="4">
        <c-list-item
          v-for="link in article.links"
          :key="link.href"
          class="link-box"
        >
          <c-button
            as="a"
            target="_blank"
            :href="link.href"
            left-icon="link"
            ml="2"
            variant="link"
            variant-color="blue"
            >{{ link.title }}</c-button
          >
        </c-list-item>
      </c-list>
      <custom-separator v-if="prev || next" />
      <c-text v-if="prev || next" mb="2" text-align="center">{{
        $t('project.prevNext')
      }}</c-text>
      <prev-next v-if="prev || next" :prev="prev" :next="next" />
    </c-box>
  </c-box>
</template>

<script lang="js">
import Viewer from 'viewerjs';
import colourMode from '@/mixins/colourmode.js';
import 'viewerjs/dist/viewer.css';

export default {
  nuxtI18n: {
    paths: {
      en: '/projects/:slug',
      es: '/proyectos/:slug'
    }
  },
  mixins: [colourMode],
  data() {
    return {
      imageViewer: null,
      article: null,
      prev: null,
      next: null,
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
      title: ((this.article) ? this.article.title : '') + this.$t('project.headTitleSuffix')
    }
  },
  watch: {
    article (newVal) {
      this.$nextTick().then(() => {
        if (newVal) {
          this.imageViewer = new Viewer(document.getElementById('nuxt-content'), {
            inline: false,
            loading: true,
            loop: true,
            movable: true,
            rotatable: false,
            scalable: false,
            zoomable: true,
            fullscreen: true,
            zIndex: 3000
          });
        } else if (!newVal && this.imageViewer) {
          this.imageViewer.destroy();
        }
      });
    }
  },
  async mounted() {
    await this.$i18n.finalizePendingLocaleChange();
    this.getPost();
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    },
    async getPost() {
      const section = 'projects-' + this.$i18n.locale;
      this.article = await this.$content(section, this.$route.params.slug).fetch();
      const [prev, next] = await this.$content(section)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .sortBy('startDate', 'asc')
      .sortBy('endDate', 'asc')
      .surround(this.$route.params.slug)
      .fetch();
      this.prev = prev;
      this.next = next;
    }
  }
}
</script>

<style lang="css">
.no-overflow {
  overflow: hidden;
}

.web-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
}

.web-box > .no-overflow {
  flex: 1 0;
}

.web-box::before {
  z-index: 2;
  content: '';
  width: 2ch;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: linear-gradient(to right, transparent 0, #fff5eb 100%);
}

.web-box.colour-dark::before {
  background: linear-gradient(to right, transparent 0, #0a090b 100%);
}

.link-box > a {
  white-space: normal;
  word-break: break-word;
}

.nuxt-content {
  text-align: justify;
  font-family: ArchivoVariable, sans-serif;
  font-size: 0.9em;
}

.nuxt-content a {
  color: rgb(26 114 255);
}

.nuxt-content p {
  margin-top: 1em;
  margin-bottom: 1em;
}

.nuxt-content img {
  border-radius: 0.5rem;
  cursor: zoom-in;
  transition: transform 0.2s;
}

.nuxt-content img:hover {
  transform: scale(1.01);
}

.nuxt-content.colour-dark a {
  color: rgb(125 177 255);
}

.nuxt-content code {
  font-family: monospace;
  text-shadow: none;
}

.nuxt-content p > code {
  color: rgb(202 86 78);
  padding: 0.2em;
}

.nuxt-content pre > code {
  color: rgb(174 190 86);
  padding: 0.1em;
}

.nuxt-content pre,
.nuxt-content p > code {
  background-color: rgb(38 40 45);
  border-radius: 0.4em;
}
</style>
