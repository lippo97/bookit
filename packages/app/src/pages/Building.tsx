import { Building as TBuilding } from '@asw-project/shared/generatedTypes';
import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LibraryHeader } from '../components/library/LibraryImage';
import { LibraryData } from '../components/library/LibraryData';
import ky from '../config/ky';

type BuildingParams = { id: string };

function Building() {
  const [data, setData] = useState<TBuilding>();
  const [isStarred, setStarred] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<BuildingParams>();

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      try {
        const res = await ky.get(`buildings/${id}`).json<TBuilding>();
        setData(res);
      } finally {
        setLoading(false);
      }
    };
    go();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (data === undefined) {
    return <div>Not found </div>;
  }

  return (
    <Layout>
      <LibraryHeader
        src={data.imageFilename}
        isStarred={isStarred}
        onStar={() => setStarred(!isStarred)}
      />
      <LibraryData data={data} />
    </Layout>
  );
}

export default Building;
