import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("test authReducer", () => {
  test("Should return the default state", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("Should authenticate and set the user name", () => {
    const name = "jose";
    const action = {
      type: types.login,
      payload: {
        name,
      },
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ name, logged: true });
  });

  test("Should logout and remove the user name", () => {
    const name = "jose";
    const action = {
      type: types.logout,
    };
    const state = authReducer({ name, logged: true }, action);
    expect(state).toEqual({ logged: false });
  });
});
