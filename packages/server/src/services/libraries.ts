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
import { Library } from '@asw-project/shared/generatedTypes';

import { LibraryModel } from '../models/Library';

export class LibraryService extends BaseService<Library> {
  constructor() {
    super(LibraryModel);
  }
}

export interface LibraryService
  extends FindById<Library>,
    Create<Library>,
    FindAll<Library>,
    Remove<Library>,
    Update<Library> {}

applyMixins(LibraryService, [
  SimpleFindById,
  Create,
  FindAll,
  ProtectedRemove,
  ProtectedUpdate,
]);
