import {devtools} from 'zustand/middleware';

export const myDevtools =
  (a: Parameters<typeof devtools>[1]) => (fn: Parameters<typeof devtools>[0]) =>
    devtools(fn, a);
