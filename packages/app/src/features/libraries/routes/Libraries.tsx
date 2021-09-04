import Layout from '@/components/Layout';
import { useQueryParams } from '@/hooks';
import { WithId } from '@asw-project/shared/data/withId';
import { Building } from '@asw-project/shared/generatedTypes/building';
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getBuildings } from '../api/getBuildings';
import { LibraryHeader } from '../components/Header';
import { LibraryList } from '../components/LibraryList';

export function Libraries() {
  const searchQueryParam = useQueryParams('search', '');
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['libraries', searchQueryParam], () =>
    getBuildings(searchQueryParam),
  );

  const handleSearch = (query: string) => {
    navigate({
      pathname: '.',
      search: `?${new URLSearchParams({ search: query }).toString()}`,
    });
  };

  return (
    <Layout>
      <Container>
        <LibraryHeader
          previousQuery={searchQueryParam}
          onSearch={handleSearch}
        />
        <LibraryList isLoading={isLoading} places={data || []} />
      </Container>
    </Layout>
  );
}
