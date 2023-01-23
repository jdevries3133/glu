export function invariant(c: any, msg?: string): asserts c {
  if (!c) {
    throw new Error(msg ?? 'invariant failed');
  }
}
