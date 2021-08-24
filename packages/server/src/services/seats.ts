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
import { Seat } from '@asw-project/shared/generatedTypes/seat';
import { SeatModel } from '../models/Seat';

export class SeatService extends BaseService<Seat> {
  constructor() {
    super(SeatModel);
  }
}

export interface SeatService
  extends FindById<Seat>,
    Create<Seat>,
    FindAll<Seat>,
    Remove<Seat>,
    Update<Seat> {}

applyMixins(SeatService, [
  SimpleFindById,
  Create,
  FindAll,
  ProtectedRemove,
  ProtectedUpdate,
]);
