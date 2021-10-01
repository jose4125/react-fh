import { GlobalAction } from './globalInterfaces';
import { globalTypes } from './globalConstants';

export const startLoading = (): GlobalAction => ({
  type: globalTypes.uiStartLoading,
});

export const finishLoading = (): GlobalAction => ({
  type: globalTypes.uiFinishLoading,
});
