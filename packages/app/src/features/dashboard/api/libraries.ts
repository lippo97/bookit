import { ky } from '@/config/ky';
import { useAuth } from '@/stores/authentication';
import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';

type FormDataImageResult = {
  key: string;
};
export type CreateLibraryArg = Pick<
  Library,
  | 'city'
  | 'imageFileName'
  | 'name'
  // | 'rooms'
  | 'street'
  | 'timetable'
> & {
  imageFile?: File;
};

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

export type UpdateLibraryArg = CreateLibraryArg;

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
        json: data,
      })
      .json<WithId<Library>>();
  };

export async function deleteLibrary(
  libraryId: string,
): Promise<WithId<Library>> {
  return ky.delete(`libraries/${libraryId}`).json<WithId<Library>>();
}