import { ky } from '@/config';
import { LoginRequest } from '@asw-project/shared/src/generatedTypes/requests/login/request';
import { LoginSuccess } from '@asw-project/shared/data/requests/login/response';

export const loginWithEmailAndPassword = ({ email, password }: LoginRequest) =>
  ky
    .post('login', {
      json: {
        email,
        password,
      },
    })
    .json<LoginSuccess>();
