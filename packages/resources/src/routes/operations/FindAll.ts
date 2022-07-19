import { unexpectedError, UnexpectedError } from '@asw-project/shared/errors';
import { FilterQuery, QueryOptions, Document } from 'mongoose';
import { EitherAsync } from 'purify-ts';
import { WithId } from '@asw-project/shared/data/withId';
import { AbstractService } from '../AbstractService';

export class FindAll<T> extends AbstractService<T> {
  findAll(
    filterQuery: FilterQuery<T & Document<any, any, any>>,
    projection?: any | null,
    options?: QueryOptions,
  ): EitherAsync<UnexpectedError, WithId<T>[]> {
    return EitherAsync(() => this.model.find(filterQuery, projection, options))
      .map((res) => res as any)
      .mapLeft(unexpectedError);
  }
}
