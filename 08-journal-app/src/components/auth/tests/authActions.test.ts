import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //only test actions, it does not update the Redux store
import { storeFactory } from '../../../testUtils/storefactory';
import {
  login,
  starRegisterWithNameEmailPassword,
  startLoginEmailPassword,
  startLogingWithGoogle,
} from '../authActions';
import { types } from '../constants';
import { initialStateLogout } from '../../../testUtils/initialState';
import { globalTypes } from '../../../globalConstants';
import { firebase } from '../../firebase/firebase-config';

jest.mock('../authActions', () => {
  const original = jest.requireActual('../authActions');
  return {
    ...original,
    startLogingWithGoogle: jest.fn(),
  };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('test auth actions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('test login', () => {
    test('Should return the login action', () => {
      const user = {
        uid: 'qwer1234',
        displayName: 'jose',
      };
      const action = login(user);
      const loginAction = {
        type: types.login,
        payload: user,
      };

      expect(action).toEqual(loginAction);
    });
  });

  describe('test startLoginEmailPassword', () => {
    const user = {
      email: 'j@j.com',
      password: '123456',
    };

    const expectedUser = {
      uid: expect.any(String),
      displayName: null,
    };

    test('should return the startLoginEmailPassword action', async () => {
      const startLoadingAction = {
        type: globalTypes.uiStartLoading,
      };
      const finishLoadingAction = {
        type: globalTypes.uiFinishLoading,
      };
      const expectedUser = {
        uid: expect.any(String),
        displayName: null,
      };
      const loginAction = {
        type: types.login,
        payload: expectedUser,
      };
      const store = mockStore(initialStateLogout);

      await store.dispatch(startLoginEmailPassword(user.email, user.password));

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
      expect(actions[0]).toEqual(startLoadingAction);
      expect(actions[1]).toEqual(loginAction);
      expect(actions[2]).toEqual(finishLoadingAction);
    });

    test('should startLoginEmailPassword and update the state, integration test', async () => {
      const store = storeFactory(initialStateLogout);
      const expectedUser = {
        uid: expect.any(String),
        name: null,
      };

      await store.dispatch(startLoginEmailPassword(user.email, user.password));

      const { loading } = store.getState().ui;
      const { auth } = store.getState();

      expect(auth).toEqual(expectedUser);
      expect(loading).toBeFalsy();
    });
  });

  describe('test startLoginEmailPassword error', () => {
    const user = {
      email: 'j@j.com',
      password: '12345678',
    };

    test('should return the startLoginEmailPassword error', async () => {
      const startLoadingAction = {
        type: globalTypes.uiStartLoading,
      };
      const finishLoadingAction = {
        type: globalTypes.uiFinishLoading,
      };
      const store = mockStore(initialStateLogout);

      await store.dispatch(startLoginEmailPassword(user.email, user.password));

      const actions = store.getActions();

      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual(startLoadingAction);
      expect(actions[1]).toEqual(finishLoadingAction);
    });

    test('should startLoginEmailPassword and update the state, integration test', async () => {
      const store = storeFactory(initialStateLogout);

      await store.dispatch(startLoginEmailPassword(user.email, user.password));

      const { loading } = store.getState().ui;
      const { auth } = store.getState();

      expect(auth).toEqual({});
      expect(loading).toBeFalsy();
    });
  });

  describe.skip('test startLogingWithGoogle', () => {});

  describe.skip('test starRegisterWithNameEmailPassword', () => {});
});
