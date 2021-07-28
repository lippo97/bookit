import { Router } from 'express';
import { Room, roomKeys } from '../models/Room';
import { mapServiceRoutes } from '../services/resources/mapServiceRoutes';
import { RoomService } from '../services/rooms';

const router = Router();

mapServiceRoutes(new RoomService(), Room, roomKeys)(router);

export default router;
