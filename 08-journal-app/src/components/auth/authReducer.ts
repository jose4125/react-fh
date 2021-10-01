import { AuthAction, AuthObject } from './interfaces';
import { types } from './constants';

const authReducer = (state = {}, { type, payload }: AuthAction): AuthObject => {
  switch (type) {
    case types.login:
      return {
        uid: payload?.uid,
        name: payload?.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};

export default authReducer;
