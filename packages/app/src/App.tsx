import { Provider } from 'jotai';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Editor from './components/editor';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Search from './pages/Search';
import Secret from './pages/Secret';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/_protected';
import Place from './pages/Place';
import BookingPage from './pages/library/BookingPage';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/search" component={Search} />
          <ProtectedRoute exact path="/secret" component={Secret} />
          <Route exact path="/places/:id" component={Place} />
          <Route exact path="/room/:roomId/book" component={BookingPage} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
