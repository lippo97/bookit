import { useAtom } from 'jotai';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { authentication } from '../state/authentication';

export default function ifNotLoggedIn(component: React.ComponentType): () => React.ComponentType {
  return () => {
    const [user] = useAtom(authentication);
    const history = useHistory();

    console.log(history);
    if (user !== null) {
      history.push('/');
    }
    return component;
  };
}
