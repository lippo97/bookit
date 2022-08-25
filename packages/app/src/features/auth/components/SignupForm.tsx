import {
  Avatar,
  IconButton,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import { SignupRequestSchema } from '@asw-project/shared/data/requests/signup/request';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useState } from 'react';
import Link from '@/components/Link';
import Copyright from '@/components/Copyright';
import { Alert } from './Alert';
import { Button } from '../../../components/Button';
import { useStyles } from './style';
import { TextField } from './TextField';

interface SignUpFormProps {
  readonly isLoading: boolean;

  readonly errors: string[];

  handleSubmit(email: string, password: string): void;
}

interface FormValue {
  readonly email: string;

  readonly password: string;
}

export const SignupForm = ({
  isLoading,
  errors,
  handleSubmit,
}: SignUpFormProps) => {
  const [visible, setVisible] = useState(false);

  const onSubmit = ({ email, password }: FormValue) => {
    handleSubmit(email, password);
  };

  const handleChangePasswordVisibility = () => setVisible((prev) => !prev);

  const classes = useStyles();
  const {
    register,
    handleSubmit: internalHandleSubmit,
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
        <TextField
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
        <TextField
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
        <Button isLoading={isLoading}>Sign up</Button>
      </form>
      <Typography
        component="p"
        variant="subtitle1"
        className={classes.signupLink}
      >
        Already have an account? <Link to="/auth/login">Log in</Link>
      </Typography>
      <Copyright />
    </div>
  );
};
