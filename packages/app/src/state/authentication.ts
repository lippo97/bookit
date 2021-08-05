import { atom } from 'jotai';
import { ReturnedUser } from '@asw-project/shared/src/data/authentication/returnedUser';

export type Authentication = ReturnedUser | null;

const AUTHENTICATION_KEY = 'email';

const user = localStorage.getItem(AUTHENTICATION_KEY);
const initialBase = user !== null ? (JSON.parse(user) as ReturnedUser) : null;

const base = atom<Authentication>(initialBase);

export const authentication = atom(
  (get) => get(base),
  (get, set, update) => {
    const nextValue = typeof update === 'function' ? update(get(base)) : update;
    set(base, nextValue);
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(nextValue));
  },
);
