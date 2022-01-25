import { combineReducers } from 'redux';
import { calendarReducer } from '../components/calendar/calendarReducer';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
});
