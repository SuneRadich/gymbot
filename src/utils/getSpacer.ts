/**
 * arr {array} - The array to work on
 * prop {string} - The property to compare
 * offset {number} - optional: Offset to substract from the found length
 */
export const getSpacer = (arr: any[], prop: string, offset: number) => {
  const longest = arr.reduce(function (a, b) {
    return a[prop].length > b[prop].length ? a : b;
  });

  const labelLength = offset ? offset : 4; //The text Team
  let spacer = '';

  const spacerLength = longest[prop].length - labelLength;

  const spacerArray = new Array(spacerLength);

  [...spacerArray].forEach((char) => {
    spacer += ' ';
  });

  return spacer;
};
