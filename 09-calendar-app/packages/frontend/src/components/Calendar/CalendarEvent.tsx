import { EventPropertiesCal } from '@calendar/shared/src/calendar/types';

export const CalendarEvent = ({ event }: EventPropertiesCal): JSX.Element => {
  const { title, user } = event;
  return (
    <div>
      <span>{title}</span>
      <span> - {user?.name}</span>
    </div>
  );
};
