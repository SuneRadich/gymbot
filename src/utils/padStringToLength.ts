/**
 * Pad a string with spaces, to give it a certain length
 */
export const padStringToLength = (
  text: string,
  stringLength: number,
  asPrefix = true
): string => {
  const padding = Array(stringLength - text.length);

  let spacer = '';

  [...padding].forEach(() => {
    spacer += ' ';
  });

  if (asPrefix) {
    return spacer + text;
  } else {
    return text + spacer;
  }
};
