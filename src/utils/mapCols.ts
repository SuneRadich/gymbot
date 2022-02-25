interface Cols {
  [key: string]: number;
}

interface Result {
  [key: string]: string;
}

export const mapCols = (cols: Cols, row: string[]) => {
  // Get the number of columns
  const len = Object.keys(cols).length;

  // prepare object to return
  let res: Result = {};

  // Loop over each column property
  for (let i = 0; i < len; i++) {
    const propName = Object.keys(cols)[i];
    const rowIndex = cols[propName];

    // and assign it the corresponding row value
    res[propName] = row[rowIndex];
  }
  return res;
};
