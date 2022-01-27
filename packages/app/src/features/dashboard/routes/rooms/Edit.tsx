import { QueryContent } from '@/components/QueryContent';
import { useNotification } from '@/stores/notifications';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { useNavigate, useParams } from 'react-router-dom';
import { getRoomById, updateRoom } from '../../api/rooms';
import { LibraryFormLayout } from '../../components/LibraryFormLayout';
import RoomForm, { RoomFormValue } from '../../components/RoomForm';

function EditRoom() {
  const { id: libraryId, roomId } = useParams();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();

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
    <LibraryFormLayout title="Edit room">
      <QueryContent status={status} data={data}>
        {() => (
          <RoomForm
            formControl={control}
            onSubmit={onSubmit}
            buttonText="Edit"
            onBack={() => navigate(`/dashboard/libraries/${libraryId}`)}
          />
        )}
      </QueryContent>
    </LibraryFormLayout>
  );
}

export default EditRoom;
