/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
type ErrorBaseKind = 'InternalError';

interface BaseError {
  readonly kind: string;
  readonly body?: string;
}

export interface KindError<Kind extends string> extends BaseError {
  readonly kind: Kind;
}

export interface InternalErrorType extends KindError<'InternalError'> {
  readonly object: any;
}

export type Error<K extends string> = KindError<K> | InternalErrorType;

type Wrapped<E> = { error: E };

export const InternalError = (err: any): Wrapped<InternalErrorType> => ({
  error: {
    kind: 'InternalError',
    body: 'Whoops! Something bad happened.',
    object: err,
  },
});
