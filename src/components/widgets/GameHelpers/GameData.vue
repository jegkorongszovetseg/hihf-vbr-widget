<template>
  <div>
    <div>
      <div>
        {{ gameData.championshipName }} - {{ gameData.divisionName }} - {{ gameData.gameName }} /
        {{ gameData.location }}
      </div>
      <div>{{ gameDate }}</div>
      <div>HELYSZÍN SZERINTI IDŐ - {{ gameData.location }}: {{ gameDateLocal }}</div>
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
import { format } from '@/utils/datetime';

const GAME_STATUS_PREPARATION = 0;

export default {
  props: {
    gameData: {
      type: Object,
      required: true
    },

    lang: {
      type: String,
      default: 'hu'
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
      return format(this.gameData.gameDate, 'PPPP - HH:mm (zzz)', 'America/New_York');
    },

    gameDateLocal() {
      return format(this.gameData.gameDate, 'HH:mm (zzz)', this.gameData.gameTimezone);
    },

    browserTimeZone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  }
};
</script>
