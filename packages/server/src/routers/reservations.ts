import { FindAll, mapServiceRoutes } from '@asw-project/resources/routes';
import { Reservation } from '@asw-project/shared/generatedTypes';
import { Router } from 'express';
import { reservationKeys, ReservationModel } from '../models/Reservation';
import { ReservationService } from '../services/reservation';

type ReservationOwner = Pick<Reservation, 'ownerId'>;

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

const router = Router();

mapServiceRoutes(new ReservationService(), reservationKeys)(router);

router.get('', async (req, res, next) => {
  const ownerId = getUserId(req.session);
  if (ownerId) {
    const filter: ReservationOwner = { ownerId };
    const result = new FindAll(ReservationModel).findAll(filter);
    (await result).caseOf({
      Right: (reservations) => res.json(reservations),
      Left: next,
    });
  } else {
    res.sendStatus(401);
  }
});

export default router;
