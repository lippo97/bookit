import Joi from 'joi';
import { AccountSchema } from '../account';
import { Email, Password } from './common';

const email = Email.required().meta({
  _mongoose: {
    unique: true,
  },
});

const isManager = Joi.boolean().required().default(false);

const password = Password.required();

const account = AccountSchema.allow(null);

export const AuthenticationSchema = Joi.object({
  email,
  password,
  isManager,
  account,
}).meta({
  className: 'Authentication',
});
