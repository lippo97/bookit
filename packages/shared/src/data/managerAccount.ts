import Joi from 'joi';

export const ManagerAccountSchema = Joi.object({
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  birthDate: Joi.date().required(),
  maleFemale: Joi.valid('male', 'female', 'other').required(),
}).meta({
  className: 'ManagerAccount',
});
