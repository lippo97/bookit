/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RoomService } from '../services/rooms';

const roomService = new RoomService();

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}

// eslint-disable-next-line consistent-return
export async function isRoomOwner(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  let seats: any[] = req.body;

  if (!Array.isArray(seats)) {
    seats = new Array(seats);
  } else {
    seats = Array.from(seats);
  }

  req.body = seats;
  const seatOwner = getUserId(req.session);
  const { roomId } = seats[0];
  // eslint-disable-next-line eqeqeq
  if (seats.every((element) => element.roomId == roomId)) {
    const result = await roomService.findById(roomId);
    result.caseOf({
      Right: (room) => {
        // eslint-disable-next-line eqeqeq
        if (room.ownerId == seatOwner) {
          return next();
        }
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Left: (_error) => res.sendStatus(StatusCodes.NOT_FOUND),
    });
  } else {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }
}

export async function removeOwnerId(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  let seats: any[] = req.body;

  if (!Array.isArray(seats)) {
    seats = new Array(seats);
  } else {
    seats = Array.from(seats);
  }

  req.body = seats;

  console.log('SEATS BEFORE:', seats);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < req.body.length; index++) {
    delete req.body[index].ownerId;
  }

  console.log('SEATS AFTER:', seats);

  return next();
}
