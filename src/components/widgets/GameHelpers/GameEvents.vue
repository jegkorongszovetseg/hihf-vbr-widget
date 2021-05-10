<template>
  <div class="game-events">
    <div v-for="(periodEvent, key) in gameEvents" :key="key">
      <div class="period-title">{{ key }}</div>
      <div v-if="periodEvent.length === 0">Nincs esemény ebben a harmadban</div>

      <template v-for="event in periodEvent">
        <div :key="event.eventId" style="display: flex;">
          <div>{{ event.eventTime }}</div>
          <div>{{ event.teamId }}</div>
          <div>{{ event.type }}</div>
          <div>{{ event.gkDirection }}</div>
          <div></div>
          <div>{{ event.jerseyNumber }} {{ event.lastName }} {{ event.firstName }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GameEvents',

  props: {
    gameEvents: {
      type: Object,
      required: true
    }
  }
};
</script>
