import { Router } from 'express';
import {
  ManagerAccountRequestSchema,
  UserAccountRequestSchema,
} from '@asw-project/shared/data/requests/accountCreation/request';
import * as accountController from '../controllers/account';
import { validate } from '../middleware/joiValidator';

const router = Router();

router.get('', accountController.getAccount);

router.post(
  '/managerAccount',
  validate(ManagerAccountRequestSchema),
  accountController.createManagerAccount,
);

router.patch(
  '/managerAccount',
  validate(ManagerAccountRequestSchema),
  accountController.updateManagerAccount,
);

router.post(
  '/userAccount',
  validate(UserAccountRequestSchema),
  accountController.createUserAccount,
);

router.patch(
  '/userAccount',
  validate(UserAccountRequestSchema),
  accountController.updateUserAccount,
);

export default router;
