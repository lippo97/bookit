import { AvailableServiceSchema as AvailableServiceJoiSchema } from '@asw-project/shared/data/availableService';
import { AvailableService } from '@asw-project/shared/generatedTypes/availableService';
import { Resource } from '@asw-project/resources';

export const [
  AvailableServiceModel,
  AvailableServiceSchema,
  availableServiceKeys,
] = Resource.getModelFromJoi<AvailableService>(AvailableServiceJoiSchema);
