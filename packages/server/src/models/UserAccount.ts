import { UserAccountSchema as UserAccountJoiSchema } from '@asw-project/shared/src/data/userAccount';
import { UserAccount } from '@asw-project/shared/generatedTypes/userAccount';
import { Resource } from '@asw-project/resources';

export const [UserAccountModel, UserAccountSchema, userAccountKeys] =
  Resource.getModelFromJoi<UserAccount>(UserAccountJoiSchema);
