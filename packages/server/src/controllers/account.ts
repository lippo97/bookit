import { NextFunction, Request, Response } from 'express';
import {
  UserAccountRequest,
  ManagerAccountRequest,
} from '@asw-project/shared/generatedTypes/requests/accountCreation/request';
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
async function operationOnAccount(
  req: Request<any, any, UserAccountRequest | ManagerAccountRequest>,
  res: Response,
  next: NextFunction,
  accountOp: (
    req: Request<any, any, UserAccountRequest | ManagerAccountRequest>,
  ) => any,
): Promise<void> {
  const userId = getUserId(req.session);

  const account = accountOp(req);

  const result = await accountService.updateAccount(userId, account);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: (account) => {
      req.session.account = account;
      res.json(account);
    },
    Left: next,
  });
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

export async function updateUserAccount(
  req: Request<any, any, UserAccountRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  operationOnAccount(req, res, next, (r) => {
    const email = getEmail(r.session);
    return pick(
      { ...r.body, email, type: accountTypes.user },
      userAccountKeys,
    ) as any;
  });
}

export async function updateManagerAccount(
  req: Request<any, any, ManagerAccountRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  operationOnAccount(req, res, next, (r) => {
    const email = getEmail(r.session);
    return pick(
      { ...r.body, email, type: accountTypes.manager },
      managerAccountKeys,
    ) as any;
  });
}
