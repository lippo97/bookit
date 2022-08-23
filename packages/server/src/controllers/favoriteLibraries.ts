import {
  Account,
  FavoriteLibrariesInfo,
  Library,
} from '@asw-project/shared/generatedTypes';
import { NextFunction, Request, Response } from 'express';
import { isUserAccount } from '@asw-project/shared/types/account';
import { pick } from 'lodash';
import { FavoriteLibraryRequest } from '@asw-project/shared/generatedTypes/requests/favoriteLibraries/request';
import { WithId } from '@asw-project/shared/data/withId';
import * as favoriteLibrariesService from '../services/favoriteLibraries';

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

function getAccount(session: any): Account | undefined {
  if (session.userId !== undefined) {
    return session.account;
  }
  return undefined;
}

export async function getFavoriteLibraries(
  req: Request<any, any, any>,
  res: Response<WithId<Library>[]>,
  next: NextFunction,
): Promise<void> {
  const account = getAccount(req.session);

  if (account) {
    if (isUserAccount(account)) {
      const { limit, skip } = req.query;
      const result = await favoriteLibrariesService.getFavoriteLibraries(
        getUserId(req.session),
        account,
        {
          limit: limit ? parseInt(limit as string, 10) : undefined,
          skip: skip ? parseInt(skip as string, 10) : undefined,
        },
      );
      result.caseOf({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Right: (favlib) => res.json(favlib),
        Left: next,
      });
    } else res.sendStatus(405);
  } else {
    res.sendStatus(401);
  }
}

export async function getFavoriteLibrariesInfo(
  req: Request<any, any, any>,
  res: Response<FavoriteLibrariesInfo[]>,
  next: NextFunction,
): Promise<void> {
  const account = getAccount(req.session);

  if (account) {
    if (isUserAccount(account)) {
      const result = await favoriteLibrariesService.getFavoriteLibrariesInfo(
        getUserId(req.session),
        account,
      );
      result.caseOf({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Right: (favlib) =>
          // eslint-disable-next-line no-underscore-dangle
          res.json(favlib),
        Left: next,
      });
    } else res.sendStatus(405);
  } else {
    res.sendStatus(401);
  }
}

export async function addFavoriteLibrary(
  req: Request<any, any, string>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const account = getAccount(req.session);
  const { libraryId, name } = pick(req.body, 'libraryId', 'name') as any;

  if (account) {
    if (isUserAccount(account)) {
      const result = await favoriteLibrariesService.addFavoriteLibrary(
        getUserId(req.session),
        account,
        libraryId,
        name,
      );
      result.caseOf({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Right: (favlib) => {
          req.session.favoriteLibraries = favlib;
          res.json(favlib);
        },
        Left: next,
      });
    } else res.sendStatus(405);
  } else {
    res.sendStatus(401);
  }
}

export async function deleteFavoriteLibrary(
  req: Request<FavoriteLibraryRequest, any, any>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const account = getAccount(req.session);
  const { libraryId } = req.params;

  if (account) {
    if (isUserAccount(account)) {
      const result = await favoriteLibrariesService.deleteFavoriteLibrary(
        getUserId(req.session),
        account,
        libraryId,
      );
      result.caseOf({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Right: (favlib) => {
          req.session.favoriteLibraries = favlib;
          res.json(favlib);
        },
        Left: next,
      });
    } else res.sendStatus(405);
  } else {
    res.sendStatus(401);
  }
}
