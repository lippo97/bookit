import { ErrorMap } from '.';

export type DuplicateIdentifier = 'DuplicateIdentifier';

export type CastError = 'CastError';

export type NotFound = 'NotFound';

export type ValidationError = 'ValidationError';

export type SyntaxError = 'SyntaxError';

type AllErrors =
  | DuplicateIdentifier
  | CastError
  | NotFound
  | ValidationError
  | SyntaxError;

export const Errors: ErrorMap<AllErrors> = {
  NotFound: 'NotFound',
  CastError: 'CastError',
  DuplicateIdentifier: 'DuplicateIdentifier',
  SyntaxError: 'SyntaxError',
  ValidationError: 'ValidationError',
};
