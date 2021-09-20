import {
  LibraryForm,
  LibraryFormValue,
} from '@/features/dashboard/components/LibraryForm';
import { LibraryFormLayout } from '@/features/dashboard/components/LibraryFormLayout';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { city, name, street } from '@asw-project/shared/data/library';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const AddLibrary = () => {
  const { control } = useForm<LibraryFormValue>({
    mode: 'onChange',
    resolver: joiResolver(
      Joi.object({
        name,
        city,
        street,
        isTermAccepted: Joi.boolean().required(),
      }),
    ),
    defaultValues: {
      name: '',
      city: '',
      street: '',
      isTermAccepted: false,
    },
    shouldUnregister: false,
  });

  const [timetable, setTimetable] = useState<TimetableT>([]);

  return (
    <LibraryFormLayout title="Add library">
      <LibraryForm
        formControl={control}
        timetable={timetable}
        updateTimetable={setTimetable}
      />
    </LibraryFormLayout>
  );
};
