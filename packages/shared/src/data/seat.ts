import Joi from 'joi';
import { PositionSchema } from './position';
import { ServiceSchema } from './service';

const roomId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Room',
    },
  });

const services = Joi.array().items(ServiceSchema).required();

const position = PositionSchema.required();

export const SeatSchema = Joi.object({ roomId, services, position }).meta({
  className: 'Seat',
});
