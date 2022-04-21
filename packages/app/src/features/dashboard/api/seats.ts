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
  // console.log(data);
  return ky.post(`seats`, { json: data }).json<WithId<Seat>[]>();
}

export async function getSeatById(seatId: string): Promise<WithId<Seat>> {
  return ky.get(`seats/${seatId}`).json<WithId<Seat>>();
}

export async function getSeats(roomId: string): Promise<WithId<Seat>[]> {
  const searchParams = {
    roomId,
  };
  return ky.get('seats', { searchParams }).json<WithId<Seat>[]>();
}

export const updateSeats = async (
  data: WithId<UpdateSeatArg>[],
): Promise<Seat[]> => {
  const newData = data.map(({ _id, position, services }) => ({
    position,
    services,
    id: _id,
  }));
  return ky.patch(`seats`, { json: newData }).json<Seat[]>();
};

export async function deleteSeats(
  seatIds: readonly string[],
): Promise<WithId<Seat>> {
  const ids = seatIds.map((idVal) => ({
    id: idVal,
  }));
  return ky.delete(`seats`, { json: ids }).json<WithId<Seat>>();
}
