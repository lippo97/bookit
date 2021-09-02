import { useEffect, useState } from 'react';
import { Building as TBuilding } from '@asw-project/shared/generatedTypes';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
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
    <div>
      <p>{data.name}</p>
      <p>{data.city}</p>
      <p>{data.street}</p>
    </div>
  );
}

export default Building;
