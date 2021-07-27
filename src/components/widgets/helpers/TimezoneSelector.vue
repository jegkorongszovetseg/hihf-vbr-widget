<template>
  <div>
    *MINDEN IDŐPONT A SZÁMÍTÓGÉP IDŐZONÁJA SZERINT JELENEIK MEG (<a
      href="#"
      @click.prevent="onChangeTimezone(localTimezone)"
      >{{ localZoneName }})</a
    >. VÁLTÁS:
    <a
      v-for="country in timezoneCountries"
      :key="country.countryLabelKey"
      href="#"
      :class="{ 'is-active': country.isActive }"
      @click.prevent="onChangeTimezone(country.timezone)"
    >
      {{ country.countryLabelKey }} ({{ country.zoneOffsetName }})
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
        isActive: this.currentZone === item.timezone,
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
