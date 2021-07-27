import {
  AnyParamConstructor,
  DocumentType,
} from '@typegoose/typegoose/lib/types';
import { CreateQuery } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { Error } from '@asw-project/shared/errors';
import AbstractService from '../AbstractService';
import { DocumentCreationError, handleCreationError } from './documentCreation';

type CreateError = DocumentCreationError;

export class Create<
  T extends AnyParamConstructor<any>,
> extends AbstractService<T> {
  create(
    query: CreateQuery<InstanceType<T>>,
  ): EitherAsync<Error<CreateError>, DocumentType<T>> {
    return EitherAsync(() => this.model.create(query)).mapLeft(
      handleCreationError,
    );
  }
}
