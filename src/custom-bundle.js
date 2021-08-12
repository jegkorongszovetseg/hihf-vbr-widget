import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import VTooltip from 'v-tooltip';
import { i18n } from './localization';
import { DEFAULT_WIDGET_NAME } from './constatnts';

import Standings from './components/widgets/Standings.vue';
import Schedule from './components/widgets/Schedule.vue';
import FieldPlayersPenalties from './components/widgets/FieldPlayersPenalties.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.vue';
import GoaliesLeader from './components/widgets/GoaliesLeader.vue';
import TeamFairplay from './components/widgets/TeamFairplay.vue';
import TeamPowerplay from './components/widgets/TeamPowerplay.vue';
import TeamPenaltyKilling from './components/widgets/TeamPenaltyKilling.vue';
import TeamAttandance from './components/widgets/TeamAttandance.vue';
import TeamScoringEfficiency from './components/widgets/TeamScoringEfficiency.vue';
// import Game from './components/widgets/Game.vue';

Vue.use(vueCustomElement);

VTooltip.options.defaultPlacement = 'top';
VTooltip.options.defaultBoundariesElement = 'body';
VTooltip.options.defaultClass = `${DEFAULT_WIDGET_NAME}-tooltip`;
VTooltip.options.defaultHideOnTargetClick = false;
VTooltip.options.defaultOffset = 1;
VTooltip.options.defaultTemplate = '<div role="tooltip"><div class="tooltip-inner"></div></div>';
VTooltip.options.popover.defaultClass = '';
VTooltip.options.popover.defaultBaseClass = `${DEFAULT_WIDGET_NAME}-popover`;

// Game.i18n = i18n;
Standings.i18n = i18n;
Schedule.i18n = i18n;
FieldPlayersPenalties.i18n = i18n;
FieldPlayersLeader.i18n = i18n;
GoaliesLeader.i18n = i18n;
TeamFairplay.i18n = i18n;
TeamPowerplay.i18n = i18n;
TeamPenaltyKilling.i18n = i18n;
TeamAttandance.i18n = i18n;
TeamScoringEfficiency.i18n = i18n;

// Vue.customElement('vbr-game', Game);
Vue.customElement('mjsz-vbr-standings', Standings);
Vue.customElement('mjsz-vbr-schedule', Schedule);
Vue.customElement('mjsz-vbr-field-players-penalties', FieldPlayersPenalties);
Vue.customElement('mjsz-vbr-field-players', FieldPlayersLeader);
Vue.customElement('mjsz-vbr-goalies-leader', GoaliesLeader);
Vue.customElement('mjsz-vbr-goalies-leader', GoaliesLeader);
Vue.customElement('mjsz-vbr-team-fairplay', TeamFairplay);
Vue.customElement('mjsz-vbr-team-powerplay', TeamPowerplay);
Vue.customElement('mjsz-vbr-team-penalty-killing', TeamPenaltyKilling);
Vue.customElement('mjsz-vbr-team-attandance', TeamAttandance);
Vue.customElement('mjsz-vbr-team-scoring-efficiency', TeamScoringEfficiency);
