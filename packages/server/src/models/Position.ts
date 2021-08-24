import { PositionSchema as PositionJoiSchema } from '@asw-project/shared/data/position';
import { Position } from '@asw-project/shared/generatedTypes/position';
import { Resource } from '@asw-project/resources';

export const [PositionModel, PositionSchema, positionKeys] =
  Resource.fromJoi<Position>(PositionJoiSchema);
