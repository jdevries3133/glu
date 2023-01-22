/**
 * Titleify a string
 */
export const title = (s: string) => {
  if (s.includes(" ")) {
    return s
      .split(" ")
      .map((subs) => title(subs))
      .join(" ");
  }

  return s.slice(0, 1).toUpperCase() + s.slice(1);
};
