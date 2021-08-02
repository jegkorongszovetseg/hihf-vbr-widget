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
              'is-active': prop === sort.sortTarget && sort.orders[0].direction !== SORT_STATE_ORIGINAL,
              'is-sortable': column.sortable,
              'is-desc': prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_DESCEND,
              'is-asc': prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ASCEND
            }
          ]"
          v-tooltip="{ content: $t(column.tooltip) }"
          @click="sortBy(column, prop)"
        >
          <slot :name="`header-${prop}`" :column="column">
            <span>{{ $t(column.label) }}</span>
          </slot>
          <IconSort v-if="column.sortable && prop !== sort.sortTarget" class="icon-sort"></IconSort>
          <IconSort
            v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ORIGINAL"
            class="icon-sort"
          ></IconSort>
          <IconSortAsc
            v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_DESCEND"
            class="icon-sort"
          ></IconSortAsc>
          <IconSortDesc
            v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ASCEND"
            class="icon-sort"
          ></IconSortDesc>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td
          v-for="(_, prop) in columns"
          :key="prop"
          :class="[
            [_.class],
            { 'is-active': prop === sort.sortTarget && sort.orders[0].direction !== SORT_STATE_ORIGINAL }
          ]"
        >
          <slot :name="`cell-${prop}`" :row="row" :prop="prop">
            {{ row[prop] }}
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-if="rows.length === 0 && !isLoading">
        <td :colspan="columnCount">{{ $t('common.noData') }}</td>
      </tr>
      <tr v-if="isLoading">
        <td :colspan="columnCount">{{ $t('common.loading') }}</td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
import IconSort from './icons/IconSort';
import IconSortAsc from './icons/IconSortAsc';
import IconSortDesc from './icons/IconSortDesc';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND, SORT_STATE_ORIGINAL } from '../constatnts';

export default {
  name: 'DataTable',

  components: {
    IconSort,
    IconSortAsc,
    IconSortDesc
  },

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
    },

    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      SORT_STATE_ORIGINAL,
      SORT_STATE_DESCEND,
      SORT_STATE_ASCEND
    };
  },

  computed: {
    columnCount() {
      return Object.keys(this.columns).length;
    }
  },

  methods: {
    sortBy(column, prop) {
      if (!column.sortable) return;
      this.$emit('sort', { target: prop, orders: column.sortOrders });
    }
  }
};
</script>
