import { LoginRequest } from '@asw-project/shared/authentication/dto/login';
import { SignupRequest } from '@asw-project/shared/authentication/dto/signup';
import { Router } from 'express';
import validate from '../middleware/validate';
import * as authenticationController from '../controllers/authentication';

const router = Router();

router.post('/login', validate(LoginRequest), authenticationController.login);
router.post(
  '/signup',
  validate(SignupRequest),
  authenticationController.signup,
);
router.post('/logout', authenticationController.logout);

export default router;
