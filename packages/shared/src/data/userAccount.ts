import Joi from 'joi';
import { accountTypes } from '../types/accountTypes';

export const userAccountFields = {
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  birthDate: Joi.date().required(),
  maleFemale: Joi.valid('male', 'female', 'other').required(),
  type: Joi.string().valid(accountTypes.user).required(),
};

export const UserAccountSchema = Joi.object(userAccountFields).meta({
  className: 'UserAccount',
});
