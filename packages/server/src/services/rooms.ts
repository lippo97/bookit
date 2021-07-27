import { Room, RoomModel } from '../models/Room';
import applyMixins from './resources/applyMixins';
import BaseService from './resources/BaseService';
import {
  Create,
  FindAll,
  FindById,
  Remove,
  Update,
} from './resources/operations';

type TRoom = typeof Room;

export class RoomService extends BaseService<TRoom> {
  constructor() {
    super(RoomModel);
  }
}

export interface RoomService
  extends FindById<TRoom>,
    Create<TRoom>,
    FindAll<TRoom>,
    Remove<TRoom>,
    Update<TRoom> {}

applyMixins(RoomService, [FindById, Create, FindAll, Remove, Update]);
