import { FC } from 'react';
import { styled } from '@material-ui/core';

const Outer = styled('div')(({ theme }) => ({
  flex: 1,
  height: '100%',
  width: '100%',
  overflow: 'scroll',
  border: '1px solid #aaa',
}));

export const Window: FC = ({ children }) => <Outer>{children}</Outer>;
