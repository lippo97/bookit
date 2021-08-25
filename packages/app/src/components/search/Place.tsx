import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Place as TPlace } from '@asw-project/shared/types/place';
import { Link as RouterLink } from 'react-router-dom';

interface PlaceProps {
  readonly place: TPlace;
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

function Place({ place: { name, address, id } }: PlaceProps) {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea component={RouterLink} to={`places/${id}`}>
        <CardMedia
          image="https://source.unsplash.com/random/800x600"
          title="Presentation image"
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Place;
