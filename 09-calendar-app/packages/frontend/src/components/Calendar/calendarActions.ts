import { CalendarAction, EventCal } from '../../../../shared/types';
import { types } from './constants';

export const setActiveEvent = (event: EventCal): CalendarAction => ({
  type: types.eventSetActive,
  payload: event,
});

export const addNewEvent = (event: EventCal): CalendarAction => ({
  type: types.eventAddNew,
  payload: event,
});

export const updateEvent = (event: EventCal): CalendarAction => ({
  type: types.eventUpdate,
  payload: event,
});

export const deleteEvent = (): CalendarAction => ({
  type: types.eventDelete,
});

export const cleanActiveEvent = (): CalendarAction => ({
  type: types.activeEventClean,
});
