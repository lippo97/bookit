import { Library } from '@asw-project/shared/generatedTypes/library';
import { WithId } from '@asw-project/shared/data/withId';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import zipWith from 'lodash/zipWith';
import { ky } from '@/config';
import Header from './Header';
import LibraryList from './LibraryList';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Search = () => {
  const searchQueryParam = useQuery().get('search');
  const navigate = useNavigate();
  const [libraries, setLibraries] = useState<WithId<Library>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function queryBackend(
    query: string | null,
  ): Promise<WithId<Library>[]> {
    console.log(query);
    const searchParams = {
      ...(query === null || query === ''
        ? {}
        : {
            '$text[$search]': query,
          }),
    };
    return ky
      .get('libraries', {
        searchParams,
      })
      .json<WithId<Library>[]>();
  }

  const handleSearch = async (query: string) => {
    navigate({
      // pathname: 'places',
      search: `?${new URLSearchParams({ search: query }).toString()}`,
    });
  };

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      try {
        const res = await queryBackend(searchQueryParam);
        setLibraries(res);
      } finally {
        setLoading(false);
      }
    };
    go();
  }, [searchQueryParam]);

  return (
    <>
      <Header
        previousQuery={searchQueryParam || undefined}
        onSearch={handleSearch}
      />
      <LibraryList isLoading={loading} places={libraries} />
    </>
  );
};
