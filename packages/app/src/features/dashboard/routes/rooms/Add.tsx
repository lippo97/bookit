import { useNotification } from '@/stores/notifications';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import {
  createRoutesFromChildren,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { createLibraryRoom } from '../../api/rooms';
import { LibraryFormLayout } from '../../components/LibraryFormLayout';
import RoomForm, { RoomFormValue } from '../../components/RoomForm';

function AddRoom() {
  const { id } = useParams();
  const { pushNotification } = useNotification();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<RoomFormValue>({
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

  const onSubmit = handleSubmit(async ({ name, accessibility }) => {
    try {
      await createLibraryRoom(id, name, accessibility);
      console.log(name, accessibility);
      pushNotification({
        message: 'Room created successfully!',
        severity: 'success',
      });
      navigate(`/dashboard/libraries/${id}`);
    } catch {
      pushNotification({
        message: "Couldn't create library, retry later.",
        severity: 'error',
      });
    }
  });

  return (
    <LibraryFormLayout title="Add new room">
      <RoomForm
        formControl={control}
        onSubmit={onSubmit}
        onBack={() => navigate(`/dashboard/libraries/${id}`)}
        buttonText="Add"
      />
    </LibraryFormLayout>
  );
}

export default AddRoom;
