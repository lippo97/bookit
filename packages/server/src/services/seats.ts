import {
  applyMixins,
  BaseService,
  CreateMany,
  FindAll,
  SimpleFindById,
  ProtectedUpdateMany,
  ProtectedRemoveMany,
  RemoveMany,
} from '@asw-project/resources/routes';
import { FindById } from '@asw-project/resources/routes/operations/FindById';
import { UpdateMany } from '@asw-project/resources/routes/operations/UpdateMany';
import { Seat } from '@asw-project/shared/generatedTypes/seat';
import { SeatModel } from '../models/Seat';

export class SeatService extends BaseService<Seat> {
  constructor() {
    super(SeatModel);
  }
}

export interface SeatService
  extends FindById<Seat>,
    CreateMany<Seat>,
    FindAll<Seat>,
    RemoveMany<Seat>,
    UpdateMany<Seat> {}

applyMixins(SeatService, [
  SimpleFindById,
  CreateMany,
  FindAll,
  ProtectedRemoveMany,
  ProtectedUpdateMany,
]);
