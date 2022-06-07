import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation, Room, Seat } from '@asw-project/shared/generatedTypes';
import dayjs from 'dayjs';

export type SeatWithReservation = WithId<Seat> & {
  isReserved: boolean;
};

export async function getRoomById(roomId: string): Promise<WithId<Room>> {
  return ky.get(`rooms/${roomId}`).json<WithId<Room>>();
}

export async function getSeats(roomId: string): Promise<WithId<Seat>[]> {
  const searchParams = {
    roomId,
  };
  return ky.get('seats', { searchParams }).json<WithId<Seat>[]>();
}

export async function getReservations(
  date: Date,
  roomId: string,
  timeSlot: Reservation['timeSlot'],
): Promise<WithId<Reservation>[]> {
  const $gte = new Date(date);
  $gte.setHours(0, 0, 0, 0);
  const $lt = new Date(date);
  $lt.setDate($lt.getDate() + 1);
  $lt.setHours(0, 0, 0, 0);

  const searchParams = {
    'date[$gte]': $gte.toISOString(),
    'date[$lt]': $lt.toISOString(),
    roomId,
    'timeSlot[from]': timeSlot.from,
    'timeSlot[to]': timeSlot.to,
  };
  return ky.get('reservations', { searchParams }).json<WithId<Reservation>[]>();
}

export async function getReservationsOnRoom(
  date: Date,
  roomId: string,
  stringTimeSlot: string,
): Promise<SeatWithReservation[]> {
  const [from, to] = stringTimeSlot.split('-');
  const timeSlot = {
    from,
    to,
  };

  const reservationSeats = (await getReservations(date, roomId, timeSlot)).map(
    (x) => x.seatId,
  );
  const seats = await getSeats(roomId);

  const updateSeat = (self: WithId<Seat>) => ({
    ...self,
    isReserved: reservationSeats.includes(self._id),
  });
  const res = seats.map(updateSeat);

  return res;
}

export type CreateReservationArg = Omit<Reservation, 'ownerId'>;

export async function createReservation(
  data: CreateReservationArg,
): Promise<WithId<Reservation>> {
  return ky.post(`reservations`, { json: data }).json<WithId<Reservation>>();
}
