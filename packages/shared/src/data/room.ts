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

  // = library owner
const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Authentication',
      // validate: null
    },
  });

const name = Joi.string()
  .regex(/Room [0-9]+/)
  .required();

//const seats = Joi.array().items(SeatSchema).required();

const capacity = Joi.number() //
  .min(1);
//.required(); calculated dinamically

const accessibility = Joi.boolean().required();

export const RoomSchema = Joi.object({
  libraryId,
  ownerId,
  name,
  //seats,
  capacity,
  accessibility,
}).meta({
  className: 'Room',
});
