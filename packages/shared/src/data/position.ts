import Joi from 'joi';

const number = Joi.number().required();

export const PositionSchema = Joi.object({
  x: number,
  y: number,
}).meta({
  className: 'Position',
});
