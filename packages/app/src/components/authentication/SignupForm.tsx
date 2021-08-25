import {
  Avatar,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SignupRequestSchema } from '@asw-project/shared/data/authentication/signup/request';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Link from '../Link';
import Copyright from '../Copyright';
import Alert from './Alert';
import CustomButton from './Button';
import useStyles from './style';
import CustomTextField from './TextField';
import { useState } from 'react';

interface SignUpFormProps {
  readonly isLoading: boolean;

  readonly errors: string[];

  handleSubmit(email: string, password: string): void;
}

interface FormValue {
  readonly email: string;

  readonly password: string;
}

function SignupForm({ isLoading, errors, handleSubmit }: SignUpFormProps) {
  const [visible, setVisible] = useState(false);

  const onSubmit = ({ email, password }: FormValue) => {
    handleSubmit(email, password);
  };

  const handleChangePasswordVisibility = () => setVisible((prev) => !prev);

  const classes = useStyles();
  const {
    register,
    handleSubmit: internalHandleSubmit,
    watch,
    formState: { errors: validationErrors },
  } = useForm<FormValue>({
    resolver: joiResolver(SignupRequestSchema),
  });

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}>
        <PersonAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={internalHandleSubmit(onSubmit)}
      >
        {errors.map((e) => (
          <Alert key={e} body={e} />
        ))}
        <CustomTextField
          error={!!validationErrors.email}
          helperText={validationErrors.email?.message?.replace(
            '"email"',
            'Email address',
          )}
          id="email"
          type="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email')}
        />
        <CustomTextField
          error={!!validationErrors.password}
          helperText={validationErrors.password?.message?.replace(
            '"password"',
            'Password',
          )}
          id="password"
          label="Password"
          type={visible ? 'text' : 'password'}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleChangePasswordVisibility}>
                  {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password')}
        />
        <CustomButton isLoading={isLoading}>Sign in</CustomButton>
      </form>
      <Typography
        component="p"
        variant="subtitle1"
        className={classes.signupLink}
      >
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
      <Copyright />
    </div>
  );
}

export default SignupForm;
