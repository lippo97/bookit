import { IconButton } from '@material-ui/core';
import { To } from 'history';
import { Link as RouterLink } from 'react-router-dom';

interface LinkIconButtonProps {
  readonly to: To;
  readonly icon: React.ReactNode;
}

export const LinkIconButton = ({ to, icon }: LinkIconButtonProps) => (
  <IconButton component={RouterLink} to={to}>
    {icon}
  </IconButton>
);
