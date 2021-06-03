import { mount } from "enzyme";
import { LoginScreen } from "../../../components/09-useContext/LoginScreen";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("test LoginScreen", () => {
  const setUser = jest.fn();
  const wrapper = mount(
    <UserContext.Provider
      value={{
        setUser,
      }}
    >
      <LoginScreen />
    </UserContext.Provider>
  );

  test("Should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should click the button and set the user", () => {
    wrapper.find("button").simulate("click");
    // const setUserFn = wrapper.find("button").prop("onClick");
    // setUserFn();
    expect(setUser).toHaveBeenCalled();
    expect(setUser).toHaveBeenCalledTimes(1);
    expect(setUser).toHaveBeenCalledWith({ id: 2, name: "jose" });
  });
});
