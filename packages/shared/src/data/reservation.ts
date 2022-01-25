import Joi from 'joi';
import { timeRange } from './library';

const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Authentication',
    },
  });

const roomId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Room',
    },
  });

const timeSlot = timeRange.required();

const date = Joi.date().required();

export const ReservationSchema = Joi.object({
  ownerId,
  roomId,
  timeSlot,
  date,
}).meta({
  className: 'Reservation',
});
