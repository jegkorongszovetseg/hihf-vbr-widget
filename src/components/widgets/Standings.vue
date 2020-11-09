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
          <VbrImage
            class="vbr-widget-image"
            :src="`https://jegkorongszovetseg.hu/_upload/editor/db/team-logos/211/${row.id}.png`"
          />
          {{ row.name }}
        </template>
      </DataTable>
    </ResponsiveTable>
  </div>
</template>

<script>
import convert from '../../services/convert';
import DataTable from '../DataTable';
import ErrorNotice from '../ErrorNotice';
import ResponsiveTable from '../ResponsiveTable';
import VbrImage from '../Image';
import { fetchVBRData } from '../../services/http-sevices';

export default {
  name: 'Standings',

  components: {
    VbrImage,
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
          label: '#',
          class: 'text-left'
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
      },
      isLoading: false
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
        this.isLoading = true;
        const response = await fetchVBRData({
          championshipId: this.championshipId,
          division: 'Alapszakasz',
          type: 'standings'
        });
        this.isLoading = false;
        this.rows = response ? response : [];
      } catch (error) {
        this.error = error.message;
        this.isLoading = false;
      }
    },

    onSort(column) {
      const sortReverse = this.setSortReverse(this.sort.sortReverse);
      this.sort = {
        sortTarget: sortReverse === null ? null : column,
        sortReverse
      };
    },

    setSortReverse(sortReverse) {
      const pos = [true, false, null].indexOf(sortReverse);
      let next = pos + 1;
      if (next > 2) next = 0;
      return [true, false, null][next];
    }
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
