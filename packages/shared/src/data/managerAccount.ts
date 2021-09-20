import Joi from 'joi';
import { accountTypes } from '../types/account';

export const ManagerAccountSchema = Joi.object({
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  birthDate: Joi.date().required(),
  maleFemale: Joi.valid('male', 'female', 'other').required(),
  type: Joi.string().valid(accountTypes.manager).required(),
}).meta({
  className: 'ManagerAccount',
});
