import { globalTypes } from './globalConstants';

describe('test globalConstants', () => {
  test('Should have constant action types', () => {
    const testTypes = {
      uiStartLoading: '[ui] start loading',
      uiFinishLoading: '[ui] finish loading',
    };
    expect(globalTypes).toEqual(testTypes);
  });
});
