import { LinkIconButton } from '@/components/LinkIconButton';
import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink } from 'react-router-dom';
import BusinessIcon from '@material-ui/icons/Business';

interface LibraryListItemProps {
  readonly data: WithId<Library>;
  refetch(): void;
}

export const LibraryListItem = ({
  data: { name, city, street, _id },
  refetch,
}: LibraryListItemProps) => (
  <ListItem button component={RouterLink} to={`/dashboard/libraries/${_id}`}>
    <ListItemIcon>
      <BusinessIcon />
    </ListItemIcon>
    <ListItemText primary={name} secondary={`${street}, ${city}`} />
    <ListItemSecondaryAction>
      <LinkIconButton
        to={`/dashboard/libraries/${_id}/edit`}
        icon={<EditIcon />}
      />
      <LinkIconButton
        to={`/dashboard/libraries/${_id}/del`}
        icon={<DeleteIcon />}
      />
    </ListItemSecondaryAction>
  </ListItem>
);
