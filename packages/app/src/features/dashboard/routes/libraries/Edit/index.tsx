import { QueryContent } from '@/components/QueryContent';
import { getBuildingById } from '@/features/dashboard/api/getBuildings';
import {
  LibraryForm,
  LibraryFormValue,
} from '@/features/dashboard/components/LibraryForm';
import { LibraryFormLayout } from '@/features/dashboard/components/LibraryFormLayout';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { city, name, street } from '@asw-project/shared/data/library';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const EditLibrary = () => {
  const { id } = useParams();
  const { data, status } = useQuery(['edit library', id], () =>
    getBuildingById(id),
  );
  const [timetable, setTimetable] = useState<TimetableT>([]);

  const { control, setValue } = useForm<
    Omit<LibraryFormValue, 'isTermAccepted'>
  >({
    mode: 'onChange',
    resolver: joiResolver(
      Joi.object({
        name,
        city,
        street,
      }),
    ),
    defaultValues: {
      name: '',
      city: '',
      street: '',
    },
  });

  useEffect(() => {
    if (status === 'success' && data !== undefined) {
      setValue('name', data.name);
      setValue('city', data.city);
      setValue('street', data.street);
    }
  }, [status, data]);

  return (
    <LibraryFormLayout title="Edit library">
      <QueryContent status={status} data={data}>
        {() => (
          <LibraryForm
            formControl={control}
            timetable={timetable}
            updateTimetable={setTimetable}
          />
        )}
      </QueryContent>
    </LibraryFormLayout>
  );
};
