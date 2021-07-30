import Header from './Header';
import PlacesList from './PlacesList';

function Search() {
  const places = [
    {
      name: 'Dove, galapagos',
      address: '29 Victoria Alley',
    },
    {
      name: 'Sable antelope',
      address: '89 Westport Drive',
    },
    {
      name: 'Little brown dove',
      address: '0 Arkansas Lane',
    },
    {
      name: 'Cat, native',
      address: '85 Barby Trail',
    },
    {
      name: 'Langur, gray',
      address: '1 Golf View Street',
    },
    {
      name: 'Green vine snake',
      address: '38228 Gerald Hill',
    },
    {
      name: 'Wallaroo, common',
      address: '249 Fuller Junction',
    },
    {
      name: 'Brazilian tapir',
      address: '79 Londonderry Circle',
    },
    {
      name: 'Lemur, sportive',
      address: '57 Sycamore Avenue',
    },
    {
      name: 'Red sheep',
      address: '5 Lyons Circle',
    },
  ];

  return (
    <>
      <Header />
      <PlacesList places={places} />
    </>
  );
}

export default Search;
