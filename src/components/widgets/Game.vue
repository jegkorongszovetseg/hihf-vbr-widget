<template>
  <div>
    GAME:
    <div>{{ gameData.homeTeamScore }} : {{ gameData.awayTeamScore }}</div>
    <div>{{ gameData.homeTeamName }} : {{ gameData.awayTeamName }}</div>

    <!-- <h2>{{ gameData.period }}</h2> -->
    <div v-for="(periodEvent, key) in convertedGameEvents" :key="key">
      <h2>{{ key }}</h2>
      <div v-if="periodEvent.length === 0">Nincs esemény ebben a harmadban</div>
      <ul>
        <li v-for="event in periodEvent" :key="event.eventId">{{ event.eventTime }} {{ event.type }} {{ key }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchVBRData } from '../../services/http-sevices';

export default {
  name: 'Game',

  props: {
    gameId: {
      type: String,
      require: true
    }
  },

  data() {
    return {
      gameInterval: null,
      gameData: {},
      gameStats: {},
      gameEvents: []
    };
  },

  computed: {
    convertedGameEvents() {
      // return Object.keys(this.gameEvents).map(event => ({
      //   ...event,
      //   ...(event.type === 'Gól' && { xxx: 'xxx' })
      // }));
      const periods = {};
      if (this.gameData.isShootout) {
        periods['Büntetők'] = [];
        periods['Hosszabbítás'] = [];
      }
      if (this.gameData.isOvertime) periods['Hosszabbítás'] = [];
      for (let i = this.currentPeriod; i > 0; i--) {
        periods[`${i}. harmad`] = [];
      }
      // console.log(periods);
      return { ...periods, ...this.gameEvents };
    },

    currentPeriod() {
      const splitted = (this.gameData.periodResults || '').split(',');
      let filtered = splitted.filter(period => !period.includes('-')).length;
      if (this.gameData.isShootout) filtered = filtered - 2;
      if (this.gameData.isOvertime) filtered = filtered - 1;
      return filtered;
    }
  },

  created() {
    // Load data
    this.loadData();
    const self = this;
    this.gameInterval = setInterval(() => self.loadData(), 15000);
  },

  methods: {
    loadData() {
      this.getGameData();
      this.getGameStats();
      this.getGameEvents();
    },

    async getGameData() {
      try {
        const response = await fetchVBRData('gameData', {
          gameId: Number(this.gameId)
        });
        this.gameData = response || {};
      } catch (error) {
        console.error(error);
      }
    },

    async getGameStats() {
      try {
        const response = await fetchVBRData('gameStats', {
          gameId: Number(this.gameId)
        });
        this.gameStats = response || {};
      } catch (error) {
        console.error(error);
      }
    },

    async getGameEvents() {
      try {
        const response = await fetchVBRData('gameEvents2', {
          gameId: Number(this.gameId)
        });
        this.gameEvents = response || [];
      } catch (error) {
        console.error(error);
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.gameInterval);
  }
};
</script>
