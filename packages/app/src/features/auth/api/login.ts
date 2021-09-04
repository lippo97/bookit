import { ky } from '@/config';
import { LoginRequest } from '@asw-project/shared/generatedTypes/authentication/login/request';
import { LoginSuccess } from '@asw-project/shared/data/authentication/login/response';

export const loginWithEmailAndPassword = ({ email, password }: LoginRequest) =>
  ky
    .post('login', {
      json: {
        email,
        password,
      },
    })
    .json<LoginSuccess>();
