import { ky } from '@/config';
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
    // .void()
    .then(() => {});
