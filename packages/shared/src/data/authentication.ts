import Joi from 'joi';
import { UserAccountSchema } from './userAccount';
import { ManagerAccountSchema } from './managerAccount';
import { Email as CEmail, Password as CPassword } from './common';

export const email = CEmail.required().meta({
  _mongoose: {
    unique: true,
  },
});

export const password = CPassword.min(7).max(64).required();

export const AccountSchema = Joi.alternatives()
  .try(UserAccountSchema, ManagerAccountSchema)
  .meta({
    className: 'Account',
  });

const schema = {
  email,
  password,
  account: AccountSchema,
};

export const AuthenticationSchema = Joi.object(schema).meta({
  className: 'Authentication',
});
