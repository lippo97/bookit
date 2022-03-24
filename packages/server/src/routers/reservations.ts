import { FindAll, mapServiceRoutes } from '@asw-project/resources/routes';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
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
    let filter: any = { ownerId };

    if (req.query.date) {
      filter = { ...filter, date: new Date(req.query.date as any) };
    }

    if (req.query.timefrom && req.query.timeto) {
      const from: any = req.query.timefrom;
      const to: any = req.query.timeto;
      filter = {
        ...filter,
        'timeSlot.from': { $gte: from },
        'timeSlot.to': { $lte: to },
      };
    }

    const result = new FindAll(ReservationModel).findAll(filter);
    (await result).caseOf({
      Right: (reservations) => res.json(reservations),
      Left: next,
    });
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
});

export default router;
