import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { libraryImagesUpload } from '../middleware/multer';
import { libraryKeys } from '../models/Library';
import { LibraryService } from '../services/libraries';

const router = Router();

mapServiceRoutes(new LibraryService(), libraryKeys)(router);

router.post(
  '/libraryImageUpload',
  libraryImagesUpload.single('imageFile'),
  (req: any, res: any) => {
    if (!req.file) {
      return res.sendStatus(400);
    }

    return res.json({ key: req.file.key });
  },
);

export default router;
