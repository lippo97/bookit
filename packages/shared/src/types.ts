type TimeTable = [DayTime, DayTime, DayTime, DayTime, DayTime, DayTime, DayTime]

type DayTime = TimeRange[];

type TimeRange = {
    from: number,
    to: number,
};

const timeTable: TimeTable = [
    [
        {
            from: 8,
            to: 12,
        },
        {
            from: 13,
            to: 17
        }
    ],
    [],
    [],
    [],
    [],
    [],
    [],
]

type DayOfWeek = 
| 'monday'
| 'tuesday'
| 'wednesday'
| 'thursday'
| 'friday'
| 'saturday'
| 'sunday'

function day(timeTable: TimeTable, dayOfWeek: DayOfWeek): DayTime {
    switch(dayOfWeek) {
        case 'monday': return timeTable[0];
        case 'tuesday': return timeTable[1];
        case 'wednesday': return timeTable[2];
        case 'thursday': return timeTable[3];
        case 'friday': return timeTable[4];
        case 'saturday': return timeTable[5];
        case 'sunday': return timeTable[6];
    }
}

class TimeTables {
    static day(timeTable: TimeTable, dayOfWeek: DayOfWeek): DayTime {
        switch(dayOfWeek) {
            case 'monday': return timeTable[0];
            case 'tuesday': return timeTable[1];
            case 'wednesday': return timeTable[2];
            case 'thursday': return timeTable[3];
            case 'friday': return timeTable[4];
            case 'saturday': return timeTable[5];
            case 'sunday': return timeTable[6];
        }
    }
}

TimeTables.day(t, 'wednesday')
