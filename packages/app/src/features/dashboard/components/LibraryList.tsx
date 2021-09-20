import { WithId } from '@asw-project/shared/data/withId';
import { Library } from '@asw-project/shared/generatedTypes';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { LibraryListItem } from './LibraryListItem';

interface LibraryListProps {
  readonly data: WithId<Library>[];
}

export const LibraryList = ({ data }: LibraryListProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Address</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((d) => (
          <LibraryListItem data={d} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
