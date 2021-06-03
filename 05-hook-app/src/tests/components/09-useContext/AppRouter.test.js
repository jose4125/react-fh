import { mount } from "enzyme";
import { AppRouter } from "../../../components/09-useContext/AppRouter";
import { UserContext } from "../../../components/09-useContext/UserContext";

describe("test AppRouter", () => {
  const wrapper = mount(
    <UserContext.Provider
      value={{
        user: {},
      }}
    >
      <AppRouter />
    </UserContext.Provider>
  );

  test("Should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
