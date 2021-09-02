import {} from '@asw-project/shared/generatedTypes/';

type Slot = { from: number; to: number };

type SimpleSlot = Slot[];

type ComplexSlot = [
  SimpleSlot,
  SimpleSlot,
  SimpleSlot,
  SimpleSlot,
  SimpleSlot,
  SimpleSlot,
  SimpleSlot,
];

type Timetable = SimpleSlot | ComplexSlot;

interface LibraryTimetableProps {
  readonly data: Timetable;
}

export const LibraryTimetable = ({ data }: LibraryTimetableProps) => (
  <table>
    <thead>
      <tr>
        <td />
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
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
