import { ky } from '@/config/ky';
import { useAuth } from '@/stores/authentication';
import { WithId } from '@asw-project/shared/data/withId';
import { Seat } from '@asw-project/shared/generatedTypes';

export type CreateSeatArg = Pick<Seat, 'roomId' | 'position' | 'services'>;

export type UpdateSeatArg = Omit<CreateSeatArg, 'roomId'>;

export async function createSeat(data: CreateSeatArg): Promise<WithId<Seat>> {
  return ky.post(`seats`, { json: data }).json<WithId<Seat>>();
}

export async function createSeats(
  data: CreateSeatArg[],
): Promise<WithId<Seat>[]> {
  console.log(data);
  return ky.post(`seats`, { json: data }).json<WithId<Seat>[]>();
}

export async function getSeatById(seatId: string): Promise<WithId<Seat>> {
  return ky.get(`seats/${seatId}`).json<WithId<Seat>>();
}

export async function getSeats(roomId: string): Promise<WithId<Seat>[]> {
  const authInfo = useAuth.getState().auth;
  const searchParams = {
    roomId,
    ownerId: authInfo?.userId,
  };
  return ky.get('seats', { searchParams }).json<WithId<Seat>[]>();
}

export const updateSeats =
  (seatId: string) =>
  async (data: UpdateSeatArg): Promise<WithId<Seat>> => {
    console.log("update Seats", data)
    return ky.patch(`seats/`, { json: { ...data, id: seatId } }).json<WithId<Seat>>()
  }


export async function deleteSeat(seatId: string): Promise<WithId<Seat>> {
  return ky.delete(`seats/${seatId}`).json<WithId<Seat>>();
}
