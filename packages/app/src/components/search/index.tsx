import { Building } from '@asw-project/shared/generatedTypes/building';
import { WithId } from '@asw-project/shared/data/withId';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import zipWith from 'lodash/zipWith';
import ky from '../../config/ky';
import Header from './Header';
import BuildingList from './BuildingList';

const places = [
  {
    name: 'Dove, galapagos',
    address: '29 Victoria Alley',
  },
  {
    name: 'Sable antelope',
    address: '89 Westport Drive',
  },
  {
    name: 'Little brown dove',
    address: '0 Arkansas Lane',
  },
  {
    name: 'Cat, native',
    address: '85 Barby Trail',
  },
  {
    name: 'Langur, gray',
    address: '1 Golf View Street',
  },
  {
    name: 'Green vine snake',
    address: '38228 Gerald Hill',
  },
  {
    name: 'Wallaroo, common',
    address: '249 Fuller Junction',
  },
  {
    name: 'Brazilian tapir',
    address: '79 Londonderry Circle',
  },
  {
    name: 'Lemur, sportive',
    address: '57 Sycamore Avenue',
  },
  {
    name: 'Red sheep',
    address: '5 Lyons Circle',
  },
];
const placesWithId = zipWith(
  Array.from(Array(places.length)).map((_, i) => i),
  places,
  (id, p) => ({
    ...p,
    id,
  }),
);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const searchQueryParam = useQuery().get('search');
  const history = useHistory();
  const [buildings, setBuildings] = useState<WithId<Building>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function queryBackend(
    query: string | null,
  ): Promise<WithId<Building>[]> {
    const searchParams = {
      ...(query === null || query === ''
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

  const handleSearch = async (query: string) => {
    history.push({
      pathname: 'places',
      search: `?${new URLSearchParams({ search: query }).toString()}`,
    });
  };

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      try {
        const res = await queryBackend(searchQueryParam);
        setBuildings(res);
      } finally {
        setLoading(false);
      }
    };
    go();
  }, [searchQueryParam]);

  return (
    <>
      <Header onSearch={handleSearch} />
      <BuildingList isLoading={loading} places={buildings} />
    </>
  );
}

export default Search;
