import { Provider } from 'react-redux';
import AppRouter from './components/routers/AppRouter';
import { store } from './store/store';

const JournalApp = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default JournalApp;
