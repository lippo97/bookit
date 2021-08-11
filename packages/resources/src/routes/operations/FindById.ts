/* eslint-disable max-classes-per-file */
import { Document } from 'mongoose';
import { Error, unexpectedError } from '@asw-project/shared/errors';
import {
  CastErrorKind,
  NotFoundKind,
  UnauthorizedKind,
} from '@asw-project/shared/errors/kinds';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';
import { definedOrNotFound } from './documentFind';

export type FindByIdError = NotFoundKind | CastErrorKind | UnauthorizedKind;

export type ProtectedFindByIdOptions = Partial<{
  userId: string;
}>;

export abstract class FindById<T> extends AbstractService<T> {
  abstract findById(
    id: any,
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<FindByIdError>, T & Document>;
}

export class SimpleFindById<T> extends FindById<T> {
  findById(
    id: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options?: ProtectedFindByIdOptions,
  ): EitherAsync<Error<FindByIdError>, T & Document> {
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
