import { ErrorMap, Error } from '@asw-project/shared/errors';
import { DuplicateIdentifierKind } from '@asw-project/shared/errors/kinds';
import { ReturnedUser } from '../returnedUser';

export type SignupErrorKind = DuplicateIdentifierKind;

export const SignupErrors: ErrorMap<SignupErrorKind> = {
  DuplicateIdentifier: 'DuplicateIdentifier',
};

export type SignupSuccess = ReturnedUser;

export type SignupFail = Error<SignupErrorKind>;

export const duplicateIdentifier = {
  kind: 'DuplicateIdentifier',
} as const;
