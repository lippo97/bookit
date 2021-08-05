import { Error, unexpectedError } from '@asw-project/shared/errors';
import { CastErrorKind, NotFoundKind } from '@asw-project/shared/errors/kinds';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { definedOrNotFound } from './documentFind';

export type FindByIdError = NotFoundKind | CastErrorKind;

export class FindById<T> extends AbstractService<T> {
  findById(id: any): EitherAsync<Error<FindByIdError>, T> {
    return EitherAsync(() => this.model.findById(id))
      .mapLeft((err: any) => {
        if (err.name === 'CastError') {
          return {
            kind: 'CastError',
          } as const;
        }
        return unexpectedError(err);
      })
      .chain(definedOrNotFound);
  }
}
