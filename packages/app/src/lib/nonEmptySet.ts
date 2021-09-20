export type Set<T> = ReadonlyArray<T>;

export type NonEmptySet<T> = Readonly<[T, ...Set<T>]>;

export function isNonEmptySet<T>(set: Set<T>): set is NonEmptySet<T> {
  return set.length !== 0;
}

export const empty: Set<never> = [];

export const has =
  <T>(elem: T) =>
  (set: Set<T>): boolean =>
    set.includes(elem);

const unsafeAdd = <T>(elem: T, set: Set<T>): NonEmptySet<T> => [elem, ...set];

export const add =
  <T>(elem: T) =>
  (set: Set<T>): NonEmptySet<T> =>
    has(elem)(set) ? (set as NonEmptySet<T>) : unsafeAdd(elem, set);

const equals =
  <T>(t: T) =>
  (s: T) =>
    t === s;

export const remove =
  <T>(elem: T) =>
  (set: Set<T>): Set<T> =>
    has(elem)(set) ? set.filter(equals(elem)) : set;
