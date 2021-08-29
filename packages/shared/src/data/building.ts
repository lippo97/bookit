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
const timetable = Joi.array()
  .length(7)
  .items({
    daytimes: Joi.array()
      .items(
        Joi.object()
          .keys({
            from: Joi.number().required(),
            to: Joi.number().required(),
          })
          .required(),
      )
      .required(),
  })
  .required()
  .default([
    [
      Joi.object().keys({
        from: Joi.number().default(10).required(),
        to: Joi.number().default(12).required(),
      }),
    ],
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
    emptyDay(),
  ]);

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

function emptyDay(): Joi.ArraySchema {
  return Joi.array().default([]);
}
