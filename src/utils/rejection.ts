/**
 * Generic promise rejection catcher. We can do something fancier here later,
 * like call out to a logging service, redirect client-side users, etc.
 */
export const rejection = <T>(p: Promise<T>) => {
  p.catch((e) => console.error(e));
};
