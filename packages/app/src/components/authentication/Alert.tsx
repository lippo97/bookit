import { makeStyles } from '@material-ui/core';
import { Alert as MaterialAlert } from '@material-ui/lab';

interface AlertProps {
  readonly body: string;
}

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(2),
  },
}));

function Alert({ body }: AlertProps) {
  const classes = useStyles();

  return (
    <MaterialAlert className={classes.alert} severity="error">
      {body}
    </MaterialAlert>
  );
}

export default Alert;
