import { shallow, mount } from "enzyme";
import { act } from "@testing-library/react";
import { TodoApp } from "../../../components/08-useReducer/TodoApp";
import { demoTodos } from "../../fixtures/demoTodos";

describe("test TodoApp", () => {
  const wrapper = shallow(<TodoApp />);
  Storage.prototype.setItem = jest.fn();

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should add new todo", () => {
    const wrapper = mount(<TodoApp />);

    act(() => {
      wrapper.find("TodoAdd").prop("handleAdd")(demoTodos[0]);
      wrapper.find("TodoAdd").prop("handleAdd")(demoTodos[1]);
    });

    expect(
      wrapper
        .find("h1")
        .text()
        .trim()
    ).toBe("Todo app (2)");
    expect(localStorage.setItem).toHaveReturnedTimes(2);
  });

  test("should remove one todo", () => {
    wrapper.find("TodoAdd").prop("handleAdd")(demoTodos[0]);
    wrapper.find("TodoList").prop("handleRemove")(demoTodos[0].id);

    expect(
      wrapper
        .find("h1")
        .text()
        .trim()
    ).toBe("Todo app (0)");
  });
});
