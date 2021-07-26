<template>
  <ResponsiveTable>
    <DataTable :class="`${DEFAULT_WIDGET_NAME}-table`" :columns="columns" :rows="rows" :is-loading="isLoading">
      <template v-slot:cell-homeTeamName="{ row }">
        {{ row.homeTeamName }}
        <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image is-right`" :key="row.id" :src="row.homeTeamLogo" />
      </template>
      <template v-slot:cell-awayTeamName="{ row }">
        <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image`" :key="row.id" :src="row.awayTeamLogo" />
        {{ row.awayTeamName }}
      </template>
      <template v-slot:cell-gameResult="{ row }">
        <a :href="externalBaseUrl + row.id" target="_balank" class="text-dark">{{ row.gameResult }}</a>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>

<script>
import DataTable from '../DataTable';
import ResponsiveTable from '../ResponsiveTable';
import ImageBase from '../ImageBase';
import { DEFAULT_EXTERNAL_BASE_URL, DEFAULT_WIDGET_NAME } from '../../constatnts';
import { COLUMNS_SCHEDULE } from './internal';

export default {
  name: 'ScheduleBase',

  components: {
    ImageBase,
    DataTable,
    ResponsiveTable
  },

  props: {
    rows: {
      type: Array,
      require: true
    },

    externalBaseUrl: {
      type: String,
      default: DEFAULT_EXTERNAL_BASE_URL
    },

    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME,
      columns: COLUMNS_SCHEDULE
    };
  }

  // mounted() {
  //   this.getData();
  //   this.$i18n.locale = this.lang;
  // },
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
