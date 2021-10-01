import { UnexpectedError } from '@asw-project/shared/errors';
import { Account } from '@asw-project/shared/generatedTypes';

export type AccountCreationOrUpdateSuccess = Account;

export type AccountCreationOrUpdateFail = UnexpectedError;