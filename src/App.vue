<template>
  <div id="app">
    <navigation>
      <select v-model="selectedRoute">
        <option v-for="route in routes" :key="route.name">{{ route.name }}</option>
      </select>
      <button @click="onLocaleChange">Locale: {{ locale }}</button>
      <!-- 5 harmad: 50521 -->
      <!-- Büntetők  56731 -->
      <!-- hosszabítás: 56726 -->
      <!-- <Game game-id="61309" :lang="locale" /> -->
    </navigation>
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
    }
  },

  methods: {
    onLocaleChange() {
      const currentLocale = this.$i18n.locale;
      this.$i18n.locale = currentLocale === 'hu' ? 'en' : 'hu';
      this.locale = this.$i18n.locale;
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
}

navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #eceff1;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  z-index: 10;
}
</style>
