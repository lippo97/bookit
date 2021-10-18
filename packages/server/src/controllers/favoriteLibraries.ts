import { Account } from '@asw-project/shared/generatedTypes';
import { NextFunction, Request, Response } from 'express';
import { isUserAccount } from '@asw-project/shared/types/account';
import { pick } from 'lodash';
import { FavoriteLibraryRequest } from '@asw-project/shared/generatedTypes/requests/favoriteLibraries/request';
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
  res: Response,
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
        Right: (favlib: any) => res.json(favlib),
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
  const { libraryId } = pick(req.body, 'libraryId') as any;

  if (account) {
    if (isUserAccount(account)) {
      const result = await favoriteLibrariesService.addFavoriteLibrary(
        getUserId(req.session),
        account,
        libraryId,
      );
      result.caseOf({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        Right: (favlib: any) => res.json(favlib),
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
        Right: (favlib: any) => res.json(favlib),
        Left: next,
      });
    } else res.sendStatus(405);
  } else {
    res.sendStatus(401);
  }
}
