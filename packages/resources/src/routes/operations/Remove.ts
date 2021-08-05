import { Error, unexpectedError } from '@asw-project/shared/errors';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { definedOrNotFound } from './documentFind';
import { FindByIdError } from './FindById';

type RemoveError = FindByIdError;

export class Remove<T> extends AbstractService<T> {
  remove(id: any): EitherAsync<Error<RemoveError>, T> {
    return EitherAsync(() => this.model.findByIdAndDelete(id).exec())
      .mapLeft(unexpectedError)
      .chain(definedOrNotFound);
  }
}
