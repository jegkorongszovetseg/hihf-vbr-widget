import VueI18n from 'vue-i18n';
import VTooltip from 'v-tooltip';
import { DEFAULT_TOOLTIP_OPTIONS } from '../../src/constatnts';

import hu from '../../src/localization/loacles/hu';
import en from '../../src/localization/loacles/en';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements for the site.
  Vue.use(VueI18n);

  options.i18n = new VueI18n({
    locale: 'en',
    messages: {
      hu,
      en
    }
  });

  Vue.use(VTooltip, DEFAULT_TOOLTIP_OPTIONS);
};
