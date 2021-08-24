import Joi from 'joi';
import { PositionSchema } from './position';
import { AvalaibleServiceSchema } from './avalaibleService';

const roomId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Room',
      // validate: null
    },
  });
// valutare se usare un oggetto room

const name = Joi.string().required();

const services = Joi.array().items(AvalaibleServiceSchema).required();

const position = PositionSchema.required();

export const SeatSchema = Joi.object({ roomId, name, services, position }).meta(
  {
    className: 'Seat',
  },
);
