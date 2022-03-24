import { ky } from '@/config/ky';
import { useAuth } from '@/stores/authentication';
import { WithId } from '@asw-project/shared/data/withId';
import { Library, Seat } from '@asw-project/shared/generatedTypes';
import { getRooms } from './rooms';
import { getSeats } from './seats';

type FormDataImageResult = {
  key: string;
};
export type CreateLibraryArg = Pick<
  Library,
  'city' | 'imageFileName' | 'name' | 'street' | 'timetable'
> & {
  imageFile?: File;
};

export type UpdateLibraryArg = CreateLibraryArg;

export type UpdateLibraryServicesArg = Pick<Library, 'availableServices'>;

async function updateLibraryImage(
  imageFile: File,
): Promise<FormDataImageResult> {
  const formData = new FormData();
  formData.append('imageFile', imageFile);

  return ky
    .post('libraries/libraryImage', {
      body: formData,
    })
    .json();
}

/* export async function getLibraryImage(
  imageFileName: string,
): Promise<File | undefined> {
  const blob = await ky.get(`libraries/libraryImage/${imageFileName}`).blob();
  if (blob) {
    return new File([blob], imageFileName);
  }
  return undefined;
} */

export async function getLibraryById(
  libraryId: string,
): Promise<WithId<Library>> {
  return ky.get(`libraries/${libraryId}`).json<WithId<Library>>();
}

export async function getLibraries(): Promise<WithId<Library>[]> {
  const authInfo = useAuth.getState().auth;
  const searchParams = {
    ownerId: authInfo?.userId,
  };
  return ky.get('libraries', { searchParams }).json<WithId<Library>[]>();
}

export async function createLibrary(
  data: CreateLibraryArg,
): Promise<WithId<Library>> {
  let newData = data;
  if (data.imageFile) {
    const res = await updateLibraryImage(data.imageFile);
    newData = data as Omit<typeof data, 'imageFile'>;
    newData.imageFileName = res.key;
  }

  return ky.post('libraries', { json: newData }).json<WithId<Library>>();
}
export const updateLibrary =
  (libraryId: string) =>
  async (data: UpdateLibraryArg): Promise<WithId<Library>> => {
    let newData = data;
    if (data.imageFile) {
      const res = await updateLibraryImage(data.imageFile);
      newData = data as Omit<typeof data, 'imageFile'>;
      newData.imageFileName = res.key;
    }
    return ky
      .patch(`libraries/${libraryId}`, {
        json: newData,
      })
      .json<WithId<Library>>();
  };

/*  export const updateLibraryServices = async (
  libraryId: string,
): Promise<WithId<Library>> => {
  const libraryRooms = await getRooms(libraryId);
  console.log('LIBRARYROOMS:', libraryRooms);
  let librarySeats: any[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < libraryRooms.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const s = await getSeats(libraryRooms[i]._id);
    console.log('S:', s);
    librarySeats = librarySeats.concat(s);
  }

  

  console.log('LIBRARYSEATS:', librarySeats);
  return ky
    .patch(`libraries/${libraryId}/updateServices`, {
      json: librarySeats,
    })
    .json<WithId<Library>>();
}; */
export const updateLibraryServices = async (
  libraryId: string,
): Promise<WithId<Library>> =>
  ky.post(`libraries/${libraryId}/updateServices`).json<WithId<Library>>();

export async function deleteLibrary(
  libraryId: string,
): Promise<WithId<Library>> {
  return ky.delete(`libraries/${libraryId}`).json<WithId<Library>>();
}
