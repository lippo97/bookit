import Joi from 'joi';

export const AccountSchema = Joi.object({
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  birtDate: Joi.date().required(),
  maleFemale: Joi.valid('male', 'female', 'other').required(),
}).meta({
  className: 'Account',
});
