import { Tooltip, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { getImageUrlOrFallback } from '../../config/images';

const useStyles = makeStyles(() => ({
  root: {
    height: '250px',
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  starBg: {
    position: 'absolute',
    bottom: '-35px',
    right: '9px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'white',
  },
  star: {
    position: 'absolute',
    bottom: '-28px',
    right: '16px',
  },
}));

interface ImageProps {
  src?: string;
  isStarred: boolean;
  onStar: () => void;
}

export const LibraryHeader = ({ src, isStarred, onStar }: ImageProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.image}
        src={getImageUrlOrFallback(src)}
        alt="The library"
      />
      <div className={classes.starBg} />
      <Tooltip title="Star" className={classes.star}>
        <Fab color="primary" aria-label="star" onClick={onStar}>
          <StarIcon color={isStarred ? 'secondary' : 'inherit'} />
        </Fab>
      </Tooltip>
    </div>
  );
};
