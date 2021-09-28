import Joi from 'joi';
import { email, password } from '../../authentication';

export const SignupRequestSchema = Joi.object({
  email,
  password,
}).meta({
  className: 'SignupRequest',
});
