export function SortService(columns, preSortObject) {
  this.columns = columns || {};
  this.target = null;
  this.sortArray = null;

  this.defaultSort = {
    sortTarget: null,
    sortReverse: null
  };

  this.sort = preSortObject ? preSortObject : this.defaultSort;
}

SortService.prototype = {
  setColumn: function(columns) {
    this.columns = columns;
  },
  set: function(target) {
    this.sortArray = this.setReverseArray(target);
    const sortReverse = this.setSortReverse(target);

    this.sort = {
      sortTarget: sortReverse === null ? null : target,
      sortReverse
    };
    return this;
  },

  get: function() {
    return this.sort;
  },

  setSortReverse: function(column) {
    const isNewSort = this.target !== column;
    if (isNewSort) {
      this.target = column;
      const defaultSort = this.columns[column].defaultSort;
      return defaultSort === undefined ? true : defaultSort;
    }
    const pos = this.sortArray.indexOf(this.sort.sortReverse);
    let next = pos + 1;
    if (next > 2) next = 0;
    return this.sortArray[next];
  },

  setReverseArray: function(column) {
    const defaultSort = this.columns[column].defaultSort === undefined ? true : this.columns[column].defaultSort;
    if (defaultSort) {
      return [true, false, null];
    } else {
      return [false, true, null];
    }
  }
};
