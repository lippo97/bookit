import { Layout } from '@/components/Layout';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import HomeIcon from '@material-ui/icons/Home';
import { useNotification } from '@/stores/notifications';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import {
  createRoutesFromChildren,
  useNavigate,
  useParams,
} from 'react-router-dom';
import background from '@/assets/bg.png';
import {
  Box,
  Breadcrumbs,
  Container,
  makeStyles,
  Typography,
  Paper,
  Link as MuiLink,
} from '@material-ui/core';
import Link from '@/components/Link';
import { useQueryParams } from '@/hooks';
import { createLibraryRoom } from '../../api/rooms';
import { RoomForm, RoomFormValue } from '../../components/RoomForm';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    cursor: 'pointer',
    display: 'flex',
  },
}));

function AddRoom() {
  const { id } = useParams();
  const libraryName = useQueryParams('libraryName', '(library)');
  const { pushNotification } = useNotification();
  const navigate = useNavigate();
  const classes = useStyles();

  const { control, handleSubmit } = useForm<RoomFormValue>({
    mode: 'onChange',
    resolver: joiResolver(
      Joi.object({
        name: Joi.string().required(),
        accessibility: Joi.boolean().required(),
      }),
    ),
    defaultValues: {
      accessibility: false,
    },
  });

  const onSubmit = handleSubmit(async ({ name, accessibility }) => {
    try {
      await createLibraryRoom(id, name, accessibility);
      console.log(name, accessibility);
      pushNotification({
        message: 'Room created successfully!',
        severity: 'success',
      });
      navigate(`/dashboard/libraries/${id}`);
    } catch {
      pushNotification({
        message: "Couldn't create library, retry later.",
        severity: 'error',
      });
    }
  });

  return (
    <Layout transparentAppBar>
      <LibraryHeader src={background} />
      <Container>
        <Box mt={2} mb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <Link color="inherit" className={classes.link} to="/dashboard">
              <HomeIcon className={classes.icon} />
              Dashboard
            </Link>
            <MuiLink
              color="inherit"
              className={classes.link}
              onClick={() => navigate(-1)}
            >
              {libraryName}
            </MuiLink>
            {/* eslint-enable jsx-a11y/anchor-is-valid */}
            <Typography color="textPrimary" className={classes.link}>
              Add new room
            </Typography>
          </Breadcrumbs>
        </Box>
        <Paper elevation={2}>
          <Box padding={2}>
            <RoomForm
              formControl={control}
              onSubmit={onSubmit}
              onBack={() => navigate(`/dashboard/libraries/${id}`)}
              buttonText="Add"
            />
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default AddRoom;
