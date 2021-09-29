import { ManagerAccountSchema as ManagerAccountJoiSchema } from '@asw-project/shared/data/managerAccount';
import { ManagerAccount } from '@asw-project/shared/generatedTypes/managerAccount';
import { Resource } from '@asw-project/resources';

export const [ManagerAccountModel, ManagerAccountSchema, managerAccountKeys] =
  Resource.getModelFromJoi<ManagerAccount>(ManagerAccountJoiSchema);
