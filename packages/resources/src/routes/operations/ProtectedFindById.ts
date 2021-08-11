import { Error } from '@asw-project/shared/errors';
import {
  CastErrorKind,
  NotFoundKind,
  UnauthorizedKind,
} from '@asw-project/shared/errors/kinds';
import { RefType, Document } from 'mongoose';
import { EitherAsync, Left, Right } from 'purify-ts';
import { FindById, ProtectedFindByIdOptions, SimpleFindById } from './FindById';

export type FindByIdError = NotFoundKind | CastErrorKind | UnauthorizedKind;

export type HasOwner = { ownerId: RefType };

export class ProtectedFindById<T extends HasOwner>
  extends SimpleFindById<T>
  implements FindById<T>
{
  findById(
    id: any,
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<FindByIdError>, T & Document> {
    const userId = options?.userId;
    return super.findById(id).chain((t) => {
      console.log('compare', options?.userId === t.ownerId?.toString());
      return EitherAsync.liftEither(
        userId === undefined || t.ownerId?.toString() !== userId
          ? Left<Error<UnauthorizedKind>>({
              kind: 'UnauthorizedError',
            } as const)
          : Right(t),
      );
    });
  }
}
