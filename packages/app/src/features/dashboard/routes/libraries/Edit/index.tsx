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
import {
  convertDbFormatToTimetable,
  convertTimetableToDbFormat,
} from '@/lib/timetable/conversions';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { city, name, street } from '@asw-project/shared/data/library';
import { Library } from '@asw-project/shared/generatedTypes';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const EditLibrary = () => {
  const { id } = useParams();
  const { data, status } = useQuery(['edit library', id], () =>
    getLibraryById(id),
  );
  const [timetable, setTimetable] = useState<TimetableT>([]);
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
            onSubmit={handleSubmit(({ basicInfo }) => {
              console.log('submitting');
              return mutateAsync({
                ...basicInfo,
                timetable: convertTimetableToDbFormat(timetable),
              }).then(() => {
                console.log('redirect');
                navigate('/dashboard');
              });
            })}
          />
        )}
      </QueryContent>
    </LibraryFormLayout>
  );
};
