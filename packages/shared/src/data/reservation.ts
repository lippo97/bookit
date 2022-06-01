import Joi from 'joi';

const seatId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Seat',
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

// user that reserves
const ownerId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Authentication',
    },
  });
const timeSlot = Joi.object({
  from: Joi.date().required(),
  to: Joi.date().required(),
}).required();

const date = Joi.date().required();

export const ReservationSchema = Joi.object({
  ownerId,
  roomId,
  seatId,
  timeSlot,
  date,
}).meta({
  className: 'Reservation',
});
