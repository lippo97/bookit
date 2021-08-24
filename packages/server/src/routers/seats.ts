import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { seatKeys } from '../models/Seat';
import { SeatService } from '../services/seats';

const router = Router();

mapServiceRoutes(new SeatService(), seatKeys)(router);

export default router;
