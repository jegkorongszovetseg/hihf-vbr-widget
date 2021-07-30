import { keys } from 'ramda';
import { i18n } from '../../localization';
import { SORT_STATE_ASCEND } from '../../constatnts';

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
  p2: {
    label: 'table.goals.short',
    tooltip: 'table.goals.tooltip',
    sortable: true
  },
  p5: {
    label: 'table.assists.short',
    tooltip: 'table.assists.tooltip',
    sortable: true
  },
  p10: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    sortable: true
  },
  p20: {
    label: 'table.plusMinus.short',
    tooltip: 'table.plusMinus.tooltip',
    sortable: true
  },
  p25: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    sortable: true
  },
  pim: {
    label: 'table.sogPercent.short',
    tooltip: 'table.sogPercent.tooltip',
    sortable: true
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
