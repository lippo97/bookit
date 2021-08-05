import { unexpectedError, UnexpectedError } from '@asw-project/shared/errors';
import { FilterQuery, QueryOptions, Document } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { AbstractService } from '../AbstractService';

export class FindAll<T> extends AbstractService<T> {
  findAll(
    filterQuery: FilterQuery<T & Document<any, any, any>>,
    projection?: any | null,
    options?: QueryOptions,
  ): EitherAsync<UnexpectedError, T[]> {
    return EitherAsync(() => this.model.find(filterQuery, projection, options))
      .map((res) => res)
      .mapLeft(unexpectedError);
  }
}
