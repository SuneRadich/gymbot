export const padStringToLength = (
  text: string,
  stringLength: number
): string => {
  const padding = Array(stringLength - text.length);

  let spacer = '';

  [...padding].forEach(() => {
    spacer += ' ';
  });

  return spacer + text;
};
