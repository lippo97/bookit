import { ReservationSchema as ReservationJoiSchema } from '@asw-project/shared/data/reservation';
import { Reservation } from '@asw-project/shared/generatedTypes/reservation';
import { Resource } from '@asw-project/resources';

export const [ReservationModel, ReservationSchema, reservationKeys] =
  Resource.getModelFromJoi<Reservation>(ReservationJoiSchema);
