import { Building } from '@asw-project/shared/generatedTypes';
import { Typography } from '@material-ui/core';

interface LibraryDataProps {
  data: Building;
}

export const LibraryData = ({
  data: { name, city, street, availableServices, rooms, timetable },
}: LibraryDataProps) => {
  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">
        <p>{street}</p>
        <p>{city}</p>
      </Typography>
    </div>
  );
};
