import authReducer from '../authReducer';
import { types } from '../constants';

describe('authReducer tests', () => {
  test('should return de initial state', () => {
    const action = {
      type: '',
    };
    const state = authReducer({}, action);

    expect(state).toEqual({});
  });
  test('Should update the state with uid and name when login', () => {
    const res = {
      uid: 'qwe123wriqwouir123123wsi',
      name: 'jhon doe',
    };
    const loginAction = {
      type: types.login,
      payload: {
        uid: res.uid,
        displayName: res.name,
      },
    };
    const state = authReducer({}, loginAction);

    expect(state).toEqual(res);
  });

  test('Shold clean the auth state when logout', () => {
    const authState = {
      uid: 'qwe123wriqwouir123123wsi',
      name: 'jhon doe',
    };
    const logoutAction = {
      type: types.logout,
    };

    const state = authReducer(authState, logoutAction);

    expect(state).toEqual({});
  });
});
