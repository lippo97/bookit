import { Account } from '@asw-project/shared/generatedTypes';
import { NextFunction, Request, Response } from 'express';
import { isUserAccount } from '@asw-project/shared/types/account';
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

  if (account && isUserAccount(account)) {
    const result = await favoriteLibrariesService.getFavoriteLibraries(
      getUserId(req.session),
    );
    result.caseOf({
      // eslint-disable-next-line @typescript-eslint/no-shadow
      Right: (favlib: any) => res.json(favlib),
      Left: next,
    });
  } else {
    next();
  }
}
