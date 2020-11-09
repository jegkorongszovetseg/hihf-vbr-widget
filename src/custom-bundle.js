import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';

import { i18n } from './localization';

import Standings from './components/widgets/Standings.vue';

Vue.use(vueCustomElement);

Standings.i18n = i18n;

Vue.customElement('vbr-standings', Standings);
