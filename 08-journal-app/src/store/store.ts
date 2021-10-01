import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../components/auth/authReducer';
import notesReducer from '../components/notes/notesReducer';
import globalReducer from '../globalReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const middlewares = [thunk];

export const reducers = combineReducers({
  auth: authReducer,
  ui: globalReducer,
  notes: notesReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares)),
);
