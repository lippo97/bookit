import { Layout } from '@/components/Layout';
import { QueryContent } from '@/components/QueryContent';
import { getLibraryById } from '@/features/dashboard/api/getLibraries';
import { LibraryHeader } from '@/features/libraries/components/LibraryHeader';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const ManageLibrary = () => {
  const { id } = useParams();

  const { data, status } = useQuery(['library', id], () => getLibraryById(id));
  return (
    <Layout>
      <Container>
        <QueryContent data={data} status={status}>
          {(d) => <LibraryHeader src={d.imageFilename} />}
        </QueryContent>
      </Container>
    </Layout>
  );
};
