import { Building as TBuilding } from '@asw-project/shared/generatedTypes';
import { CircularProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LibraryImage } from '../components/library/LibraryImage';
import { LibraryData } from '../components/library/LibraryData';
import ky from '../config/ky';

type BuildingParams = { id: string };

function Building() {
  const [data, setData] = useState<TBuilding>();
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
      <LibraryImage src={data.imageFilename} />
      <LibraryData data={data} />
    </Layout>
  );
}

export default Building;
