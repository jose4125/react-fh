import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import Navbar from "../../../components/ui/Navbar";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("test Navbar", () => {
  const contextValue = {
    user: {
      name: "jose",
      logged: true,
    },
    dispatch: jest.fn(),
  };

  const historyMock = {
    push: jest.fn(),
    listen: jest.fn(),
    location: {},
    createHref: jest.fn(),
    replace: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test("Should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should have the user name", () => {
    expect(wrapper.find(".text-info").text()).toBe(contextValue.user.name);
  });

  test("Should call the logout and the history", () => {
    const action = {
      type: types.logout,
    };
    wrapper.find(".btn").simulate("click");

    expect(contextValue.dispatch).toHaveBeenCalled();
    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith(action);

    expect(historyMock.replace).toHaveBeenCalled();
    expect(historyMock.replace).toHaveBeenCalledTimes(1);
    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
