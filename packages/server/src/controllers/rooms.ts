/* import { NextFunction, Request, Response } from 'express';
import { RoomService } from '../services/rooms';

const roomService = new RoomService();

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const result = await roomService.findAll({});
  result.caseOf({
    Right: (documents) => res.json(documents),
    Left: next,
  });
}

export async function remove(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const result = await roomService.remove(req.params.id);
  result.caseOf({
    Right: (room) => res.json(room),
    Left: next,
  });
}
*/
