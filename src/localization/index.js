import Vue from 'vue';
import VueI18n from 'vue-i18n';

import hu from './loacles/hu';
import en from './loacles/en';

const messages = {
  hu,
  en
};

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'hu',
  messages
});
