import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { libraryImageUpload, libraryImageGetter } from '../middleware/multer';
import { libraryKeys } from '../models/Library';
import { LibraryService } from '../services/libraries';

const router = Router();

mapServiceRoutes(new LibraryService(), libraryKeys)(router);

router.post(
  '/libraryImage',
  libraryImageUpload.single('imageFile'),
  (req: any, res: any) => {
    if (!req.file) {
      return res.sendStatus(400);
    }

    return res.json({ key: req.file.key });
  },
);

router.get('/libraryImage/:imageFileName', async (req: any, res: any) => {
  const { imageFileName } = req.params;
  const image = await libraryImageGetter(imageFileName);
  if (image) {
    const extension = imageFileName.split('.').slice(-1);
    res.header('Content-Type', `image/${extension}`);
    res.status(200);
    res.end(image);
  } else {
    res.sendStatus(404);
  }
});

export default router;
