import { keys } from 'ramda';
import { i18n } from '../../localization';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND } from '../../constatnts';

export const validateColumnsName = (columns, hiddenColumns) => {
  const hiddenColumnsArray = hiddenColumns.split(',');
  const columnsArray = keys(columns);
  return new Promise((resolve, reject) => {
    if (hiddenColumnsArray[0] === '') return resolve([]);
    const index = hiddenColumnsArray.findIndex(column => !columnsArray.includes(column));
    if (index > -1) {
      return reject({ message: i18n.t('errors.undefinedColumn', { column: hiddenColumnsArray[index] }) });
    }
    resolve(hiddenColumnsArray);
  });
};

export const COLUMNS_STANDINGS_P_3 = {
  index: {
    label: 'table.blank',
    class: 'text-left'
  },
  name: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    sortable: true,
    class: 'text-left w-auto text-bold'
  },
  m: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortable: true
  },
  p3: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
    sortable: true
  },
  p2: {
    label: 'table.otw.short',
    tooltip: 'table.otw.tooltip',
    sortable: true
  },
  p1: {
    label: 'table.otl.short',
    tooltip: 'table.otl.tooltip',
    sortable: true,
    defaultSortState: SORT_STATE_ASCEND
  },
  p0: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
    sortable: true,
    defaultSortState: SORT_STATE_ASCEND
  },
  plus: {
    label: 'table.goalFor.short',
    tooltip: 'table.goalFor.tooltip',
    sortable: true
  },
  minus: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
    sortable: true,
    defaultSortState: SORT_STATE_ASCEND
  },
  gk: {
    label: 'table.goalDiff.short',
    tooltip: 'table.goalDiff.tooltip',
    sortable: true
  },
  p: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    sortable: true,
    class: 'text-bold'
  }
};

export const COLUMNS_STANDINGS_P_2 = {
  index: {
    label: '#',
    class: 'text-left'
  },
  name: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    sortable: true,
    class: 'text-left w-auto text-bold'
  },
  m: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortable: true
  },
  p2: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
    sortable: true
  },
  p1: {
    label: 'table.draw.short',
    tooltip: 'table.draw.tooltip',
    sortable: true
  },
  p0: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
    sortable: true,
    defaultSortState: SORT_STATE_ASCEND
  },
  plus: {
    label: 'table.goalFor.short',
    tooltip: 'table.goalFor.tooltip',
    sortable: true
  },
  minus: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
    sortable: true,
    defaultSortState: SORT_STATE_ASCEND
  },
  gk: {
    label: 'table.goalDiff.short',
    tooltip: 'table.goalDiff.tooltip',
    sortable: true
  },
  p: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    sortable: true,
    class: 'text-bold'
  }
};

export const COLUMNS_FIELD_PLAYERS = {
  index: {
    label: '#',
    class: 'text-left'
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    sortable: true,
    class: 'text-left w-auto text-bold'
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    sortable: true,
    class: 'text-left w-auto'
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortable: true
  },
  g: {
    label: 'table.goals.short',
    tooltip: 'table.goals.tooltip',
    sortable: true
  },
  a: {
    label: 'table.assists.short',
    tooltip: 'table.assists.tooltip',
    sortable: true
  },
  point: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    sortable: true
  },
  plusMinus: {
    label: 'table.plusMinus.short',
    tooltip: 'table.plusMinus.tooltip',
    sortable: true
  },
  shoot: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    sortable: true
  },
  shootPercent: {
    label: 'table.sogPercent.short',
    tooltip: 'table.sogPercent.tooltip',
    sortable: true
  }
};

export const COLUMNS_FIELD_PLAYERS_PENALTY = {
  index: {
    label: 'table.blank',
    class: 'text-left'
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    sortable: true,
    class: 'text-left w-auto text-bold',
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }]
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    sortable: true,
    class: 'text-left w-auto',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }]
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortable: true,
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }]
  },
  p2: {
    label: 'table.minorPenalties.short',
    tooltip: 'table.minorPenalties.tooltip',
    sortable: true,
    sortOrders: [
      { target: 'p2', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND }
    ]
  },
  p5: {
    label: 'table.majorPenalties.short',
    tooltip: 'table.majorPenalties.tooltip',
    sortable: true,
    sortOrders: [
      { target: 'p5', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND }
    ]
  },
  p10: {
    label: 'table.misconducts.short',
    tooltip: 'table.misconducts.tooltip',
    sortable: true,
    sortOrders: [
      { target: 'p10', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND }
    ]
  },
  p20: {
    label: 'table.gameMisconducts.short',
    tooltip: 'table.gameMisconducts.tooltip',
    sortable: true,
    sortOrders: [
      { target: 'p20', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND }
    ]
  },
  p25: {
    label: 'table.matchPenalties.short',
    tooltip: 'table.matchPenalties.tooltip',
    sortable: true,
    sortOrders: [
      { target: 'p25', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND }
    ]
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
    sortable: true,
    sortOrders: [{ target: 'pim', direction: SORT_STATE_DESCEND }]
  }
};

export const COLUMNS_SCHEDULE = {
  name: {
    label: 'table.gameName.short',
    tooltip: 'table.gameName.tooltip',
    class: 'text-left text-light'
  },
  gameDateDate: {
    label: 'table.gameDate.short',
    tooltip: 'table.gameDate.tooltip',
    class: 'text-left'
  },
  gameDateTime: {
    label: 'table.gameDateTime.short',
    tooltip: 'table.gameDateTime.tooltip',
    class: 'text-left'
  },
  homeTeamName: {
    label: 'table.homeTeam.short',
    tooltip: 'table.homeTeam.tooltip',
    class: 'text-right w-auto text-bold'
  },
  gameResult: {
    label: '',
    class: 'text-bold text-dark'
  },
  gameStatus: {
    label: '',
    tooltip: ''
  },
  awayTeamName: {
    label: 'table.awayTeam.short',
    tooltip: 'table.awayTeam.tooltip',
    class: 'text-left w-auto text-bold'
  },
  location: {
    label: 'table.location.short',
    tooltip: 'table.location.tooltip',
    class: 'text-left'
  },
  broadcast: {
    label: 'table.broadcast.short',
    tooltip: 'table.broadcast.tooltip'
  },
  more: {
    label: ''
  }
};

export const COLUMNS_GOALIES = {
  index: {
    label: 'table.blank',
    class: 'text-left'
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'text-left w-auto text-bold',
    sortable: true,
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }]
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'text-left w-auto',
    sortable: true,
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }]
  },
  gkd: {
    label: 'table.gpgk.short',
    tooltip: 'table.gpgk.tooltip',
    sortable: true,
    sortOrders: [{ target: 'gkd', direction: SORT_STATE_DESCEND }]
  },
  gpi: {
    label: 'table.gpi.short',
    tooltip: 'table.gpi.tooltip',
    sortable: true,
    sortOrders: [{ target: 'gpi', direction: SORT_STATE_DESCEND }]
  },
  mip: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
    sortable: true,
    defaultSortState: SORT_STATE_DESCEND,
    sortOrders: [{ target: 'mipSec', direction: SORT_STATE_DESCEND }]
  },
  mipPercent: {
    label: 'table.toiPercent.short',
    tooltip: 'table.toiPercent.tooltip',
    sortable: true,
    sortOrders: [{ target: 'mipPercent', direction: SORT_STATE_DESCEND }]
  },
  ga: {
    label: 'table.ga.short',
    tooltip: 'table.ga.tooltip',
    sortable: true,
    sortOrders: [{ target: 'ga', direction: SORT_STATE_DESCEND }]
  },
  gaa: {
    label: 'table.gaa.short',
    tooltip: 'table.gaa.tooltip',
    sortable: true,
    sortOrders: [{ target: 'gaa', direction: SORT_STATE_DESCEND }]
  },
  sa: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
    sortable: true,
    sortOrders: [{ target: 'sa', direction: SORT_STATE_DESCEND }]
  },
  svs: {
    label: 'table.svs.short',
    tooltip: 'table.svs.tooltip',
    sortable: true,
    sortOrders: [{ target: 'svs', direction: SORT_STATE_DESCEND }]
  },
  svsPercent: {
    label: 'table.svsPercent.short',
    tooltip: 'table.svsPercent.tooltip',
    sortable: true,
    sortOrders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }]
  }
};
