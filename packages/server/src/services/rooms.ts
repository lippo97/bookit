import { Room } from '@asw-project/shared/generatedTypes/room';
import {
  applyMixins,
  Create,
  FindAll,
  FindById,
  Remove,
  Update,
  BaseService,
} from '@asw-project/resources/routes';
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

applyMixins(RoomService, [FindById, Create, FindAll, Remove, Update]);
