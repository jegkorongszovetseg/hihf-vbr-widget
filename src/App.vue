<template>
  <div id="app">
    <button @click="onLocaleChange">Locale: {{ locale }}</button>
    {{ $t('table.team.short') }}
    <Standing />
  </div>
</template>

<script>
import { i18n } from './localization';
import Standing from './components/widgets/Standings';

export default {
  name: 'App',
  components: {
    Standing
  },

  data() {
    return {
      locale: i18n.locale
    };
  },

  methods: {
    onLocaleChange() {
      const currentLocale = i18n.locale;
      i18n.locale = currentLocale === 'hu' ? 'en' : 'hu';
      this.locale = i18n.locale;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
