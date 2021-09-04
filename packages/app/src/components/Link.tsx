import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = MuiLinkProps & {
  to: string;
};

function Link(props: LinkProps) {
  return <MuiLink component={RouterLink} {...props} />;
}

export default Link;
