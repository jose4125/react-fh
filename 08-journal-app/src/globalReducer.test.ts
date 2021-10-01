import { globalTypes } from './globalConstants';
import globalReducer from './globalReducer';

describe('test globalReducer', () => {
  test('Should return the initial state', () => {
    const initialState = {
      loading: false,
    };
    const action = {
      type: '',
    };

    const state = globalReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  test('Should return the start loading state', () => {
    const initialState = {
      loading: false,
    };
    const startLoadingState = {
      loading: true,
    };
    const action = {
      type: globalTypes.uiStartLoading,
    };

    const state = globalReducer(initialState, action);

    expect(state).toEqual(startLoadingState);
  });

  test('Should return the start loading state', () => {
    const initialState = {
      loading: true,
    };
    const finishLoadingState = {
      loading: false,
    };
    const action = {
      type: globalTypes.uiFinishLoading,
    };

    const state = globalReducer(initialState, action);

    expect(state).toEqual(finishLoadingState);
  });
});
