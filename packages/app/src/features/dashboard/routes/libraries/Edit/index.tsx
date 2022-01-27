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
import { LibraryFormLayout } from '@/features/dashboard/components/LibraryFormLayout';
import { getLibraryImageUrlOrFallback } from '@/lib/images';
import {
  convertDbFormatToTimetable,
  convertTimetableToDbFormat,
} from '@/lib/timetable/conversions';
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

export const EditLibrary = () => {
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
    <LibraryFormLayout title="Edit library">
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
                    message: 'Library updated successfully.',
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
    </LibraryFormLayout>
  );
};
