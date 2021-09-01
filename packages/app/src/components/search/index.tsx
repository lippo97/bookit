import { Building } from '@asw-project/shared/generatedTypes/building';
import { WithId } from '@asw-project/shared/data/withId';
import { useEffect, useState } from 'react';
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

function Search() {
  const [buildings, setBuildings] = useState<WithId<Building>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function queryBackend(query: String): Promise<Building[]> {
    return ky.get('buildings').json<WithId<Building>[]>();
  }

  const handleSearch = async (query: String) => {
    setLoading(true);
    try {
      const res = await queryBackend(query);
      setBuildings(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      <BuildingList isLoading={loading} places={buildings} />
    </>
  );
}

export default Search;
