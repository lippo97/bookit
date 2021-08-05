import Joi from 'joi';
import { AccountSchema } from '../account';
import { Email, Password } from './common';

const email = Email.required();

const password = Password.required();

const account = AccountSchema.optional();

export const AuthenticationSchema = Joi.object({
  email,
  password,
  account,
}).meta({
  className: 'Authentication',
});
