import { AvalaibleServiceSchema as AvalaibleServiceJoiSchema } from '@asw-project/shared/data/avalaibleService';
import { AvalaibleService } from '@asw-project/shared/generatedTypes/avalaibleService';
import { Resource } from '@asw-project/resources';

export const [
  AvalaibleServiceModel,
  AvalaibleServiceSchema,
  avalaibleServiceKeys,
] = Resource.fromJoi<AvalaibleService>(AvalaibleServiceJoiSchema);
