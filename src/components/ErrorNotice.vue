<template>
  <div class="error-notice">
    <span>{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'ErrorNotice',
  props: {
    error: {
      type: String,
      default: ''
    }
  }
};
</script>
