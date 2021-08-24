import { BuildingSchema as BuildingJoiSchema } from '@asw-project/shared/data/building';
import { Building } from '@asw-project/shared/generatedTypes/building';
import { Resource } from '@asw-project/resources';

export const [BuildingModel, BuildingSchema, buildingKeys] =
  Resource.fromJoi<Building>(BuildingJoiSchema);
