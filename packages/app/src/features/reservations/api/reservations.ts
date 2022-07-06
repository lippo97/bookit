import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation, Room, Seat } from '@asw-project/shared/generatedTypes';

export async function getRoomById(roomId: string): Promise<WithId<Room>> {
  return ky.get(`rooms/${roomId}`).json<WithId<Room>>();
}

export async function getSeatById(seatId: string): Promise<WithId<Seat>> {
  return ky.get(`seats/${seatId}`).json<WithId<Seat>>();
}

export async function getReservationById(
  reservationId: string,
): Promise<WithId<Reservation>> {
  return ky.get(`reservations/${reservationId}`).json<WithId<Reservation>>();
}
