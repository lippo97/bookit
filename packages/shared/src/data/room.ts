import Joi, { required } from 'joi';
import { SeatSchema } from './seat';

const libraryId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Library',
      // validate: null
    },
  });
/* valutare se usare un array per library
 */

const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Account',
      // validate: null
    },
  });

const name = Joi.string()
  .regex(/Room [0-9]+/)
  .required();

const seats = Joi.array().items(SeatSchema).required();

const capacity = Joi.number() //
  .min(1)
  .required();

export const RoomSchema = Joi.object({
  libraryId,
  ownerId,
  name,
  seats,
  capacity,
}).meta({
  className: 'Room',
});
