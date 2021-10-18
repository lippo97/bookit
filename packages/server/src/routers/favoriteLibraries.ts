import { Router } from 'express';
import { FavoriteLibraryRequestSchema } from '@asw-project/shared/data/requests/favoriteLibraries/request';
import { validate } from '../middleware/joiValidator';
import * as favoriteLibrariesController from '../controllers/favoriteLibraries';

const router = Router();

router.get('/favorite', favoriteLibrariesController.getFavoriteLibraries);

router.post(
  '/favorite',
  validate(FavoriteLibraryRequestSchema),
  favoriteLibrariesController.addFavoriteLibrary,
);

router.delete(
  '/favorite/:libraryId',
  favoriteLibrariesController.deleteFavoriteLibrary,
);

export default router;
