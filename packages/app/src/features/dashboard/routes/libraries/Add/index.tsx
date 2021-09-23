import {
  createLibrary,
  CreateLibraryArg,
} from '@/features/dashboard/api/getLibraries';
import {
  LibraryForm,
  LibraryFormValue,
} from '@/features/dashboard/components/LibraryForm';
import { LibraryFormLayout } from '@/features/dashboard/components/LibraryFormLayout';
import { convertTimetableToDbFormat } from '@/lib/timetable/conversions';
import { Timetable as TimetableT } from '@/lib/timetable/types';
import { city, name, street } from '@asw-project/shared/data/library';
import { Library } from '@asw-project/shared/generatedTypes';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const AddLibrary = () => {
  const navigate = useNavigate();
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

  return (
    <LibraryFormLayout title="Add library">
      <LibraryForm
        mode="create"
        formControl={control}
        timetable={timetable}
        updateTimetable={setTimetable}
        onSubmit={handleSubmit(({ basicInfo }) =>
          mutateAsync({
            ...basicInfo,
            timetable: convertTimetableToDbFormat(timetable),
          }).then(() => navigate('/dashboard')),
        )}
      />
    </LibraryFormLayout>
  );
};
