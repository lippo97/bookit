import * as Arrays from './arrays';

type BaseRange = {
  from: number;
  to: number;
};

type Ops = {
  map<T>(f: (n: number) => T): T[];
  flatMap<T>(f: (n: number) => T[]): T[];
};

export type Range = BaseRange & Ops;

export function make(
  from: number,
  to: number,
  exclusive: boolean = true,
): Range {
  const range = {
    from,
    to,
    map: <T>(f: (n: number) => T) => evaluate(range, exclusive).map(f),
    flatMap: <T>(f: (n: number) => T[]) =>
      range.map(f).reduce((acc, t) => [...acc, ...t]),
  };
  return range;
}

const evaluate = ({ from, to }: BaseRange, exclusive: boolean) =>
  Arrays.range(from, to, exclusive);

make(0, 10).map((x) => x + 1);
