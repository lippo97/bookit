import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation, Room, Seat } from '@asw-project/shared/generatedTypes';
import { Options } from 'ky';

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

export async function getReservations(
  current: boolean = true,
): Promise<WithId<Reservation>[]> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const searchParams: Options['searchParams'] = {
    mineonly: true,
  };
  if (current) {
    searchParams['date[$gte]'] = today.toISOString();
  } else {
    searchParams['date[$lt]'] = today.toISOString();
  }
  return ky.get('reservations', { searchParams }).json<WithId<Reservation>[]>();
}

export async function deleteReservation(reservationId: string): Promise<void> {
  return ky.delete(`reservations/${reservationId}`).json<void>();
}
