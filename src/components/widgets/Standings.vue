<template>
  <div class="vbr-widget">
    <ResponsiveTable>
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
import { fetchVBRData } from '../../services/http-sevices';
// import commonMessages from '../../localization/common';

export default {
  name: 'Standings',

  // i18n: {
  //   sharedMessages: commonMessages
  // },

  components: {
    DataTable,
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
      columns: {
        index: {
          label: '#'
        },
        name: {
          label: 'table.team.short',
          tooltip: 'table.team.tooltip',
          sortable: true
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
          sortable: true
        },
        p0: {
          label: 'V',
          sortable: true
        },
        plus: {
          label: 'SZG',
          sortable: true
        },
        minus: {
          label: 'KG',
          sortable: true
        },
        gk: {
          label: 'GK',
          sortable: true
        },
        p: {
          label: 'P',
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
        // console.log('ERROR:', error);
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

<!-- style src="../../assets/scss/main.scss" lang="scss"></-->
