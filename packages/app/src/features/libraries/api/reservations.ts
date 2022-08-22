import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation, Room, Seat } from '@asw-project/shared/generatedTypes';
import omit from 'lodash/omit';

export type SeatWithReservation = WithId<Seat> & {
  isReserved: boolean;
};

type SeatReservation = Pick<
  WithId<Seat>,
  '_id' | 'label' | 'ownerId' | 'services' | 'position'
> & {
  isReserved: boolean;
};

type Cell = SeatReservation | undefined;

export type SeatGrid = Cell[][];

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
): Promise<SeatGrid> {
  const [from, to] = stringTimeSlot.split('-');
  const timeSlot = {
    from,
    to,
  };

  const roomSize = (await getRoomById(roomId)).size;

  const reservationSeats = (await getReservations(date, roomId, timeSlot)).map(
    (x) => x.seatId,
  );
  const seats = await getSeats(roomId);

  const grid: SeatGrid = new Array(roomSize.y);

  for (let i = 0; i < grid.length; i += 1) {
    grid[i] = new Array(roomSize.x).fill(undefined);
  }

  seats.forEach((s) => {
    const { x, y } = s.position;
    grid[y][x] = {
      ...s,
      isReserved: reservationSeats.includes(s._id),
    };
  });

  return grid;
}

export type CreateReservationArg = Omit<Reservation, 'ownerId'>;

export async function createReservation(
  data: CreateReservationArg,
): Promise<WithId<Reservation>> {
  return ky.post(`reservations`, { json: data }).json<WithId<Reservation>>();
}
