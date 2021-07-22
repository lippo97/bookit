import { useAtom } from 'jotai';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { authentication } from '../state/authentication';

type ProtectedRouteProps = RouteProps;

function ProtectedRoute(props: ProtectedRouteProps) {
  const [user] = useAtom(authentication);
  return user !== null ? <Route {...props} /> : <Redirect to="/login" />;
}

export default ProtectedRoute;
