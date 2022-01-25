import { EventPropertiesCal } from '../../../../shared/types';

export const CalendarEvent = ({ event }: EventPropertiesCal): JSX.Element => {
  const { title, user } = event;
  return (
    <div>
      <span>{title}</span>
      <span> - {user?.name}</span>
    </div>
  );
};
