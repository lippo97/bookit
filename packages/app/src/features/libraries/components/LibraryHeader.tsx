import { Tooltip, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Favorite';
import { PageHeader } from '@/components/PageHeader';
import background from '@/assets/missing_image.png';

const useStyles = makeStyles(() => ({
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
    color: '#dd4e4e',
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
    <PageHeader>
      <img
        className={classes.image}
        src={src ?? background}
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
    </PageHeader>
  );
};
