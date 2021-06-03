import { shallow } from "enzyme";
import HooksApp from "../HooksApp";

describe("test HooksApp", () => {
  test("Should render properly", () => {
    const wrapper = shallow(<HooksApp />);
    expect(wrapper).toMatchSnapshot();
  });
});
