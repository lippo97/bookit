interface DatePickerProps {
    readonly selectedDate: Date;
    selectDate(date: Date): void;
}

function DatePicker({ selectedDate, selectDate }: DatePickerProps) {
    return (
        <div>
            <p>Date picker</p>
        </div>
    );
}

export default DatePicker;
