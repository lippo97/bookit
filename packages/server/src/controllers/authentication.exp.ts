import {
  LoginFail,
  LoginRequest,
  LoginResponse,
  LoginSuccess,
} from '@asw-project/shared/dto/authentication/login';
import { Email, Password } from '@asw-project/shared/types/authentication';
import { Either, EitherAsync } from 'purify-ts';
import { Handler, wrap, wrapEither } from './handler.exp';
import * as authenticationService from '../services/authentication';

const loginHandler: Handler<LoginRequest, LoginResponse> = ({ email, password }) =>
  authenticationService.login(email, password);

declare function loginService(
  email: Email,
  password: Password,
): EitherAsync<LoginFail, LoginSuccess>;

const loginHandler2: Handler<LoginRequest, Either<LoginFail, LoginSuccess>> = ({
  email,
  password,
}) => loginService(email, password).run();

export const login = wrapEither(loginHandler2);

loginService('', '');

// export declare function login(params: { email: Email, password: Password }): EitherAsync<Error, void>;
