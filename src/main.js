import Vue from 'vue';
import App from './App.vue';
import { i18n } from './localization';
import VTooltip from 'v-tooltip';
import { DEFAULT_TOOLTIP_OPTIONS } from './constatnts';

import './assets/scss/main.scss';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VTooltip, DEFAULT_TOOLTIP_OPTIONS);

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');
