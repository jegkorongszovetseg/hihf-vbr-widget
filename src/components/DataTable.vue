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
            {{ $t(column.label) }}
          </slot>
          <span v-if="column.sortable && prop !== sort.sortTarget">#</span>
          <span v-if="prop === sort.sortTarget && sort.sortReverse">d</span>
          <span v-if="prop === sort.sortTarget && !sort.sortReverse">a</span>
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
      // console.log(column, prop);
      if (!column.sortable) return;
      this.$emit('sort', prop);
    }
  }
};
</script>
