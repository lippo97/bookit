import { Error } from '@asw-project/shared/errors';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';
import { ObjectId } from 'mongodb';
import { UpdateWithAggregationPipeline } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { DocumentCreationError } from './documentCreation';
import { FindByIdError, ProtectedFindByIdOptions } from './FindById';
import { HasOwner, ProtectedFindById } from './ProtectedFindById';
import { Update, updateDocument } from './Update';

type EditError = DocumentCreationError | FindByIdError | UnauthorizedKind;
type UpdateParam = UpdateWithAggregationPipeline;

export class ProtectedUpdate<T extends HasOwner>
  extends ProtectedFindById<T>
  implements Update<T>
{
  update(
    id: ObjectId,
    update: UpdateParam,
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<EditError>, T> {
    return super.findById(id, options).chain(updateDocument(update));
  }
}
