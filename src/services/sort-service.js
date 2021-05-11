import { createMachine } from 'xstate';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND, SORT_STATE_ORIGINAL } from '../constatnts';

export function SortService(initialSortObject) {
  this.defaultSort = {
    sortTarget: null,
    sortState: SORT_STATE_ORIGINAL
  };

  this.sort = initialSortObject ? initialSortObject : this.defaultSort;
}

const sortMachine = createMachine({
  id: 'sort',
  initial: SORT_STATE_ORIGINAL,
  states: {
    [SORT_STATE_ORIGINAL]: {
      on: {
        DIRECTION1: SORT_STATE_DESCEND,
        DIRECTION2: SORT_STATE_ASCEND
      }
    },
    [SORT_STATE_DESCEND]: {
      on: {
        DIRECTION1: SORT_STATE_ASCEND,
        DIRECTION2: SORT_STATE_ORIGINAL
      }
    },
    [SORT_STATE_ASCEND]: {
      on: {
        DIRECTION1: SORT_STATE_ORIGINAL,
        DIRECTION2: SORT_STATE_DESCEND
      }
    }
  }
});

SortService.prototype = {
  set: function(target, initialState) {
    if (this.sort.sortTarget !== target) {
      this.sort.sortTarget = target;
      this.sort.sortState = initialState || SORT_STATE_DESCEND;
      return this;
    }

    const direction = initialState === SORT_STATE_ASCEND ? 'DIRECTION2' : 'DIRECTION1';
    const sortState = sortMachine.transition(this.sort.sortState, direction).value;

    this.sort = {
      sortTarget: target,
      sortState
    };
    return this;
  },

  get: function() {
    return this.sort;
  }
};
