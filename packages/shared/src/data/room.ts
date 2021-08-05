import Joi from 'joi';

const name = Joi.string()
  .regex(/Room [0-9]+/)
  .required();

const capacity = Joi.number() //
  .min(1)
  .required();

export const RoomSchema = Joi.object({ name, capacity }).meta({
  className: 'Room',
});
