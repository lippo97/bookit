import { Error, unexpectedError } from '@asw-project/shared/errors';
import { NotFoundKind } from '@asw-project/shared/errors/kinds';
import { ObjectId } from 'mongodb';
import { Document, UpdateWithAggregationPipeline } from 'mongoose';
import { EitherAsync, Left, Right } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { DocumentCreationError } from './documentCreation';
import { FindByIdError, ProtectedFindByIdOptions } from './FindById';

export type EditError = DocumentCreationError | FindByIdError;
export type UpdateParam = UpdateWithAggregationPipeline;
// TODO: investigate this
// type UpdateParam<T> = UpdateQuery<T> | UpdateWithAggregationPipeline;

export interface Update<T> extends AbstractService<T> {
  update(
    id: ObjectId,
    update: UpdateParam,
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<EditError>, T>;
}

export const updateDocument =
  <T>(update: UpdateParam) =>
  (document: T & Document): EitherAsync<Error<EditError>, T> =>
    EitherAsync(() =>
      document
        .updateOne(update, {
          new: true,
          runValidators: true,
        })
        .exec(),
    );

export class SimpleUpdate<T> extends AbstractService<T> implements Update<T> {
  // eslint-disable-next-line no-underscore-dangle
  _checkNotFound(value: T | null): EitherAsync<Error<NotFoundKind>, T> {
    if (value) {
      return EitherAsync.liftEither(Right(value));
    }
    return EitherAsync.liftEither(Left({ kind: 'NotFound' } as const));
  }

  update(id: ObjectId, update: UpdateParam): EitherAsync<Error<EditError>, T> {
    return (
      EitherAsync(() =>
        this.model.findOneAndUpdate({ _id: id } as any, update, {
          new: true,
          runValidators: true,
        }),
      )
        // eslint-disable-next-line no-underscore-dangle
        .chain(this._checkNotFound)
        .mapLeft((err: any) => {
          console.log(err);
          return unexpectedError(err);
        })
    );
  }
}
