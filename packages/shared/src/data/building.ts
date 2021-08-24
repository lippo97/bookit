import Joi from 'joi';
import { RoomSchema } from './room';
import { AvalaibleServiceSchema } from './avalaibleService';

const name = Joi.string().required();

const street = Joi.string().required();

const city = Joi.string().required();

//
const timeRange = Joi.object().keys({
  from: Joi.number().required(),
  to: Joi.number().required(),
});
const daytime = Joi.array().items(timeRange);
//

const timetable = Joi.array()
  .length(7)
  .items(daytime)
  .default([
    [
      {
        from: 8,
        to: 12,
      },

      { from: 13, to: 17 },
    ],
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
  ])
  .required();

const posts = Joi.array().items(Joi.string()).required();

//properties
const avalaibleServices = Joi.array().items(AvalaibleServiceSchema).required();

const rooms = Joi.array().items(RoomSchema).required();

export const BuildingSchema = Joi.object({
  name,
  street,
  city,
  timetable,
  posts,
  avalaibleServices,
  rooms,
}).meta({
  className: 'Building',
});

function emptyDay(): any {
  Joi.array().default([]);
}
