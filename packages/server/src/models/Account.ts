import { AccountSchema as AccountJoiSchema } from '@asw-project/shared/src/data/account';
import { Account } from '@asw-project/shared/generatedTypes/account';
import { Resource } from '@asw-project/resources';

export const [AccountModel, AccountSchema, accountKeys] =
  Resource.getModelFromJoi<Account>(AccountJoiSchema);
