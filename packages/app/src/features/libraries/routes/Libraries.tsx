import { Layout } from '@/components/Layout';
import { useQueryParams } from '@/hooks';
import { Day } from '@/lib/timetable/types';
import { Box, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getLibraries } from '../api/libraries';
import { LibraryHeader, SearchbarForm } from '../components/Header';
import {
  LibraryFilters,
  LibraryFiltersForm,
} from '../components/LibraryFilters';
import { LibraryList } from '../components/LibraryList';

export function Libraries() {
  const searchQueryParam = useQueryParams('search', '');
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { control, getValues, reset } = useForm<LibraryFiltersForm>({
    defaultValues: {
      date: null,
      accessible: false,
      selectedServices: [],
    },
  });

  const { control: searchbarControl, handleSubmit } = useForm<SearchbarForm>({
    defaultValues: {
      query: searchQueryParam,
    },
  });
  const { data, isLoading } = useQuery(['libraries', searchQueryParam], () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessible, date, selectedServices: services } = getValues();
    // Dayjs utilizza il locale 'en', quindi considera la domenica come primo giorno della
    // settimana. L'ideale sarebbe configurare un plugin che permette di utilizzare la
    // settimana ISO, che inizia da lunedì. In questo caso sarebbe overkill installare
    // una dipendenza solo per questa porzione di codice.
    const day = date ? (((date.day() - 1 + 7) % 7) as Day) : undefined;
    return getLibraries(searchQueryParam, {
      accessible,
      services,
      day,
    });
  });

  const handleSearch = (query: string) => {
    navigate({
      pathname: '.',
      search: `?${new URLSearchParams({ search: query }).toString()}`,
    });
  };

  const onSubmit = handleSubmit(({ query }) => handleSearch(query));

  return (
    <Layout>
      <Box my={2}>
        <Container>
          <Box mb={2} component="form" onSubmit={onSubmit}>
            <LibraryHeader
              control={searchbarControl}
              handleOpenFilter={() => setFilterDialogOpen(true)}
            />
          </Box>
          <LibraryFilters
            formControl={control}
            open={isFilterDialogOpen}
            setClose={() => {
              setFilterDialogOpen(false);
              onSubmit();
            }}
            onReset={() => reset()}
          />
          <LibraryList isLoading={isLoading} places={data || []} />
        </Container>
      </Box>
    </Layout>
  );
}
