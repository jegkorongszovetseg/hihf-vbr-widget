<template>
  <div id="app">
    <button @click="onLocaleChange">Locale: {{ locale }}</button>
    <!-- 5 harmad: 50521 -->
    <!-- Büntetők  56731 -->
    <!-- hosszabítás: 56726 -->
    <!-- <Game game-id="61309" :lang="locale" /> -->
    <Schedule :lang="locale" championship-id="2051" division="Alapszakasz" />
    <Standing :lang="locale" championship-id="2051" division="Alapszakasz" />
    <Standing :lang="locale" championship-id="2051" division="Alapszakasz" type="2" />
    <FieldPlayersLeader :lang="locale" championship-id="2051" division="Alapszakasz" />
    <FieldPlayersPenalties :lang="locale" championship-id="2051" division="Alapszakasz" />
    <GoaliesLeader :lang="locale" championship-id="2051" division="Alapszakasz" />
  </div>
</template>

<script>
// import Game from './components/widgets/Game';
import Standing from './components/widgets/Standings';
import Schedule from './components/widgets/Schedule';
import FieldPlayersPenalties from './components/widgets/FieldPlayersPenalties';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader';
import GoaliesLeader from './components/widgets/GoliesLeader';

export default {
  name: 'App',
  components: {
    // Game
    Standing,
    Schedule,
    GoaliesLeader,
    FieldPlayersLeader,
    FieldPlayersPenalties
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
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
</style>
