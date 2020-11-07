<template>
  <ul class="pagination">
    <li @click="pageStep(-1)">prev</li>
    <li v-for="n in range" :key="n" :class="{ 'is-active': n === page }" @click="goTo(n)">
      {{ n }}
    </li>
    <li @click="pageStep(1)">></li>
  </ul>
</template>
<script>
export default {
  name: 'Paginator',

  props: {
    page: {
      type: Number,
      required: false,
      default: 0,
      validator: value => {
        return value >= 0;
      }
    },

    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
      validator: value => {
        return value > 0;
      }
    },

    totalItems: {
      type: Number,
      required: true,
      validator: value => {
        return value >= 0;
      }
    },

    rangeLenght: {
      type: Number,
      default: 3,
      validator: value => {
        return value >= 2;
      }
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    range() {
      const page = this.page - 1;
      const range = Array.from({ length: this.pageCount }, (_, i) => i + 1);
      const minus = Math.floor(this.rangeLenght / 2);

      let startIndex = Math.max(page - minus, 0);
      if (startIndex + this.rangeLenght >= this.pageCount) {
        startIndex = Math.max(this.pageCount - this.rangeLenght, 0);
      }
      return range.slice(startIndex, startIndex + this.rangeLenght);
    }
  },

  methods: {
    pageStep(v) {
      const page = this.page + v;
      this.$emit('change', page);
    },

    goTo(page) {
      this.$emit('change', page);
    }
  }
};
</script>
<style scoped>
ul li {
  display: inline-block;
  padding: 4px;
}
.is-active {
  color: red;
}
</style>
