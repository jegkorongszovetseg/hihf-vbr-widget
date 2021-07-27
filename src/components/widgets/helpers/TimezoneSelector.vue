<template>
  <div>
    <i18n path="common.selectTimezone" tag="label">
      <a href="#" @click.prevent="onChangeTimezone(localTimezone)">{{ localZoneName }})</a>
    </i18n>
    <a
      v-for="country in timezoneCountries"
      :key="country.countryLabelKey"
      href="#"
      :class="{ 'is-active': country.isActive }"
      @click.prevent="onChangeTimezone(country.timezone)"
    >
      {{ $t(`common.${country.countryLabelKey}`) }} ({{ country.zoneOffsetName }})
    </a>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { offsetName } from '@/utils/datetime';
import { AVAILABLE_TIMEZONES_BY_COUNTRY } from '../../../constatnts';

export default {
  name: 'TimezoneSelector',

  props: {
    lang: {
      type: String,
      default: 'hu'
    },

    currentZone: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      localTimezone: dayjs.tz.guess()
    };
  },

  computed: {
    localZoneName() {
      return offsetName(new Date(), null, this.lang);
    },

    timezoneCountries() {
      return Array.from(AVAILABLE_TIMEZONES_BY_COUNTRY.values()).map(item => ({
        ...item,
        isActive:
          offsetName(new Date(), this.currentZone, this.lang) === offsetName(new Date(), item.timezone, this.lang),
        zoneOffsetName: offsetName(new Date(), item.timezone, this.lang)
      }));
    }
  },

  methods: {
    onChangeTimezone(tz) {
      this.$emit('change', tz);
    }
  }
};
</script>
