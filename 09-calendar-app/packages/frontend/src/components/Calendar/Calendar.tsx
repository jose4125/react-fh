import { ReactElement, useEffect, useState } from 'react';
import {
  Calendar as CalendarComponent,
  dateFnsLocalizer,
  Event,
  View,
} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';

import { Navbar } from '../ui/Navbar/Navbar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { CalendarEvent } from '../CalendarEvent/CalendarEvent';
import { EventCal } from '../../../../shared/types';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const Calendar = (): ReactElement => {
  const start = new Date();
  const end = addHours(start, 2);
  const storageView = (localStorage.getItem('lastView') as View) ?? 'month';
  const [lastView, setLastView] = useState<View>(storageView);
  const [events, setEvents] = useState<EventCal[]>([
    {
      title: 'Learn cool stuff',
      start,
      end,
      bgColor: '#fafafa',
      notes: '',
      user: {
        _id: '124',
        name: 'Pedro',
      },
    },
  ]);

  const onDoubleClickEvent = (event: EventCal): void => {
    console.log('open event', event);
  };

  const onSelectEvent = (event: EventCal): void => {
    console.log('select event', event);
  };

  const onViewChange = (view: View): void => {
    setLastView(view);
    localStorage.setItem('lastView', view);
  };

  const eventStylesGetter = () => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: '#fff',
    };

    return { style };
  };

  return (
    <div className="calendar__container">
      <Navbar />
      <CalendarComponent
        view={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStylesGetter}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        components={{
          event: CalendarEvent,
        }}
      />
    </div>
  );
};
