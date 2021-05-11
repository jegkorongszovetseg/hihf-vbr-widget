<template>
  <div :class="[DEFAULT_WIDGET_NAME] + '-error-notice'">
    <IconWarning class="icon" width="20" height="20"></IconWarning>
    <span>{{ error }}</span>
  </div>
</template>

<script>
import { DEFAULT_WIDGET_NAME } from '../constatnts';
import IconWarning from './icons/IconWarning';

export default {
  name: 'ErrorNotice',

  components: {
    IconWarning
  },

  props: {
    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME
    };
  }
};
</script>
