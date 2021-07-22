import { Provider } from 'jotai';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Secret from './pages/Secret';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/_protected';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <ProtectedRoute exact path="/secret" component={Secret} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
