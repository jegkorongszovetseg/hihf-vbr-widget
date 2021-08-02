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
      <template v-if="!hidePortrait" v-slot:cell-name="{ row }">
        <ImageBase
          :class="`${DEFAULT_WIDGET_NAME}-image is-portrait`"
          :src="row.playerPortrait"
          :default-image="DEFAULT_PORTRAIT_IMAGE_URL"
        />
        {{ row.name }}
      </template>
      <template v-if="!hideTeamLogo" v-slot:cell-teamName="{ row }">
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

    hidePortrait: {
      type: Boolean,
      required: true
    },

    hideTeamLogo: {
      type: Boolean,
      required: true
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
    onSort(payload) {
      this.$emit('sort', payload);
    }
  }
};
</script>
