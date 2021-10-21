import { Tooltip, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { getLibraryImageUrlOrFallback } from '@/lib/images';

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
  tooltip: {
    position: 'absolute',
    bottom: '-28px',
    right: '16px',
  },
  starredIcon: {
    color: '#ffbe46',
  },
  unstarredIcon: {
    color: '#808080',
  },
}));

interface LibraryHeaderProps {
  src?: string;
  isStarred?: boolean;
  onStar?: () => void;
}

export const LibraryHeader = ({
  src,
  isStarred,
  onStar,
}: LibraryHeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.image}
        src={getLibraryImageUrlOrFallback(src)}
        alt="The library"
      />
      {isStarred !== undefined && (
        <>
          <div className={classes.starBg} />
          <Tooltip title="Favorite" className={classes.tooltip}>
            <Fab color="default" aria-label="favorite" onClick={onStar}>
              <StarIcon
                className={
                  isStarred ? classes.starredIcon : classes.unstarredIcon
                }
              />
            </Fab>
          </Tooltip>
        </>
      )}
    </div>
  );
};
