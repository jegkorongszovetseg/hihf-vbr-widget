<template>
  <div id="app">
    <nav>
      <div class="inner">
        <div>
          <router-link to="/">MJSZ VBR Widgetek</router-link>
          <!-- <button v-if="isSelectVisible" @click="onLocaleChange">Locale: {{ locale }}</button> -->
        </div>
        <template v-if="isSelectVisible">
          <template v-for="lang in languages">
            <a
              href="#"
              :class="['lang-selector', { 'is-active': locale === lang }]"
              :key="lang"
              @click.prevent="onLocaleChange(lang)"
              >{{ lang }}</a
            >
          </template>
        </template>
        <select v-if="isSelectVisible" v-model="selectedRoute">
          <option v-for="route in routes" :key="route.name">{{ route.name }}</option>
        </select>
      </div>
    </nav>
    <router-view :lang="locale" />
  </div>
</template>

<script>
import { routes } from './router';

export default {
  name: 'App',

  data() {
    return {
      locale: this.$i18n.locale,
      routes
    };
  },

  computed: {
    selectedRoute: {
      get() {
        return this.$route.name;
      },
      set(value) {
        this.$router.push({ name: value });
      }
    },

    isSelectVisible() {
      return this.$route.name !== 'Home';
    },

    languages() {
      return Object.keys(this.$i18n.messages);
    }
  },

  methods: {
    onLocaleChange(locale) {
      this.$i18n.locale = locale;
      this.locale = locale;
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

#app {
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 100px;
  font-family: 'Roboto Condensed', sans-serif;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 60px;
  width: 100%;
  display: flex;
  background-color: #eceff1;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;

  .inner {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;

    > div {
      flex-grow: 1;
    }
  }

  a {
    margin-right: 15px;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    color: #37474f;
  }

  .lang-selector {
    font-size: 14px;
    font-weight: 400;

    &.is-active {
      color: red;
    }
  }
}
</style>
