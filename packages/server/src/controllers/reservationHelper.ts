import { FindAll } from '@asw-project/resources/routes';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReservationModel } from '../models/Reservation';

export async function isAlreadyReserved(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  const reservation: Pick<Reservation, 'seatId' | 'date' | 'timeSlot'> =
    req.body;

  const { seatId, date, timeSlot } = reservation;
  const $gte = new Date(date);
  $gte.setHours(0, 0, 0, 0);
  const $lt = new Date(date);
  $lt.setDate($lt.getDate() + 1);
  $lt.setHours(0, 0, 0, 0);

  const filter = {
    seatId,
    date: {
      $gte,
      $lt,
    },
    'timeSlot.from': timeSlot.from,
    'timeSlot.to': timeSlot.to,
  };
  const result = new FindAll(ReservationModel).findAll(filter);
  (await result).caseOf({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Right: (reservations) => {
      if (reservations.length > 0) {
        return res.sendStatus(StatusCodes.CONFLICT);
      }
      return next();
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Left: (_error) => res.sendStatus(StatusCodes.BAD_REQUEST),
  });
}
