import { mount } from "enzyme";
import { HomeScreen } from "../../../components/09-useContext/HomeScreen";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("test HomeScreen", () => {
  const user = {
    name: "jose",
    email: "test@example.com",
  };
  const wrapper = mount(
    <UserContext.Provider
      value={{
        user: {},
      }}
    >
      <HomeScreen />
    </UserContext.Provider>
  );

  test("Should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should have pre", () => {
    expect(wrapper.find("pre").text()).toBe("{}");
  });

  test("should print user", () => {
    const wrapper = mount(
      <UserContext.Provider
        value={{
          user,
        }}
      >
        <HomeScreen />
      </UserContext.Provider>
    );

    expect(wrapper.find("pre").text()).toEqual(JSON.stringify(user, null, 2));
  });
});
