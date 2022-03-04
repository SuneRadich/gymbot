/** Removes all whitespace on a team name */
export const trimTeamName = (name: string) => {
  return name ? name.trim() : '';
};
