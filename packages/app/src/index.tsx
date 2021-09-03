import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactDOM from 'react-dom';
import App from './App';

const myTheme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#ffa04d',
  //   },
  // },
});

const content = (
  <>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </>
);
ReactDOM.render(content, document.getElementById('app'));
