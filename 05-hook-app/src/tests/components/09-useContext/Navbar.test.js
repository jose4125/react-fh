import { shallow } from "enzyme";
import { NavBar } from "../../../components/09-useContext/Navbar";

describe("test NavBar", () => {
  const wrapper = shallow(<NavBar />);

  test("Should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should have NavLinks", () => {
    expect(wrapper.find("NavLink").exists()).toBeTruthy();
    expect(wrapper.find("NavLink")).toHaveLength(3);
  });
});
