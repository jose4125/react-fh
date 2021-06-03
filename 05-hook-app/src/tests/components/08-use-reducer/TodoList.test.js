import { shallow } from "enzyme";
import { TodoList } from "../../../components/08-useReducer/TodoList";
import { demoTodos } from "../../fixtures/demoTodos";

describe("test TodoList", () => {
  let wrapper;
  const props = {
    todos: demoTodos,
    handleComplete: jest.fn(),
    handleRemove: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<TodoList {...props} />);
  });

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Should have TodoListItem", () => {
    const todoList = wrapper.find("TodoListItem");

    expect(todoList).toHaveLength(demoTodos.length);
  });

  test("Should have the correct props", () => {
    const todo = wrapper.find("TodoListItem").at(0);

    expect(todo.prop("todo")).toEqual(demoTodos[0]);
    expect(todo.prop("index")).toBe(0);
    expect(typeof todo.prop("handleRemove")).toBe("function");
    expect(typeof todo.prop("handleComplete")).toBe("function");
  });
});
