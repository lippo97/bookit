import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import {
  getLibraryById,
  updateLibrary,
  UpdateLibraryArg,
} from '@/features/dashboard/api/getLibraries';
import {
  LibraryForm,
  LibraryFormValue,
} from '@/features/dashboard/components/LibraryForm';
import { getLibraryImageUrlOrFallback } from '@/lib/images';
import {
  convertDbFormatToTimetable,
  convertTimetableToDbFormat,
} from '@/lib/timetable/conversions';
import background from '@/assets/bg.png';
import HomeIcon from '@material-ui/icons/Home';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { useNotification } from '@/stores/notifications';
import { city, name, street } from '@asw-project/shared/data/library';
import { Library } from '@asw-project/shared/generatedTypes';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import {
  Container,
  Box,
  Breadcrumbs,
  Typography,
  Paper,
  makeStyles,
  Link,
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

export const EditLibrary = () => {
  const classes = useStyles();
  const [image, setImage] = useState<File>();
  const [initialImage, setInitialImage] = useState<string>();
  const [timetable, setTimetable] = useState<TimetableT>([]);
  const { id } = useParams();
  const { data, status } = useQuery(['edit library', id], async () => {
    const library = await getLibraryById(id);
    setInitialImage(getLibraryImageUrlOrFallback(library.imageFileName));

    return library;
  });

  const pushNotification = useNotification((s) => s.pushNotification);
  const navigate = useNavigate();

  const { control, setValue, handleSubmit } = useForm<
    Omit<LibraryFormValue, 'isTermAccepted'>
  >({
    mode: 'onChange',
    resolver: joiResolver(
      Joi.object({
        basicInfo: Joi.object({
          name,
          city,
          street,
        }),
      }),
    ),
    defaultValues: {
      basicInfo: {
        name: '',
        city: '',
        street: '',
      },
    },
  });

  const { mutateAsync } = useMutation<
    Library,
    Error,
    UpdateLibraryArg,
    unknown
  >(updateLibrary(id));

  useEffect(() => {
    if (status === 'success' && data !== undefined) {
      setValue('basicInfo.name', data.name);
      setValue('basicInfo.city', data.city);
      setValue('basicInfo.street', data.street);
      setTimetable(convertDbFormatToTimetable(data.timetable));
    }
  }, [status, data]);

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
              Edit library
            </Typography>
          </Breadcrumbs>
        </Box>
        <Paper elevation={2}>
          <Box padding={2}>
            <QueryContent status={status} data={data}>
              {() => (
                <LibraryForm
                  mode="edit"
                  formControl={control}
                  timetable={timetable}
                  updateTimetable={setTimetable}
                  image={image}
                  updateImage={setImage}
                  initialImage={initialImage}
                  onSubmit={handleSubmit(({ basicInfo }) =>
                    mutateAsync({
                      ...basicInfo,
                      timetable: convertTimetableToDbFormat(timetable),
                      imageFile: image,
                    })
                      .then(() => {
                        pushNotification({
                          message: 'Updated library successfully.',
                          severity: 'success',
                        });
                        navigate('/dashboard');
                      })
                      .catch((err) => {
                        console.error(err);
                        pushNotification({
                          message: 'Unable to update library, retry later',
                          severity: 'error',
                        });
                      }),
                  )}
                />
              )}
            </QueryContent>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );

  // return (
  //   <LibraryFormLayout title="Edit library">
  //     <QueryContent status={status} data={data}>
  //       {() => (
  //         <LibraryForm
  //           mode="edit"
  //           formControl={control}
  //           timetable={timetable}
  //           updateTimetable={setTimetable}
  //           image={image}
  //           updateImage={setImage}
  //           initialImage={initialImage}
  //           onSubmit={handleSubmit(({ basicInfo }) =>
  //             mutateAsync({
  //               ...basicInfo,
  //               timetable: convertTimetableToDbFormat(timetable),
  //               imageFile: image,
  //             })
  //               .then(() => {
  //                 pushNotification({
  //                   message: 'Updated library successfully.',
  //                   severity: 'success',
  //                 });
  //                 navigate('/dashboard');
  //               })
  //               .catch((err) => {
  //                 console.error(err);
  //                 pushNotification({
  //                   message: 'Unable to update library, retry later',
  //                   severity: 'error',
  //                 });
  //               }),
  //           )}
  //         />
  //       )}
  //     </QueryContent>
  //   </LibraryFormLayout>
  // );
};
