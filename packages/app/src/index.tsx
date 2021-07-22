import { CssBaseline } from '@material-ui/core';
import ReactDOM from 'react-dom';
import App from './App';

const content = (
  <>
    <CssBaseline />
    <App />
  </>
);
ReactDOM.render(content, document.getElementById('app'));
