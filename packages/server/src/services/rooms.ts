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
import { Room } from '@asw-project/shared/generatedTypes/room';
import { RoomModel } from '../models/Room';

export class RoomService extends BaseService<Room> {
  constructor() {
    super(RoomModel);
  }
}

export interface RoomService
  extends FindById<Room>,
    Create<Room>,
    FindAll<Room>,
    Remove<Room>,
    Update<Room> {}

applyMixins(RoomService, [
  SimpleFindById,
  Create,
  FindAll,
  ProtectedRemove,
  ProtectedUpdate,
]);
