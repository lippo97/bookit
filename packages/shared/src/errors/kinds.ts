import { ErrorMap } from '.';

export type DuplicateIdentifierKind = 'DuplicateIdentifier';

export type CastErrorKind = 'CastError';

export type BodyParseErrorKind = 'BodyParseError';

export type NotFoundKind = 'NotFound';

export type ValidationErrorKind = 'ValidationError';

export type AllBaseErrors =
  | DuplicateIdentifierKind
  | CastErrorKind
  | BodyParseErrorKind
  | NotFoundKind
  | ValidationErrorKind;

export const Kinds: ErrorMap<AllBaseErrors> = {
  NotFound: 'NotFound',
  CastError: 'CastError',
  BodyParseError: 'BodyParseError',
  DuplicateIdentifier: 'DuplicateIdentifier',
  ValidationError: 'ValidationError',
};
