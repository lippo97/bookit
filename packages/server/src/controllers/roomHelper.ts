/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LibraryService } from '../services/libraries';

const libraryService = new LibraryService();

function getUserId(session: any): string | undefined {
  if (session.userId !== undefined) {
    return session.userId;
  }
  return undefined;
}
export async function isLibraryOwner(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  const room: any = req.body;
  const { libraryId } = room;
  const roomOwner = getUserId(req.session);

  const result = await libraryService.findById(libraryId);
  result.caseOf({
    Right: (library) => {
      // eslint-disable-next-line eqeqeq
      if (library.ownerId == roomOwner) {
        return next();
      }

      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Left: (_error) => res.sendStatus(StatusCodes.NOT_FOUND),
  });
}

export async function removeOwnerId(
  req: Request<any, any, any>,
  res: Response,
  next: NextFunction,
) {
  if (req.body.ownerId) {
    delete req.body.ownerId;
  }
  return next();
}
