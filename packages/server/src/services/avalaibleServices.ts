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
import { AvalaibleService } from '@asw-project/shared/generatedTypes';

import { AvalaibleServiceModel } from '../models/AvalaibleService';

export class AvalaibleServiceService extends BaseService<AvalaibleService> {
  constructor() {
    super(AvalaibleServiceModel);
  }
}

export interface AvalaibleServiceService
  extends FindById<AvalaibleService>,
    Create<AvalaibleService>,
    FindAll<AvalaibleService>,
    Remove<AvalaibleService>,
    Update<AvalaibleService> {}

applyMixins(AvalaibleServiceService, [
  SimpleFindById,
  Create,
  FindAll,
  ProtectedRemove,
  ProtectedUpdate,
]);
