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
import { COLUMNS_FIELD_PLAYERS } from './internal';
import CommonStaisticMixin from './StatisticMixin';

export default {
  name: 'FieldPlayersLeader',

  mixins: [CommonStaisticMixin],

  data() {
    return {
      columns: COLUMNS_FIELD_PLAYERS,
      sort: {
        sortTarget: 'point',
        orders: [{ target: 'point', direction: SORT_STATE_DESCEND }]
      }
    };
  },

  mounted() {
    this.getData('v1/playersStatsPeriod');
  }
};
</script>
