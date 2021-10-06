import {
  Box,
  BoxProps,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { To } from 'history';
import { Link as RouterLink, useLocation } from 'react-router-dom';

interface DrawerItemLinkProps {
  readonly link: true;
  readonly to: To;
}

interface DrawerItemNoLinkProps {
  readonly link?: never;
  readonly to?: never;
}

interface CommonProps {
  readonly content: string;
  readonly icon?: React.ReactNode;
}

type DrawerItemProps = (DrawerItemLinkProps | DrawerItemNoLinkProps) &
  CommonProps;

const MyListItemText = styled(Typography)({
  fontSize: '0.9em',
  fontWeight: 600,
});

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: 4,
  },
  selectedItem: {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
  },
  selectedIcon: {
    color: theme.palette.primary.main,
  },
}));

const Wrapper = (props: BoxProps) => (
  <Box mr={0.5} ml={0.5} p={0.5} {...props} />
);

export const DrawerItem = ({ content, link, icon, to }: DrawerItemProps) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  const selected = to === pathname;

  return (
    <Wrapper>
      <ListItem
        button
        component={link ? RouterLink : 'div'}
        to={to}
        className={[
          classes.item,
          selected ? classes.selectedItem : undefined,
        ].join(' ')}
        // className={classes.listItem}
      >
        <ListItemIcon className={selected ? classes.selectedIcon : undefined}>
          {icon || ''}
        </ListItemIcon>
        <MyListItemText>{content}</MyListItemText>
      </ListItem>
    </Wrapper>
  );
};
