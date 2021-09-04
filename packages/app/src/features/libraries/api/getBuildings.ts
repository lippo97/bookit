import { ky } from '@/config';
import { WithId } from '@asw-project/shared/data/withId';
import { Building } from '@asw-project/shared/generatedTypes';

export async function getBuilding(id: string): Promise<WithId<Building>> {
  return ky.get(`buildings/${id}`).json<WithId<Building>>();
}

export async function getBuildings(query: string): Promise<WithId<Building>[]> {
  const searchParams = {
    ...(query === ''
      ? {}
      : {
          '$text[$search]': query,
        }),
  };
  return ky
    .get('buildings', {
      searchParams,
    })
    .json<WithId<Building>[]>();
}
