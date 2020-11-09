<template>
  <div class="vbr-widget">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <ResponsiveTable v-else>
      <DataTable
        class="vbr-widget-standings"
        :columns="columns"
        :rows="convertedData"
        :sort="sort"
        @sort="onSort"
      ></DataTable>
    </ResponsiveTable>
  </div>
</template>

<script>
import convert from '../../services/convert';
import DataTable from '../DataTable';
import ResponsiveTable from '../ResponsiveTable';
import ErrorNotice from '../ErrorNotice';
import { fetchVBRData } from '../../services/http-sevices';

export default {
  name: 'Standings',

  components: {
    DataTable,
    ErrorNotice,
    ResponsiveTable
  },

  props: {
    championshipId: {
      type: String,
      require: true
    },

    lang: {
      type: String,
      default: 'hu'
    }
  },

  data() {
    return {
      error: '',
      columns: {
        index: {
          label: '#'
        },
        name: {
          label: 'table.team.short',
          tooltip: 'table.team.tooltip',
          sortable: true,
          class: 'text-left'
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
          sortable: true
        },
        p0: {
          label: 'V',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        plus: {
          label: 'SZG',
          tooltip: 'table.team.tooltip',
          sortable: true
        },
        minus: {
          label: 'KG',
          tooltip: 'table.team.tooltip',
          sortable: true
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
      }
    };
  },

  computed: {
    convertedData() {
      return convert(this.rows)
        .sorted(this.sort)
        .addContinuousIndex()
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
        const response = await fetchVBRData({ championshipId: 2051, division: 'Alapszakasz', type: 'standings' });
        this.rows = response;
      } catch (error) {
        this.error = error.message;
      }
    },

    onSort(column) {
      this.sort = {
        sortTarget: column,
        sortReverse: !this.sort.sortReverse
      };
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
