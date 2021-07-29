import { ExpectedError } from '@asw-project/shared/errors';
import { Kinds, NotFoundKind } from '@asw-project/shared/errors/kinds';
import { DocumentType } from '@typegoose/typegoose';
import { EitherAsync, Left, Right } from 'purify-ts';

export function definedOrNotFound<T>(
  document: DocumentType<T> | null,
): EitherAsync<ExpectedError<NotFoundKind>, DocumentType<T>> {
  return EitherAsync.liftEither(
    document === null
      ? Left({
          kind: Kinds.NotFound,
        })
      : Right(document),
  );
}
