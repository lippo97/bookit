import { Avatar, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import Copyright from '../Copyright';
import Link from '../Link';
import Alert from './Alert';
import CustomButton from './Button';
import useStyles from './style';
import CustomTextField from './TextField';

interface LoginFormProps {
  readonly isLoading: boolean;

  readonly errors: string[];

  handleSubmit(email: string, password: string): void;
}

interface FormValue {
  readonly email: string;

  readonly password: string;
}

export default function LoginForm({ isLoading, errors, handleSubmit }: LoginFormProps) {
  const onSubmit = ({ email, password }: FormValue) => {
    handleSubmit(email, password);
  };
  const classes = useStyles();
  const { register, handleSubmit: internalHandleSubmit } = useForm<FormValue>();

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.form} noValidate onSubmit={internalHandleSubmit(onSubmit)}>
        {errors.map((e) => (
          <Alert key={e} body={e} />
        ))}
        <CustomTextField
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email')}
        />
        <CustomTextField
          id="password"
          label="Password"
          type="password"
          autoComplete="password"
          {...register('password')}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <CustomButton isLoading={isLoading}>Log in</CustomButton>
      </form>
      <Typography component="p" variant="subtitle1" className={classes.signupLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
      <Copyright />
    </div>
  );
}