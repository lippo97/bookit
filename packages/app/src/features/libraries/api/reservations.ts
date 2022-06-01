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
  const searchParams = {
    date: date.toString(),
    roomId,
    timeSlot: timeSlot as any,
  };
  return ky.get('reservations', { searchParams }).json<WithId<Reservation>[]>();
}

export async function getReservationsOnRoom(
  date: Date,
  roomId: string,
  timeSlot: string,
): Promise<SeatWithReservation[]> {
  const [from, to] = timeSlot.split('-');
  const parsedTimeSlot = {
    from: dayjs(from, 'HH:mm').toDate(),
    to: dayjs(to, 'HH:mm').toDate(),
  };

  const reservationSeats = (
    await getReservations(date, roomId, parsedTimeSlot)
  ).map((x) => x.seatId);
  const seats = await getSeats(roomId);

  const updateSeat = (self: WithId<Seat>) => ({
    ...self,
    isReserved: reservationSeats.includes(self._id),
  });
  const res = seats.map(updateSeat);

  return res;
}
