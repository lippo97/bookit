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
import { Building } from '@asw-project/shared/generatedTypes';

import { BuildingModel } from '../models/Building';

export class BuildingService extends BaseService<Building> {
  constructor() {
    super(BuildingModel);
  }
}

export interface BuildingService
  extends FindById<Building>,
    Create<Building>,
    FindAll<Building>,
    Remove<Building>,
    Update<Building> {}

applyMixins(BuildingService, [
  SimpleFindById,
  Create,
  FindAll,
  ProtectedRemove,
  ProtectedUpdate,
]);
