<template>
  <div :class="DEFAULT_WIDGET_NAME">
    <ErrorNotice v-if="error" :error="error"></ErrorNotice>

    <template v-else>
      <StatisticsBase
        :columns="columns"
        :rows="convertedData.rows"
        :is-loading="isLoading"
        :sort="sort"
        :external-base-url="externalBaseUrl"
        :hide-portrait="hidePortrait"
        :hide-team-logo="hideTeamLogo"
        @sort="onSort"
      />

      <Paginator
        :page="page"
        :items-per-page="limit"
        :total-items="totalItems"
        :range-length="5"
        @change="onPaginatorChange"
      />
    </template>
  </div>
</template>

<script>
import { SORT_STATE_DESCEND, VBR_API_GOALIE_PATH, VBR_API_GOALIE_UNDER_PATH } from '../../constatnts';
import { COLUMNS_GOALIES } from './internal';
import CommonStaisticMixin from './StatisticMixin';

export default {
  name: 'GoaliesLeader',

  mixins: [CommonStaisticMixin],

  props: {
    under: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      columns: COLUMNS_GOALIES,
      sort: {
        sortTarget: 'svsPercent',
        sortState: SORT_STATE_DESCEND
      }
    };
  },

  mounted() {
    if (this.under) return this.getData(VBR_API_GOALIE_UNDER_PATH);
    this.getData(VBR_API_GOALIE_PATH);
  }
};
</script>
