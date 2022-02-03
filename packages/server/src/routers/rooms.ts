import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { roomKeys } from '../models/Room';
import { RoomService } from '../services/rooms';
import * as roomHelper from '../controllers/roomHelper';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.post('', roomHelper.isLibraryOwner);
router.patch('/:id', roomHelper.removeOwnerId);
mapServiceRoutes(new RoomService(), roomKeys)(router);

export default router;
