<template>
  <div :class="DEFAULT_WIDGET_NAME">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <ResponsiveTable v-else>
      <DataTable
        :class="`${DEFAULT_WIDGET_NAME}-table`"
        :columns="columns"
        :rows="convertedData.rows"
        :sort="sort"
        :is-loading="isLoading"
        @sort="onSort"
      >
        <template v-slot:cell-name="{ row }">
          <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image`" :key="row.id" :src="row.teamLogo" />
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
import { COLUMNS_STANDINGS_P_3, COLUMNS_STANDINGS_P_2 } from './internal';

export default {
  name: 'Standings',

  components: {
    ImageBase,
    DataTable,
    ErrorNotice,
    ResponsiveTable
  },

  props: {
    apiKey: {
      type: String,
      require: true
    },

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
      default: '3',
      validator: value => ['2', '3'].includes(value)
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME,
      error: '',
      rows: [],
      SortService: null,
      sort: null,
      isLoading: false
    };
  },

  computed: {
    columns() {
      return this.type === '2' ? COLUMNS_STANDINGS_P_2 : COLUMNS_STANDINGS_P_3;
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
        const response = await fetchVBRData('v1/standings', this.apiKey, {
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

    onSort({ target, orders }) {
      this.sort = this.SortService.set(target, orders).get();
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
