import Joi from 'joi';
import omit from 'lodash/omit';
import { userAccountFields } from '../userAccount';

export const UserAccountRequestSchema = Joi.object(
  omit(userAccountFields, 'email', 'type'),
).meta({ className: 'UserAccountRequest' });

export const AccountRequestSchema = Joi.alternatives()
  .try(UserAccountRequestSchema)
  .meta({
    className: 'AccountRequest',
  });

export type AccountResponse = void;
