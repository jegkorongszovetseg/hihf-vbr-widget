<template>
  <component v-if="componentFile" :is="componentFile" v-bind="$attrs"></component>
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
      dynamicComponent: null
    }
  },

  computed: {
    componentFile() {
      return () =>
        import(`../../../src/components/widgets/${this.name}.vue`);
    }
  }

  // mounted () {
  //   console.log('this.name:', this.name);
  //   if (this.name) return;
  //   import(`../../../src/components/widgets/${this.name}.vue`).then(module => {
  //     console.log('module:', module);
  //     this.dynamicComponent = module.default
  //   })
  // }
}
</script>
