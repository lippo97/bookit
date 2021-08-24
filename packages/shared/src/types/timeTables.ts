export type TimeTable = [
  DayTime,
  DayTime,
  DayTime,
  DayTime,
  DayTime,
  DayTime,
  DayTime,
];

type DayTime = {
  ranges: TimeRange[];
};

type TimeRange = {
  from: number;
  to: number;
};

function emptyDay(): DayTime {
  return {
    ranges: [],
  };
}

const timeTable: TimeTable = [
  {
    ranges: [
      {
        from: 8,
        to: 12,
      },
      {
        from: 13,
        to: 17,
      },
    ],
  },
  emptyDay(),
  emptyDay(),
  emptyDay(),
  emptyDay(),
  emptyDay(),
  emptyDay(),
];
