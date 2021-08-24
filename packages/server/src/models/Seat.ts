import { SeatSchema as SeatJoiSchema } from '@asw-project/shared/data/seat';
import { Seat } from '@asw-project/shared/generatedTypes/seat';
import { Resource } from '@asw-project/resources';

export const [SeatModel, SeatSchema, seatKeys] =
  Resource.fromJoi<Seat>(SeatJoiSchema);
