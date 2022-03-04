import { ky } from '@/config/ky';
import { Room, Seat, Service } from '@asw-project/shared/generatedTypes';
import { V2ToPosition } from '@asw-project/shared/types/position';
import { fst } from '@asw-project/shared/util/tuples';
import { pick } from '@asw-project/shared/util/objects';
import { WithId } from '@asw-project/shared/data/withId';
import { useAuth } from '@/stores/authentication';
import partition from 'lodash/partition';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { SeatMap } from '../stores/seats';
import { createSeats, deleteSeats, updateSeats } from './seats';

export type CreateRoomArg = Pick<Room, 'libraryId' | 'name' | 'accessibility'>;

export type UpdateRoomArg = Omit<CreateRoomArg, 'libraryId'>;

const serviceObjectToArray = (input: SeatMap[string]['services']): Service[] =>
  Object.entries(input)
    .filter(([, value]) => value)
    .map(fst) as Service[];

export const updateRoomSeats = async (roomId: string, seatMap: SeatMap) => {
  const o = Object.values(seatMap)
    .map(pick('position', 'services', 'previouslyExisting', '_id', 'label'))
    .map((x) => ({
      ...x,
      roomId,
      position: V2ToPosition(x.position),
      services: serviceObjectToArray(x.services),
    }));
  const [prev, notprev] = partition(o, 'previouslyExisting');

  // eslint-disable-next-line no-underscore-dangle
  if (notprev.length > 0) {
    await createSeats(notprev);
  }

  // eslint-disable-next-line no-underscore-dangle
  if (prev.length > 0) {
    await updateSeats(prev as any);
  }
};

export const deleteRoomSeats = async (seatIds: readonly string[]) => {
  if (seatIds.length > 0) {
    await deleteSeats(seatIds);
  }
};

export async function createRoom(data: CreateRoomArg): Promise<WithId<Room>> {
  return ky.post('rooms', { json: data }).json<WithId<Room>>();
}

export async function getRoomById(roomId: string): Promise<WithId<Room>> {
  return ky.get(`rooms/${roomId}`).json<WithId<Room>>();
}

export async function getRooms(libraryId: string): Promise<WithId<Room>[]> {
  const authInfo = useAuth.getState().auth;
  const searchParams = {
    libraryId,
    ownerId: authInfo?.userId,
  };
  return ky.get('rooms', { searchParams }).json<WithId<Room>[]>();
}

export const updateRoom =
  (roomId: string) =>
  async (data: UpdateRoomArg): Promise<WithId<Room>> =>
    ky.patch(`rooms/${roomId}`, { json: data }).json<WithId<Room>>();

export async function deleteRoom(roomId: string): Promise<WithId<Room>> {
  return ky.delete(`rooms/${roomId}`).json<WithId<Room>>();
}
