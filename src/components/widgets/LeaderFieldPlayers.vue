<template>
  <div class="vbr-widget">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <ResponsiveTable v-else>
      <DataTable
        class="vbr-widget-standings"
        :columns="columns"
        :rows="convertedData"
        :sort="sort"
        :is-loading="isLoading"
        @sort="onSort"
      >
        <template v-slot:cell-name="{ row }">
          <ImageBase
            class="vbr-widget-image"
            :src="`https://jegkorongszovetseg.hu/_upload/editor/db/team-logos/211/${row.id}.png`"
          />
          {{ row.name }}
        </template>
      </DataTable>
    </ResponsiveTable>

    <Paginator
      :page="page"
      :items-per-page="limit"
      :total-items="rows.length"
      :range-lenght="5"
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
import { fetchVBRData } from '../../services/http-sevices';

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
      default: 2
    }
  },

  data() {
    return {
      error: '',
      columns: {
        index: {
          label: '#',
          class: 'text-left',
          tooltip: 'table.team.tooltip'
        },
        name: {
          label: 'table.team.short',
          tooltip: 'table.team.tooltip',
          sortable: true,
          class: 'text-left w-auto'
        },
        m: {
          label: 'M',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        p3: {
          label: 'GY',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        p2: {
          label: 'GYH',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        p1: {
          label: 'VH',
          tooltip: 'table.team.tooltip',
          sortable: true,
          defaultSort: false
        },
        p0: {
          label: 'V',
          tooltip: 'table.team.tooltip',
          sortable: true,
          defaultSort: false
        },
        plus: {
          label: 'SZG',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        minus: {
          label: 'KG',
          tooltip: 'table.team.tooltip',
          sortable: true,
          defaultSort: false
        },
        gk: {
          label: 'GK',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        p: {
          label: 'P',
          tooltip: 'table.team.tooltip',
          sortable: true
        }
      },
      rows: [],
      sort: {
        sortTarget: null,
        sortReverse: null
      },
      isLoading: false,
      page: 1
    };
  },

  computed: {
    convertedData() {
      return convert(this.rows)
        .sorted(this.sort)
        .addIndex()
        .pagination(this.page, this.limit)
        .value();
    }
  },

  mounted() {
    this.getData();
    this.$i18n.locale = this.lang;
  },

  methods: {
    async getData() {
      try {
        this.isLoading = true;
        const response = await fetchVBRData('/standings', {
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

    onSort(column) {
      const sortReverse = this.setSortReverse(this.sort, column);
      this.sort = {
        target: column,
        reverse: this.setReverseArray(column),
        sortTarget: sortReverse === null ? null : column,
        sortReverse
      };
    },

    setSortReverse(sort, column) {
      const isNewSort = sort.target !== column;
      if (isNewSort) {
        const defaultSort = this.columns[column].defaultSort;
        return defaultSort === undefined ? true : defaultSort;
      }
      const pos = sort.reverse.indexOf(sort.sortReverse);
      let next = pos + 1;
      if (next > 2) next = 0;
      return sort.reverse[next];
    },

    setReverseArray(column) {
      const defaultSort = this.columns[column].defaultSort === undefined ? true : this.columns[column].defaultSort;
      if (defaultSort) {
        return [true, false, null];
      } else {
        return [false, true, null];
      }
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
