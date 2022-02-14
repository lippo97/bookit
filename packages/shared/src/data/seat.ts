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
// = library/room owner
const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Authentication',
      // validate: null
    },
  });

const services = Joi.array().items(ServiceSchema).required();

const label = Joi.number().required();

const position = PositionSchema.required();

export const SeatSchema = Joi.object({
  roomId,
  ownerId,
  services,
  position,
  label,
}).meta({
  className: 'Seat',
});
