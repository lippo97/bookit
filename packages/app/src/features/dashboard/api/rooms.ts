import { ky } from '@/config/ky';
import { Room, Service } from '@asw-project/shared/generatedTypes';
import { V2ToPosition } from '@asw-project/shared/types/position';
import { fst } from '@asw-project/shared/util/tuples';
import { pick } from '@asw-project/shared/util/objects';
import { WithId } from '@asw-project/shared/data/withId';
import { useAuth } from '@/stores/authentication';
import { SeatMap } from '../stores/seats';

export type CreateRoomArg = Pick<Room, 'libraryId' | 'name' | 'accessibility'>;

export type UpdateRoomArg = Omit<CreateRoomArg, 'libraryId'>;

/* const serviceObjectToArray = (
  input: SeatMap[string]['services'],
): Room['seats'][number]['services'] =>
  Object.entries(input)
    .filter(([, value]) => value)
    .map(fst) as Service[];
*/
// TODO
export const updateRoomSeats = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  roomId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  seatMap: SeatMap,
): Promise<void> =>
  /* const seats: Room['seats'] = Object.values(seatMap)
    .map(pick('position', 'services'))
    .map(({ position, services }) => ({
      position: V2ToPosition(position),
      services: serviceObjectToArray(services),
    }));
  console.log('transformed', seats); */
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export async function createRoom(data: CreateRoomArg): Promise<WithId<Room>> {
  return ky.post('rooms', { json: data }).json<WithId<Room>>();
}

<<<<<<< HEAD
export async function getRoomById(roomId: string): Promise<WithId<Room>> {
  return ky.get(`rooms/${roomId}`).json<WithId<Room>>();
=======
// TODO
export async function getLibraryRoomById(
  id: string,
  roomid: string,
): Promise<Room> {
  return Promise.resolve({
    name: 'ciao',
    capacity: 30,
    libraryId: '10',
    seats: [
      {
        position: { x: 3, y: 3 },
        services: ['Wi-Fi', 'Printer'],
      },
    ],
    accessibility: true,
  });
>>>>>>> master
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

// TODO
export async function deleteLibraryRoom(
  id: string,
  roomId: string,
): Promise<void> {
  Promise.resolve();
}
