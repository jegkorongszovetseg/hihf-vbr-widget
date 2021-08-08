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
import { SORT_STATE_DESCEND } from '../../constatnts';
import convert from '../../services/convert';
import { COLUMNS_SCORING_EFFICIENCY } from './internal';
import CommonStaisticMixin from './StatisticMixin';

export default {
  name: 'TeamScoringEfficiency',

  mixins: [CommonStaisticMixin],

  data() {
    return {
      columns: COLUMNS_SCORING_EFFICIENCY,
      sort: {
        sortTarget: 'ppPercent',
        orders: [{ target: 'ppPercent', direction: SORT_STATE_DESCEND }]
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
    this.getData('v1/standings');
  }
};
</script>
