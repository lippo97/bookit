import Joi from 'joi';
import { RoomSchema } from './room';
import { ServiceSchema } from './service';

export const name = Joi.string().required();

export const street = Joi.string().required();

export const city = Joi.string().required();

//library owner
const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Authentication',
      // validate: null
    },
  });

const imageFileName = Joi.string();
//
export const timeRange = Joi.object().keys({
  from: Joi.string().required(),
  to: Joi.string().required(),
});
const daytime = Joi.array().items(timeRange);

const defaultTimerange = Joi.object().keys({
  from: Joi.number().default(10).required(),
  to: Joi.number().default(12).required(),
});

const DaySchema = Joi.number().min(0).max(6);

const ShiftSchema = Joi.object({
  slot: Joi.object({
    from: Joi.date().required(),
    to: Joi.date().required(),
  }).required(),
  days: Joi.array().min(1).items(DaySchema).required(),
});
const timetable = Joi.array().items(ShiftSchema).required();

const availableServices = Joi.array().items(ServiceSchema).required();

//const rooms = Joi.array().items(RoomSchema).required();

export const LibrarySchema = Joi.object({
  name,
  street,
  city,
  ownerId,
  timetable,
  availableServices,
  //rooms,
  imageFileName,
}).meta({
  className: 'Library',
});
