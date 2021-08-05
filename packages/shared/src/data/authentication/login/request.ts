import Joi from 'joi';
import { Email, Password } from '../common';

const email = Email.required();
const password = Password.required();

export const LoginRequestSchema = Joi.object({ email, password }).meta({
  className: 'LoginRequest',
});
