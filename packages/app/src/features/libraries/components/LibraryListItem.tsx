import { Library as TLibrary } from '@asw-project/shared/generatedTypes/library';
import { WithId } from '@asw-project/shared/data/withId';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { getImageUrlOrFallback } from '@/lib/images';

interface LibraryProps {
  readonly data: WithId<TLibrary>;
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

export function LibraryListItem({
  data: { _id, name, street, imageFilename },
}: LibraryProps) {
  const classes = useStyles();
  const image = getImageUrlOrFallback(imageFilename);

  return (
    <Card>
      <CardActionArea component={RouterLink} to={`/libraries/${_id}`}>
        <CardMedia
          image={image}
          title="Presentation image"
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {street}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
