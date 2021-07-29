<template>
  <div :class="DEFAULT_WIDGET_NAME">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <template v-else>
      <TimezoneSelector :current-zone="timezone" @change="onChangeTimezone" />

      <ScheduleBase
        :columns="columns"
        :rows="convertedData"
        :is-loading="isLoading"
        :external-base-url="externalBaseUrl"
        :timezone-offset-name="currentTimezoneOffsetName"
      />

      <Paginator
        :page="page"
        :items-per-page="limit"
        :total-items="rows.length"
        :range-length="5"
        @change="onPaginatorChange"
      />
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { omit } from 'ramda';
import convert from '../../services/convert';
import ErrorNotice from '../ErrorNotice';
import Paginator from '../Paginator';
import ScheduleBase from './ScheduleBase.vue';
import TimezoneSelector from './helpers/TimezoneSelector.vue';
import { fetchVBRData } from '../../services/http-sevices';
import { DEFAULT_EXTERNAL_BASE_URL, DEFAULT_WIDGET_NAME } from '../../constatnts';
import { offsetName } from '@/utils/datetime';
import { COLUMNS_SCHEDULE, validateColumnsName } from './internal';

const SWITCHABLE_COLUMNS = { hideNameColumn: 'name', hideBroadcastColumn: 'broadcast', hideMoreColumn: 'more' };

export default {
  name: 'Schedule',

  components: {
    Paginator,
    ErrorNotice,
    ScheduleBase,
    TimezoneSelector
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
    },

    externalBaseUrl: {
      type: String,
      default: DEFAULT_EXTERNAL_BASE_URL
    },

    hideColumns: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME,
      error: '',
      columns: COLUMNS_SCHEDULE,
      rows: [],
      isLoading: false,
      page: 1,
      timezone: dayjs.tz.guess()
    };
  },

  computed: {
    convertedData() {
      return convert(this.rows)
        .schedule(this.timezone, this.lang)
        .pagination(this.page, this.limit)
        .value();
    },

    currentTimezoneOffsetName() {
      return offsetName(new Date(), this.timezone, this.lang);
    }
  },

  created() {
    this.setHiddenColumns();
  },

  mounted() {
    this.getData();
    this.$i18n.locale = this.lang;
  },

  methods: {
    async getData() {
      try {
        this.isLoading = true;
        const response = await fetchVBRData('v1/gamesList', this.apiKey, {
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

    async setHiddenColumns() {
      try {
        const hiddenColumns = await validateColumnsName(this.columns, this.hideColumns);
        this.columns = omit(hiddenColumns, this.columns);
      } catch (error) {
        this.error = error.message;
      }
    },

    onPaginatorChange(page) {
      this.page = page;
    },

    onChangeTimezone(tz) {
      this.timezone = tz;
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
