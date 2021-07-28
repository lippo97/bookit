import { unexpectedError, UnexpectedError } from '@asw-project/shared/errors';
import {
  AnyParamConstructor,
  DocumentType,
} from '@typegoose/typegoose/lib/types';
import { FilterQuery, QueryFindOptions } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import AbstractService from '../AbstractService';

export class FindAll<
  T extends AnyParamConstructor<any>,
> extends AbstractService<T> {
  findAll(
    filterQuery: FilterQuery<DocumentType<T>>,
    projection?: any | null,
    options?: QueryFindOptions,
  ): EitherAsync<UnexpectedError, DocumentType<T>[]> {
    return EitherAsync(() => this.model.find(filterQuery, projection, options))
      .map((res) => res)
      .mapLeft(unexpectedError);
  }
}
