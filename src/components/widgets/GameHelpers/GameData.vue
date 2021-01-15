<template>
  <div>
    <div>
      <div>
        {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
        {{ gameData.location }}
      </div>
      <div>{{ gameDate }} ({{ gameDateOffsetName }})</div>
      <div>HELYSZÍN SZERINTI IDŐ - {{ gameData.location }}: {{ gameDateLocal }} ({{ gameDateLocalOffsetName }})</div>
    </div>
    <div class="teams-and-results">
      <div class="column">
        LOGO
        {{ gameData.homeTeamName }}
      </div>
      <div class="column">
        <div>{{ gameData.period }}</div>
        <div v-if="gameData.isOvertime">Hosszabbítás után</div>
        <div v-if="gameData.isShootout">Szétlövés után</div>
        <div>{{ homeTeamScore }} : {{ awayTeamScore }}</div>
        <div>{{ gameData.periodResults }}</div>
      </div>
      <div class="column">
        LOGO
        {{ gameData.awayTeamName }}
      </div>
    </div>
  </div>
</template>

<script>
import { format, offsetName } from '@/utils/datetime';

const GAME_STATUS_PREPARATION = 0;

export default {
  props: {
    gameData: {
      type: Object,
      required: true
    },

    lang: {
      type: String,
      required: true
    }
  },

  computed: {
    homeTeamScore() {
      return this.gameData.gameStatus === GAME_STATUS_PREPARATION ? '-' : this.gameData.homeTeamScore;
    },

    awayTeamScore() {
      return this.gameData.gameStatus === GAME_STATUS_PREPARATION ? '-' : this.gameData.awayTeamScore;
    },

    gameDate() {
      return format(this.gameData.gameDate, 'L dddd - HH:mm', '', this.lang);
    },

    gameDateOffsetName() {
      return offsetName(this.gameData.gameDate, '', this.lang);
    },

    gameDateLocal() {
      return format(this.gameData.gameDate, 'HH:mm', this.gameData.gameTimezone);
    },

    gameDateLocalOffsetName() {
      return offsetName(this.gameData.gameDate, this.gameData.gameTimezone, this.lang);
    }
  }
};
</script>
