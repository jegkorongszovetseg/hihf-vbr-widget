import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import Standings from './components/widgets/Standings.vue';
import { i18n } from './localization';

Vue.config.productionTip = false;

const StandingsElement = wrap(Vue, Standings);
window.customElements.define('vbr-standings', StandingsElement);

export default {
  i18n
};
