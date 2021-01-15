<template>
  <div id="app">
    <button @click="onLocaleChange">Locale: {{ locale }}</button>
    <!-- 5 harmad: 50521 -->
    <!-- Büntetők  56731 -->
    <!-- hosszabítás: 56726 -->
    <Game game-id="59408" :lang="locale" />
    <!-- <Standing lang="en" championship-id="2051" division="Alapszakasz" /> -->
    <!-- <LeaderFieldPlayers lang="en" championship-id="2051" division="Alapszakasz" /> -->
  </div>
</template>

<script>
import Game from './components/widgets/Game';
// import Standing from './components/widgets/Standings';
// import LeaderFieldPlayers from './components/widgets/LeaderFieldPlayers';

export default {
  name: 'App',
  components: {
    Game
    // Standing,
    // LeaderFieldPlayers
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
