/** Accepts a number, and returns the number as a string, padded with a space, if the number is below 10 */
export const padValue = (val: number): string => {
  return val < 10 ? ` ${val}` : `${val}`;
};
