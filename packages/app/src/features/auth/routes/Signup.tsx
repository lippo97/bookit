import { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import library2 from '@/assets/library2.jpg';
import { useMutation } from 'react-query';
import { SignupForm } from '../components/SignupForm';
import { Layout } from '../components/Layout';
import { signupWithEmailAndPassword } from '../api/signup';

export function Signup() {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(signupWithEmailAndPassword);

  const handleSubmit = (email: string, password: string) => {
    setErrors([]);
    mutate(
      { email, password },
      {
        onSuccess: () => navigate('/'),
        onError: (err) => {
          if (err instanceof HTTPError && err.response.status === 409) {
            setErrors(['This email is already taken.']);
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
    <Layout image={library2}>
      <SignupForm
        errors={errors}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
}
