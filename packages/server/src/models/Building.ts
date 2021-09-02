import { BuildingSchema as BuildingJoiSchema } from '@asw-project/shared/data/building';
import { Building } from '@asw-project/shared/generatedTypes/building';
import { Resource } from '@asw-project/resources';
import mongoose, { Document } from 'mongoose';

export const [BuildingSchema, buildingKeys] =
  Resource.getSchemaFromJoi<Building>(BuildingJoiSchema);

BuildingSchema.index({ name: 'text', city: 'text' });

export const BuildingModel = mongoose.model<Building & Document<any, any, any>>(
  'Building',
  BuildingSchema,
);
