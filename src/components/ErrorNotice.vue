<template>
  <div class="error-notice">
    <IconWarning class="icon" width="20" height="20"></IconWarning>
    <span>{{ error }}</span>
  </div>
</template>

<script>
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
  }
};
</script>
