import { Tooltip, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
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
  tooltip: {
    position: 'absolute',
    bottom: '-28px',
    right: '16px',
  },
  fab: {},
  starIcon: {},
}));

interface LibraryHeaderProps {
  src?: string;
  isStarred: boolean;
  onStar: () => void;
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
        src={getImageUrlOrFallback(src)}
        alt="The library"
      />
      <div className={classes.starBg} />
      <Tooltip title="Bookmark" className={classes.tooltip}>
        <Fab
          color="default"
          aria-label="bookmark"
          onClick={onStar}
          className={classes.fab}
          style={{
            ...(isStarred
              ? {
                  background: '#fffddb',
                }
              : {}),
          }}
        >
          <BookmarkIcon
            style={{
              ...(isStarred
                ? {
                    color: 'yellow',
                  }
                : {
                    color: 'grey',
                  }),
            }}
          />
        </Fab>
      </Tooltip>
    </div>
  );
};
