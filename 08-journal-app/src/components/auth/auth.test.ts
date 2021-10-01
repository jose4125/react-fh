import { types } from './constants';

describe('test constants', () => {
  test('Should have constant action types', () => {
    const testTypes = {
      login: '[auth] login',
      logout: '[auth] logout',
      register: '[auth] register',
    };
    expect(types).toEqual(testTypes);
  });
});
