<template>
 <GetSeasonIdentifiers></GetSeasonIdentifiers>
</template>

<script>
import GetSeasonIdentifiers from '../../../src/components/GetSeasonIdentifiers.vue'
  export default {
    components: {
      GetSeasonIdentifiers
    },
    data () {
      return {
        msg: 'Hello this is <Foo-Bar>'
      }
    }
  }
</script>
