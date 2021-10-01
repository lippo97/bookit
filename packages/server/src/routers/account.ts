import { Router } from 'express';
import {
  ManagerAccountRequestSchema,
  UserAccountRequestSchema,
} from '@asw-project/shared/data/requests/accountCreation/request';
import * as accountController from '../controllers/account';
import { validate } from '../middleware/joiValidator';

const router = Router();

router.get('/account', accountController.getAccount);

router.post(
  '/managerAccount',
  validate(ManagerAccountRequestSchema),
  accountController.createAccount,
);

router.patch(
  '/managerAccount',
  validate(ManagerAccountRequestSchema),
  accountController.updateAccount,
);

router.post(
  '/userAccount',
  validate(UserAccountRequestSchema),
  accountController.createAccount,
);

router.patch(
  '/userAccount',
  validate(UserAccountRequestSchema),
  accountController.updateAccount,
);

export default router;
