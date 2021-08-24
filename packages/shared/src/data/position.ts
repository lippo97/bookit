import Joi from 'joi';

const somethingtodo = Joi.any();

export const PositionSchema = Joi.object({ somethingtodo }).meta({
  className: 'Position',
});
