import { Error, unexpectedError } from '@asw-project/shared/errors';
import { CastErrorKind, NotFoundKind } from '@asw-project/shared/errors/kinds';
import {
  AnyParamConstructor,
  DocumentType,
} from '@typegoose/typegoose/lib/types';
import { EitherAsync } from 'purify-ts';
import AbstractService from '../AbstractService';
import { definedOrNotFound } from './documentFind';

export type FindByIdError = NotFoundKind | CastErrorKind;

export class FindById<
  T extends AnyParamConstructor<any>,
> extends AbstractService<T> {
  findById(id: any): EitherAsync<Error<FindByIdError>, DocumentType<T>> {
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
