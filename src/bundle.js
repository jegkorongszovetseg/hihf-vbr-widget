import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import Standings from './components/widgets/Standings.vue';
import { i18n } from './localization';

Vue.config.productionTip = false;

export default {
  i18n
};

const CustomElement = wrap(Vue, Standings);
window.customElements.define('vbr-standings', CustomElement);

// const HelloElement = wrap(Vue, HelloWorldApp);
// window.customElements.define("vue-widget-hello", HelloElement);
