import { Error, unexpectedError } from '@asw-project/shared/errors';
import {
  DuplicateIdentifier,
  Errors,
  ValidationError,
} from '@asw-project/shared/errors/all';

export type DocumentCreationError = DuplicateIdentifier | ValidationError;

export function handleCreationError(err: any): Error<DocumentCreationError> {
  if (err.name === 'ValidationError') {
    return {
      kind: Errors.ValidationError,
    };
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return {
      kind: Errors.DuplicateIdentifier,
    };
  }
  return unexpectedError(err);
}
