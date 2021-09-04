import { ky } from '@/config';
import { SignupSuccess } from '@asw-project/shared/data/authentication/signup/response';
import { SignupRequest } from '@asw-project/shared/generatedTypes/authentication/signup/';

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
