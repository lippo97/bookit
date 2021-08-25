import ky from '../config/ky';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAtom } from 'jotai';
import { authentication } from '../state/authentication';
import LoadingPage from '../components/Loading';

function Logout() {
  const [user, setUser] = useAtom(authentication);
  const history = useHistory();

  useEffect(() => {
    if (user === null) {
      history.push('/');
    } else {
      ky.post('logout').finally(() => {
        setUser(null);
        history.push('/');
      });
    }
  }, []);

  return <LoadingPage />;
}

export default Logout;
