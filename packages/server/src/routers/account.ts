import { Router } from 'express';
import { UserAccountSchema } from '@asw-project/shared/data/userAccount';
import { ManagerAccountSchema } from '@asw-project/shared/data/managerAccount';
import * as accountController from '../controllers/account';
import { validate } from '../middleware/joiValidator';

const router = Router();

router.post(
  '/account/:id',
  validate(UserAccountSchema),
  accountController.create,
);
router.post(
  '/account/:id',
  validate(ManagerAccountSchema),
  accountController.create,
);

router.patch(
  '/account/:id',
  validate(UserAccountSchema),
  accountController.create,
);
router.patch(
  '/account/:id',
  validate(ManagerAccountSchema),
  accountController.create,
);

export default router;
