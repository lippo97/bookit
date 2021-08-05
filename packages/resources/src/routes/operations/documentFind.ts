import { ExpectedError } from '@asw-project/shared/errors';
import { Kinds, NotFoundKind } from '@asw-project/shared/errors/kinds';
import { EitherAsync, Left, Right } from 'purify-ts';

export function definedOrNotFound<T>(
  document: T | null,
): EitherAsync<ExpectedError<NotFoundKind>, T> {
  return EitherAsync.liftEither(
    document === null
      ? Left({
          kind: Kinds.NotFound,
        })
      : Right(document),
  );
}
