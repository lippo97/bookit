import { ExpectedError } from '@asw-project/shared/errors';
import { DocumentType } from '@typegoose/typegoose';
import { EitherAsync, Left, Right } from 'purify-ts';

export function definedOrNotFound<T>(
  document: DocumentType<T> | null,
): EitherAsync<ExpectedError<'NotFound'>, DocumentType<T>> {
  return EitherAsync.liftEither(
    document === null
      ? Left({
          kind: 'NotFound',
        })
      : Right(document),
  );
}
