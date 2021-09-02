import { makeStyles } from '@material-ui/core/styles';
import { getImageUrlOrFallback } from '../../config/images';

const useStyles = makeStyles(() => ({
  image: {
    height: '30vh',
    width: '100%',
    objectFit: 'cover',
  },
}));

interface ImageProps {
  src?: string;
}

export const LibraryImage = ({ src }: ImageProps) => {
  const classes = useStyles();

  return (
    <img
      className={classes.image}
      src={getImageUrlOrFallback(src)}
      alt="Library picture"
    />
  );
};
