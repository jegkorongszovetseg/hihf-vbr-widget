<template>
  <div :class="mainClasses">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <ResponsiveTable v-else>
      <DataTable
        class="-mjsz-vbr-widget-table"
        :columns="columns"
        :rows="convertedData"
        :sort="sort"
        :is-loading="isLoading"
        @sort="onSort"
      >
        <template v-slot:cell-name="{ row }">
          <ImageBase class="-mjsz-vbr-widget-image" :key="row.id" :src="row.teamLogo" />
          {{ row.name }}
        </template>
      </DataTable>
    </ResponsiveTable>
  </div>
</template>

<script>
import convert from '../../services/convert';
import { SortService } from '../../services/sort-service';
import DataTable from '../DataTable';
import ErrorNotice from '../ErrorNotice';
import ResponsiveTable from '../ResponsiveTable';
import ImageBase from '../ImageBase';
import { DEFAULT_WIDGET_NAME } from '../../constatnts';
import { fetchVBRData } from '../../services/http-sevices';
import { COLUMNS_STANDINGS_P_3 } from './internal';

export default {
  name: 'Standings',

  components: {
    ImageBase,
    DataTable,
    ErrorNotice,
    ResponsiveTable
  },

  props: {
    championshipId: {
      type: String,
      require: true
    },

    division: {
      type: String,
      require: true
    },

    lang: {
      type: String,
      default: 'hu'
    },

    type: {
      type: String,
      default: '3'
    }
  },

  data() {
    return {
      error: '',
      columns: COLUMNS_STANDINGS_P_3,
      rows: [],
      SortService: null,
      sort: null,
      isLoading: false
    };
  },

  computed: {
    mainClasses() {
      return [DEFAULT_WIDGET_NAME];
    },

    convertedData() {
      return convert(this.rows)
        .sorted(this.sort)
        .addContinuousIndex()
        .value();
    }
  },

  created() {
    this.SortService = new SortService(this.sort);
    this.sort = this.SortService.get();
  },

  mounted() {
    this.getData();
    this.$i18n.locale = this.lang;
  },

  methods: {
    async getData() {
      try {
        this.isLoading = true;
        const response = await fetchVBRData('v1/standings', {
          championshipId: Number(this.championshipId),
          division: this.division
        });
        this.isLoading = false;
        this.rows = response ? response : [];
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },

    onSort({ target, state }) {
      this.sort = this.SortService.set(target, state).get();
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
