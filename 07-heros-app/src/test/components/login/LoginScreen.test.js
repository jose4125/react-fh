import { mount } from "enzyme";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import LoginScreen from "../../../components/login/LoginScreen";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("test LoginScreen", () => {
  const contextValue = {
    dispatch: jest.fn(),
  };
  const action = {
    type: types.login,
    payload: {
      name: "jose",
    },
  };
  const history = createMemoryHistory();
  history.replace = jest.fn();

  Storage.prototype.getItem = jest.fn();

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <Router history={history}>
        <LoginScreen />
      </Router>
    </AuthContext.Provider>
  );

  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
  });

  test("Should render properly", () => {
    expect(wrapper.find("h1").text()).toBe("Login");
    expect(wrapper.find("button").text()).toBe("Login");
  });

  test("Should go to the dashboar when the user clicks in the login button", () => {
    wrapper.find("button").simulate("click");
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);

    expect(contextValue.dispatch).toHaveBeenCalled();
    expect(contextValue.dispatch).toHaveBeenCalledWith(action);

    expect(history.replace).toHaveBeenCalled();
    expect(history.replace).toHaveBeenCalledTimes(1);
    expect(history.replace).toHaveBeenCalledWith("/");
  });

  test("Should go to the last page when the user clicks in the login button", () => {
    // localStorage.setItem("lastPath", "/marvel")
    const path = "/marvel";
    Storage.prototype.getItem = jest.fn(() => path);
    wrapper.find("button").simulate("click");

    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("lastPath");

    expect(contextValue.dispatch).toHaveBeenCalled();
    expect(contextValue.dispatch).toHaveBeenCalledWith(action);

    expect(history.replace).toHaveBeenCalledWith(path);
  });
});
