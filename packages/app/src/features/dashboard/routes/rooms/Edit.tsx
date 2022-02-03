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
  Link as MuiLink,
  Typography,
} from '@material-ui/core';
import { Layout } from '@/components/Layout';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { useQueryParams } from '@/hooks';
import { getRoomById, updateRoom } from '../../api/rooms';

// eslint-disable-next-line import/no-named-as-default
import RoomForm, { RoomFormValue } from '../../components/RoomForm';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: 'flex',
    cursor: 'pointer',
  },
}));

function EditRoom() {
  const { id: libraryId, roomId } = useParams();
  const { pushNotification } = useNotification();
  const libraryName = useQueryParams('libraryName', '(library)');
  const navigate = useNavigate();
  const classes = useStyles();

  const { data, status } = useQuery(
    ['get room', roomId],
    () => getRoomById(roomId),
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
      accessibility: undefined,
    },
  });

  useEffect(() => {
    if (data?.name !== undefined && data?.accessibility !== undefined) {
      setValue('name', data.name);
      setValue('accessibility', data.accessibility);
    }
    if (status === 'error') {
      navigate(`/dashboard/libraries/${libraryId}`);
    }
  }, [data, status]);

  const onSubmit = handleSubmit(async ({ name, accessibility }) => {
    try {
      await updateRoom(roomId)({ name, accessibility });
      pushNotification({
        message: 'Room updated successfully!',
        severity: 'success',
      });
      navigate(`/dashboard/libraries/${libraryId}`);
    } catch (err) {
      console.error(err);
      pushNotification({
        message: 'Unable to update room, retry later.',
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
              Edit room
            </Typography>
          </Breadcrumbs>
        </Box>
        <Paper elevation={2}>
          <Box padding={2}>
            <RoomForm
              formControl={control}
              onSubmit={onSubmit}
              onBack={() => navigate(`/dashboard/libraries/${libraryId}`)}
              buttonText="Add"
            />
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default EditRoom;
