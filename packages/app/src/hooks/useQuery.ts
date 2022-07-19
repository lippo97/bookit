import { useLocation } from 'react-router-dom';

export function useQueryParams(key: string, _default: string): string {
  return new URLSearchParams(useLocation().search).get(key) || _default;
}

type Some<A> = {
  success: true;
  value: A;
};

type None = {
  success: false;
};
type Option<A> = Some<A> | None;

export const some = <A>(a: A): Some<A> => ({
  success: true,
  value: a,
});

export const none: None = {
  success: false,
} as const;

export function useQueryParam(key: string): Option<string> {
  const value = new URLSearchParams(useLocation().search).get(key);
  if (value !== null) {
    return {
      success: true,
      value,
    };
  }
  return { success: false };
}

export const safeMap = <A, B>(f: (a: A) => B, oa: Option<A>): Option<B> => {
  if (oa.success) {
    let result: Option<B> = { success: false } as const;
    try {
      result = { success: true, value: f(oa.value) };
    } catch (err) {
      console.error(err);
    }
    return result;
  }
  return oa;
};

export const every2 = <A, B>(os: [Option<A>, Option<B>]): Option<[A, B]> =>
  os.every((x) => x.success)
    ? some(os.map((x) => (x as Some<any>).value) as [A, B])
    : none;

export const every3 = <A, B, C>(
  os: [Option<A>, Option<B>, Option<C>],
): Option<[A, B, C]> =>
  os.every((x) => x.success)
    ? some(os.map((x) => (x as Some<any>).value) as [A, B, C])
    : none;

export const every4 = <A, B, C, D>(
  os: [Option<A>, Option<B>, Option<C>, Option<D>],
): Option<[A, B, C, D]> =>
  os.every((x) => x.success)
    ? some(os.map((x) => (x as Some<any>).value) as [A, B, C, D])
    : none;

export const every5 = <A, B, C, D, E>(
  os: [Option<A>, Option<B>, Option<C>, Option<D>, Option<E>],
): Option<[A, B, C, D, E]> =>
  os.every((x) => x.success)
    ? some(os.map((x) => (x as Some<any>).value) as [A, B, C, D, E])
    : none;

export const every6 = <A, B, C, D, E, F>(
  os: [Option<A>, Option<B>, Option<C>, Option<D>, Option<E>, Option<F>],
): Option<[A, B, C, D, E, F]> =>
  os.every((x) => x.success)
    ? some(os.map((x) => (x as Some<any>).value) as [A, B, C, D, E, F])
    : none;

export const every7 = <A, B, C, D, E, F, G>(
  os: [
    Option<A>,
    Option<B>,
    Option<C>,
    Option<D>,
    Option<E>,
    Option<F>,
    Option<G>,
  ],
): Option<[A, B, C, D, E, F, G]> =>
  os.every((x) => x.success)
    ? some(os.map((x) => (x as Some<any>).value) as [A, B, C, D, E, F, G])
    : none;

export const flatMap =
  <A, B>(oa: Option<A>) =>
  (f: (a: A) => Option<B>): Option<B> => {
    if (oa.success) {
      return f(oa.value);
    }
    return oa;
  };

export const map2 =
  <A, B>(oa: Option<A>, ob: Option<B>) =>
  <C>(f: (a: A, b: B) => C): Option<C> => {
    if (oa.success && ob.success) {
      return some(f(oa.value, ob.value));
    }
    return none;
  };
