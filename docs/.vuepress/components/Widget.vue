<template>
  <component v-if="componentFile" :api-key="apiKey" :is="componentFile" v-bind="$attrs"></component>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      dynamicComponent: null,
      apiKey: process.env.VUE_APP_VBR_API_KEY
    }
  },

  computed: {
    componentFile() {
      return () =>
        import(`../../../src/components/widgets/${this.name}.vue`);
    }
  }
}
</script>
