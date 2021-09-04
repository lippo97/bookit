import Layout from '@/components/Layout';
import { CircularProgress, Container } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getBuilding } from '../api/getBuildings';
import { LibraryData } from '../components/LibraryData';
import { LibraryHeader } from '../components/LibraryHeader';

export const Library = () => {
  const [isStarred, setStarred] = useState(false);
  const { id } = useParams();
  const { data, status } = useQuery(['library', id], () => getBuilding(id));

  const Content = () => {
    if (status === 'loading') {
      return <CircularProgress />;
    }

    if (status === 'error') {
      return <CircularProgress />;
    }

    return (
      <>
        <LibraryHeader
          src={data!.imageFilename}
          isStarred={isStarred}
          onStar={() => setStarred(!isStarred)}
        />
        <LibraryData data={data!} />
      </>
    );
  };

  return (
    <Layout>
      <Container>
        <Content />
      </Container>
    </Layout>
  );
};
