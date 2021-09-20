import Joi from 'joi';
import { UserAccountSchema } from '../userAccount';
import { ManagerAccountSchema } from '../managerAccount';
import { Email, Password } from './common';

const email = Email.required().meta({
  _mongoose: {
    unique: true,
  },
});

const password = Password.required();

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
