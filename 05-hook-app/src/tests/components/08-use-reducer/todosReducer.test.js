import { todoReducer } from "../../../components/08-useReducer/todoReducer";
import { demoTodos } from "../../fixtures/demoTodos";

describe("test todoReducer", () => {
  test("should return an empty default state", () => {
    const result = todoReducer();

    expect(result).toHaveLength(0);
  });

  test("should return the initial state", () => {
    const result = todoReducer(demoTodos);

    expect(result).toHaveLength(2);
    expect(result).toEqual(demoTodos);
  });

  test("should add todo and return the list", () => {
    const newTodo = {
      id: 3,
      desc: "aprender express",
      done: false,
    };
    const action = {
      type: "ADD_TODO",
      payload: newTodo,
    };
    const result = todoReducer(demoTodos, action);

    expect(result).toHaveLength(3);
    expect(result).toEqual([newTodo, ...demoTodos]);
  });

  test("should remove todo and return the list", () => {
    const action = {
      type: "REMOVE_TODO",
      payload: 2,
    };
    const result = todoReducer(demoTodos, action);

    expect(result).toHaveLength(1);
    expect(result).toEqual([demoTodos[0]]);
  });

  test("should complete one todo", () => {
    const action = {
      type: "COMPLETE_TODO",
      payload: 1,
    };
    const result = todoReducer(demoTodos, action);

    expect(result).toHaveLength(2);
    expect(result[0].done).toBeTruthy();
    expect(result[1]).toEqual(demoTodos[1]);
  });
});
