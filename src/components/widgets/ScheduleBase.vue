<template>
  <ResponsiveTable id="xxx">
    <DataTable :class="`${DEFAULT_WIDGET_NAME}-table`" :columns="columns" :rows="rows" :is-loading="isLoading">
      <template v-slot:header-gameDateTime="{ column }">
        {{ $t(column.label, { offsetName: timezoneOffsetName }) }}
      </template>
      <template v-slot:cell-homeTeamName="{ row }">
        {{ row.homeTeamName }}
        <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image is-right`" :key="row.id" :src="row.homeTeamLogo" />
      </template>
      <template v-slot:cell-awayTeamName="{ row }">
        <ImageBase :class="`${DEFAULT_WIDGET_NAME}-image`" :key="row.id" :src="row.awayTeamLogo" />
        {{ row.awayTeamName }}
      </template>
      <template v-slot:cell-gameResult="{ row }">
        <a :href="externalBaseUrl + row.id" target="_balank" class="text-dark">{{ row.gameResult }}</a>
      </template>
      <template v-slot:cell-broadcast="{ row }">
        <IconBroadcast v-if="row.broadcast" />
        <span v-else></span>
      </template>
      <template v-slot:cell-more="{ row }">
        <v-popover offset="2" placement="left">
          <button :class="`${DEFAULT_WIDGET_NAME}-button`">
            <IconMore />
          </button>
          <template slot="popover">
            <ul :class="`${DEFAULT_WIDGET_NAME}-dropdown-menu`">
              <li>
                <a :href="externalBaseUrl + row.id" :class="`${DEFAULT_WIDGET_NAME}-dropdown-item`" target="_blank">
                  <IconSheet width="14" />
                  Jegyzőkönyv
                </a>
              </li>
              <li v-if="row.video">
                <a :href="row.video" :class="`${DEFAULT_WIDGET_NAME}-dropdown-item`" target="_blank">
                  <IconYoutube width="14" />
                  Videó
                </a>
              </li>
            </ul>
          </template>
        </v-popover>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>

<script>
import DataTable from '../DataTable';
import ResponsiveTable from '../ResponsiveTable';
import ImageBase from '../ImageBase';
import IconMore from '../icons/IconMore.vue';
import IconBroadcast from '../icons/IconBroadcast.vue';
import IconSheet from '../icons/IconSheet.vue';
import IconYoutube from '../icons/IconYoutube.vue';
import { DEFAULT_EXTERNAL_BASE_URL, DEFAULT_WIDGET_NAME } from '../../constatnts';

export default {
  name: 'ScheduleBase',

  components: {
    IconMore,
    IconSheet,
    ImageBase,
    DataTable,
    IconYoutube,
    IconBroadcast,
    ResponsiveTable
  },

  props: {
    columns: {
      type: Object,
      require: true
    },

    rows: {
      type: Array,
      require: true
    },

    externalBaseUrl: {
      type: String,
      default: DEFAULT_EXTERNAL_BASE_URL
    },

    isLoading: {
      type: Boolean,
      default: false
    },

    timezoneOffsetName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      DEFAULT_WIDGET_NAME
    };
  }
};
</script>

<style src="../../assets/scss/main.scss" lang="scss"></style>
