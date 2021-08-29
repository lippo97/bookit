import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { avalaibleServiceKeys } from '../models/AvalaibleService';
import { AvalaibleServiceService } from '../services/avalaibleServices';

const router = Router();

mapServiceRoutes(new AvalaibleServiceService(), avalaibleServiceKeys)(router);

export default router;
