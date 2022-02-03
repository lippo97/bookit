import {
  applyMixins,
  Create,
  ProtectedRemove,
  Remove,
  BaseService,
  ProtectedFindById,
} from '@asw-project/resources/routes';
import { FindById } from '@asw-project/resources/routes/operations/FindById';

import { Reservation } from '@asw-project/shared/generatedTypes/reservation';
import { ReservationModel } from '../models/Reservation';

export class ReservationService extends BaseService<Reservation> {
  constructor() {
    super(ReservationModel);
  }
}

export interface ReservationService
  extends FindById<Reservation>,
    Create<Reservation>,
    Remove<Reservation> {}

applyMixins(ReservationService, [ProtectedFindById, Create, ProtectedRemove]);
