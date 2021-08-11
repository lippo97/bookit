import Joi, { required } from 'joi';
import { Email } from './authentication/common';

const name = Joi.string()
  .regex(/Room [0-9]+/)
  .required();

const capacity = Joi.number() //
  .min(1)
  .required();

const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Account',
      // validate: null
    },
  });

export const RoomSchema = Joi.object({ name, capacity, ownerId }).meta({
  className: 'Room',
});
