import { Router } from 'express';
import { UserAccountSchema } from '@asw-project/shared/data/userAccount';
import { ManagerAccountSchema } from '@asw-project/shared/data/managerAccount';
import * as accountController from '../controllers/account';
import { validate } from '../middleware/joiValidator';

const router = Router();

router.get('/account', accountController.getAccount);

router.post(
  '/account',
  validate(ManagerAccountSchema),
  accountController.createAccount,
);
router.post(
  '/account',
  validate(UserAccountSchema),
  accountController.createAccount,
);

router.patch(
  '/account',
  validate(UserAccountSchema),
  accountController.updateAccount,
);
router.patch(
  '/account',
  validate(ManagerAccountSchema),
  accountController.updateAccount,
);

export default router;
