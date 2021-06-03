import { shallow } from "enzyme";
import { TodoAdd } from "../../../components/08-useReducer/TodoAdd";

describe("test TodoAdd", () => {
  const props = {
    handleAdd: jest.fn(),
  };

  const wrapper = shallow(<TodoAdd {...props} />);

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should not call handleAdd", () => {
    const formSubmit = wrapper.find("form").prop("onSubmit");
    formSubmit({ preventDefault() {} });

    expect(props.handleAdd).not.toHaveBeenCalled();
    expect(props.handleAdd).toHaveBeenCalledTimes(0);
  });

  test("should call handleAdd", () => {
    const newValue = "new todo";

    wrapper
      .find("input")
      .simulate("change", { target: { name: "desc", value: newValue } });

    const formSubmit = wrapper.find("form").prop("onSubmit");
    formSubmit({ preventDefault: () => {} });

    expect(props.handleAdd).toHaveBeenCalled();
    expect(props.handleAdd).toHaveBeenCalledTimes(1);
    expect(props.handleAdd).toHaveBeenCalledWith({
      id: expect.any(Number),
      desc: newValue,
      done: false,
    });
    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
