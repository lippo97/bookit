import { Error, unexpectedError } from '@asw-project/shared/errors';
import {
  DuplicateIdentifierKind,
  Kinds,
  ValidationErrorKind,
} from '@asw-project/shared/errors/kinds';
import { Reason } from '@asw-project/shared/errors/ValidationError';
import flatMap from 'lodash/flatMap';
import values from 'lodash/values';

export type DocumentCreationError =
  | DuplicateIdentifierKind
  | ValidationErrorKind;

// declare function parseErrors(err: any): Reason[];

function parseErrors(errObj: any): Reason[] {
  function parseOne(error: any): Reason[] {
    const { value, path: property, kind, properties: message } = error;
    return [
      {
        value,
        property,
        constraints: {
          [kind]: message,
        },
      },
    ];
  }
  const { errors } = errObj;

  return flatMap(values(errors), parseOne);
}

export function handleCreationError(err: any): Error<DocumentCreationError> {
  if (err.name === 'ValidationError') {
    return {
      kind: Kinds.ValidationError,
      reason: parseErrors(err),
    } as Error<DocumentCreationError>;
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return {
      kind: Kinds.DuplicateIdentifier,
    };
  }
  return unexpectedError(err);
}
