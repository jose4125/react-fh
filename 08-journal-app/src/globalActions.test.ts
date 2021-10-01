import { finishLoading, startLoading } from './globalActions';
import { globalTypes } from './globalConstants';

describe('test globalActions', () => {
  test('Should return the loading action', () => {
    const action = {
      type: globalTypes.uiStartLoading,
    };
    const startLoadingAction = startLoading();

    expect(startLoadingAction).toEqual(action);
  });

  test('Should return the finish loading action', () => {
    const action = {
      type: globalTypes.uiFinishLoading,
    };
    const finishLoadingAction = finishLoading();

    expect(finishLoadingAction).toEqual(action);
  });
});
