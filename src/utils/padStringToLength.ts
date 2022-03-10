/**
 * Pad a string with spaces, to give it a certain length
 */
export const padStringToLength = (
  text: string,
  stringLength: number,
  asSuffix = false
): string => {
  const padding = Array(stringLength - text.length);

  let spacer = '';

  [...padding].forEach(() => {
    spacer += ' ';
  });

  if (asSuffix) {
    return text + spacer;
  } else {
    return spacer + text;
  }
};
