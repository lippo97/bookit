import { Router } from 'express';
import {
  FindAll,
  mapServiceRoutes,
  SimpleUpdate,
} from '@asw-project/resources/routes';
import { ObjectId } from 'mongodb';
import { libraryImageUpload } from '../middleware/multer';
import { libraryKeys, LibraryModel } from '../models/Library';
import { LibraryService } from '../services/libraries';
import { RoomModel } from '../models/Room';
import { SeatModel } from '../models/Seat';

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

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

async function getLibraryServices(req: any, next: any) {
  const ownerId = getUserId(req.session);
  const { libraryId } = req.params;
  const services = new Set();
  if (ownerId) {
    let filter: any = { libraryId };
    let librarySeats: any[] = [];
    const roomResult = new FindAll(RoomModel).findAll(filter);

    (await roomResult).caseOf({
      Right: async (libraryRooms) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < libraryRooms.length; i++) {
          // eslint-disable-next-line no-underscore-dangle
          filter = { roomId: (libraryRooms[i] as any)._id };
          const seatsResult = new FindAll(SeatModel).findAll(filter);
          // eslint-disable-next-line no-await-in-loop
          (await seatsResult).caseOf({
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            Right: (s) => {
              librarySeats = librarySeats.concat(s);
            },
            Left: next,
          });
        }

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < librarySeats.length; i++) {
          const seat = librarySeats[i];
          // eslint-disable-next-line no-plusplus
          for (let j = 0; j < seat.services.length; j++) {
            const service = seat.services[j];
            services.add(service);
          }
        }
      },
      Left: next,
    });
  }
  return Array.from(services);
}

router.get('/:libraryId/services', async (req: any, res: any, next: any) => {
  /* const services = new Set<string>();

  const librarySeats = req.body;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < librarySeats.length; i++) {
    const seat = librarySeats[i];
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < seat.services.length; j++) {
      const service = seat.services[j];
      services.add(service);
    }
  }

  res.json(Array.from(services)); */
  const availableServices = await getLibraryServices(req, next);
  res.json(availableServices);
});

router.post('/:libraryId/updateServices', async (req, res, next) => {
  /* const ownerId = getUserId(req.session);
  const { libraryId } = req.params;

  if (ownerId) {
    const services = new Set();
    let filter: any = { libraryId };
    let librarySeats: any[] = [];
    const roomResult = new FindAll(RoomModel).findAll(filter);

    (await roomResult).caseOf({
      Right: async (libraryRooms) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < libraryRooms.length; i++) {
          // eslint-disable-next-line no-underscore-dangle
          filter = { roomId: (libraryRooms[i] as any)._id };
          const seatsResult = new FindAll(SeatModel).findAll(filter);
          // eslint-disable-next-line no-await-in-loop
          (await seatsResult).caseOf({
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            Right: (s) => {
              librarySeats = librarySeats.concat(s);
            },
            Left: next,
          });
        }

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < librarySeats.length; i++) {
          const seat = librarySeats[i];
          // eslint-disable-next-line no-plusplus
          for (let j = 0; j < seat.services.length; j++) {
            const service = seat.services[j];
            services.add(service);
          }
        } */
  // console.log('SERVICES ON LIBRARY:', Array.from(services));

  const availableServices = await getLibraryServices(req, next);
  const { libraryId } = req.params;
  (
    await new SimpleUpdate(LibraryModel).update(new ObjectId(libraryId), {
      availableServices,
    } as any)
  ).caseOf({
    Right: () => res.json(availableServices),
    Left: next,
  });
});

async function isLibraryAccessible(req: any, next: any) {
  const ownerId = getUserId(req.session);
  const { libraryId } = req.params;

  if (ownerId) {
    const filter: any = { libraryId };

    const roomResult = new FindAll(RoomModel).findAll(filter);

    (await roomResult).caseOf({
      Right: async (libraryRooms) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < libraryRooms.length; i++) {
          if (libraryRooms[i].accessibility) return true;
        }
      },
      Left: next,
    });
  }
  return false;
}
router.get(
  '/:libraryId/accessibility',
  async (req: any, res: any, next: any) => {
    const isAccessible = await isLibraryAccessible(req, next);

    return isAccessible;
  },
);

router.post('/:libraryId/accessibility', async (req, res, next) => {
  const accessibility = await isLibraryAccessible(req, next);
  const { libraryId } = req.params;
  (
    await new SimpleUpdate(LibraryModel).update(new ObjectId(libraryId), {
      accessibility,
    } as any)
  ).caseOf({
    Right: () => res.json(accessibility),
    Left: next,
  });
});

export default router;
