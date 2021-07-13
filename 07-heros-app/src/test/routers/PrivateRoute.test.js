import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "../../routers/PrivateRoute";

describe("test PrivateRoute", () => {
  let props = {
    isAuthenticated: true,
    children: <span>test</span>,
  };

  const rest = {
    location: {
      pathname: "/",
    },
  };

  Storage.prototype.setItem = jest.fn();

  test("should render the compoennt if the user is authenticated", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute {...props} {...rest} />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      rest.location.pathname
    );
  });
  test("should render the compoennt if the user is authenticated", () => {
    props.isAuthenticated = false;
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute {...props} {...rest} />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBeFalsy();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      rest.location.pathname
    );
  });
});
