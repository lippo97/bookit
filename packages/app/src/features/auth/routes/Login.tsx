import { HTTPError } from 'ky';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/stores/authentication';
import image from '@/assets/library.jpg';
import { useMutation } from 'react-query';
import { LoginForm } from '../components/LoginForm';
import { Layout } from '../components/Layout';

export function Login() {
  const loginWithEmailAndPassword = useAuth((s) => s.loginWithEmailAndPassword);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(loginWithEmailAndPassword);

  const handleSubmit = async (email: string, password: string) => {
    setErrors([]);
    mutate(
      { email, password },
      {
        onSuccess: () => navigate('/'),
        onError: (err) => {
          if (err instanceof HTTPError && err.response.status === 401) {
            setErrors(['Wrong username or password.']);
          } else {
            setErrors([
              'Whoops! Something went wrong. Try to reload the page.',
            ]);
            // eslint-disable-next-line no-console
            console.error(err);
          }
        },
      },
    );
  };

  return (
    <Layout image={image}>
      <LoginForm
        errors={errors}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
}
