import { EitherAsync, Left } from 'purify-ts';
import { Error } from '@asw-project/shared/errors';
import { UnauthorizedKind } from '@asw-project/shared/errors/kinds';
import { AbstractService } from '../AbstractService';
import { DocumentCreationError, handleCreationError } from './documentCreation';

type CreateError = DocumentCreationError | UnauthorizedKind;

type CreateOptions = Partial<{
  userId: string;
}>;

export class CreateMany<T> extends AbstractService<T> {
  createMany(
    query: T[],
    options?: CreateOptions,
  ): EitherAsync<Error<CreateError>, any> {
    const ownerId = options?.userId;
    if (ownerId === undefined) {
      return EitherAsync.liftEither(
        Left({
          kind: 'UnauthorizedError',
        }),
      );
    }

    const elements = query.map((obj) => ({ ...obj, ownerId }));

    return EitherAsync(() => this.model.create(elements)) //
      .mapLeft(handleCreationError);
  }
}
