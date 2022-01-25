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
import { Service } from '@asw-project/shared/generatedTypes';

// import { ServiceModel } from '../models/AvailableService';

// export class AvailableServiceService extends BaseService<AvailableService> {
//   constructor() {
//     super(AvailableServiceModel);
//   }
// }

// export interface AvailableServiceService
//   extends FindById<AvailableService>,
//     Create<AvailableService>,
//     FindAll<AvailableService>,
//     Remove<AvailableService>,
//     Update<AvailableService> {}

// applyMixins(AvailableServiceService, [
//   SimpleFindById,
//   Create,
//   FindAll,
//   ProtectedRemove,
//   ProtectedUpdate,
// ]);
