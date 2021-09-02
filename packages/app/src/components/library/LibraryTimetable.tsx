import {} from '@asw-project/shared/generatedTypes/';

interface LibraryTimetableProps {
  readonly data?: any[];
}

export const LibraryTimetable = ({ data }: LibraryTimetableProps) => (
  <table>
    <thead>
      <tr>
        <td />
        <th>Mo</th>
        <th>Tu</th>
        <th>We</th>
        <th>Th</th>
        <th>Fr</th>
        <th>Sa</th>
        <th>Su</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>9-12</th>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
      </tr>
      <tr>
        <th>14-19</th>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
        <td>open</td>
      </tr>
    </tbody>
  </table>
);
