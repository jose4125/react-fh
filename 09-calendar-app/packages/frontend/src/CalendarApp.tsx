import { ReactElement } from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

import './calerdarApp.css';

export const CalendarApp = (): ReactElement => {
  return (
    <Provider store={store}>
      <AppRouter />;
    </Provider>
  );
};
