import { FindAll, mapServiceRoutes } from '@asw-project/resources/routes';
import { pick } from '@asw-project/shared/util/objects';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import omit from 'lodash/omit';
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

router.get('', async (req, res, next) => {
  const ownerId = getUserId(req.session);
  if (ownerId) {
    const ownerIdFilter = req.query.mineonly !== undefined ? { ownerId } : {};
    const filter = { ...omit(req.query, 'mineonly'), ...ownerIdFilter };

    const result = new FindAll(ReservationModel).findAll(filter);

    (
      await result.map((x) =>
        x.map(pick('seatId', 'date', 'timeSlot', 'libraryId', '_id')),
      )
    ).caseOf({
      Right: (reservations) => res.json(reservations),
      Left: next,
    });
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
});

export default router;
