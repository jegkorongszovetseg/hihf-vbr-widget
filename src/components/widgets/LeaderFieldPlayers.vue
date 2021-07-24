<template>
  <div :class="DEFAULT_WIDGET_NAME">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <ResponsiveTable v-else>
      <DataTable
        :class="`${DEFAULT_WIDGET_NAME}-table`"
        :columns="columns"
        :rows="convertedData"
        :sort="sort"
        :is-loading="isLoading"
        @sort="onSort"
      >
        <template v-slot:cell-index="{ row }">
          <span :class="row.indexClass">
            {{ row.index }}
          </span>
        </template>
        <template v-slot:cell-name="{ row }">
          <ImageBase
            :class="`${DEFAULT_WIDGET_NAME}-image is-portrait`"
            :src="row.playerPortrait"
            :default-image="DEFAULT_PORTRAIT_IMAGE_URL"
          />
          {{ row.name }}
        </template>
        <template v-slot:cell-teamName="{ row }">
          <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image`" :key="row.id" :src="row.teamLogo" />
          {{ row.teamName }}
        </template>
      </DataTable>
    </ResponsiveTable>

    <Paginator
      :page="page"
      :items-per-page="limit"
      :total-items="rows.length"
      :range-length="5"
      @change="onPaginatorChange"
    />
  </div>
</template>

<script>
import convert from '../../services/convert';
import DataTable from '../DataTable';
import ErrorNotice from '../ErrorNotice';
import ResponsiveTable from '../ResponsiveTable';
import ImageBase from '../ImageBase';
import Paginator from '../Paginator';
import { SortService } from '../../services/sort-service';
import { fetchVBRData } from '../../services/http-sevices';
import { DEFAULT_WIDGET_NAME, SORT_STATE_DESCEND, DEFAULT_PORTRAIT_IMAGE_URL } from '../../constatnts';
import { COLUMNS_FIELD_PLAYERS } from './internal';

export default {
  name: 'LeaderFieldPlayers',

  components: {
    ImageBase,
    DataTable,
    Paginator,
    ErrorNotice,
    ResponsiveTable
  },

  props: {
    apiKey: {
      type: String,
      require: true
    },

    lang: {
      type: String,
      default: 'hu'
    },

    championshipId: {
      type: String,
      require: true
    },

    division: {
      type: String,
      require: true
    },

    pagination: {
      type: Boolean,
      default: true
    },

    limit: {
      type: Number,
      default: 20
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME,
      DEFAULT_PORTRAIT_IMAGE_URL,
      error: '',
      columns: COLUMNS_FIELD_PLAYERS,
      rows: [],
      SortService: null,
      sort: {
        sortTarget: 'point',
        sortState: SORT_STATE_DESCEND
      },
      isLoading: false,
      page: 1
    };
  },

  computed: {
    convertedData() {
      return convert(this.rows)
        .sorted(this.sort)
        .playerName()
        .addIndex(this.sort.sortTarget)
        .pagination(this.page, this.limit)
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
        const response = await fetchVBRData('v1/playersStatsPeriod', this.apiKey, {
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

    onPaginatorChange(page) {
      this.page = page;
    },

    onSort({ target, state }) {
      this.sort = this.SortService.set(target, state).get();
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
