import { RoomSchema as RoomJoiSchema } from '@asw-project/shared/data/room';
import { Room } from '@asw-project/shared/generatedTypes/room';
import { Resource } from '@asw-project/resources';

export const [RoomModel, RoomSchema, roomKeys] =
  Resource.fromJoi<Room>(RoomJoiSchema);
