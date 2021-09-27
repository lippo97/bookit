import { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/stores/authentication';
import image from '@/assets/library.jpg';
import { useMutation } from 'react-query';
import { LoginRequest } from '@asw-project/shared/src/generatedTypes/requests/login/request';
import { useNotification } from '@/stores/notifications';
import { LoginForm } from '../components/LoginForm';
import { Layout } from '../components/Layout';

export function Login() {
  const loginWithEmailAndPassword = useAuth((s) => s.loginWithEmailAndPassword);
  const navigate = useNavigate();
  const pushNotification = useNotification((s) => s.pushNotification);

  const { mutate, isLoading, error } = useMutation<
    void,
    Error,
    LoginRequest,
    unknown
  >(loginWithEmailAndPassword);

  const switchError = (_error: Error | null): string[] => {
    if (_error === null) {
      return [];
    }
    if (_error instanceof HTTPError && _error.response.status === 401) {
      return ['Wrong username or password.'];
    }
    return ['Whoops! Something went wrong. Try to reload the page.'];
  };

  const handleSubmit = async (email: string, password: string) => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
          pushNotification({
            message: 'Logged in successfully!',
            severity: 'info',
          });
          navigate(
            useAuth.getState().auth?.account ? '/' : '/settings/account/add',
          );
        },
      },
    );
  };

  return (
    <Layout image={image}>
      <LoginForm
        errors={switchError(error)}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Layout>
  );
}
