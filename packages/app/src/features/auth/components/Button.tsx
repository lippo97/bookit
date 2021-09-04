import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const height = 36;

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

export const Button = ({ isLoading, children, ...props }: ButtonProps) => {
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
};
