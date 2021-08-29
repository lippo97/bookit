import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { buildingKeys } from '../models/Building';
import { BuildingService } from '../services/buildings';

const router = Router();

mapServiceRoutes(new BuildingService(), buildingKeys)(router);

export default router;
