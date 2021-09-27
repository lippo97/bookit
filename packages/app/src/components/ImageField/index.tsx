import imagePlaceholder from '@/assets/image_placeholder.png';
import { useNotification } from '@/stores/notifications';
import { Box, makeStyles, Paper } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/Photo';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface ImageFieldProps {
  readonly alt?: string;
  readonly value: File | undefined;
  readonly initial?: string;
  onChange(file: File): void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '&:hover .hover': {
      opacity: 1,
    },
  },
  label: {
    height: '100%',
  },
  image: {
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    height: 'auto',
  },
  hover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: theme.shape.borderRadius,
    transition: '.5s ease',
    opacity: 0,
    cursor: 'pointer',
  },
}));

export const ImageField = ({
  alt,
  value,
  initial,
  onChange,
}: ImageFieldProps) => {
  const classes = useStyles();
  const pushNotification = useNotification((s) => s.pushNotification);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? [];
    const uploadedImage = files[0];
    if (uploadedImage === undefined) return;
    if (uploadedImage.size > 1024 * 1024 * 2) {
      pushNotification({
        message: 'The image you provided is too big',
        severity: 'error',
      });
      return;
    }
    onChange(uploadedImage);
    pushNotification({
      message: 'Image loaded successfully',
      severity: 'info',
    });
  };

  // const switchValue = (v: Image) => (isString(v) ? v : URL.createObjectURL(v));
  const switchValue = () => {
    if (value !== undefined) return URL.createObjectURL(value);
    if (initial !== undefined) return initial;
    return imagePlaceholder;
  };

  const imageSrc = switchValue();

  return (
    <Paper elevation={2} className={classes.root}>
      <label htmlFor="image" className={classes.label}>
        <Box
          className={clsx(classes.hover, 'hover')}
          display="flex"
          flexDirection="column"
        >
          <PhotoIcon fontSize="large" />
          Click here to upload a new image
        </Box>
        <img className={classes.image} src={imageSrc} alt={alt} />
        <input
          id="image"
          accept="image/*"
          type="file"
          hidden
          onChange={handleChange}
        />
      </label>
    </Paper>
  );
};
