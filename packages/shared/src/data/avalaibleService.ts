import Joi from 'joi';

const name = Joi.string().required();

const description = Joi.string().required();

export const AvalaibleServiceSchema = Joi.object({ name, description }).meta({
  className: 'AvalaibleService',
});
