import { DialogButton } from '@/components/DialogButton';
import { isNonEmptySet, Set } from '@/lib/nonEmptySet';
import * as T from '@/lib/timetable';
import { dayjsToLocalTime, localTimeToDate } from '@/lib/timetable/conversions';
import { Day, Shift, Timetable as TimetableT } from '@/lib/timetable/types';
import { LocalTime } from '@js-joda/core';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead as MuiTableHead,
  TableProps,
  TableRow,
} from '@material-ui/core';
import { lighten, styled } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/EditOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import { TimePicker } from '@material-ui/pickers';
import { Dayjs } from 'dayjs';
import sortBy from 'lodash/sortBy';
import React, { PropsWithRef, useState } from 'react';
import { DaySelect } from './DaySelect';
import { DisplayDays } from './DisplayDays';

type TimetableProps = PropsWithRef<TableContainerProps> & {
  TableProps?: PropsWithRef<TableProps>;
  timetable: TimetableT;
  onUpdateTimetable: (timetable: TimetableT) => void;
};

const TableHead = styled(MuiTableHead)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

const EditableTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: lighten(theme.palette.primary.light, 0.9),
}));

type EditableShift = Omit<Shift, 'days'> & { days: Set<Day> };
type EditableTimetable = readonly EditableShift[];

// eslint-disable-next-line @typescript-eslint/no-shadow
export const Timetable = ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  TableProps,
  timetable,
  onUpdateTimetable,
  ...props
}: TimetableProps) => {
  const [editingIndex, setEditingIndex] = useState<number>();
  const [editingData, setEditingData] = useState<EditableShift>();
  const [isAdding, setAdding] = useState(false);

  const handleEdit = (index: number) => () => {
    setEditingIndex(index);
    setEditingData(timetable[index]);
  };

  const handleDelete = (index: number) => () =>
    onUpdateTimetable(T.removeShiftByIndex(index)(timetable));

  const handleCancel = () => {
    setEditingIndex(undefined);
    setAdding(false);
  };

  const handleChangeDays = (_days: Set<Day>) => {
    const days = sortBy(_days);
    if (editingData) {
      setEditingData({
        ...editingData,
        days,
      });
    }
  };

  const handleChangeDate = (field: 'from' | 'to') => (date: Dayjs | null) => {
    if (date !== null && editingData) {
      setEditingData({
        ...editingData,
        slot: {
          ...editingData.slot,
          [field]: dayjsToLocalTime(date),
        },
      });
    }
  };

  const handleAdd = () => {
    setAdding(true);
    setEditingData({
      days: [],
      slot: {
        from: LocalTime.parse('08:00'),
        to: LocalTime.parse('12:30'),
      },
    });
    setEditingIndex(timetable.length);
  };

  const valid =
    editingData &&
    T.isValidSlot(editingData.slot) &&
    editingData.days.length > 0;

  const handleSave = () => {
    if (editingData !== undefined && editingIndex !== undefined && valid) {
      const { days } = editingData;
      if (isNonEmptySet(days)) {
        const removedTemp = T.removeShiftByIndex(editingIndex)(timetable);
        const updated = T.addShift(
          { ...editingData, days },
          editingIndex,
        )(removedTemp);
        if (updated !== null) {
          onUpdateTimetable(updated);
          handleCancel();
        } else {
          console.error('Validation of the shift failed');
        }
      }
    }
  };

  const renderShift = (shift: EditableShift, index: number) => {
    const {
      days,
      slot: { from, to },
    } = shift;

    /* eslint-disable @typescript-eslint/no-shadow */
    const Layout = ({
      days,
      from,
      to,
      actions,
    }: {
      days: React.ReactNode;
      from: React.ReactNode;
      to: React.ReactNode;
      actions: React.ReactNode;
    }) => (
      <>
        <TableCell align="left" width="100%">
          {days}
        </TableCell>
        <TableCell>
          <Box width={100} fontSize={16}>
            {from}
          </Box>
        </TableCell>
        <TableCell>
          <Box width={100} fontSize={16}>
            {to}
          </Box>
        </TableCell>
        <TableCell>
          <Box display="flex">{actions}</Box>
        </TableCell>
      </>
    );
    /* eslint-enable @typescript-eslint/no-shadow */

    if (editingIndex === index) {
      /* eslint-disable @typescript-eslint/no-shadow */
      const {
        days,
        slot: { from, to },
      } = editingData!;
      /* eslint-enable @typescript-eslint/no-shadow */
      return (
        <EditableTableRow key={[shift.days, shift.slot].toString()}>
          <Layout
            days={<DaySelect days={days} onChange={handleChangeDays} />}
            from={
              <TimePicker
                ampm={false}
                minutesStep={5}
                inputVariant="standard"
                inputProps={{ style: { textAlign: 'center' } }}
                onChange={handleChangeDate('from')}
                value={localTimeToDate(from)}
              />
            }
            to={
              <TimePicker
                ampm={false}
                minutesStep={5}
                inputVariant="standard"
                inputProps={{ style: { textAlign: 'center' } }}
                onChange={handleChangeDate('to')}
                value={localTimeToDate(to)}
              />
            }
            actions={
              <>
                <IconButton
                  aria-label="save"
                  onClick={handleSave}
                  disabled={!valid}
                >
                  <SaveIcon
                    fontSize="small"
                    color={valid ? 'primary' : 'disabled'}
                  />
                </IconButton>
                <IconButton aria-label="cancel" onClick={handleCancel}>
                  <CancelIcon fontSize="small" color="action" />
                </IconButton>
              </>
            }
          />
        </EditableTableRow>
      );
    }

    return (
      <TableRow key={[shift.days, shift.slot].toString()}>
        <Layout
          days={<DisplayDays selected={days} />}
          from={from.toString()}
          to={to.toString()}
          actions={
            editingIndex === undefined && (
              <>
                <IconButton aria-label="edit" onClick={handleEdit(index)}>
                  <EditIcon fontSize="small" color="action" />
                </IconButton>
                <DialogButton
                  id={index}
                  title="Delete selected shift"
                  description="Are you sure you want to delete the selected shift?"
                  onConfirm={handleDelete(index)}
                  as={IconButton}
                  aria-label="delete"
                >
                  <DeleteIcon fontSize="small" color="error" />
                </DialogButton>
              </>
            )
          }
        />
      </TableRow>
    );
  };

  const Empty = () => (
    <TableRow>
      <TableCell colSpan={4}>There is no data yet.</TableCell>
    </TableRow>
  );

  const TableBodyContent = ({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    timetable,
  }: {
    timetable: EditableTimetable;
  }) => {
    console.log('rendering ', timetable);
    return <>{timetable.map(renderShift)}</>;
  };

  const toBeRendered = (timetable as EditableTimetable).concat(
    isAdding && editingData ? editingData : [],
  );

  return (
    <>
      <TableContainer {...props}>
        <Table {...TableProps}>
          <TableHead>
            <TableRow>
              <TableCell>Days</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toBeRendered.length === 0 ? (
              <Empty />
            ) : (
              <TableBodyContent timetable={toBeRendered} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="right" mb={2}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleAdd}
        >
          Add shift
        </Button>
      </Box>
    </>
  );
};
