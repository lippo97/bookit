import { ExpectedError } from '.';
import { Kinds } from './kinds';

/**
 * ValidationError is a specialized kind of error which is expected by the programmer,
 * it carries the sources of the errors, so that they can be sent back.
 */
export interface ValidationError
  extends ExpectedError<typeof Kinds.ValidationError> {
  readonly reason: Reason[];
}

export interface Reason {
  readonly property: string;
  readonly value: any;
  readonly constraints: Constraints;
}

export interface Constraints {
  [k: string]: string;
}

// function isValidationError<K extends string>(
//   err: ExpectedError<K>,
// ): err is ValidationError {
//   return err.kind === Kinds.ValidationError;
// }
