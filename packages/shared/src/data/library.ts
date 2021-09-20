import Joi from 'joi';
import { RoomSchema } from './room';
import { AvailableServiceSchema } from './availableService';

export const name = Joi.string().required();

export const street = Joi.string().required();

export const city = Joi.string().required();

const imageFilename = Joi.string();
//
const timeRange = Joi.object().keys({
  from: Joi.number().required(),
  to: Joi.number().required(),
});
const daytime = Joi.array().items(timeRange); /*Joi.object().keys({
  daytime: Joi.array().items(timeRange),
});*/
//
const defaultTimerange = Joi.object().keys({
  from: Joi.number().default(10).required(),
  to: Joi.number().default(12).required(),
});
/*const timetable = Joi.array()
  .length(7)
  .items(daytime)
 
  .required();*/

const DaySchema = Joi.number().min(0).max(6);

const ShiftSchema = Joi.object({
  slot: Joi.object({
    from: Joi.date().required(),
    to: Joi.date().required(),
  }).required(),
  days: Joi.array().min(1).items(DaySchema).required(),
});
const timetable = Joi.array().items(ShiftSchema).required();

//properties
const availableServices = Joi.array().items(AvailableServiceSchema).required();

const rooms = Joi.array().items(RoomSchema).required();

export const LibrarySchema = Joi.object({
  name,
  street,
  city,
  timetable,
  availableServices,
  rooms,
  imageFilename,
}).meta({
  className: 'Library',
});

function emptyDay(): Joi.ArraySchema {
  return Joi.array().default([]);
}
