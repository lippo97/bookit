import { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import library2 from '@/assets/library2.jpg';
import { useMutation } from 'react-query';
import { ReturnedUser } from '@asw-project/shared/data/authentication/returnedUser';
import { SignupRequest } from '@asw-project/shared/generatedTypes/authentication/signup';
import { SignupForm } from '../components/SignupForm';
import { Layout } from '../components/Layout';
import { signupWithEmailAndPassword } from '../api/signup';

export function Signup() {
  const navigate = useNavigate();
  const { isLoading, mutate, error } = useMutation<
    ReturnedUser,
    Error,
    SignupRequest,
    unknown
  >(signupWithEmailAndPassword);

  const switchError = (_error: Error | null): string[] => {
    if (_error === null) {
      return [];
    }
    if (_error instanceof HTTPError && _error.response.status === 409) {
      return ['This email is already taken.'];
    }
    return ['Whoops! Something went wrong. Try to reload the page'];
  };

  const handleSubmit = (email: string, password: string) => {
    mutate(
      { email, password },
      {
        onSuccess: () => navigate('/'),
      },
    );
  };

  return (
    <Layout image={library2}>
      <SignupForm
        errors={switchError(error)}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
}
