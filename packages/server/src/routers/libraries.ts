import { Router } from 'express';
import { mapServiceRoutes } from '@asw-project/resources/routes';
import { libraryImageUpload } from '../middleware/multer';
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

router.get('/:libraryId/services', (req: any, res: any) => {
  const services = new Set<string>();

  const librarySeats = req.body;
  console.log('LSEATS:', librarySeats);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < librarySeats.length; i++) {
    const seat = librarySeats[i];
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < seat.services.length; j++) {
      const service = seat.services[j];
      services.add(service);
    }
  }

  console.log('SERVICES TO SAVE:', services);
  res.json(Array.from(services));
});

export default router;
