import zipWith from 'lodash/zipWith';

export type Vector2 = readonly [number, number];

type BinaryOp<T> = (v: T, w: T) => T;

export function make(x: number, y: number): Vector2 {
  return [x, y];
}

export function offsetFromDOMRect({ x, y }: DOMRect): Vector2 {
  return make(x, y);
}

function operationByPair<T extends readonly number[]>(
  v: T,
  w: T,
  op: BinaryOp<number>,
): T {
  return zipWith(v, w, op) as unknown as T;
}

export function sum(v: Vector2, w: Vector2): Vector2 {
  return operationByPair(v, w, (x, y) => x + y);
}

export function sub(v: Vector2, w: Vector2): Vector2 {
  return operationByPair(v, w, (x, y) => x - y);
}

function operationByScalar(
  v: Vector2,
  a: number,
  op: BinaryOp<number>,
): Vector2 {
  const curriedOp = (a: number) => (b: number) => op(b, a);
  return v.map(curriedOp(a)) as unknown as Vector2;
}

export function mul(v: Vector2, a: number): Vector2 {
  return operationByScalar(v, a, (x) => x * a);
}

export function div(v: Vector2, a: number): Vector2 {
  return operationByScalar(v, a, (x) => x / a);
}

export function equals([vX, vY]: Vector2, [wX, wY]: Vector2): boolean {
  return vX === wX && vY === wY;
}
