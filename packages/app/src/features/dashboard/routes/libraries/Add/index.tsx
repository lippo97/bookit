import { Layout } from '@/components/Layout';
import {
  createLibrary,
  CreateLibraryArg,
} from '@/features/dashboard/api/getLibraries';
import {
  LibraryForm,
  LibraryFormValue,
} from '@/features/dashboard/components/LibraryForm';
import { convertTimetableToDbFormat } from '@/lib/timetable/conversions';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { useNotification } from '@/stores/notifications';
import { city, name, street } from '@asw-project/shared/data/library';
import { Library } from '@asw-project/shared/generatedTypes';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import background from '@/assets/bg.png';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import HomeIcon from '@material-ui/icons/Home';
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

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

export const AddLibrary = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const pushNotification = useNotification((s) => s.pushNotification);
  const { control, handleSubmit } = useForm<LibraryFormValue>({
    mode: 'onChange',
    resolver: joiResolver(
      Joi.object({
        basicInfo: Joi.object({
          name,
          city,
          street,
        }),
        isTermAccepted: Joi.boolean().required(),
      }),
    ),
    defaultValues: {
      basicInfo: {
        name: '',
        city: '',
        street: '',
      },
      isTermAccepted: false,
    },
    shouldUnregister: false,
  });

  const { mutateAsync } = useMutation<
    Library, // void
    Error,
    CreateLibraryArg,
    unknown
  >(createLibrary);

  const [timetable, setTimetable] = useState<TimetableT>([]);
  const [image, setImage] = useState<File>();

  return (
    <Layout transparentAppBar>
      <LibraryHeader src={background} />
      <Container>
        <Box mt={2} mb={2}>
          <Breadcrumbs aria-label="breadcrumb">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              color="inherit"
              className={classes.link}
              onClick={() => navigate(-1)}
            >
              <HomeIcon className={classes.icon} />
              Dashboard
            </Link>
            <Typography color="textPrimary" className={classes.link}>
              Add new library
            </Typography>
          </Breadcrumbs>
        </Box>
        <Paper elevation={2}>
          <Box padding={2}>
            <LibraryForm
              mode="create"
              formControl={control}
              timetable={timetable}
              updateTimetable={setTimetable}
              image={image}
              updateImage={setImage}
              onSubmit={handleSubmit(({ basicInfo }) =>
                mutateAsync({
                  ...basicInfo,
                  timetable: convertTimetableToDbFormat(timetable),
                  imageFile: image,
                })
                  .then(() =>
                    pushNotification({
                      message: 'Created library successfully.',
                      severity: 'success',
                    }),
                  )
                  .then(() => navigate('/dashboard'))
                  .catch((err) => {
                    console.error(err);
                    pushNotification({
                      message: 'Unable to create library, retry later.',
                      severity: 'error',
                    });
                  }),
              )}
            />
          </Box>
        </Paper>
      </Container>
    </Layout>
    // return (
    //   <LibraryFormLayout title="Add library">
    //     <LibraryForm
    //       mode="create"
    //       formControl={control}
    //       timetable={timetable}
    //       updateTimetable={setTimetable}
    //       image={image}
    //       updateImage={setImage}
    //       onSubmit={handleSubmit(({ basicInfo }) =>
    //         mutateAsync({
    //           ...basicInfo,
    //           timetable: convertTimetableToDbFormat(timetable),
    //           imageFile: image,
    //         })
    //           .then(() =>
    //             pushNotification({
    //               message: 'Created library successfully.',
    //               severity: 'success',
    //             }),
    //           )
    //           .then(() => navigate('/dashboard'))
    //           .catch((err) => {
    //             console.error(err);
    //             pushNotification({
    //               message: 'Unable to create library, retry later.',
    //               severity: 'error',
    //             });
    //           }),
    //       )}
    //     />
    //   </LibraryFormLayout>
  );
};
