import { EitherAsync, Left } from 'purify-ts';
import { Error } from '@asw-project/shared/errors';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';
import { AbstractService } from '../AbstractService';
import { DocumentCreationError, handleCreationError } from './documentCreation';

type CreateError = DocumentCreationError | UnauthorizedKind;

type CreateOptions = Partial<{
  userId: string;
}>;
export class Create<T> extends AbstractService<T> {
  create(
    query: T,
    options?: CreateOptions,
  ): EitherAsync<Error<CreateError>, T> {
    const ownerId = options?.userId;
    if (ownerId === undefined) {
      return EitherAsync.liftEither(
        Left({
          kind: 'UnauthorizedError',
        }),
      );
    }
    return EitherAsync(() => this.model.create({ ...query, ownerId })) //
      .mapLeft(handleCreationError);
  }
}
