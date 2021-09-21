import { IS_DEVELOPMENT } from '@/config';
import { loginWithEmailAndPassword, logout } from '@/features/auth';
import { LoginRequest } from '@asw-project/shared/generatedTypes/authentication/login/request';
import { ReturnedUser } from '@asw-project/shared/src/types/returnedUser';
import flow from 'lodash/fp/flow';
import identity from 'lodash/fp/identity';
import create from 'zustand';
import {
  devtools,
  NamedSet,
  persist as createPersist,
} from 'zustand/middleware';
import { log } from './_log';

export type Authentication = ReturnedUser | null;

type AuthState = {
  auth: Authentication;
  loginWithEmailAndPassword: (dto: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
};

const authState: (set: NamedSet<AuthState>) => AuthState = (set) => ({
  auth: null,
  loginWithEmailAndPassword: async (dto: LoginRequest) => {
    const auth = await loginWithEmailAndPassword(dto);
    set((state) => ({ ...state, auth }));
  },
  logout: async () => {
    logout().finally(() =>
      set((state) => ({
        ...state,
        auth: null,
      })),
    );
  },
});

const persist = (as: typeof authState) =>
  createPersist(as, {
    name: 'auth-storage',
  });

const middlewares = flow(
  // Use devtools and log only in development builds
  IS_DEVELOPMENT ? devtools : identity,
  IS_DEVELOPMENT ? log : identity,
  persist,
);

export const useAuth = create<AuthState>(middlewares(authState));

export const useIsLoggedIn = () => useAuth((s) => s.auth !== null);
