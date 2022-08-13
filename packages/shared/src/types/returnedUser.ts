import {
  Account,
  FavoriteLibrariesInfo,
} from '@asw-project/shared/generatedTypes/authentication';

export type ReturnedUser = {
  userId: any;
  email: string;
  account?: Account;
  favoriteLibrariesInfo: FavoriteLibrariesInfo[];
};
