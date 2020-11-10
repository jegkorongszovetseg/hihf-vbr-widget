<template>
  <div :class="mainClasses">
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
      isImageError: false,
      isLoaded: false
    };
  },

  computed: {
    isImageVisible() {
      return Boolean(this.src) && !this.isImageError;
    },

    mainClasses() {
      return [
        'vbr-image-base',
        {
          'is-loaded': this.isLoaded
        }
      ];
    }
  },

  methods: {
    onLoaded() {
      this.isLoaded = true;
    },

    onError() {
      this.isImageError = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.vbr-image-base {
  img {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
  &.is-loaded img {
    opacity: 1;
  }
}
</style>
