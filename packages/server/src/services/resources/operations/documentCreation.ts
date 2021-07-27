import { Error, unexpectedError } from '@asw-project/shared/errors';

export type DocumentCreationError = 'DuplicateIdentifier' | 'ValidationError';

export function handleCreationError(err: any): Error<'DuplicateIdentifier'> {
  if (err.name === 'MongoError' && err.code === 11000) {
    return {
      kind: 'DuplicateIdentifier',
    };
  }
  return unexpectedError(err);
}
