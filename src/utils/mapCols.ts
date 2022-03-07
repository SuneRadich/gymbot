import { Cols } from '../interfaces/Cols';
import { Result } from '../interfaces/Result';

export const mapCols = (cols: Cols, row: Result) => {
  // Get the number of columns
  const len = Object.keys(cols).length;

  // prepare object to return
  const res: Result = {};

  // Loop over each column property
  for (let i = 0; i < len; i++) {
    const propName = Object.keys(cols)[i];
    const rowIndex = cols[propName];

    // and assign it the corresponding row value
    res[propName] = row[rowIndex];
  }
  return res;
};
