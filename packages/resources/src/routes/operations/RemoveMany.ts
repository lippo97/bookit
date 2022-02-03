import { Error } from '@asw-project/shared/errors';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { ProtectedFindByIdOptions } from './FindById';
import { RemoveError } from './Remove';

export interface RemoveMany<T> extends AbstractService<T> {
  removeMany(
    ids: any[],
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<RemoveError>, T[]>;
}
