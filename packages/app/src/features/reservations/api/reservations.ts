import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation } from '@asw-project/shared/generatedTypes';

export async function getReservationById(
  reservationId: string,
): Promise<WithId<Reservation>> {
  return ky.get(`reservations/${reservationId}`).json<WithId<Reservation>>();
}
