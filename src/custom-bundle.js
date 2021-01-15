import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import VTooltip from 'v-tooltip';
import { i18n } from './localization';
import { DEFAULT_TOOLTIP_OPTIONS } from './constatnts';

import Standings from './components/widgets/Standings.vue';
import LeaderFieldPlayers from './components/widgets/LeaderFieldPlayers.vue';
import Game from './components/widgets/Game.vue';

Vue.use(vueCustomElement);

Vue.use(VTooltip, DEFAULT_TOOLTIP_OPTIONS);

Game.i18n = i18n;
Standings.i18n = i18n;
LeaderFieldPlayers.i18n = i18n;

Vue.customElement('vbr-game', Game);
Vue.customElement('vbr-standings', Standings);
Vue.customElement('vbr-leader-field-players', LeaderFieldPlayers);
