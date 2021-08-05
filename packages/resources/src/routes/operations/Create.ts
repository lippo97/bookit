import { EitherAsync } from 'purify-ts';
import { Error } from '@asw-project/shared/errors';
import { AbstractService } from '../AbstractService';
import { DocumentCreationError, handleCreationError } from './documentCreation';

type CreateError = DocumentCreationError;

export class Create<T> extends AbstractService<T> {
  create(query: T): EitherAsync<Error<CreateError>, T> {
    return EitherAsync(() => this.model.create(query)) //
      .mapLeft(handleCreationError);
  }
}
