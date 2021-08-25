import { useParams } from 'react-router-dom';

type PlaceParams = { id: string };

function Place() {
  const { id } = useParams<PlaceParams>();
  return <div>{id}</div>;
}

export default Place;
