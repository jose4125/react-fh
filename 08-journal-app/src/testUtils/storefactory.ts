import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../components/auth/authReducer';
import notesReducer from '../components/notes/notesReducer';
import globalReducer from '../globalReducer';

export const middlewares = [thunk];
export const reducers = combineReducers({
  auth: authReducer,
  ui: globalReducer,
  notes: notesReducer,
});

export const storeFactory = (initialState = {}): Store =>
  createStore(reducers, initialState, applyMiddleware(...middlewares));
