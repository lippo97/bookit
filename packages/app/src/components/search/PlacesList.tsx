import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Place as TPlace } from '@asw-project/shared/types/place';
import Place from './Place';

interface PlacesListProps {
  readonly places: TPlace[];
}

function PlacesList({ places }: PlacesListProps) {
  return (
    <div>
      <Grid container spacing={5}>
        {places.map((p) => (
          <Grid item xs={12} sm={6} lg={4}>
            <Place place={p} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PlacesList;
