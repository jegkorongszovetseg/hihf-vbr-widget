import { SORT_STATE_ASCEND } from '../../constatnts';

export const COLUMNS_STANDINGS_P_3 = {
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