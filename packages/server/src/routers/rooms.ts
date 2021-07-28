import { Router } from 'express';
import { roomKeys } from '../models/Room';
import { mapServiceRoutes } from '../services/resources/mapServiceRoutes';
import { RoomService } from '../services/rooms';

const router = Router();

mapServiceRoutes(new RoomService(), roomKeys)(router);

export default router;
