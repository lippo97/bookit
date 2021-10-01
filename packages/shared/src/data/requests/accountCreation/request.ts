import Joi from 'joi';
import omit from 'lodash/omit';
import { userAccountFields } from '../../userAccount';
import { managerAccountFields } from '../../managerAccount';

export const UserAccountRequestSchema = Joi.object(
  omit(userAccountFields, 'email', 'type'),
).meta({ className: 'UserAccountRequest' });

export const ManagerAccountRequestSchema = Joi.object(
  omit(managerAccountFields, 'email', 'type'),
).meta({ className: 'ManagerAccountRequest' });

export type AccountResponse = void;
/*export const AccountRequestSchema = Joi.alternatives()
  .try(UserAccountRequestSchema)
  .meta({
    className: 'AccountRequest',
  });


*/
