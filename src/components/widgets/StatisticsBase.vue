<template>
  <ResponsiveTable>
    <DataTable
      :class="`${DEFAULT_WIDGET_NAME}-table`"
      :columns="columns"
      :rows="rows"
      :sort="sort"
      :is-loading="isLoading"
      @sort="onSort"
    >
      <template v-slot:cell-index="{ row }">
        <span :class="row.indexClass">
          {{ row.index }}
        </span>
      </template>
      <template v-if="showPortrait" v-slot:cell-name="{ row }">
        <ImageBase
          :class="`${DEFAULT_WIDGET_NAME}-image is-portrait`"
          :src="row.playerPortrait"
          :default-image="DEFAULT_PORTRAIT_IMAGE_URL"
        />
        {{ row.name }}
      </template>
      <template v-if="showTeamLogo" v-slot:cell-teamName="{ row }">
        <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image`" :key="row.id" :src="row.teamLogo" />
        {{ row.teamName }}
      </template>
    </DataTable>
  </ResponsiveTable>
</template>

<script>
import DataTable from '../DataTable';
import ResponsiveTable from '../ResponsiveTable';
import ImageBase from '../ImageBase';
import { DEFAULT_WIDGET_NAME, DEFAULT_PORTRAIT_IMAGE_URL } from '../../constatnts';

export default {
  name: 'StatisticsBase',

  components: {
    ImageBase,
    DataTable,
    ResponsiveTable
  },

  props: {
    columns: {
      type: Object,
      require: true
    },

    rows: {
      type: Array,
      require: true
    },

    sort: {
      type: Object,
      default: () => ({})
    },

    isLoading: {
      type: Boolean,
      default: false
    },

    showPortrait: {
      type: Boolean,
      default: true
    },

    showTeamLogo: {
      type: Boolean,
      default: true
    },

    externalBaseUrl: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME,
      DEFAULT_PORTRAIT_IMAGE_URL
    };
  },

  methods: {
    onSort({ target, state }) {
      this.$emit('sort', { target, state });
    }
  }
};
</script>
