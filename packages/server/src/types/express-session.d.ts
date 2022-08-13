// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FavoriteLibrariesInfo } from '@asw-project/shared/generatedTypes';
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    email: string;
    account?: Account;
    favoriteLibraries?: FavoriteLibrariesInfo[];
  }
}
