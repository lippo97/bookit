import { ky } from '@/config/ky';
import { useAuth } from '@/stores/authentication';
import { WithId } from '@asw-project/shared/data/withId';
import { Reservation, Seat } from '@asw-project/shared/generatedTypes';

export type CreateReservationArg = Reservation;

export async function createReservation(
  data: CreateReservationArg,
): Promise<WithId<Reservation>> {
  return ky.post(`reservations`, { json: data }).json<WithId<Reservation>>();
}

export async function getReservationById(
  reservationId: string,
): Promise<WithId<Reservation>> {
  return ky.get(`reservations/${reservationId}`).json<WithId<Reservation>>();
}

export async function getReservations(
  reservationId: string,
): Promise<WithId<Reservation>[]> {
  const authInfo = useAuth.getState().auth;
  const searchParams = {
    reservationId,
    ownerId: authInfo?.userId,
  };
  return ky.get('reservations', { searchParams }).json<WithId<Reservation>[]>();
}

export async function deleteReservation(
  reservationId: string,
): Promise<WithId<Reservation>> {
  return ky.delete(`reservations/${reservationId}`).json<WithId<Reservation>>();
}
