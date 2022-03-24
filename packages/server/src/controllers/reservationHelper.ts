import { FindAll } from '@asw-project/resources/routes';
import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ReservationModel } from '../models/Reservation';

export async function isAlreadyReserved(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  const reservation: any = req.body;

  const { seatId, date, timeSlot } = reservation;

  let filter: any = { seatId };

  filter = { ...filter, date: new Date(date as any) };

  filter = {
    ...filter,
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
