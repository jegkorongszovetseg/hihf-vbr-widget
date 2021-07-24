import { SORT_STATE_ASCEND, SORT_STATE_ORIGINAL } from '../constatnts';

const convert = (data = []) => {
  return {
    result: [...data],

    value() {
      return this.result;
    },

    sorted(sort) {
      if (!sort || sort.sortState === SORT_STATE_ORIGINAL) return this;
      const sortTarget = sort.sortTarget;
      const order = sort.sortState === SORT_STATE_ASCEND ? 1 : -1;
      this.result = this.result.slice().sort(function(a, b) {
        a = a[sortTarget];
        b = b[sortTarget];
        return (a === b ? 0 : a > b ? 1 : -1) * order;
      });
      return this;
    },

    addIndex(target = null) {
      this.result.reduce((rows, row, index) => {
        const lastRow = rows[rows.length - 1] || [];
        const isSameRow = target && lastRow[target] === row[target];
        row.index = isSameRow ? lastRow.index : index + 1;
        row.indexClass = isSameRow ? 'is-duplicated' : null;
        rows.push(row);
        return rows;
      }, []);
      return this;
    },

    addContinuousIndex() {
      this.result = this.result.map((row, index) => ({
        ...row,
        index: index + 1
      }));
      return this;
    },

    pagination(page, limit) {
      page = Number(page);
      limit = Number(limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      this.result = this.result.slice(startIndex, endIndex);
      return this;
    },

    playerName() {
      this.result = this.result.map(row => ({
        ...row,
        name: `${row.lastName} ${row.firstName}`
      }));
      return this;
    }
  };
};

export default convert;
