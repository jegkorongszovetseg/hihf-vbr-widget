<template>
  <ul class="mjsz-vbr-pagination" v-if="pageCount > 0">
    <li :class="{ 'is-disabled': page === 1 }">
      <a href="#" @click.prevent="pageStep(-1)">
        <slot name="prev">
          <IconLeft class="icon paginator-left"></IconLeft>
        </slot>
      </a>
    </li>
    <li v-if="!isCompact" :class="{ 'is-disabled': page === 1 }">
      <a href="#" type="button" @click.prevent="goTo(1)">
        1
      </a>
    </li>
    <li v-if="!isCompact" class="is-extended">
      <span>...</span>
    </li>
    <li v-for="n in range" :key="n" :class="{ 'is-active': n === page }">
      <a href="#" @click.prevent="goTo(n)">
        {{ n }}
      </a>
    </li>
    <li v-if="!isCompact" class="is-extended">
      <span>...</span>
    </li>
    <li v-if="!isCompact" :class="{ 'is-disabled': page === pageCount }">
      <a href="#" @click.prevent="goTo(pageCount)">
        {{ pageCount }}
      </a>
    </li>
    <li :class="{ 'is-disabled': page === pageCount }">
      <a href="#" @click.prevent="pageStep(1)">
        <slot name="next">
          <IconRight class="icon paginator-left"></IconRight>
        </slot>
      </a>
    </li>
  </ul>
</template>
<script>
import IconLeft from './icons/IconLeft';
import IconRight from './icons/IconRight';

export default {
  name: 'Paginator',

  components: {
    IconLeft,
    IconRight
  },

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

    rangeLength: {
      type: Number,
      default: 3,
      validator: value => {
        return value >= 2;
      }
    },

    isCompact: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },

    range() {
      const page = this.page - 1;
      const range = Array.from({ length: this.pageCount }, (_, i) => i + 1);
      const minus = Math.floor(this.rangeLength / 2);

      let startIndex = Math.max(page - minus, 0);
      if (startIndex + this.rangeLength >= this.pageCount) {
        startIndex = Math.max(this.pageCount - this.rangeLength, 0);
      }
      return range.slice(startIndex, startIndex + this.rangeLength);
    }
  },

  methods: {
    pageStep(v) {
      const page = this.page + v;
      if (this.validPage(page)) this.$emit('change', page);
    },

    goTo(page) {
      if (this.validPage(page)) this.$emit('change', page);
    },

    validPage(page) {
      return page <= this.pageCount && page > 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.mjsz-vbr-pagination {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 10px 0;
  padding: 0;

  li {
    display: flex;

    a,
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 12px;
      text-decoration: none;
      color: var(--vbr-widget-paginator-color);
      border: 1px solid var(--vbr-widget-paginator-border-color);
      background-color: var(--vbr-widget-paginator-bg-color);
      margin-left: -1px;

      .icon {
        width: 16px;
        height: 16px;
        margin: 0 -4px;
      }
    }

    span {
      border: none;
      margin-left: 0;
    }

    &:hover:not(&.is-disabled) {
      a {
        color: var(--vbr-widget-paginator-hover-color);
        background-color: var(--vbr-widget-paginator-hover-bg-color);
      }
    }

    &.is-disabled {
      a,
      span {
        color: var(--vbr-widget-paginator-disabled-color);
        background-color: var(--vbr-widget-paginator-bg-color);
        pointer-events: none;
        cursor: default;
      }
    }

    &:focus,
    &.is-active {
      a {
        color: var(--vbr-widget-paginator-active-color);
        background-color: var(--vbr-widget-paginator-active-bg-color);
        border-color: var(--vbr-widget-paginator-active-bg-color);
        cursor: default;
      }
    }
  }
}
</style>
