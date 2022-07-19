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

const libraryId = Joi.string()
  .required()
  .meta({
    _mongoose: {
      type: 'ObjectId',
      ref: 'Library',
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
  from: Joi.string().required(),
  to: Joi.string().required(),
}).required();

const date = Joi.date().required();

export const ReservationSchema = Joi.object({
  ownerId,
  roomId,
  seatId,
  libraryId,
  timeSlot,
  date,
}).meta({
  className: 'Reservation',
});
