import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'; //only test actions, it does not update the Redux store
import { storeFactory } from '../../../testUtils/storefactory';
import { logout, startLogout } from '../sideBarActions';
import { types } from '../../auth/constants';
import { types as noteTypes } from '../../notes/constants';
import { initialState } from '../../../testUtils/initialState';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('test sidebar actions', () => {
  describe('test logout action', () => {
    test('Should return the logout action', () => {
      const action = logout();
      const logoutAction = {
        type: types.logout,
      };

      expect(action).toEqual(logoutAction);
    });
  });

  describe('test startLogout action', () => {
    test('should dispatch the startLogout actions', async () => {
      const logoutAction = {
        type: types.logout,
      };
      const notesCleanAction = {
        type: noteTypes.notesLogoutClean,
      };
      const store = mockStore(initialState);
      await store.dispatch(startLogout());
      const actions = store.getActions();

      expect(actions).toHaveLength(2);
      expect(actions[0]).toEqual(logoutAction);
      expect(actions[1]).toEqual(notesCleanAction);
    });

    test('should startLogout and update the state, integration test', async () => {
      const store = storeFactory(initialState);
      await store.dispatch(startLogout());
      const { auth } = store.getState();
      const { notes } = store.getState();

      expect(auth).toEqual({});
      expect(notes.notes).toEqual([]);
    });
  });
});
