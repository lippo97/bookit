export type Tuple<A, B> = [A, B];

export const fst = <A>([a]: Tuple<A, any>) => a;

export const snd = <B>([_, b]: Tuple<any, B>) => b;
