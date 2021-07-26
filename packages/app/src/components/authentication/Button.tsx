import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

type ButtonProps = BaseButtonProps & {
  isLoading?: boolean;
};

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    height,
  },
  loading: {
    color: theme.palette.primary.contrastText,
  },
}));

const height = 36;
function Button({ isLoading, children, ...props }: ButtonProps) {
  const classes = useStyles();

  return (
    <BaseButton
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={(height * 2) / 3} className={classes.loading} />
      ) : (
        children
      )}
    </BaseButton>
  );
}

export default Button;
