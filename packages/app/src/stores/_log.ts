import { GetState, StoreApi } from 'zustand';
import { NamedSet } from 'zustand/middleware';

export const log =
  <S extends object>(
    config: (set: NamedSet<S>, get: GetState<S>, api: StoreApi<S>) => void,
  ) =>
  (set: NamedSet<S>, get: GetState<S>, api: StoreApi<S>) =>
    config(
      (args) => {
        // eslint-disable-next-line no-console
        console.log('  applying: ', args);
        set(args);
        // eslint-disable-next-line no-console
        console.log('  new state: ', get());
      },
      get,
      api,
    );
