<template>
  <div class="tab-pane">
    <slot :active="isActive" />
  </div>
</template>

<script>
export default {
  name: 'TabPane',

  inject: ['api'],

  props: {
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    isActive() {
      // console.log('value:', this.api.getValue(), this.name);
      return this.api.getValue() === this.name;
    }
  },

  created() {
    console.log('CREATED');
    // this.api.register(this.name);
    this.api.register(this.name);
  },

  beforeDestroy() {
    console.log('destroyed');
    this.api.unregister(this.name);
  }
};
</script>
