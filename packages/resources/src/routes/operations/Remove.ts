import { Error, unexpectedError } from '@asw-project/shared/errors';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { definedOrNotFound } from './documentFind';
import { FindByIdError, ProtectedFindByIdOptions } from './FindById';

export type RemoveError = FindByIdError;

export interface Remove<T> extends AbstractService<T> {
  remove(
    id: any,
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<RemoveError>, T>;
}

export class SimpleRemove<T> extends AbstractService<T> implements Remove<T> {
  remove(id: any): EitherAsync<Error<RemoveError>, T> {
    return EitherAsync(() => this.model.findByIdAndDelete(id).exec())
      .mapLeft(unexpectedError)
      .chain(definedOrNotFound);
  }
}
