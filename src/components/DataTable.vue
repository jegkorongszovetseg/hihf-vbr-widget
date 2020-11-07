<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, prop) in columns"
          :key="prop"
          :class="[
            [column.class],
            {
              'is-active': prop === sort.sortTarget,
              'is-sortable': column.sortable,
              'is-desc': prop === sort.sortTarget && sort.sortReverse,
              'is-asc': prop === sort.sortTarget && !sort.sortReverse
            }
          ]"
          @click="sortBy(column, prop)"
        >
          <slot :name="`header-${prop}`">
            <span>{{ $t(column.label) }}</span>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(_, prop) in columns" :key="prop" :class="[[_.class], { 'is-active': prop === sort.sortTarget }]">
          <slot :name="`cell-${prop}`" :row="row" :prop="prop">
            {{ row[prop] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'DataTable',

  props: {
    columns: {
      type: Object,
      default: () => ({})
    },

    rows: {
      type: Array,
      default: () => []
    },

    sort: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    sortBy(column, prop) {
      console.log(column, prop);
      if (!column.sortable) return;
      this.$emit('sort', prop);
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  background-color: #eaeaea;

  th {
    background-color: black;
    color: white;
    &.is-active {
      background-color: darkolivegreen;
    }

    &.is-sortable {
      position: relative;
      &:after {
        position: absolute;
        right: 0;
        content: 'sortable';
      }
    }

    &.is-asc {
      position: relative;
      &:after {
        position: absolute;
        right: 0;
        content: 'asc';
      }
    }

    &.is-desc {
      position: relative;
      &:after {
        position: absolute;
        right: 0;
        content: 'desc';
      }
    }
  }

  td {
    &.is-active {
      background-color: lightgrey;
    }
  }
}
</style>
