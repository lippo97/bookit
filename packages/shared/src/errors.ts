/**
 * Expected error is a kind of error which is expected by the programmer,
 * so it's thrown on purpose and it is expected to be caught in some error
 * handling process.
 */
export interface ExpectedError<Kind extends string> {
  readonly kind: Kind;
  readonly message?: string;
}

/**
 * The kind of unexpected errors that can happen.
 */
type UnexpectedErrorKind = 'InternalError';

/**
 * A kind of an error which is neither expected nor wanted by the programmer.
 * It should be caught in an exception handling process, telling the user that
 * something unexpected happened. It carries the error object so that it can
 * be printed to the logs.
 */
export interface UnexpectedError {
  readonly kind: UnexpectedErrorKind;
  readonly body: any;
}

export type ErrorMap<Kind extends string> = Required<{ [k in Kind]: k }>;

export type Error<Kind extends string> = ExpectedError<Kind> | UnexpectedError;

// eslint-disable-next-line import/prefer-default-export
export const unexpectedError: (body: any) => UnexpectedError = (body) => ({
  kind: 'InternalError',
  body,
});
