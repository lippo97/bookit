import { HTTPError } from 'ky';
import { Redirect, useHistory } from 'react-router-dom';
import { SideImagePage } from '../components/authentication/SideImagePage';
import SignupForm from '../components/authentication/SignupForm';
import library2 from '../static/library2.jpg';
import { BACKEND_URL } from '../config';
import { useAtom } from 'jotai';
import { authentication } from '../state/authentication';
import { SignupSuccess } from '@asw-project/shared/authentication/dto/signup';
import { useState } from 'react';
import ky from '../config/ky';

function Signup() {
  const [user, setUser] = useAtom(authentication);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  if (user !== null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (email: string, password: string) => {
    try {
      setErrors([]);
      setLoading(true);
      const success = await ky
        .post('signup', {
          json: {
            email,
            password,
            passwordConfirmation: password,
          },
        })
        .json<SignupSuccess>();
      setUser(success);
      history.push('/');
    } catch (err) {
      if (err instanceof HTTPError && err.response.status === 409) {
        setErrors(['This email is already taken.']);
      } else {
        setErrors(['Whoops! Something went wrong. Try to reload the page.']);
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SideImagePage image={library2}>
      <SignupForm errors={errors} handleSubmit={handleSubmit} isLoading={isLoading} />
    </SideImagePage>
  );
}

export default Signup;
