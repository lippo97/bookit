import Joi from 'joi';

export const AccountSchema = Joi.object({
  email: Joi.string()
    .required()
    .meta({
      _mongoose: {
        unique: true,
      },
    }),
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  birtDate: Joi.date().required(),
  maleFemale: Joi.valid('male', 'female', 'other').required(),
}).meta({
  className: 'Account',
});
