const convert = (data = []) => {
  return {
    result: [...data],

    value() {
      return this.result;
    },

    sorted(sort) {
      const sortTarget = sort.sortTarget;
      const order = sort.sortReverse ? -1 : 1;
      this.result = this.result.sort(function(a, b) {
        a = a[sortTarget];
        b = b[sortTarget];
        return (a === b ? 0 : a > b ? 1 : -1) * order;
      });
      return this;
    },

    addIndex(target = null) {
      this.result.reduce((rows, row, index) => {
        const lastRow = rows[rows.length - 1] || [];
        row.index = target && lastRow[target] === row[target] ? lastRow.index : index + 1;
        rows.push(row);
        return rows;
      }, []);
      return this;
    },

    pagination(page, limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      this.result = this.result.slice(startIndex, endIndex);
      return this;
    }
  };
};

export default convert;
