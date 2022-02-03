import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { seatKeys } from '../models/Seat';
import { SeatService } from '../services/seats';
import * as seatHelper from '../controllers/seatHelper';

const router = Router();

router.post('', seatHelper.isRoomOwner);
router.patch('', seatHelper.removeOwnerId);
mapServiceRoutes(new SeatService(), seatKeys)(router);

export default router;
