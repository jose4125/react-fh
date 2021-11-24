import { ReactElement } from 'react';

import { EventPropsCal } from '../../../../shared/types';

export const CalendarEvent = ({ event }: EventPropsCal): ReactElement => {
  const { title, user } = event;
  return (
    <div>
      <span>{title}</span>
      <span> - {user.name}</span>
    </div>
  );
};
