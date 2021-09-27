import Joi from 'joi';
import { accountTypes } from '../types/accountTypes';

export const ManagerAccountSchema = Joi.object({
  email: Joi.string().required(),
  businessName: Joi.string().required(),
  type: Joi.string().valid(accountTypes.manager).required(),
}).meta({
  className: 'ManagerAccount',
});
