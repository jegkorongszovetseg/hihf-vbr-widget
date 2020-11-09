<template>
  <div>
    <img v-if="isImageVisible" :src="src" :alt="alt" loading="lazy" @load="onLoaded" @error="onError" />
  </div>
</template>

<script>
export default {
  name: 'ImageBase',

  props: {
    src: {
      type: String,
      default: ''
    },

    alt: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isImageError: false
    };
  },

  computed: {
    isImageVisible() {
      return Boolean(this.src) && !this.isImageError;
    }
  },

  methods: {
    onLoaded() {},

    onError() {
      this.isImageError = true;
    }
  }
};
</script>
