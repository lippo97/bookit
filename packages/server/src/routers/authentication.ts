import { LoginRequestSchema } from '@asw-project/shared/data/requests/login/request';
import { SignupRequestSchema } from '@asw-project/shared/data/requests/signup/request';
import { Router } from 'express';
import { validate } from '../middleware/joiValidator';
import * as authenticationController from '../controllers/authentication';

const router = Router();

router.post(
  '/login',
  validate(LoginRequestSchema),
  authenticationController.login,
);
router.post(
  '/signup',
  validate(SignupRequestSchema),
  authenticationController.signup,
);
router.post('/logout', authenticationController.logout);

export default router;
