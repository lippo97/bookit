import { Router } from 'express';
import * as roomController from '../controllers/rooms';

const router = Router();

router.get('/rooms', roomController.findAll);
router.delete('/rooms/:id', roomController.remove);

export default router;
