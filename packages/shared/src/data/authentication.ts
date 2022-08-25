const Joi = require('joi');

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

export const FavoriteLibrariesInfo = Joi.object({
  libraryId: Joi.string().required(),
  name: Joi.string().required(),
});
const FavoriteLibrariesSchema = Joi.array()
  .items(FavoriteLibrariesInfo)

  .items(Joi.string())
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Library',
    },
  });
const schema = {
  email,
  password,
  account: AccountSchema,
  favoriteLibrariesInfo: FavoriteLibrariesSchema,
};

export const AuthenticationSchema = Joi.object(schema).meta({
  className: 'Authentication',
});
