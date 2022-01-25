import {
  applyMixins,
  BaseService,
  Create,
  FindAll,
  SimpleFindById,
  ProtectedRemove,
  Update,
  ProtectedUpdate,
  Remove,
} from '@asw-project/resources/routes';
import { FindById } from '@asw-project/resources/routes/operations/FindById';
import { Position } from '@asw-project/shared/generatedTypes';

// import { PositionModel } from '../models/Position';

// export class PositionService extends BaseService<Position> {
//   constructor() {
//     super(PositionModel);
//   }
// }

// export interface PositionService
//   extends FindById<Position>,
//     Create<Position>,
//     FindAll<Position>,
//     Remove<Position>,
//     Update<Position> {}

// applyMixins(PositionService, [
//   SimpleFindById,
//   Create,
//   FindAll,
//   ProtectedRemove,
//   ProtectedUpdate,
// ]);
