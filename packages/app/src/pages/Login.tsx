import { LoginSuccess } from '@asw-project/shared/src/data/authentication/login/response';
import { useAtom } from 'jotai';
import { HTTPError } from 'ky';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ky from '../config/ky';
import LoginForm from '../components/authentication/LoginForm';
import { SideImagePage } from '../components/authentication/SideImagePage';
import { authentication } from '../state/authentication';
import image from '../static/library.jpg';

function Login() {
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
        .post('login', {
          json: {
            email,
            password,
          },
        })
        .json<LoginSuccess>();
      setUser(success);
      history.push('/');
    } catch (err) {
      if (err instanceof HTTPError && err.response.status === 401) {
        setErrors(['Wrong username or password.']);
      } else {
        setErrors(['Whoops! Something went wrong. Try to reload the page.']);
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SideImagePage image={image}>
      <LoginForm
        errors={errors}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </SideImagePage>
  );
}

export default Login;
