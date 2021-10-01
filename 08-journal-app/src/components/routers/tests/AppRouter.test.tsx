import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { firebase } from '../../firebase/firebase-config';
import { initialState } from '../../../testUtils/initialState';
import { login } from '../../auth/authActions';
import AppRouter from '../AppRouter';

jest.mock('../../auth/authActions', () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('test AppRouter', () => {
  const store = mockStore(initialState);
  store.dispatch = jest.fn();
  test('should call login if the user is authenticated', async () => {
    let user;

    await act(async () => {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword('j@j.com', '123456');

      user = userCredentials.user;

      mount(
        <Provider store={store}>
          <AppRouter />
        </Provider>,
      );
    });

    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith({
      uid: user?.uid,
      displayName: user?.displayName,
    });
  });
  // TODO: hacer los test de las rutas
});
