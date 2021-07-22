import { Link as MaterialLink, LinkProps as MaterialLinkProps } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { LocationDescriptor } from 'history';

type LinkProps = MaterialLinkProps & {
  to: LocationDescriptor;
};

function Link(props: LinkProps) {
  return <MaterialLink component={RouterLink} {...props} />;
}

export default Link;
