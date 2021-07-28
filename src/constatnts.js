export const DEFAULT_WIDGET_NAME = '-mjsz-vbr-widget';

export const DEFAULT_EXTERNAL_BASE_URL = 'https://www.jegkorongszovetseg.hu/event/game/';
export const DEFAULT_PORTRAIT_IMAGE_URL = 'https://jegkorongszovetseg.hu/assets/images/player_blank.png';

export const DEFAULT_TOOLTIP_OPTIONS = {
  placement: 'top',
  defaultClass: `${DEFAULT_WIDGET_NAME}-tooltip`,
  defaultBoundariesElement: 'body',
  autoHide: false,
  defaultHideOnTargetClick: false,
  defaultOffset: 1,
  defaultTemplate: '<div role="tooltip"><div class="tooltip-inner"></div></div>',
  popover: {
    defaultClass: '',
    defaultBaseClass: `${DEFAULT_WIDGET_NAME}-popover`
  }
};

export const SORT_STATE_ORIGINAL = 'original';
export const SORT_STATE_DESCEND = 'descend';
export const SORT_STATE_ASCEND = 'ascend';

export const LOCALE_FOR_LANG = new Map().set('hu', 'hu-hu').set('en', 'hu-gb');

export const AVAILABLE_TIMEZONES_BY_COUNTRY = new Map()
  .set('Europe/Budapest', { countryLabelKey: 'hungary', timezone: 'Europe/Budapest' })
  .set('Europe/Bucharest', { countryLabelKey: 'romania', timezone: 'Europe/Bucharest' });
