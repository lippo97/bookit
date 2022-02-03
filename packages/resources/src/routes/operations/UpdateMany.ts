import { Error } from '@asw-project/shared/errors';
import { ObjectId } from 'mongodb';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { ProtectedFindByIdOptions } from './FindById';
import { EditError, UpdateParam } from './Update';

export interface UpdateMany<T> extends AbstractService<T> {
  updateMany(
    ids: ObjectId[],
    updates: UpdateParam[],
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<EditError>, T[]>;
}
