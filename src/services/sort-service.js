import { createMachine } from 'xstate';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND, SORT_STATE_ORIGINAL } from '../constatnts';

export function SortService(initialSortObject) {
  this.defaultSort = {
    sortTarget: null,
    orders: []
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

const transitionOrderState = (originalSortState, sortState) => {
  const direction = sortState === SORT_STATE_ASCEND ? 'DIRECTION2' : 'DIRECTION1';
  return sortMachine.transition(originalSortState, direction).value;
};

SortService.prototype = {
  set: function(target, orders) {
    if (this.sort.sortTarget !== target) {
      this.sort.sortTarget = target;
      this.sort.orders = orders;
      return this;
    }

    const nextOrders = orders.map((order, index) => ({
      ...order,
      direction: transitionOrderState(this.sort.orders[index].direction, order.direction)
    }));

    this.sort = {
      sortTarget: target,
      orders: nextOrders
    };
    return this;
  },

  get: function() {
    return this.sort;
  }
};
