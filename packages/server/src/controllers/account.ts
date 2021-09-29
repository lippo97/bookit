import { NextFunction, Request, Response } from 'express';
import { Account } from '@asw-project/shared/src/data/requests/accountCreation/request';
import * as accountService from '../services/account';

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}
export async function create(
  req: Request<any, any, Account>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const userId = getUserId(req.session);
  const account = req.body;
  const result = await accountService.createAccount(userId, account);
  result.caseOf({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    Right: () => res.json(account),
    Left: next,
  });
}
