<template>
  <div :class="mainClasses">
    <img
      v-if="isImageVisible"
      :key="imageSrc"
      :src="imageSrc"
      :alt="alt"
      loading="lazy"
      @load="onLoaded"
      @error="onError"
    />
  </div>
</template>

<script>
import isNotEmpty from '@/utils/object/is-not-empty';

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
    },

    defaultImage: {
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
      if (this.isImageError && isNotEmpty(this.defaultImage)) return true;
      return isNotEmpty(this.src);
    },

    mainClasses() {
      return [
        // 'vbr-image-base',
        {
          'is-loaded': this.isLoaded
        }
      ];
    },

    imageSrc() {
      return !this.isImageError ? this.src : this.defaultImage ? this.defaultImage : this.src;
    }
  },

  mounted() {
    this.isLoaded = false;
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
