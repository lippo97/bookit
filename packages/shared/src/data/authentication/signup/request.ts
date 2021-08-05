import Joi from 'joi';
import { Email, Password } from '../common';

const email = Email.required();
const password = Password.min(7).max(64).required();

export const SignupRequestSchema = Joi.object({
  email,
  password,
}).meta({
  className: 'SignupRequest',
});
