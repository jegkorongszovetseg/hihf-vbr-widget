<template>
  <div class="home">
    <h2>Elérhető komponensek</h2>
    <ul>
      <li v-for="route in routes" :key="route.name">
        <router-link :to="{ name: route.name }">{{ route.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { routes } from '../router';

export default {
  name: 'Home',

  data() {
    return {
      routes
    };
  }
};
</script>
