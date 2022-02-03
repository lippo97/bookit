import { Error } from '@asw-project/shared/errors';
import { ObjectId } from 'mongodb';
import { Document, UpdateWithAggregationPipeline } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { DocumentCreationError } from './documentCreation';
import {
  FindByIdError,
  ProtectedFindByIdOptions,
  SimpleFindById,
} from './FindById';

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

export class SimpleUpdate<T> extends SimpleFindById<T> implements Update<T> {
  update(id: ObjectId, update: UpdateParam): EitherAsync<Error<EditError>, T> {
    return this.findById(id).chain(updateDocument(update));
  }
}
