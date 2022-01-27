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

const seatId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Seat',
    },
  });

const timeSlot = timeRange.required();

const date = Joi.date().required();

export const ReservationSchema = Joi.object({
  ownerId,
  seatId,
  timeSlot,
  date,
}).meta({
  className: 'Reservation',
});
