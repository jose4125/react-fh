import {
  CalendarAction,
  EventCal,
  EventCalState,
} from '../../../../shared/types';

import addHours from 'date-fns/addHours';
import { types } from './constants';
const start = new Date();
const end = addHours(start, 2);
const initialState: EventCalState = {
  events: [],
  activeEvent: {
    id: '',
    notes: '',
    user: {
      _id: '',
      name: '',
    },
  },
};

export const calendarReducer = (
  state = initialState,
  { type, payload }: CalendarAction,
): EventCalState => {
  switch (type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: <EventCal>payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, <EventCal>payload],
      };
    case types.eventUpdate: {
      const events = state.events.map(event => {
        if (event.id === payload?.id) {
          return payload;
        }
      });
      return {
        ...state,
        events: events as EventCal[],
      };
    }
    case types.eventDelete: {
      const events = state.events.filter(
        event => event.id !== state.activeEvent?.id,
      );

      return {
        ...state,
        events,
      };
    }
    case types.activeEventClean:
      return {
        ...state,
        activeEvent: initialState.activeEvent,
      };
    default:
      return state;
  }
};
