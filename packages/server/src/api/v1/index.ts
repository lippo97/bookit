import { Router } from 'express';
import roomRouter from '../../routers/rooms';
import authenticationRouter from '../../routers/authentication';

const router = Router();

router.use('/rooms', roomRouter);
router.use(authenticationRouter);
router.get('/whoami', (req, res) => {
  if (req.session.userId) {
    return res.json({
      userId: req.session.userId,
    });
  }
  return res.sendStatus(401);
});

export default router;
