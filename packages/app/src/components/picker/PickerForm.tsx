import { useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Picker from './Picker';
import { Room } from './types';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

interface PickerLoading {
    readonly loading: true,
    readonly room?: never;
}

interface PickerLoaded {
    readonly room: Room;
    readonly loading?: false;
}

// type PickerFormProps = PickerLoaded | PickerLoading;
type PickerFormProps =
    | { loading: true, room?: never }
    | { loading?: false, room: Room }

function PickerForm({ room, loading }: PickerFormProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [date, setDate] = useState<Date>(new Date());

    return (
        <>
        <DatePicker selectDate={setDate} selectedDate={date} />
        <TimePicker selectTime={setDate} selectedTime={date} />
        <Picker
            room={room}
            selected={selected}
            select={setSelected}
            style={{
                border: '1px solid grey',
                marginTop: 10,
                marginBottom: 10,
            }}
        />
        <Typography variant="h6">
            { !loading ?
               `Posto selezionato: ${selected}` : <Skeleton />
                }
        </Typography>
        <Typography variant="body1">
            { !loading ?
                <ul>
                    <li>Some other</li>
                    <li>interesting</li>
                    <li>information</li>
                    <li>that you might need</li>
                </ul> :
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
                }
            </Typography>
        </>
    )
}

export default PickerForm;
