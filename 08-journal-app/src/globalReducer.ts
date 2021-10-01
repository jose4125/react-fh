import { GlobalAction, GlobalObject } from './globalInterfaces';
import { globalTypes } from './globalConstants';

const initialState = {
  loading: false,
};

const globalReducer = (
  state = initialState,
  { type }: GlobalAction,
): GlobalObject => {
  switch (type) {
    case globalTypes.uiStartLoading:
      return { loading: !state.loading };
    case globalTypes.uiFinishLoading:
      return { loading: !state.loading };
    default:
      return state;
  }
};
export default globalReducer;
