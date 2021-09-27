import { ky } from '@/config';
import { SignupSuccess } from '@asw-project/shared/data/requests/signup/response';
import { SignupRequest } from '@asw-project/shared/src/generatedTypes/requests/signup';

export const signupWithEmailAndPassword = ({
  email,
  password,
}: SignupRequest) =>
  ky
    .post('signup', {
      json: {
        email,
        password,
      },
    })
    .json<SignupSuccess>();
