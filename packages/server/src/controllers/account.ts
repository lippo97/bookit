import { NextFunction, Request, Response } from 'express';
import {
  UserAccountRequest,
  ManagerAccountRequest,
} from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
import { isManagerAccount } from '@asw-project/shared/types/account';
import { pick } from 'lodash';
import { accountTypes } from '@asw-project/shared/types/accountTypes';
import * as accountService from '../services/account';
import { managerAccountKeys } from '../models/ManagerAccount';
import { userAccountKeys } from '../models/UserAccount';

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

function getEmail(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.email;
  }
  return undefined;
}

export async function getAccount(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId = getUserId(req.session);
  const result = await accountService.getAccount(userId);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: (account) => res.json(account),
    Left: next,
  });
}

export async function createUserAccount(
  req: Request<any, any, UserAccountRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId = getUserId(req.session);

  const email = getEmail(req.session);

  const account = pick(
    { ...req.body, email, type: accountTypes.user },
    userAccountKeys,
  ) as any;

  const result = await accountService.createAccount(userId, account);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: (account) => res.json(account),
    Left: next,
  });
}

export async function createManagerAccount(
  req: Request<any, any, ManagerAccountRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId = getUserId(req.session);

  const email = getEmail(req.session);

  const account = pick(
    { ...req.body, email, type: accountTypes.manager },
    managerAccountKeys,
  ) as any;

  const result = await accountService.createAccount(userId, account);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: (account) => res.json(account),
    Left: next,
  });
}

export const updateUserAccount = createUserAccount;

export const updateManagerAccount = createManagerAccount;
