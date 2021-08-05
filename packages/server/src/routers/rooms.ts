import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { roomKeys } from '../models/Room';
import { RoomService } from '../services/rooms';

const router = Router();

mapServiceRoutes(new RoomService(), roomKeys)(router);

export default router;
