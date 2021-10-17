import { Router } from 'express';

import * as favoriteLibrariesController from '../controllers/favoriteLibraries';

const router = Router();

router.get('/favorite', favoriteLibrariesController.getFavoriteLibraries);

export default router;
