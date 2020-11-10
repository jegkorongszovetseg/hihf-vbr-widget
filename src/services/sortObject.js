const sortObject = {
  // return {
  columns: {},
  target: null,
  sortArray: [],

  sort: {
    sortTarget: null,
    sortReverse: null
  },

  setColumns(columns) {
    this.columns = columns;
    return this;
  },

  set(target) {
    console.log('columns:', this.columns);
    this.target = target;
    this.sortArray = this.setReverseArray(target);

    const sortReverse = this.setSortReverse(target);
    this.sort = {
      sortTarget: sortReverse === null ? null : target,
      sortReverse
    };
    return this;
  },

  get() {
    return this.sort;
  },

  setSortReverse(column) {
    const isNewSort = this.target !== column;
    if (isNewSort) {
      const defaultSort = this.columns[column].defaultSort;
      return defaultSort === undefined ? true : defaultSort;
    }
    const pos = this.sortArray.indexOf(this.sort.sortReverse);
    let next = pos + 1;
    if (next > 2) next = 0;
    return this.sortArray.reverse[next];
  },

  setReverseArray(column) {
    console.log(this.columns);
    const defaultSort = this.columns[column].defaultSort === undefined ? true : this.columns[column].defaultSort;
    if (defaultSort) {
      return [true, false, null];
    } else {
      return [false, true, null];
    }
  }
  // };
};

export default sortObject;
