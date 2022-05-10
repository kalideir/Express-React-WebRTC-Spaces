import { formatDuration, intervalToDuration } from 'date-fns';

export const duration = (from: string | Date, to: string | Date) => {
  const d = formatDuration(
    intervalToDuration({
      start: from ? new Date(from) : new Date(),
      end: new Date(to),
    }),
    {
      delimiter: ', ',
    },
  );
  return d;
};
