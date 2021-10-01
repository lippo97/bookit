import Joi from 'joi';
import { accountTypes } from '../types/accountTypes';

export const managerAccountFields = {
  email: Joi.string().required(),
  businessName: Joi.string().required(),
  type: Joi.string().valid(accountTypes.manager).required(),
};

export const ManagerAccountSchema = Joi.object(managerAccountFields).meta({
  className: 'ManagerAccount',
});
