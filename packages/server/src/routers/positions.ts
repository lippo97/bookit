import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { positionKeys } from '../models/Position';
import { PositionService } from '../services/positions';

const router = Router();

mapServiceRoutes(new PositionService(), positionKeys)(router);

export default router;
