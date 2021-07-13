import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import AppRouter from "../../routers/AppRouter";

describe("test AppRouter", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test("should render the login if the user is not authenticated", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find("h1").exists()).toBeTruthy();
    expect(wrapper.find(".btn-primary").exists()).toBeTruthy();
  });

  test("should render the dashboard if the user is authenticated", () => {
    contextValue.user = {
      name: "jose",
      logged: true,
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBeTruthy();
    expect(wrapper.find(".card-columns").exists()).toBeTruthy();
  });
});
