import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import DashboardRouter from "../../routers/DashboardRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("test DashboardRouter", () => {
  test("Should render properly", () => {
    const valueContext = {
      dispatch: jest.fn(),
      user: {
        name: "jose",
        logged: true,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={valueContext}>
        <MemoryRouter>
          <DashboardRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBeTruthy();
    expect(wrapper.find(".card-columns").exists()).toBeTruthy();
  });
});
