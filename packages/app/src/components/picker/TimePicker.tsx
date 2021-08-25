interface TimePickerProps {
    readonly selectedTime: Date;
    selectTime(date: Date): void;
}

function TimePicker({ selectedTime, selectTime }: TimePickerProps) {
    return (
        <div>
            <p>
                Picker
            </p>
        </div>
    );
}

export default TimePicker;
