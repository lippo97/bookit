import { Error } from '@asw-project/shared/errors';
import { ObjectId } from 'mongodb';
import { UpdateWithAggregationPipeline } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { DocumentCreationError, handleCreationError } from './documentCreation';
import { definedOrNotFound } from './documentFind';
import { FindById, FindByIdError } from './FindById';

type EditError = DocumentCreationError | FindByIdError;
type UpdateParam = UpdateWithAggregationPipeline;
// TODO: investigate this
// type UpdateParam<T> = UpdateQuery<T> | UpdateWithAggregationPipeline;

export class Update<T> extends FindById<T> {
  update(id: ObjectId, update: UpdateParam): EitherAsync<Error<EditError>, T> {
    return EitherAsync(() =>
      this.model.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true,
      }),
    ) //
      .mapLeft(handleCreationError)
      .chain(definedOrNotFound);
  }
}
