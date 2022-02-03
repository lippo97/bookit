import { Error } from '@asw-project/shared/errors';
import { ObjectId } from 'mongodb';
import { UpdateWithAggregationPipeline } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';
import { DocumentCreationError } from './documentCreation';
import { FindByIdError, ProtectedFindByIdOptions } from './FindById';
import { HasOwner, ProtectedFindById } from './ProtectedFindById';
import { updateDocument } from './Update';
import { UpdateMany } from './UpdateMany';

type EditError = DocumentCreationError | FindByIdError | UnauthorizedKind;
type UpdateParam = UpdateWithAggregationPipeline;

export class ProtectedUpdateMany<T extends HasOwner>
  extends ProtectedFindById<T>
  implements UpdateMany<T>
{
  updateMany(
    ids: ObjectId[],
    updates: UpdateParam[],
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<EditError>, T[]> {
    const results = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < ids.length; index++) {
      results.push(
        super
          .findById(ids[index], options)
          .chain(updateDocument(updates[index])),
      );
    }
    return EitherAsync.sequence(results);
  }
}
