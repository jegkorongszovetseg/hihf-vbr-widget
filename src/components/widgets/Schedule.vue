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
    </template>

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
import dayjs from 'dayjs';
import { omit, pick, keys, filter, compose, values } from 'ramda';
import convert from '../../services/convert';
import ErrorNotice from '../ErrorNotice';
import Paginator from '../Paginator';
import ScheduleBase from './ScheduleBase.vue';
import TimezoneSelector from './helpers/TimezoneSelector.vue';
import { fetchVBRData } from '../../services/http-sevices';
import { DEFAULT_EXTERNAL_BASE_URL, DEFAULT_WIDGET_NAME } from '../../constatnts';
import { offsetName } from '@/utils/datetime';
import { COLUMNS_SCHEDULE } from './internal';

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

    showTeamLogo: {
      type: Boolean,
      default: true
    },

    hideNameColumn: {
      type: Boolean,
      default: false
    },

    hideBroadcastColumn: {
      type: Boolean,
      default: false
    },

    hideMoreColumn: {
      type: Boolean,
      default: false
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
    this.setupColumns();
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

    setupColumns() {
      const switchedColumns = compose(
        filter(x => Boolean(x)),
        pick(keys(SWITCHABLE_COLUMNS))
      )(this);
      const omitedProps = values(pick(keys(switchedColumns), SWITCHABLE_COLUMNS));
      this.columns = omit(omitedProps, this.columns);
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
