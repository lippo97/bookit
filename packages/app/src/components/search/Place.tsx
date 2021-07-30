import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Place as TPlace } from '@asw-project/shared/types/place';

interface PlaceProps {
  readonly place: TPlace;
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

function Place({ place: { name, address } }: PlaceProps) {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
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
