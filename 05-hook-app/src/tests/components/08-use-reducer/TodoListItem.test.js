import { shallow } from "enzyme";
import { TodoListItem } from "../../../components/08-useReducer/TodoListItem";

describe("test TodoListItem", () => {
  let wrapper;
  const props = {
    todo: {
      id: 1,
      desc: "aprender react",
      done: false,
    },
    index: 1,
    handleComplete: jest.fn(),
    handleRemove: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<TodoListItem {...props} />);
  });

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should call handleRemove", () => {
    wrapper.find("button").simulate("click");

    expect(props.handleRemove).toHaveBeenCalled();
    expect(props.handleRemove).toHaveBeenCalledWith(props.todo.id);
    expect(props.handleRemove).toHaveBeenCalledTimes(1);
  });

  test("Should call handleComplete", () => {
    wrapper.find("p").simulate("click");

    expect(props.handleComplete).toHaveBeenCalled();
    expect(props.handleComplete).toHaveBeenCalledWith(props.todo.id);
    expect(props.handleComplete).toHaveBeenCalledTimes(1);
  });

  test("Should show the correct desc text", () => {
    const text = wrapper.find("p").text();

    expect(text).toBe(`${props.index + 1} ${props.todo.desc}`);
  });

  test("Should show the done text", () => {
    props.todo.done = true;
    wrapper = shallow(<TodoListItem {...props} />);
    const text = wrapper.find("p").text();

    expect(text).toBe(`${props.index + 1} ${props.todo.desc} (done, yeah!!)`);
  });
});
