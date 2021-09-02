import { Building as TBuilding } from '@asw-project/shared/generatedTypes/building';
import { WithId } from '@asw-project/shared/data/withId';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { getImageUrlOrFallback } from '../../config/images';

interface BuildingProps {
  readonly data: WithId<TBuilding>;
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

function Building({
  data: { _id, name, street, imageFilename },
}: BuildingProps) {
  const classes = useStyles();
  const image = getImageUrlOrFallback(imageFilename);

  console.log(image);
  return (
    <Card>
      <CardActionArea component={RouterLink} to={`places/${_id}`}>
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

export default Building;
