// eslint-disable-next-line import/prefer-default-export
export function unreachableCode(): never {
  throw new Error("You shouldn't reach this code.");
}

export const compose =
  <A, B, C>(ab: (a: A) => B, bc: (b: B) => C) =>
  (a: A) =>
    bc(ab(a));

export const composeC =
  <A, B>(ab: (a: A) => B) =>
  <C>(bc: (b: B) => C) =>
    compose(ab, bc);
