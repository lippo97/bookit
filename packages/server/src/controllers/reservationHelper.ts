import {
  FindAll,
  SimpleFindById,
  SimpleUpdate,
} from '@asw-project/resources/routes';
import { Error } from '@asw-project/shared/errors';
import {
  ValidationErrorKind,
  UnauthorizedKind,
  NotFoundKind,
  CastErrorKind,
  DuplicateIdentifierKind,
} from '@asw-project/shared/errors/kinds';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { WithId } from 'mongodb';
import { EitherAsync, Left, Right } from 'purify-ts';
import { LibraryModel } from '../models/Library';
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
export const attemptConfirmReservation =
  (myUserId: string) =>
  (
    reservation: Reservation,
  ): EitherAsync<
    Error<
      | ValidationErrorKind
      | UnauthorizedKind
      | NotFoundKind
      | CastErrorKind
      | DuplicateIdentifierKind
    >,
    Reservation
  > => {
    if (reservation.confirmed) {
      return EitherAsync.liftEither(
        Left({
          kind: 'ValidationError',
        } as const),
      );
    }
    const result = new SimpleFindById(LibraryModel)
      .findById(reservation.libraryId)
      .chain((library) =>
        EitherAsync.liftEither(
          library.ownerId.toString() === myUserId.toString()
            ? Right(reservation as WithId<Reservation>)
            : Left({
                kind: 'UnauthorizedError',
              } as const),
        ),
      )
      .chain(({ _id: id }) =>
        new SimpleUpdate(ReservationModel).update(id, {
          confirmed: true,
        } as any),
      );
    return result;
  };
