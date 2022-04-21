import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Room, Seat } from '@asw-project/shared/generatedTypes';

type SeatWithReservation = WithId<Seat> & {
  isReserved: boolean;
};

export async function getRoomById(roomId: string): Promise<WithId<Room>> {
  return ky.get(`rooms/${roomId}`).json<WithId<Room>>();
}

export async function getReservationsOnRoom(
  roomId: string,
  timeSlot: string,
): Promise<SeatWithReservation[]> {
  const a = await ky.get(`reservations`).json();
  console.log(a);
  return [
    {
      _id: '000',
      ownerId: '0',
      isReserved: true,
      label: 0,
      position: { x: 0, y: 0 },
      roomId: 'df',
      services: ['Computer'],
    },
    {
      _id: '001',
      ownerId: '0',
      isReserved: false,
      label: 0,
      position: { x: 1, y: 1 },
      roomId: 'df',
      services: ['Computer'],
    },
  ];
}
