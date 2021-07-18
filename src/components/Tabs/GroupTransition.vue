<template>
  <transition-group name="fade" tag="div">
    <div
      v-for="(slot, index) in $slots.default"
      :key="`${slot.tag}-${index}`"
      v-show="slot.componentOptions && tabKey === slot.componentOptions.propsData.name"
    >
      <v-nodes :nodes="slot" />
    </div>
  </transition-group>
</template>

<script>
export default {
  components: {
    VNodes: {
      props: ['nodes'],
      render() {
        return this.nodes;
      }
    }
  },

  props: {
    tabKey: {
      type: String
    }
  },

  // data() {
  //   return {
  //     slots: []
  //   };
  // },

  created() {
    // this.slots = this.$slots.default;
  }
};
</script>
