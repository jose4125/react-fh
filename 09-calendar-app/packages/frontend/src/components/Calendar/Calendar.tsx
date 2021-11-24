import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Calendar as CalendarComponent,
  dateFnsLocalizer,
  SlotInfo,
  View,
} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';

import { Navbar } from '../ui/Navbar/Navbar';
import { CalendarEvent } from '../calendar/CalendarEvent';
import { EventCal } from '../../../../shared/types';
import { CalendarModal } from './CalendarModal';
import {
  cleanActiveEvent,
  deleteEvent,
  setActiveEvent,
} from './calendarActions';
import { AddNewFab } from '../ui/AddNewFab/AddNewFab';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { RootState } from '../../utils/types';
import { DeleteEventFab } from '../ui/DeleteEventFab/DeleteEventFab';
import Swal from 'sweetalert2';

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

export const Calendar = (): ReactElement => {
  const start = new Date();
  const end = addHours(start, 2);
  const storageView = (localStorage.getItem('lastView') as View) ?? 'month';
  const [lastView, setLastView] = useState<View>(storageView);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(
    ({ calendar }: RootState) => calendar,
  );

  const onDoubleClickEvent = (event: EventCal): void => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(cleanActiveEvent());
  };

  const onSelectEvent = (event: EventCal): void => {
    dispatch(setActiveEvent(event));
  };

  const onSelectedSlot = (event: SlotInfo) => {
    console.log('event', event);
    if (event.action === 'click') {
      dispatch(cleanActiveEvent());
    }
  };

  const onViewChange = (view: View): void => {
    setLastView(view);
    localStorage.setItem('lastView', view);
  };

  const handleConfirmDelete = () => {
    Swal.fire({
      title: `Do you want to remove ${activeEvent.title}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteEvent());
        dispatch(cleanActiveEvent());
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
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
        onSelectSlot={onSelectedSlot}
        selectable={true}
        onView={onViewChange}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal isModalOpen={isModalOpen} onCloseModal={closeModal} />
      <AddNewFab onClickHandler={setIsModalOpen} />
      {activeEvent.id && (
        <DeleteEventFab onClickHandler={handleConfirmDelete} />
      )}
    </div>
  );
};
