import { QueryContent } from '@/components/QueryContent';
import { useNotification } from '@/stores/notifications';
import background from '@/assets/bg.png';
import HomeIcon from '@material-ui/icons/Home';
import Link from '@/components/Link';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Layout } from '@/components/Layout';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { useQueryParams } from '@/hooks';
import { getLibraryRoomById, updateLibraryRoom } from '../../api/rooms';
import { LibraryFormLayout } from '../../components/LibraryFormLayout';
import RoomForm, { RoomFormValue } from '../../components/RoomForm';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: 'flex',
  },
}));

function EditRoom() {
  const { id, roomId } = useParams();
  const { pushNotification } = useNotification();
  const libraryName = useQueryParams('libraryName', '(library)');
  const navigate = useNavigate();
  const classes = useStyles();

  const { data, status } = useQuery(
    ['get room', roomId],
    () => getLibraryRoomById(id, roomId),
    {
      retry: false,
    },
  );

  const { control, setValue, handleSubmit } = useForm<RoomFormValue>({
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

  useEffect(() => {
    if (data?.name !== undefined) {
      setValue('name', data.name);
      setValue('accessibility', data.accessibility);
    }
    if (status === 'error') {
      navigate(`/dashboard/libraries/${id}`);
    }
  }, [data, status]);

  const onSubmit = handleSubmit(async ({ name, accessibility }) => {
    try {
      await updateLibraryRoom(id, roomId, name, accessibility);
      pushNotification({
        message: 'Room updated successfully!',
        severity: 'success',
      });
      navigate(`/dashboard/libraries/${id}`);
    } catch (err) {
      console.error(err);
      pushNotification({
        message: "Couldn't update library, retry later.",
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
            <Link color="inherit" className={classes.link} to="/dashboard">
              <HomeIcon className={classes.icon} />
              Dashboard
            </Link>
            <Link
              color="inherit"
              className={classes.link}
              to={`/dashboard/libraries/${id}`}
            >
              {libraryName}
            </Link>
            <Typography color="textPrimary" className={classes.link}>
              Edit room
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

export default EditRoom;
