import { omit } from 'ramda';
import convert from '../../services/convert';
import ErrorNotice from '../ErrorNotice';
import Paginator from '../Paginator';
import StatisticsBase from './StatisticsBase.vue';
import { fetchVBRData } from '../../services/http-sevices';
import { SortService } from '../../services/sort-service';
import { DEFAULT_WIDGET_NAME, DEFAULT_EXTERNAL_BASE_URL } from '../../constatnts';
import { validateColumnsName } from './internal';

const CommonStatisticMixin = {
  components: {
    Paginator,
    ErrorNotice,
    StatisticsBase
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

    hidePortrait: {
      type: Boolean,
      default: false
    },

    hideTeamLogo: {
      type: Boolean,
      default: false
    },

    hideColumns: {
      type: String,
      default: ''
    },

    teamFilter: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME,
      error: '',
      columns: null,
      rows: [],
      isLoading: false,
      page: 1,
      sort: {},
      SortService: null
    };
  },

  computed: {
    convertedData() {
      return convert(this.rows)
        .teamFilter(this.teamFilter)
        .playerName()
        .sorted(this.sort)
        .addIndex(this.sort.sortTarget)
        .pagination(this.page, this.limit)
        .value();
    },

    totalItems() {
      return this.convertedData.totalItems;
    }
  },

  created() {
    this.$i18n.locale = this.lang;
    this.setHiddenColumns();
    this.SortService = new SortService(this.sort);
    this.sort = this.SortService.get();
  },

  methods: {
    async getData(path) {
      try {
        this.isLoading = true;
        const response = await fetchVBRData(path, this.apiKey, {
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

    onSort({ target, state }) {
      this.sort = this.SortService.set(target, state).get();
    }
  }
};

export default CommonStatisticMixin;
