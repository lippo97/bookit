// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    email: string;
    account?: Account;
    favoriteLibraries?: string[];
  }
}
