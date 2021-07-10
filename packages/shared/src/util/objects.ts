/* eslint-disable import/prefer-default-export */

/*
 * Stolen from here.
 * Very useful when chaining list-like methods.
 * https://stackoverflow.com/questions/47232518/write-a-typesafe-pick-function-in-typescript#answer-47232883
 */
export const pick =
  <T extends object, K extends keyof T>(...keys: K[]) =>
  (t: T): Pick<T, K> => {
    const ret: any = {};
    keys.forEach((k) => {
      ret[k] = t[k];
    });
    return ret;
  };
