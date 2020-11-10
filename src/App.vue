<template>
  <div id="app">
    <button @click="onLocaleChange">Locale: {{ locale }}</button>
    <Standing lang="en" championship-id="2051" division="Alapszakasz" />
    <LeaderFieldPlayers lang="en" championship-id="2051" division="Alapszakasz" />
  </div>
</template>

<script>
import Standing from './components/widgets/Standings';
import LeaderFieldPlayers from './components/widgets/LeaderFieldPlayers';

export default {
  name: 'App',
  components: {
    Standing,
    LeaderFieldPlayers
  },

  data() {
    return {
      locale: this.$i18n.locale
    };
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  padding-top: 60px;
}
</style>
