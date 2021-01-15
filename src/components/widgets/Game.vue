<template>
  <div class="vbr-widget-game">
    <GameData v-if="isGameDataVisible" :game-data="gameData"></GameData>

    <GameEvents :game-events="convertedGameEvents"></GameEvents>
  </div>
</template>

<script>
import { fetchVBRData } from '../../services/http-sevices';
import { hasInteger } from '@/utils/string';
import GameData from './GameHelpers/GameData';
import GameEvents from './GameHelpers/GameEvents';

export default {
  name: 'Game',

  components: {
    GameData,
    GameEvents
  },

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
      return { ...periods, ...this.gameEvents };
    },

    currentPeriod() {
      const splitted = (this.gameData.periodResults || '').split(',');
      let filtered = splitted.filter(period => hasInteger(period)).length;
      if (this.gameData.isShootout) filtered = filtered - 2;
      if (this.gameData.isOvertime) filtered = filtered - 1;
      return filtered;
    },

    isGameDataVisible() {
      return true;
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
        // console.log('getGameData:', response);
        // this.gameData = response || {};
        this.gameData = Object.assign({}, response);
      } catch (error) {
        console.error(error);
      }
    },

    async getGameStats() {
      try {
        const response = await fetchVBRData('gameStats', {
          gameId: Number(this.gameId)
        });
        // console.log('getGameStats:', response);
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
        // console.log('getGameEvents:', response);
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

<style lang="scss">
.vbr-widget {
  &-game {
    .teams-and-results {
      display: flex;

      .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
      }
    }

    .game-events {
      .period-title {
        padding: 10px;
        background-color: darkslategrey;
        color: #ffffff;
        text-align: center;
      }
    }
  }
}
</style>
