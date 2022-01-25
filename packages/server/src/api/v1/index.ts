import { Router } from 'express';
import libraryRouter from '../../routers/libraries';
import positionRouter from '../../routers/positions';
import roomRouter from '../../routers/rooms';
import seatRouter from '../../routers/seats';
import authenticationRouter from '../../routers/authentication';
import accountRouter from '../../routers/account';
import availableServicesRouter from '../../routers/availableServices';
import favoriteLibrariesRouter from '../../routers/favoriteLibraries';
import reservationRouter from '../../routers/reservations';

const router = Router();

router.use(authenticationRouter);
router.use(favoriteLibrariesRouter);

router.use('/account', accountRouter);
router.use('/availableServices', availableServicesRouter);
router.use('/libraries', libraryRouter);
router.use('/positions', positionRouter);
router.use('/rooms', roomRouter);
router.use('/reservations', reservationRouter);
router.use('/seats', seatRouter);

router.get('/whoami', (req, res) => {
  if (req.session.userId) {
    return res.json({
      userId: req.session.userId,
    });
  }
  return res.sendStatus(401);
});

export default router;
