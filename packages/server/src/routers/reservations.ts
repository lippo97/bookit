import { FindAll, mapServiceRoutes } from '@asw-project/resources/routes';
import { pick } from '@asw-project/shared/util/objects';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EitherAsync, Left } from 'purify-ts';
import { handleCreationError } from '@asw-project/resources/routes/operations/documentCreation';
import { reservationKeys, ReservationModel } from '../models/Reservation';
import { ReservationService } from '../services/reservation';
import * as reservationHelper from '../controllers/reservationHelper';

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

const router = Router();

router.post('', reservationHelper.isAlreadyReserved);

mapServiceRoutes(new ReservationService(), reservationKeys)(router);

// router.post('', async (req, res, next) => {
//   const ownerId = getUserId(req.session);
//   const fields = req.body;

//   if (ownerId === undefined) {
//     return EitherAsync.liftEither(
//       Left({
//         kind: 'UnauthorizedError',
//       }),
//     );
//   }
//   return EitherAsync(() => ReservationModel.create({ ...fields, ownerId })) //
//     .mapLeft(handleCreationError);
//   // const result = service.create(fields, { userId });
//   // handleResult(res, next)(result);
// })

router.get('', async (req, res, next) => {
  const ownerId = getUserId(req.session);
  if (ownerId) {
    const filter = req.query;
    const result = new FindAll(ReservationModel).findAll(filter);

    (await result.map((x) => x.map(pick('seatId', 'date', 'timeSlot')))).caseOf(
      {
        Right: (reservations) => res.json(reservations),
        Left: next,
      },
    );
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
});

export default router;
