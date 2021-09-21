import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { useToggle } from '@/hooks/useToggle';
import { Container } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getLibraryById } from '../api/getLibraries';
import { LibraryData } from '../components/LibraryData';
import { LibraryHeader } from '../components/LibraryHeader';

export const Library = () => {
  const [isStarred, toggleStarred] = useToggle(false);
  const { id } = useParams();
  const { data, status } = useQuery(['library', id], () => getLibraryById(id));

  return (
    <Layout>
      <Container>
        <QueryContent status={status} data={data}>
          {(d) => (
            <>
              <LibraryHeader
                src={d.imageFilename}
                isStarred={isStarred}
                onStar={toggleStarred}
              />
              <LibraryData data={d} />
            </>
          )}
        </QueryContent>
      </Container>
    </Layout>
  );
};
