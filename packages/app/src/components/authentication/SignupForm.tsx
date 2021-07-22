import { Avatar, Typography } from '@material-ui/core';
import { PersonAddOutlined as PersonAddIcon } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import Link from '../Link';
import Copyright from '../Copyright';
import Alert from './Alert';
import CustomButton from './Button';
import useStyles from './style';
import CustomTextField from './TextField';

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface SignUpFormProps {
  readonly isLoading: boolean;

  readonly errors: string[];

  handleSubmit(email: string, password: string): void;
}

interface FormValue {
  readonly email: string;

  readonly password: string;

  readonly passwordConfirmation: string;
}

function SignupForm({ isLoading, errors, handleSubmit }: SignUpFormProps) {
  const onSubmit = ({ email, password, passwordConfirmation }: FormValue) => {
    handleSubmit(email, password);
  };

  const classes = useStyles();
  const {
    register,
    handleSubmit: internalHandleSubmit,
    watch,
    formState: { errors: validationErrors },
  } = useForm<FormValue>();

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}>
        <PersonAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={internalHandleSubmit(onSubmit)}>
        {errors.map((e) => (
          <Alert key={e} body={e} />
        ))}
        <CustomTextField
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message}
          id="email"
          type="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: true,
            pattern: { value: emailRegexp, message: 'Enter a valid email address.' },
          })}
        />
        <CustomTextField
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message}
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register('password', {
            required: true,
            minLength: { value: 7, message: 'The password should be at least 7 characters long.' },
          })}
        />
        <CustomTextField
          error={!!validationErrors.passwordConfirmation}
          helperText={validationErrors.passwordConfirmation?.message}
          id="password-confirmation"
          label="Password confirmation"
          type="password"
          autoComplete="password-confirmation"
          {...register('passwordConfirmation', {
            required: true,
            minLength: 7,
            validate: (value) =>
              value === watch('password', '') || "Password confirmation doesn't match password.",
          })}
        />
        <CustomButton isLoading={isLoading}>Sign in</CustomButton>
      </form>
      <Typography component="p" variant="subtitle1" className={classes.signupLink}>
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
      <Copyright />
    </div>
  );
}

export default SignupForm;
